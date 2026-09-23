-- 0001_extensions.sql
-- Extensions live in the `extensions` schema, which is Supabase convention and
-- keeps `public` free of extension objects. Everything that references them
-- later either runs with `extensions` on the search_path or qualifies the name.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"  WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto"   WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_trgm"    WITH SCHEMA extensions;  -- fuzzy name matching
CREATE EXTENSION IF NOT EXISTS "unaccent"   WITH SCHEMA extensions;  -- umlaut folding in search
