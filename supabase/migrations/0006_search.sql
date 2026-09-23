-- 0006_search.sql
-- One RPC, used by /suche and by the header search dialog.
--
-- websearch_to_tsquery rather than plainto_tsquery, so a visitor can type a
-- quoted phrase or a minus sign and get what they expect. The % operator is
-- the trigram similarity fallback for misspellings, and similarity() feeds the
-- rank so a fuzzy hit is not sorted below the limit with a rank of zero.

CREATE OR REPLACE FUNCTION search_all(q TEXT, lim INT DEFAULT 20)
RETURNS TABLE (kind TEXT, id UUID, title TEXT, slug TEXT, snippet TEXT, rank REAL)
LANGUAGE sql
STABLE
SET search_path = public, extensions
AS $$
  WITH needle AS (
    SELECT websearch_to_tsquery('german', q) AS tsq
  )
  SELECT * FROM (
    SELECT 'software'::text AS kind, s.id, s.name AS title, s.slug,
           s.description_short AS snippet,
           GREATEST(
             ts_rank(s.search_vector, n.tsq) * 3.0,
             similarity(s.name, q) * 2.0
           )::real AS rank
    FROM software s, needle n
    WHERE s.status = 'published'
      AND (s.search_vector @@ n.tsq OR s.name % q)

    UNION ALL

    SELECT 'article'::text, a.id, a.title, a.slug, a.excerpt,
           (ts_rank(a.search_vector, n.tsq) * 2.5)::real
    FROM articles a, needle n
    WHERE a.status = 'published'
      AND a.search_vector @@ n.tsq

    UNION ALL

    SELECT 'category'::text, c.id, c.name, c.slug, c.description,
           (ts_rank(to_tsvector('german', c.name), n.tsq) * 2.0)::real
    FROM categories c, needle n
    WHERE to_tsvector('german', c.name || ' ' || coalesce(c.description, '')) @@ n.tsq
  ) hits
  ORDER BY rank DESC, title ASC
  LIMIT lim;
$$;

REVOKE ALL ON FUNCTION search_all(TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION search_all(TEXT, INT) TO anon, authenticated, service_role;
