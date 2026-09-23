# Build Prompt 2 of 2: Backend, Database and Supabase

You are a senior backend engineer. Build the complete data layer for a German
business software review platform on Supabase. This document pairs with
`01_FRONTEND_PROMPT.md`. Read it fully before writing any SQL.

The platform stores software profiles, verified user reviews, head to head
comparisons, editorial articles, newsletter subscribers, contact messages and
consent records. It operates in Germany, so data protection is a design
constraint and not a later concern.

---

## 1. Platform and ground rules

```
Database      Supabase Postgres 15 or later
Region        eu-central-1 (Frankfurt) or eu-west-1. Never a US region.
Auth          Supabase Auth, email and password, admin users only
Storage       Supabase Storage, three buckets
Access        PostgREST from the app, service role only on the server
Migrations    Plain .sql files, numbered, checked into the repository
```

**Region is a legal decision, not a performance one.** Personal data from
German visitors stays in the EU. A US region creates a third country transfer
that the privacy policy would have to disclose and defend. Choose Frankfurt.

Rules that hold throughout:

* **Row Level Security is enabled on every table without exception.** A table
  with RLS off is a public table, no matter what the client code does.
* The anonymous key reads published content and nothing else.
* The service role key is server side only and is never sent to the browser.
  It is never prefixed with `NEXT_PUBLIC_`.
* Aggregates such as ratings and counts are written by triggers, never by
  application code. If an app can write a rating, an app can fake a rating.
* Every timestamp is `TIMESTAMPTZ`. Never `TIMESTAMP`.
* Every money value is `NUMERIC`. Never `FLOAT` or `REAL`.

---

