-- 0012_foreign_key_indexes.sql
--
-- A foreign key without a covering index makes the referenced side pay for
-- every delete and update of a parent row, because the constraint check has to
-- scan the child table. Caught by the Supabase database linter, lint 0001.

CREATE INDEX IF NOT EXISTS idx_articles_related_software
  ON articles (related_software_id);

CREATE INDEX IF NOT EXISTS idx_comparisons_software_b
  ON comparisons (software_b_id);

CREATE INDEX IF NOT EXISTS idx_alternatives_alternative
  ON software_alternatives (alternative_id);
