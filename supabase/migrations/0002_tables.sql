-- 0002_tables.sql
-- Sixteen tables, in foreign key order.
--
-- Conventions that hold without exception:
--   * every timestamp is TIMESTAMPTZ
--   * every money value is NUMERIC
--   * no raw IP address is ever stored; only salted hashes, in *_ip_hash / ip_hash
--   * aggregate columns (ratings, counts) are written by triggers only

-- ---------------------------------------------------------------- categories
CREATE TABLE IF NOT EXISTS categories (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  icon           TEXT,
  description    TEXT,
  software_count INT DEFAULT 0,          -- maintained by trigger
  display_order  INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------ software
CREATE TABLE IF NOT EXISTS software (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  tagline           TEXT,
  description_short TEXT NOT NULL,
  -- Editorial long form. Paragraphs separated by a blank line; the application
  -- splits them back into an array and renders them as text, never as HTML.
  description_full  TEXT NOT NULL,
  -- Three sentences on who the product is for. Editorial, written in house.
  verdict           TEXT,
  logo_url          TEXT,
  screenshots       JSONB DEFAULT '[]'::jsonb,
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Pricing
  starting_price     NUMERIC,                   -- NULL means "auf Anfrage"
  price_currency     TEXT DEFAULT 'EUR',
  billing_period     TEXT DEFAULT 'month' CHECK (billing_period IN ('month','year','user','seat')),
  free_trial         BOOLEAN DEFAULT FALSE,
  free_version       BOOLEAN DEFAULT FALSE,
  pricing_plans      JSONB DEFAULT '[]'::jsonb,
  price_includes_vat BOOLEAN DEFAULT FALSE,     -- German B2B quotes net
  pricing_checked_at DATE,                      -- when a human last verified
  trial_days         INT,                       -- published trial length, NULL = none published
  promotion          JSONB,                     -- running vendor offer, or NULL
  demo               JSONB,                     -- guided demo / product tour, or NULL

  -- Capability
  features      JSONB DEFAULT '[]'::jsonb,
  top_features  JSONB DEFAULT '[]'::jsonb,
  integrations  JSONB DEFAULT '[]'::jsonb,
  de_compliance JSONB DEFAULT '{}'::jsonb,
  faq           JSONB DEFAULT '[]'::jsonb,

  -- Commercial
  affiliate_url     TEXT,                       -- NULL unless a real programme
  affiliate_network TEXT CHECK (affiliate_network IN ('awin','impact','direct')),
  vendor_website    TEXT,

  -- Vendor
  vendor_name         TEXT,
  founded_year        INT,
  support_types       JSONB DEFAULT '[]'::jsonb,
  countries_available JSONB DEFAULT '[]'::jsonb,
  languages           JSONB DEFAULT '[]'::jsonb,

  -- Ratings, written ONLY by update_software_ratings()
  overall_rating          NUMERIC(3,1) DEFAULT 0,
  ease_of_use_rating      NUMERIC(3,1) DEFAULT 0,
  value_for_money_rating  NUMERIC(3,1) DEFAULT 0,
  customer_service_rating NUMERIC(3,1) DEFAULT 0,
  functionality_rating    NUMERIC(3,1) DEFAULT 0,
  review_count            INT DEFAULT 0,

  -- SEO
  meta_title       TEXT,
  meta_description TEXT,
  og_image_url     TEXT,

  status     TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  featured   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- The configuration is `german`, not `english`, and that is not cosmetic:
  -- it is what makes "Buchhaltung" match "Buchhaltungssoftware".
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('german', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('german', coalesce(tagline, '')), 'B') ||
    setweight(to_tsvector('german', coalesce(description_short, '')), 'C')
  ) STORED
);

COMMENT ON COLUMN software.de_compliance IS
  'Three states per key: true = confirmed yes, false = confirmed no, null or absent = not verified. Never filter these with the ->> operator: a missing key and a stored false compare identically as text, and that distinction is the whole point.';

-- ------------------------------------------------------------------- reviews
CREATE TABLE IF NOT EXISTS reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,

  reviewer_name         TEXT NOT NULL,
  reviewer_job_title    TEXT,
  reviewer_company      TEXT,
  reviewer_industry     TEXT,
  reviewer_company_size TEXT,
  reviewer_country      TEXT DEFAULT 'DE',
  reviewer_avatar_url   TEXT,
  verified_linkedin     BOOLEAN DEFAULT FALSE,
  verified_badge        TEXT,
  used_for_duration     TEXT,

  overall_rating   NUMERIC(2,1) NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  ease_of_use      NUMERIC(2,1) CHECK (ease_of_use BETWEEN 1 AND 5),
  value_for_money  NUMERIC(2,1) CHECK (value_for_money BETWEEN 1 AND 5),
  customer_service NUMERIC(2,1) CHECK (customer_service BETWEEN 1 AND 5),
  functionality    NUMERIC(2,1) CHECK (functionality BETWEEN 1 AND 5),

  review_title TEXT NOT NULL,
  summary      TEXT,
  pros         TEXT,
  cons         TEXT,

  vendor_response      TEXT,
  vendor_response_date DATE,

  review_date   DATE DEFAULT CURRENT_DATE,
  helpful_count INT DEFAULT 0,

  -- No automatic publication. This is the technical half of the
  -- Paragraph 5b Abs. 3 UWG disclosure the interface makes.
  status  TEXT DEFAULT 'pending' CHECK (status IN ('pending','published','rejected')),
  -- Fixtures. Hidden by RLS, excluded from every rating calculation.
  is_seed BOOLEAN DEFAULT FALSE,

  -- Contact address for queries about the submission. Never published.
  submitter_email   TEXT,
  -- Salted SHA-256. The raw address is never written to this database.
  submitter_ip_hash TEXT,

  -- Moderation trail
  moderation_note TEXT,
  moderated_at    TIMESTAMPTZ,
  moderated_by    TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------ articles
