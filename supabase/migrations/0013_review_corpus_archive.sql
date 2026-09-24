-- 0013_review_corpus_archive.sql
--
-- A holding table for reviews taken out of the published corpus, so removing
-- them is reversible. Rows are copied here first and deleted from `reviews`
-- afterwards; the ratings trigger recomputes the affected grades on the way.
--
-- Service role only, like every other operational table.

CREATE TABLE IF NOT EXISTS reviews_archive (LIKE reviews INCLUDING ALL);

ALTER TABLE reviews_archive ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE reviews_archive ADD COLUMN IF NOT EXISTS archived_reason TEXT;

ALTER TABLE reviews_archive ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON reviews_archive FROM anon, authenticated;