## 2. Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- fuzzy name matching
CREATE EXTENSION IF NOT EXISTS "unaccent";     -- umlaut folding in search
CREATE EXTENSION IF NOT EXISTS "pg_cron";      -- scheduled data purges
```

---

## 3. Schema

Sixteen tables. Build them in this order, because of the foreign keys.

### 3.1 categories

```sql
CREATE TABLE categories (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  icon           TEXT,
  description    TEXT,
  software_count INT DEFAULT 0,          -- maintained by trigger
  display_order  INT DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
```

Seed with the categories German buyers actually search for:
Buchhaltungssoftware, Lohnabrechnung, HR-Software, CRM-Software, ERP-Software,
Projektmanagement, Warenwirtschaft, Kassensysteme.

### 3.2 software

The central table.

```sql
CREATE TABLE software (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  tagline           TEXT,
  description_short TEXT NOT NULL,
  description_full  TEXT NOT NULL,              -- sanitised rich text HTML
  logo_url          TEXT,
  screenshots       JSONB DEFAULT '[]',
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Pricing
  starting_price     NUMERIC,                   -- NULL means "on request"
  price_currency     TEXT DEFAULT 'EUR',
  billing_period     TEXT DEFAULT 'month',      -- month | year | user | seat
  free_trial         BOOLEAN DEFAULT FALSE,
  free_version       BOOLEAN DEFAULT FALSE,
  pricing_plans      JSONB DEFAULT '[]',
  price_includes_vat BOOLEAN DEFAULT FALSE,     -- German B2B quotes net
  pricing_checked_at DATE,                      -- when a human last verified

  -- Capability
  features      JSONB DEFAULT '[]',
  top_features  JSONB DEFAULT '[]',
  integrations  JSONB DEFAULT '[]',
  de_compliance JSONB DEFAULT '{}',             -- see 3.3

  -- Commercial
  affiliate_url     TEXT,                       -- NULL unless a real programme
  affiliate_network TEXT,                       -- awin | impact | direct | NULL
  vendor_website    TEXT,

  -- Vendor
  vendor_name         TEXT,
  founded_year        INT,
  support_types       JSONB DEFAULT '[]',
  countries_available JSONB DEFAULT '[]',
  languages           JSONB DEFAULT '[]',

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

  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('german', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('german', coalesce(tagline, '')), 'B') ||
    setweight(to_tsvector('german', coalesce(description_short, '')), 'C')
  ) STORED
);
```

**The text search configuration is `german`, not `english`, and this is not
cosmetic.** The German dictionary applies German stemming and German stop
words. That is what makes `Buchhaltung` match `Buchhaltungssoftware` and
`Rechnungen` match `Rechnung`. Under the English configuration those are
unrelated tokens and the search returns nothing for the most obvious query on
the entire site.

### 3.3 The `de_compliance` document

This is the single most valuable column in the database and the reason a
German buyer uses this site instead of an American one. Store it as JSONB with
this exact shape:

```jsonc
{
  "gobd_konform":         true,
  "gobd_testat":          "Moore Stephens, 2023",   // auditor and year, or null
  "elster_schnittstelle": true,
  "datev_export":         true,
  "datev_schnittstelle":  false,
  "e_rechnung_empfang":   true,
  "e_rechnung_versand":   true,
  "zugferd_version":      "2.3",
  "xrechnung":            true,
  "ust_voranmeldung":     true,
  "euer":                 true,
  "bilanz":               false,
  "kleinunternehmer":     true,
  "lohnsteuer_anmeldung":  null,
  "sv_meldung":            null,
  "deuev":                 null,
  "eau":                   null,
  "dsgvo_avv":            true,
  "hosting_standort":     "Deutschland",
  "support_sprache_de":   true,
  "support_zeiten":       "Mo bis Fr, 8 bis 18 Uhr"
}
```

**Three states, and the distinction is legally and editorially load bearing:**

```
true   we confirmed the product does this
false  we confirmed the product does NOT do this
null   we have not verified it
```

`null` must never render as "no". A missing key means "not checked" and the
interface must say so. Treating unverified as absent would publish a false
statement about a named company, and receiving versus sending an E-Rechnung
have different statutory deadlines, which is why they are two separate keys
and never one.

Do not filter on these keys in SQL with the `->>` operator. A missing key and
a stored `false` compare identically as text, and that distinction is the
whole point. Read the document and branch in application code.

### 3.4 reviews

```sql
CREATE TABLE reviews (
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

  status  TEXT DEFAULT 'pending'
          CHECK (status IN ('pending','published','rejected')),
  is_seed BOOLEAN DEFAULT FALSE,

  submitter_ip_hash TEXT,      -- salted SHA-256, never the raw address
  created_at        TIMESTAMPTZ DEFAULT NOW()
);
```

Three details that matter:

* **`status` defaults to `pending`.** There is no automatic publication. This
  is the technical half of the § 5b Abs. 3 UWG disclosure the frontend makes.
* **`is_seed` marks fixtures.** Development sample reviews are flagged, the RLS
  policy refuses to serve them, and they are excluded from every rating
  calculation. Publishing generated text as a genuine customer review is a
  misleading commercial practice under § 5 UWG. Three independent layers keep
  that from happening by accident.
* **`submitter_ip_hash` is a salted one way hash.** The raw IP address is never
  written to the database. An unsalted SHA-256 of an IPv4 address is
  brute forceable in seconds, so the pepper is what makes this a genuine
  pseudonymisation measure rather than a gesture.

### 3.5 articles

```sql
CREATE TABLE articles (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL,
  excerpt             TEXT,
  content             TEXT NOT NULL,          -- sanitised rich text HTML
  featured_image_url  TEXT,
  category_tag        TEXT,
  related_software_id UUID REFERENCES software(id) ON DELETE SET NULL,

  author_name       TEXT NOT NULL,
  author_bio        TEXT,
  author_avatar_url TEXT,
  author_title      TEXT,

  meta_title       TEXT,
  meta_description TEXT,
  og_image_url     TEXT,

  read_time_minutes INT,
  status            TEXT DEFAULT 'draft'
                    CHECK (status IN ('published','draft')),
  featured          BOOLEAN DEFAULT FALSE,
  published_date    DATE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),

  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('german', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('german', coalesce(excerpt, '')), 'B')
  ) STORED
);
```

`author_name` is `NOT NULL` on purpose. Under § 18 Abs. 2 MStV editorial
content needs an identifiable responsible person. An article with no author is
not publishable.

### 3.6 comparisons

```sql
CREATE TABLE comparisons (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_a_id  UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
  software_b_id  UUID NOT NULL REFERENCES software(id) ON DELETE CASCADE,
  custom_verdict TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  status     TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT different_products CHECK (software_a_id <> software_b_id),
  CONSTRAINT unique_pair UNIQUE (software_a_id, software_b_id)
);
```

The route `/vergleich/[paar]` resolves any two published slugs on the fly. This
table exists only to store an editorial verdict for the pairs worth writing
one, so a comparison page never 404s just because no row exists.

### 3.7 Remaining tables

```sql
CREATE TABLE software_alternatives (
  software_id    UUID REFERENCES software(id) ON DELETE CASCADE,
  alternative_id UUID REFERENCES software(id) ON DELETE CASCADE,
  display_order  INT DEFAULT 0,
  PRIMARY KEY (software_id, alternative_id),
  CONSTRAINT not_self CHECK (software_id <> alternative_id)
);