CREATE TABLE IF NOT EXISTS articles (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  excerpt             TEXT,
  -- A JSON array of structured blocks (paragraph, heading, list, quote, note,
  -- table, software). The renderer walks the blocks; nothing is ever injected
  -- with dangerouslySetInnerHTML, so there is no HTML sanitising surface.
  content             TEXT NOT NULL,
  featured_image_url  TEXT,
  featured_image_alt  TEXT,
  category_tag        TEXT,
  related_software_id UUID REFERENCES software(id) ON DELETE SET NULL,
  related_software_slugs JSONB DEFAULT '[]'::jsonb,

  -- NOT NULL on purpose: Paragraph 18 Abs. 2 MStV requires an identifiable
  -- person responsible for editorial content. An article with no author is
  -- not publishable.
  author_name       TEXT NOT NULL,
  author_bio        TEXT,
  author_avatar_url TEXT,
  author_title      TEXT,

  meta_title       TEXT,
  meta_description TEXT,
  og_image_url     TEXT,

  read_time_minutes INT,
  status            TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  featured          BOOLEAN DEFAULT FALSE,
  published_date    DATE,
  updated_date      DATE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),

  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('german', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('german', coalesce(excerpt, '')), 'B')
  ) STORED
);

-- --------------------------------------------------------------- comparisons
-- /vergleich/[paar] resolves any two published slugs on the fly. This table
-- only stores the editorial verdict for the pairs worth writing one, so a
-- comparison page never 404s just because no row exists.
CREATE TABLE IF NOT EXISTS comparisons (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_a_id  UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
  software_b_id  UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
  custom_verdict TEXT,
  headline       TEXT,
  differences    JSONB DEFAULT '[]'::jsonb,
  take_a         JSONB DEFAULT '[]'::jsonb,
  take_b         JSONB DEFAULT '[]'::jsonb,
  meta_title       TEXT,
  meta_description TEXT,
  status     TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT different_products CHECK (software_a_id <> software_b_id),
  CONSTRAINT unique_pair UNIQUE (software_a_id, software_b_id)
);

-- ------------------------------------------------------ software_alternatives
CREATE TABLE IF NOT EXISTS software_alternatives (
  software_id    UUID REFERENCES software(id) ON DELETE CASCADE,
  alternative_id UUID REFERENCES software(id) ON DELETE CASCADE,
  display_order  INT DEFAULT 0,
  PRIMARY KEY (software_id, alternative_id),
  CONSTRAINT not_self CHECK (software_id <> alternative_id)
);

-- --------------------------------------------------------------------- pages
CREATE TABLE IF NOT EXISTS pages (
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug    TEXT UNIQUE NOT NULL,
  title   TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  status  TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------- site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key   TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------- newsletter_subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email  TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','unsubscribed')),
  confirm_token     TEXT UNIQUE,
  unsubscribe_token TEXT UNIQUE,
  confirmed_at      TIMESTAMPTZ,
  unsubscribed_at   TIMESTAMPTZ,
  source            TEXT,
  ip_hash           TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------- newsletter_suppression
-- Survives a resubscribe attempt. An address on this list is never mailed
-- again, whatever a later form submission says.
CREATE TABLE IF NOT EXISTS newsletter_suppression (
  email      TEXT PRIMARY KEY,
  reason     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------- contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name    TEXT NOT NULL,
  email   TEXT NOT NULL,
  topic   TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash    TEXT,
  user_agent TEXT,
  status     TEXT DEFAULT 'new' CHECK (status IN ('new','read','answered')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------ consent_events
-- Paragraph 25 TDDDG proof of consent.
CREATE TABLE IF NOT EXISTS consent_events (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consent_id TEXT NOT NULL,
  analytics  BOOLEAN NOT NULL,
  marketing  BOOLEAN NOT NULL,
  action     TEXT NOT NULL CHECK (action IN ('grant','deny','withdraw','update')),
  policy_version TEXT NOT NULL,
  ip_hash    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------- affiliate_clicks
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID REFERENCES software(id) ON DELETE CASCADE,
  source_path TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------- media_library
CREATE TABLE IF NOT EXISTS media_library (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_path  TEXT NOT NULL,
  alt_text   TEXT,
  width INT, height INT, size_bytes INT, mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------- redirects
CREATE TABLE IF NOT EXISTS redirects (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_path TEXT UNIQUE NOT NULL,
  to_path   TEXT NOT NULL,
  status_code INT DEFAULT 301,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------- audit_log
CREATE TABLE IF NOT EXISTS audit_log (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id  UUID,
  action     TEXT NOT NULL,
  actor      TEXT,
  diff       JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
