-- 0010_moderation.sql
--
-- Moderation of a review is a decision a person takes, and the audit trail has
-- to name that person rather than the connection pool.
--
-- The application calls these with the signed in editor's address. set_config
-- with is_local = true makes current_actor() return it for the duration of the
-- statement, so the audit trigger records who approved what.
--
-- Both are service role only. An editor never talks to PostgREST directly;
-- the server action does, after checking the session.

CREATE OR REPLACE FUNCTION moderate_review(
  p_id     UUID,
  p_status TEXT,
  p_note   TEXT,
  p_actor  TEXT
)
RETURNS TABLE (id UUID, software_slug TEXT, status TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
BEGIN
  IF p_status NOT IN ('published', 'rejected', 'pending') THEN
    RAISE EXCEPTION 'Unbekannter Status: %', p_status;
  END IF;

  PERFORM set_config('app.actor', COALESCE(NULLIF(p_actor, ''), 'unbekannt'), true);

  RETURN QUERY
  WITH updated AS (
    UPDATE reviews r SET
      status          = p_status,
      moderation_note = NULLIF(p_note, ''),
      moderated_at    = NOW(),
      moderated_by    = p_actor
    WHERE r.id = p_id
      -- A fixture is never publishable through the moderation queue.
      AND r.is_seed = FALSE
    RETURNING r.id, r.software_id, r.status
  )
  SELECT u.id, s.slug, u.status
  FROM updated u
  JOIN software s ON s.id = u.software_id;
END;
$fn$;

-- An editorial reply to a published review.
CREATE OR REPLACE FUNCTION respond_to_review(
  p_id       UUID,
  p_response TEXT,
  p_actor    TEXT
)
RETURNS TABLE (id UUID, software_slug TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
BEGIN
  PERFORM set_config('app.actor', COALESCE(NULLIF(p_actor, ''), 'unbekannt'), true);

  RETURN QUERY
  WITH updated AS (
    UPDATE reviews r SET
      vendor_response      = NULLIF(p_response, ''),
      vendor_response_date = CASE WHEN NULLIF(p_response, '') IS NULL THEN NULL ELSE CURRENT_DATE END
    WHERE r.id = p_id
    RETURNING r.id, r.software_id
  )
  SELECT u.id, s.slug
  FROM updated u
  JOIN software s ON s.id = u.software_id;
END;
$fn$;

REVOKE ALL ON FUNCTION moderate_review(UUID, TEXT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION respond_to_review(UUID, TEXT, TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION moderate_review(UUID, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION respond_to_review(UUID, TEXT, TEXT) TO service_role;
