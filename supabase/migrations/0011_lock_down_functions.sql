-- 0011_lock_down_functions.sql
--
-- Postgres grants EXECUTE on a new function to PUBLIC by default, and Supabase
-- exposes every function in the `public` schema at /rest/v1/rpc/<name>. The two
-- together mean a SECURITY DEFINER helper written for a trigger is, by default,
-- an unauthenticated endpoint.
--
-- purge_expired_data() was the one that mattered: it deletes rows, it runs as
-- its owner, and anon could call it. The nightly cron job calls it as the
-- postgres role and is unaffected by this.
--
-- Caught by the Supabase database linter, lints 0028 and 0029.

REVOKE ALL ON FUNCTION purge_expired_data()               FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION recalc_software_ratings(UUID)      FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION update_software_ratings()          FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION update_category_counts()           FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION log_audit()                        FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION set_updated_at()                   FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION current_actor()                    FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION jsonb_diff(JSONB, JSONB)           FROM PUBLIC, anon, authenticated;

-- A trigger fires as the table owner and never consults EXECUTE privileges, so
-- the triggers above keep working with no grant at all.

-- Platform function that auto-enables RLS on newly created tables. It returns
-- event_trigger and cannot do anything useful over REST, but there is no reason
-- for it to be reachable from the browser either. Event triggers do not consult
-- EXECUTE privileges, so this does not disable it.
REVOKE ALL ON FUNCTION rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- The nightly purge is the one caller that must keep working.
GRANT EXECUTE ON FUNCTION purge_expired_data() TO postgres, service_role;

-- search_all() and german_prefix_query() are deliberately left callable by
-- anon: they are the public search, they are SECURITY INVOKER, and RLS applies
-- to them like any other read.