CREATE TABLE pages (                    -- glossary, press, editable statics
  id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug    TEXT UNIQUE NOT NULL,
  title   TEXT NOT NULL,
  content TEXT NOT NULL,
  meta_title TEXT, meta_description TEXT,
  status  TEXT DEFAULT 'draft' CHECK (status IN ('published','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE site_settings (            -- key value, drives the imprint
  id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key   TEXT UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email  TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending'
         CHECK (status IN ('pending','confirmed','unsubscribed')),
  confirm_token   TEXT UNIQUE,
  confirmed_at    TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  source          TEXT,
  ip_hash         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_suppression (   -- survives a resubscribe attempt
  email      TEXT PRIMARY KEY,
  reason     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_messages (
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

CREATE TABLE consent_events (           -- § 25 TDDDG proof of consent
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consent_id TEXT NOT NULL,
  analytics  BOOLEAN NOT NULL,
  marketing  BOOLEAN NOT NULL,
  action     TEXT NOT NULL CHECK (action IN ('grant','deny','withdraw','update')),
  policy_version TEXT NOT NULL,
  ip_hash    TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE affiliate_clicks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  software_id UUID REFERENCES software(id) ON DELETE CASCADE,
  source_path TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE media_library (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_path  TEXT NOT NULL,
  alt_text   TEXT,
  width INT, height INT, size_bytes INT, mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE redirects (
  id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_path TEXT UNIQUE NOT NULL,
  to_path   TEXT NOT NULL,
  status_code INT DEFAULT 301,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id  UUID,
  action     TEXT NOT NULL,
  actor      TEXT,
  diff       JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. Functions and triggers

### 4.1 Ratings, computed and never written by hand

```sql
CREATE OR REPLACE FUNCTION update_software_ratings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE target UUID := COALESCE(NEW.software_id, OLD.software_id);
BEGIN
  UPDATE software s SET
    overall_rating = COALESCE((
      SELECT ROUND(AVG(r.overall_rating)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    ease_of_use_rating = COALESCE((
      SELECT ROUND(AVG(r.ease_of_use)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    value_for_money_rating = COALESCE((
      SELECT ROUND(AVG(r.value_for_money)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    customer_service_rating = COALESCE((
      SELECT ROUND(AVG(r.customer_service)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    functionality_rating = COALESCE((
      SELECT ROUND(AVG(r.functionality)::numeric, 1) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE), 0),
    review_count = (
      SELECT COUNT(*) FROM reviews r
      WHERE r.software_id = target
        AND r.status = 'published' AND r.is_seed = FALSE)
  WHERE s.id = target;
  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_reviews_ratings
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_software_ratings();
```

Note `AND r.is_seed = FALSE` in all six subqueries. This is the third and last
layer keeping fixtures out of a published grade. A grade must be an arithmetic
consequence of published, non fixture reviews and must not be settable by any
client, any admin form or any migration.

A product with zero published reviews keeps `overall_rating = 0`, and the
frontend renders a dash rather than a number. Never a guessed grade.

### 4.2 Category counts

```sql
CREATE OR REPLACE FUNCTION update_category_counts()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$
BEGIN
  UPDATE categories c SET software_count = (
    SELECT COUNT(*) FROM software s
    WHERE s.category_id = c.id AND s.status = 'published'
  ) WHERE c.id IN (NEW.category_id, OLD.category_id);
  RETURN NULL;
END; $$;

CREATE TRIGGER trg_software_category_counts
AFTER INSERT OR UPDATE OF category_id, status OR DELETE ON software
FOR EACH ROW EXECUTE FUNCTION update_category_counts();
```

### 4.3 Timestamps and audit

```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$;
```

Attach to `software`, `articles` and `pages`. Add a `log_audit()` trigger on
the same three tables writing the actor, the action and a JSONB diff into
`audit_log`. When a correction changes a price or a grade the site has to be
able to say when and by whom, which is an editorial policy commitment and not
just good engineering.

### 4.4 Retention, scheduled

```sql
CREATE OR REPLACE FUNCTION purge_expired_data()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$
BEGIN
  DELETE FROM contact_messages WHERE created_at < NOW() - INTERVAL '24 months';
  DELETE FROM consent_events   WHERE created_at < NOW() - INTERVAL '36 months';
  DELETE FROM affiliate_clicks WHERE created_at < NOW() - INTERVAL '14 months';
  DELETE FROM newsletter_subscribers
    WHERE status = 'pending' AND created_at < NOW() - INTERVAL '30 days';
END; $$;

SELECT cron.schedule('purge-expired', '15 3 * * *', 'SELECT purge_expired_data()');
```

The privacy policy states retention periods. This function is what makes those
statements true. A stated period with no mechanism behind it is a false
statement to a supervisory authority.

An unconfirmed double opt in record is deleted after 30 days, because an
address that never confirmed has no legal basis for storage.

---

## 5. Row Level Security

Enable on all sixteen tables, then grant narrowly.

```sql
ALTER TABLE software ENABLE ROW LEVEL SECURITY;
-- repeat for every table, without exception

-- Public content, read only, published only
CREATE POLICY "public reads published software" ON software
  FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE POLICY "public reads published articles" ON articles
  FOR SELECT TO anon, authenticated USING (status = 'published');

CREATE POLICY "public reads categories" ON categories
  FOR SELECT TO anon, authenticated USING (true);

-- Reviews: published AND not a fixture. Both halves matter.
CREATE POLICY "public reads real published reviews" ON reviews
  FOR SELECT TO anon, authenticated
  USING (status = 'published' AND is_seed = FALSE);

-- Submission: anyone may insert, but only as pending and never as a fixture.
CREATE POLICY "anyone may submit a review" ON reviews
  FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'pending' AND is_seed = FALSE);
```

That `WITH CHECK` is the important one. Without it a crafted PostgREST request
inserts a review with `status = 'published'` and it is live on the site
immediately, which defeats the entire human moderation promise.

Tables with **no public policy at all**, reachable only by the service role:
`contact_messages`, `consent_events`, `affiliate_clicks`, `audit_log`,
`newsletter_subscribers`, `newsletter_suppression`, `media_library`,
`redirects`, `site_settings` writes.

After writing the policies, verify with the anonymous key:

```
[ ] SELECT on a draft software row returns zero rows
[ ] SELECT on a pending review returns zero rows
[ ] SELECT on a seed review returns zero rows
[ ] SELECT on contact_messages returns zero rows
[ ] INSERT into reviews with status 'published' is rejected
[ ] UPDATE on software is rejected
```

If any of those six behaves differently, the policies are wrong. Test them
against the live anon key, not by reading the SQL.

---

## 6. Indexes

```sql
CREATE INDEX idx_software_status_rating ON software (status, overall_rating DESC);
CREATE INDEX idx_software_category      ON software (category_id) WHERE status = 'published';
CREATE INDEX idx_software_slug          ON software (slug);
CREATE INDEX idx_software_search        ON software USING GIN (search_vector);
CREATE INDEX idx_software_name_trgm     ON software USING GIN (name gin_trgm_ops);

CREATE INDEX idx_reviews_software       ON reviews (software_id, status, review_date DESC);
CREATE INDEX idx_reviews_moderation     ON reviews (status, created_at DESC) WHERE status = 'pending';

CREATE INDEX idx_articles_published     ON articles (status, published_date DESC);
CREATE INDEX idx_articles_search        ON articles USING GIN (search_vector);

CREATE INDEX idx_clicks_software_date   ON affiliate_clicks (software_id, created_at DESC);
```

The trigram index on `name` is what lets a visitor who types `lexware ofice`
still find Lexware Office. German product names are frequently misspelled by
people searching for them.

---

## 7. Search

One RPC, used by `/suche` and by the header search dialog.

```sql
CREATE OR REPLACE FUNCTION search_all(q TEXT, lim INT DEFAULT 20)
RETURNS TABLE (kind TEXT, id UUID, title TEXT, slug TEXT, snippet TEXT, rank REAL)
LANGUAGE sql STABLE AS $$
  SELECT 'software', s.id, s.name, s.slug, s.description_short,
         ts_rank(s.search_vector, websearch_to_tsquery('german', q))
  FROM software s
  WHERE s.status = 'published'
    AND (s.search_vector @@ websearch_to_tsquery('german', q)
         OR s.name % q)
  UNION ALL
  SELECT 'article', a.id, a.title, a.slug, a.excerpt,
         ts_rank(a.search_vector, websearch_to_tsquery('german', q))
  FROM articles a
  WHERE a.status = 'published'
    AND a.search_vector @@ websearch_to_tsquery('german', q)
  ORDER BY rank DESC
  LIMIT lim;
$$;
```

`websearch_to_tsquery` rather than `plainto_tsquery`, so a visitor can type a
quoted phrase or a minus sign and get what they expect. The `%` operator is
the trigram similarity fallback for misspellings.

---

## 8. Storage

Three buckets.

```
logos        public read      vendor marks, 200 KB limit, PNG and SVG
screenshots  public read      product screenshots, 1 MB limit, WebP and AVIF
articles     public read      article images, 1 MB limit, WebP and AVIF
```

No user uploaded avatars. Reviews render an initial in a circle instead. That
removes an entire moderation surface and an entire class of privacy problem
for one line of CSS.

Writes to all three buckets are service role only. Nothing in the browser ever
holds an upload credential.

---

## 9. Server actions and API routes

All mutations run server side. The browser never holds a write credential.

```
POST  review submission     validate, hash IP with pepper, insert as pending
POST  newsletter subscribe  double opt in, token, confirmation email
GET   newsletter confirm    consume token, set confirmed
GET   newsletter unsubscribe  one click, no login, writes suppression row
POST  contact               validate, honeypot, rate limit, store, notify
POST  consent               store the consent event, set the cookie
POST  affiliate click       record, then redirect
GET   search                calls search_all()
GET   og image              generated social card
```

Every one of them:

* validates input server side with a schema, never trusting the client
* checks a honeypot field on public forms
* rate limits by hashed IP
* hashes the IP with the pepper from the environment, never storing it raw
* returns a German error message the interface can show directly

**Double opt in is mandatory.** A single opt in newsletter is unlawful in
Germany and the confirmation record is the evidence you need if a subscriber
later disputes it. Store the confirmation timestamp.

---

## 10. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL          project URL, public
NEXT_PUBLIC_SUPABASE_ANON_KEY     anon key, public, RLS constrained
SUPABASE_SERVICE_ROLE_KEY         SECRET, server only, never NEXT_PUBLIC_
SUPABASE_DB_PASSWORD              SECRET, migrations only
NEXT_PUBLIC_SITE_URL              canonical origin, https, no trailing slash
IP_HASH_SALT                      SECRET pepper for IP hashing, rotate yearly
RESEND_API_KEY                    SECRET, transactional email
ADMIN_NOTIFY_EMAIL                where new submissions are announced
```

Commit a `.env.local.example` with every key present and every value blank.
Add `.env.local` and `.env*.local` to `.gitignore` before the first commit, not
after. A service role key in a public repository is a full database compromise
and rewriting history does not un publish it.

---

## 11. Admin

Supabase Auth, email and password, no public sign up. Create admin users by
hand in the dashboard.

```
/admin/anmelden      login
/admin               dashboard, pending reviews, recent messages
/admin/bewertungen   moderation queue: approve, reject, respond
```

Route protection in middleware. Every admin mutation writes to `audit_log`.
The moderation view shows the reviewer context, the submission timestamp, and
whether another review already exists from the same IP hash for the same
product.

---

## 12. Seeding

Seed enough to develop against, and mark all of it.

```
8 categories
30 to 40 real German market products with genuine public data
   Lexware Office, DATEV Unternehmen online, sevDesk, Sage 50, WISO MeinBüro,
   Personio, QuickBooks, Xero, weclapp, CentralStationCRM, awork, factro
15 articles
200 reviews, every one with is_seed = TRUE
```

Every fixture review carries `is_seed = TRUE`. Fixtures are hidden by RLS,
excluded from ratings by the trigger, and revealed locally only through an
explicit development flag that is forced off whenever `NODE_ENV` is
production.

Software rows may hold real public information: names, vendor sites, published
list prices with the date checked. Reviews may not be invented and presented
as genuine. That is the line, and it is § 5 UWG rather than a matter of taste.

---

## 13. Definition of done

```
[ ] Project created in Frankfurt or another EU region
[ ] All 16 tables created with the columns above
[ ] RLS enabled on all 16, verified with the anon key, all six checks pass
[ ] Ratings trigger fires on insert, update and delete, excludes seed rows
[ ] Category counts update when software is published or unpublished
[ ] purge_expired_data scheduled and the schedule verified in cron.job
[ ] German FTS configuration confirmed: "Buchhaltung" matches
    "Buchhaltungssoftware"
[ ] Trigram fallback confirmed: "lexware ofice" finds Lexware Office
[ ] All indexes present, EXPLAIN shows index scans not sequential scans
[ ] Three storage buckets created with size and MIME limits
[ ] Service role key absent from every client bundle. Grep the build output.
[ ] .env.local gitignored before the first commit
[ ] Double opt in works end to end including the confirmation record
[ ] Unsubscribe works in one click with no login
[ ] IP addresses never stored raw anywhere. Grep the schema for "ip" and
    confirm every hit is a hash column.
[ ] Seed data loaded, every seed review flagged, zero seed rows served to anon
[ ] A product with zero published reviews reports overall_rating = 0 and the
    frontend renders a dash
```

That last check is the one people skip. A review site that invents a grade for
a product nobody reviewed has broken the only promise it makes.
