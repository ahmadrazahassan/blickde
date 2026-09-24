-- 0014_review_corpus_facts.sql
--
-- The methodology page states the size and shape of the published corpus.
--
-- Counting those rows in the application meant fetching them, and PostgREST
-- caps a plain select at 1000 rows, so the page printed "1.000 Bewertungen zu
-- 28 Programmen" for a corpus of 1442 across 30. A page whose whole purpose is
-- to let a reader check the numbers must not itself carry a truncated one.
--
-- Aggregating in the database removes the failure mode entirely: one round
-- trip, no row limit, nothing to paginate.

CREATE OR REPLACE FUNCTION review_corpus_facts()
RETURNS TABLE (
  published INT,
  products  INT,
  oldest    DATE,
  newest    DATE,
  max_per_product INT,
  min_per_product INT,
  verified  INT,
  pending   INT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $fn$
  WITH je_produkt AS (
    SELECT software_id, count(*) AS n
    FROM reviews
    WHERE status = 'published' AND is_seed = FALSE
    GROUP BY software_id
  )
  SELECT
    COALESCE((SELECT sum(n) FROM je_produkt), 0)::int,
    COALESCE((SELECT count(*) FROM je_produkt), 0)::int,
    (SELECT min(review_date) FROM reviews WHERE status='published' AND is_seed=FALSE),
    (SELECT max(review_date) FROM reviews WHERE status='published' AND is_seed=FALSE),
    COALESCE((SELECT max(n) FROM je_produkt), 0)::int,
    COALESCE((SELECT min(n) FROM je_produkt), 0)::int,
    COALESCE((SELECT count(*) FROM reviews
              WHERE status='published' AND is_seed=FALSE
                AND verified_badge IS NOT NULL), 0)::int,
    COALESCE((SELECT count(*) FROM reviews
              WHERE status='pending' AND is_seed=FALSE), 0)::int;
$fn$;

-- Aggregate counts over published rows only; nothing here exposes a row.
REVOKE ALL ON FUNCTION review_corpus_facts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION review_corpus_facts() TO anon, authenticated, service_role;
