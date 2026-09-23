-- 0004_rls.sql
-- Row Level Security on every table without exception. A table with RLS off is
-- a public table, no matter what the client code does.
--
-- The service role bypasses RLS entirely, which is why the tables that hold
-- personal data get no policy at all rather than a restrictive one: no policy
-- means no access for anon and authenticated, and the server keeps working.

ALTER TABLE categories             ENABLE ROW LEVEL SECURITY;
ALTER TABLE software               ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews                ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles               ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons            ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_alternatives  ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_suppression ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages       ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library          ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log              ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------- public, read only

DROP POLICY IF EXISTS "public reads published software" ON software;
CREATE POLICY "public reads published software" ON software
  FOR SELECT TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "public reads published articles" ON articles;
CREATE POLICY "public reads published articles" ON articles
  FOR SELECT TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "public reads categories" ON categories;
CREATE POLICY "public reads categories" ON categories
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public reads published comparisons" ON comparisons;
CREATE POLICY "public reads published comparisons" ON comparisons
  FOR SELECT TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "public reads alternatives" ON software_alternatives;
CREATE POLICY "public reads alternatives" ON software_alternatives
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public reads published pages" ON pages;
CREATE POLICY "public reads published pages" ON pages
  FOR SELECT TO anon, authenticated USING (status = 'published');

-- ---------------------------------------------------- reviews

-- Published AND not a fixture. Both halves matter.
DROP POLICY IF EXISTS "public reads real published reviews" ON reviews;
CREATE POLICY "public reads real published reviews" ON reviews
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND is_seed = FALSE);

-- Anyone may submit, but only as pending and never as a fixture.
--
-- That WITH CHECK is the important one. Without it a crafted PostgREST request
-- inserts a review with status = 'published' and it is live on the site
-- immediately, which defeats the entire human moderation promise.
DROP POLICY IF EXISTS "anyone may submit a review" ON reviews;
CREATE POLICY "anyone may submit a review" ON reviews
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND is_seed = FALSE);

-- ---------------------------------------------------- no public policy at all
--
-- contact_messages, consent_events, affiliate_clicks, audit_log,
-- newsletter_subscribers, newsletter_suppression, media_library, redirects and
-- site_settings are reachable only by the service role. RLS is on and no
-- policy grants anon or authenticated anything, so every request from the
-- browser returns zero rows and every write is rejected.
--
-- Revoking the table privileges as well means a future policy added by
-- accident still cannot open these up.

REVOKE ALL ON contact_messages       FROM anon, authenticated;
REVOKE ALL ON consent_events         FROM anon, authenticated;
REVOKE ALL ON affiliate_clicks       FROM anon, authenticated;
REVOKE ALL ON audit_log              FROM anon, authenticated;
REVOKE ALL ON newsletter_subscribers FROM anon, authenticated;
REVOKE ALL ON newsletter_suppression FROM anon, authenticated;
REVOKE ALL ON media_library          FROM anon, authenticated;
REVOKE ALL ON redirects              FROM anon, authenticated;
REVOKE ALL ON site_settings          FROM anon, authenticated;

-- Content tables stay readable, but never writable, from the browser.
REVOKE INSERT, UPDATE, DELETE ON software              FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON articles              FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON categories            FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON comparisons           FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON software_alternatives FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON pages                 FROM anon, authenticated;
REVOKE UPDATE, DELETE          ON reviews              FROM anon, authenticated;
