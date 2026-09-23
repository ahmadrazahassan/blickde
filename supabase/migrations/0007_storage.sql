-- 0007_storage.sql
-- Three buckets, public read, service role write.
--
-- There is no avatars bucket. Reviews render an initial in a circle instead,
-- which removes an entire moderation surface and an entire class of privacy
-- problem for one line of CSS.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('logos', 'logos', true, 204800,
   ARRAY['image/png', 'image/svg+xml', 'image/webp']),
  ('screenshots', 'screenshots', true, 1048576,
   ARRAY['image/webp', 'image/avif']),
  ('articles', 'articles', true, 1048576,
   ARRAY['image/webp', 'image/avif'])
ON CONFLICT (id) DO UPDATE
  SET public             = EXCLUDED.public,
      file_size_limit    = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Read is public. Nothing in the browser ever holds an upload credential, so
-- there is deliberately no INSERT, UPDATE or DELETE policy for anon or
-- authenticated: only the service role writes, and it bypasses RLS.

DROP POLICY IF EXISTS "public reads logos" ON storage.objects;
CREATE POLICY "public reads logos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'logos');

DROP POLICY IF EXISTS "public reads screenshots" ON storage.objects;
CREATE POLICY "public reads screenshots" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'screenshots');

DROP POLICY IF EXISTS "public reads article images" ON storage.objects;
CREATE POLICY "public reads article images" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'articles');
