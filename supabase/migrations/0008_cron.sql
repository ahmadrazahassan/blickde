-- 0008_cron.sql
-- pg_cron lives in pg_catalog on Supabase and only the postgres role schedules
-- jobs. The job itself is the mechanism behind the retention periods the
-- privacy policy states.

CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Idempotent: unschedule first so a re-run does not create a second job.
DO $$
BEGIN
  PERFORM cron.unschedule('purge-expired');
EXCEPTION WHEN others THEN
  NULL;
END;
$$;

SELECT cron.schedule('purge-expired', '15 3 * * *', 'SELECT public.purge_expired_data()');
