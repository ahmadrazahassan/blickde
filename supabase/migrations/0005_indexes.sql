-- 0005_indexes.sql

CREATE INDEX IF NOT EXISTS idx_software_status_rating ON software (status, overall_rating DESC);
CREATE INDEX IF NOT EXISTS idx_software_category      ON software (category_id) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_software_slug          ON software (slug);
CREATE INDEX IF NOT EXISTS idx_software_search        ON software USING GIN (search_vector);

-- The trigram index is what lets a visitor who types "lexware ofice" still
-- find Lexware Office. German product names are frequently misspelled by the
-- people searching for them.
CREATE INDEX IF NOT EXISTS idx_software_name_trgm     ON software USING GIN (name extensions.gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_reviews_software       ON reviews (software_id, status, review_date DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_moderation     ON reviews (status, created_at DESC) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_reviews_ip_hash        ON reviews (software_id, submitter_ip_hash);

CREATE INDEX IF NOT EXISTS idx_articles_published     ON articles (status, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_search        ON articles USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_articles_slug          ON articles (slug);

CREATE INDEX IF NOT EXISTS idx_clicks_software_date   ON affiliate_clicks (software_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comparisons_pair       ON comparisons (software_a_id, software_b_id) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_alternatives_software  ON software_alternatives (software_id, display_order);

CREATE INDEX IF NOT EXISTS idx_contact_status         ON contact_messages (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_record           ON audit_log (table_name, record_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_status      ON newsletter_subscribers (status, created_at DESC);
