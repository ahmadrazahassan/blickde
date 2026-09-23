-- 0009_search_german_compounds.sql
--
-- Supersedes the search_all() from 0006.
--
-- The `german` text search configuration uses the Snowball stemmer, which does
-- NOT split compounds. Measured on this database:
--
--   to_tsvector('german', 'Buchhaltungssoftware')  ->  'buchhaltungssoftwar'
--   websearch_to_tsquery('german', 'Buchhaltung')  ->  'buchhalt'
--
-- Those two do not match, so the plain stemmed query returns nothing for the
-- most obvious search on the entire site. Widening the stemmed query into a
-- prefix query does match, because 'buchhaltungssoftwar' begins with
-- 'buchhalt'.
--
-- German stemming still does the work it is good at without any of this:
-- "Rechnungen" and "Rechnung" both stem to 'rechnung'.

CREATE OR REPLACE FUNCTION german_prefix_query(q TEXT)
RETURNS tsquery
LANGUAGE sql
IMMUTABLE
SET search_path = public, extensions
AS $fn$
  SELECT (
    SELECT string_agg(quote_literal(lexeme) || ':*', ' & ')
    FROM unnest(to_tsvector('german', coalesce(q, ''))) AS t(lexeme, positions, weights)
  )::tsquery;
$fn$;

CREATE OR REPLACE FUNCTION search_all(q TEXT, lim INT DEFAULT 20)
RETURNS TABLE (kind TEXT, id UUID, title TEXT, slug TEXT, snippet TEXT, rank REAL)
LANGUAGE sql
STABLE
SET search_path = public, extensions
AS $fn$
  WITH needle AS (
    SELECT
      websearch_to_tsquery('german', q) AS tsq,
      -- A quoted phrase or a minus sign is an explicit instruction. Widening
      -- it into a prefix query would quietly reintroduce the rows the visitor
      -- just excluded, so in that case only the exact query counts.
      CASE WHEN q ~ '["-]' THEN NULL ELSE german_prefix_query(q) END AS pfx
  )
  SELECT * FROM (
    SELECT 'software'::text AS kind, s.id, s.name AS title, s.slug,
           s.description_short AS snippet,
           GREATEST(
             ts_rank(s.search_vector, n.tsq) * 3.0,
             ts_rank(s.search_vector, COALESCE(n.pfx, n.tsq)) * 2.4,
             -- The trigram similarity fallback, for a misspelled product name.
             similarity(s.name, q) * 2.0
           )::real AS rank
    FROM software s, needle n
    WHERE s.status = 'published'
      AND (s.search_vector @@ n.tsq
           OR (n.pfx IS NOT NULL AND s.search_vector @@ n.pfx)
           OR s.name % q)

    UNION ALL

    SELECT 'article'::text, a.id, a.title, a.slug, a.excerpt,
           GREATEST(
             ts_rank(a.search_vector, n.tsq) * 2.5,
             ts_rank(a.search_vector, COALESCE(n.pfx, n.tsq)) * 2.0
           )::real
    FROM articles a, needle n
    WHERE a.status = 'published'
      AND (a.search_vector @@ n.tsq
           OR (n.pfx IS NOT NULL AND a.search_vector @@ n.pfx))

    UNION ALL

    SELECT 'category'::text, c.id, c.name, c.slug, c.description,
           GREATEST(
             ts_rank(to_tsvector('german', c.name), n.tsq) * 2.2,
             ts_rank(to_tsvector('german', c.name), COALESCE(n.pfx, n.tsq)) * 1.8
           )::real
    FROM categories c, needle n
    WHERE to_tsvector('german', c.name || ' ' || coalesce(c.description, '')) @@ n.tsq
       OR (n.pfx IS NOT NULL
           AND to_tsvector('german', c.name || ' ' || coalesce(c.description, '')) @@ n.pfx)
  ) hits
  WHERE rank > 0
  ORDER BY rank DESC, title ASC
  LIMIT lim;
$fn$;

REVOKE ALL ON FUNCTION search_all(TEXT, INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION german_prefix_query(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION search_all(TEXT, INT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION german_prefix_query(TEXT) TO anon, authenticated, service_role;
