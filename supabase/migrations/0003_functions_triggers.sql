-- 0003_functions_triggers.sql
-- Aggregates are written here and nowhere else. If an application can write a
-- rating, an application can fake a rating.

-- ==========================================================================
-- Ratings
-- ==========================================================================

-- A grade is an arithmetic consequence of published, non fixture reviews.
-- It is not settable by any client, any admin form or any migration.
CREATE OR REPLACE FUNCTION recalc_software_ratings(target UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
BEGIN
  IF target IS NULL THEN
    RETURN;
  END IF;

  UPDATE software s SET
    overall_rating = COALESCE((
      SELECT ROUND(AVG(r.overall_rating)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    ease_of_use_rating = COALESCE((
      SELECT ROUND(AVG(r.ease_of_use)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    value_for_money_rating = COALESCE((
      SELECT ROUND(AVG(r.value_for_money)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    customer_service_rating = COALESCE((
      SELECT ROUND(AVG(r.customer_service)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    functionality_rating = COALESCE((
      SELECT ROUND(AVG(r.functionality)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    review_count = (
      SELECT COUNT(*) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE)
  WHERE s.id = target;
END;
$fn$;

-- The AND r.is_seed = FALSE in all six subqueries above is the third and last
-- layer keeping fixtures out of a published grade. The other two are the RLS
-- policy and the interface label.
--
-- TG_OP is checked before touching NEW or OLD: referencing OLD in an INSERT
-- trigger (or NEW in a DELETE trigger) raises "record is not assigned yet".
CREATE OR REPLACE FUNCTION update_software_ratings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM recalc_software_ratings(NEW.software_id);
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM recalc_software_ratings(OLD.software_id);
  ELSE
    -- A moved review changes two products, not one.
    PERFORM recalc_software_ratings(NEW.software_id);
    IF OLD.software_id IS DISTINCT FROM NEW.software_id THEN
      PERFORM recalc_software_ratings(OLD.software_id);
    END IF;
  END IF;
  RETURN NULL;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_reviews_ratings ON reviews;
CREATE TRIGGER trg_reviews_ratings
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_software_ratings();

-- ==========================================================================
-- Category counts
-- ==========================================================================

CREATE OR REPLACE FUNCTION update_category_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
DECLARE
  touched UUID[] := ARRAY[]::UUID[];
BEGIN
  IF TG_OP <> 'DELETE' AND NEW.category_id IS NOT NULL THEN
    touched := touched || NEW.category_id;
  END IF;
  IF TG_OP <> 'INSERT' AND OLD.category_id IS NOT NULL THEN
    touched := touched || OLD.category_id;
  END IF;

  UPDATE categories c SET software_count = (
    SELECT COUNT(*) FROM software s
    WHERE s.category_id = c.id AND s.status = 'published'
  ) WHERE c.id = ANY (touched);

  RETURN NULL;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_software_category_counts ON software;
CREATE TRIGGER trg_software_category_counts
AFTER INSERT OR DELETE OR UPDATE OF category_id, status ON software
FOR EACH ROW EXECUTE FUNCTION update_category_counts();

-- ==========================================================================
-- Timestamps
-- ==========================================================================

-- An explicitly supplied updated_at wins. That keeps an editorial "last
-- revised" date from being silently overwritten by a re-run of the seed, while
-- any ordinary write still stamps the current time.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, extensions
AS $fn$
BEGIN
  IF NEW.updated_at IS DISTINCT FROM OLD.updated_at THEN
    RETURN NEW;
  END IF;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_software_updated_at ON software;
CREATE TRIGGER trg_software_updated_at
BEFORE UPDATE ON software
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_articles_updated_at ON articles;
CREATE TRIGGER trg_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_pages_updated_at ON pages;
CREATE TRIGGER trg_pages_updated_at
BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==========================================================================
-- Audit
-- ==========================================================================

-- When a correction changes a price or a grade, the site has to be able to say
-- when and by whom. That is an editorial policy commitment, not only good
-- engineering.
CREATE OR REPLACE FUNCTION current_actor()
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SET search_path = public, extensions
AS $fn$
DECLARE
  claims JSON;
  who TEXT;
BEGIN
  -- Set by the application for server side writes: SET LOCAL app.actor = '...'
  who := NULLIF(current_setting('app.actor', true), '');
  IF who IS NOT NULL THEN
    RETURN who;
  END IF;

  BEGIN
    claims := NULLIF(current_setting('request.jwt.claims', true), '')::json;
  EXCEPTION WHEN others THEN
    claims := NULL;
  END;

  IF claims IS NOT NULL THEN
    who := COALESCE(claims ->> 'email', claims ->> 'sub');
  END IF;

  RETURN COALESCE(who, current_user);
END;
$fn$;

CREATE OR REPLACE FUNCTION jsonb_diff(before JSONB, after JSONB)
RETURNS JSONB
LANGUAGE sql
IMMUTABLE
SET search_path = public, extensions
AS $fn$
  SELECT COALESCE(
    jsonb_object_agg(
      k,
      jsonb_build_object('von', before -> k, 'nach', after -> k)
    ),
    '{}'::jsonb
  )
  FROM (
    SELECT jsonb_object_keys(COALESCE(before, '{}'::jsonb)) AS k
    UNION
    SELECT jsonb_object_keys(COALESCE(after, '{}'::jsonb)) AS k
  ) keys
  WHERE (before -> k) IS DISTINCT FROM (after -> k)
    -- A bumped timestamp is not a correction and only adds noise.
    AND k NOT IN ('updated_at', 'search_vector');
$fn$;

CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
DECLARE
  diff_doc JSONB;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (table_name, record_id, action, actor, diff)
    VALUES (TG_TABLE_NAME, NEW.id, 'insert', current_actor(),
            jsonb_build_object('neu', to_jsonb(NEW) - 'search_vector'));
    RETURN NEW;

  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (table_name, record_id, action, actor, diff)
    VALUES (TG_TABLE_NAME, OLD.id, 'delete', current_actor(),
            jsonb_build_object('alt', to_jsonb(OLD) - 'search_vector'));
    RETURN OLD;

  ELSE
    diff_doc := jsonb_diff(to_jsonb(OLD), to_jsonb(NEW));
    IF diff_doc = '{}'::jsonb THEN
      RETURN NEW;               -- nothing of substance changed
    END IF;
    INSERT INTO audit_log (table_name, record_id, action, actor, diff)
    VALUES (TG_TABLE_NAME, NEW.id, 'update', current_actor(), diff_doc);
    RETURN NEW;
  END IF;
END;
$fn$;

DROP TRIGGER IF EXISTS trg_software_audit ON software;
CREATE TRIGGER trg_software_audit
AFTER INSERT OR UPDATE OR DELETE ON software
FOR EACH ROW EXECUTE FUNCTION log_audit();

DROP TRIGGER IF EXISTS trg_articles_audit ON articles;
CREATE TRIGGER trg_articles_audit
AFTER INSERT OR UPDATE OR DELETE ON articles
FOR EACH ROW EXECUTE FUNCTION log_audit();

DROP TRIGGER IF EXISTS trg_pages_audit ON pages;
CREATE TRIGGER trg_pages_audit
AFTER INSERT OR UPDATE OR DELETE ON pages
FOR EACH ROW EXECUTE FUNCTION log_audit();

-- Moderation decisions on reviews are audited too: approving or rejecting a
-- customer statement is exactly the kind of act that has to be traceable.
DROP TRIGGER IF EXISTS trg_reviews_audit ON reviews;
CREATE TRIGGER trg_reviews_audit
AFTER UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION log_audit();

-- ==========================================================================
-- Retention
-- ==========================================================================

-- The privacy policy states retention periods. This function is what makes
-- those statements true. A stated period with no mechanism behind it is a
-- false statement to a supervisory authority.
CREATE OR REPLACE FUNCTION purge_expired_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
BEGIN
  DELETE FROM contact_messages WHERE created_at < NOW() - INTERVAL '24 months';
  DELETE FROM consent_events   WHERE created_at < NOW() - INTERVAL '36 months';
  DELETE FROM affiliate_clicks WHERE created_at < NOW() - INTERVAL '14 months';
  -- An address that never confirmed has no legal basis for storage.
  DELETE FROM newsletter_subscribers
    WHERE status = 'pending' AND created_at < NOW() - INTERVAL '30 days';
  DELETE FROM audit_log WHERE created_at < NOW() - INTERVAL '36 months';
END;
$fn$;
