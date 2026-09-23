# Backend

Supabase Postgres in `eu-central-1` (Frankfurt), reached from Next.js server
components and server actions. Nothing in the browser holds a write credential.

The region is a legal decision, not a performance one: personal data from German
visitors stays in the EU, so there is no third country transfer to disclose and
defend in the privacy policy.

---

## Setup

```bash
npm install
cp .env.local.example .env.local     # fill in the values
npm run seed                          # load the editorial data
npm run verify:rls                    # prove the policies actually hold
npm run dev
```

Migrations are plain SQL under `supabase/migrations/`, numbered and applied in
order. They are idempotent: re-running them is safe.

### Environment

| Variable | Secret | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | no | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | no | Anon key, RLS constrained |
| `SUPABASE_SERVICE_ROLE_KEY` | **yes** | Server only. Never `NEXT_PUBLIC_` |
| `SUPABASE_DB_PASSWORD` | **yes** | Migrations only |
| `NEXT_PUBLIC_SITE_URL` | no | Canonical origin, no trailing slash |
| `IP_HASH_SALT` | **yes** | Pepper for IP hashing. Rotate yearly |
| `RESEND_API_KEY` | **yes** | Transactional email |
| `ADMIN_NOTIFY_EMAIL` | no | Where new submissions are announced |
| `ADMIN_EMAILS` | no | Comma separated allowlist for `/admin` |
| `MAIL_FROM` | no | From address for transactional mail |

`.env`, `.env.local` and `.env*.local` are gitignored. A service role key in a
public repository is a full database compromise, and rewriting history does not
un-publish it.

---

## The three rules

**Row Level Security is on for all sixteen tables.** A table with RLS off is a
public table, whatever the client code does. `npm run verify:rls` runs the six
required checks plus a dozen more against the live anon key, because a policy
that looks right and behaves wrong is exactly what that script is for.

**Grades are written by triggers, never by application code.** If an app can
write a rating, an app can fake a rating. `update_software_ratings()` owns the
six rating columns on `software`; nothing else writes them, not even the seed.

**No raw IP address is ever stored.** Only salted SHA-256, in columns named
`ip_hash` or `submitter_ip_hash`. An unsalted hash of an IPv4 address is
brute forceable in seconds, so the pepper is what makes this a pseudonymisation
measure rather than a gesture.

---

## Where things live

```
supabase/migrations/     schema, policies, functions, indexes
scripts/seed.ts          loads src/data into Supabase, idempotent
scripts/verify-rls.ts    RLS, search and retention checks against the anon key
scripts/create-admin.ts  creates an editorial account

src/lib/supabase/clients.ts  publicClient() and adminClient()
src/lib/supabase/auth.ts     admin session, allowlist
src/lib/queries.ts           every read the public site makes
src/lib/admin-queries.ts     reads for the moderation queue
src/lib/mappers.ts           PostgREST rows to domain objects
src/lib/security.ts          IP hashing, rate limiting, honeypot
src/lib/validation.ts        Zod schemas with German messages
src/lib/email.ts             Resend, with an honest failure mode

src/app/actions.ts           public mutations
src/app/admin/actions.ts     moderation mutations
src/app/go/[slug]/route.ts   affiliate click, then redirect
src/app/api/suche/route.ts   search over HTTP
src/proxy.ts                 /admin route protection
```

### Two clients, and the difference is the security model

`publicClient()` uses the anon key, so RLS decides what it can see. It serves
every page. `adminClient()` uses the service role key, bypasses RLS, and is used
only inside server actions and route handlers that have already validated their
input.

Reaching for `adminClient()` because a query "did not work" is how a review site
starts serving draft rows. If a read fails under the anon key, the policy is
wrong; fix the policy.

---

## Things that are not obvious

### German full text search does not split compounds

The `german` configuration uses the Snowball stemmer. Measured on this database:

```
to_tsvector('german', 'Buchhaltungssoftware')  ->  'buchhaltungssoftwar'
websearch_to_tsquery('german', 'Buchhaltung')  ->  'buchhalt'
```

Those do not match, so the plain stemmed query returns nothing for the most
obvious search on the entire site. `german_prefix_query()` widens the stemmed
query into a prefix query, which does match. A quoted phrase or a minus sign
switches the widening off, because those are explicit instructions and widening
them would reintroduce the rows the visitor just excluded.

Stemming still does what it is good at: "Rechnungen" and "Rechnung" both stem to
`rechnung` and match without any of this. The trigram index on `name` handles
the other case, so `lexware ofice` still finds Lexware Office.

### `de_compliance` has three states, not two

```
true   we confirmed the product does this
false  we confirmed the product does NOT do this
null   we have not verified it
```

A `null` must never render as "no". Filtering these keys in SQL with `->>` is
forbidden: a missing key and a stored `false` compare identically as text, and
that distinction is the whole point of the column. The filtering happens in
`getSoftwareList()`, in application code, where the three states survive.

### Fixture reviews are kept out of published grades by three layers

`src/data/reviews.ts` holds development fixtures, not customer statements.
Publishing invented text as a genuine review is a misleading commercial practice
under § 5 UWG, so:

1. the RLS policy refuses to serve a row with `is_seed = true` to the anon key,
2. `update_software_ratings()` excludes them from all six averages,
3. `SHOW_SEED_REVIEWS` is forced off in production and no environment variable
   can turn it back on there.

In development the fixtures are read through the service role so the interface
can be worked on, and every screen that shows them says so.

A product with no published, non fixture review reports `overall_rating = 0` and
the interface renders a dash. Never a guessed grade.

### Trigger functions were public endpoints by default

Postgres grants `EXECUTE` to `PUBLIC` on a new function, and Supabase exposes
every function in the `public` schema at `/rest/v1/rpc/<name>`. That made
`purge_expired_data()` — which deletes rows and runs as its owner — callable by
anyone with the anon key. `0011_lock_down_functions.sql` revokes it. Anything
added later needs the same treatment; the Supabase database linter catches it.

### Retention is a mechanism, not a promise

The privacy policy states retention periods, and `purge_expired_data()` is what
makes those statements true. It runs nightly at 03:15 via `pg_cron`
(`SELECT * FROM cron.job`) and deletes contact messages after 24 months, consent
records after 36, affiliate clicks after 14, and unconfirmed newsletter
signups after 30 days — an address that never confirmed has no legal basis for
storage.

### Double opt in refuses rather than pretends

If `RESEND_API_KEY` is missing in production, `subscribeNewsletterAction`
declines the subscription instead of storing an address it could never confirm.
If the confirmation mail fails to send, the pending row is removed again, because
telling someone to check their inbox for a mail that was never sent is a lie.
In development an unconfigured provider prints the confirmation link to the
console so the flow can be walked end to end.

---

## Admin

There is no public sign up. Create an account, then switch sign ups off in the
Supabase dashboard under Authentication:

```bash
npm run admin:create -- redaktion@example.de
```

Then set `ADMIN_EMAILS` to that address. It is a second lock in front of the
dashboard setting, so a mistakenly enabled sign up does not hand anyone the
moderation queue.

Protection is in three places, and that is deliberate: `src/proxy.ts` redirects,
every admin page re-checks the session, and every admin mutation checks it again
before it writes. A server action is a callable endpoint in its own right and is
not protected by whatever guarded the page that rendered the button.

Moderation goes through `moderate_review()`, which sets the acting editor's
address so the audit trigger records a person rather than the connection pool.

---

## Known deviations from `02_BACKEND_PROMPT.md`

**The glossary is not a database table.** It is editorial reference text with no
personal data, no moderation queue and no aggregate to maintain, so it stays in
`src/data/glossary.ts` where it can be reviewed in a diff. `search()` merges
glossary matches with the `search_all()` results.

**41 fixture reviews, not 200.** That is what `src/data/reviews.ts` contains.
Generating another 159 would add rows that are hidden by RLS, excluded from every
grade and never shown as genuine — volume without information.

**`articles.content` holds JSON, not HTML.** The renderer walks structured
blocks and never calls `dangerouslySetInnerHTML`, so there is no HTML sanitising
surface to get wrong.

**`software.description_full` holds paragraphs separated by a blank line.** The
mapper splits them back into the array the interface renders as text.

**Extra columns exist beyond the specified list**, where the finished frontend
needs them: `software.verdict`, `faq`, `trial_days`, `promotion`, `demo`;
`articles.featured_image_alt`, `related_software_slugs`, `updated_date`;
`comparisons.headline`, `differences`, `take_a`, `take_b`;
`reviews.submitter_email`, `moderation_note`, `moderated_at`, `moderated_by`;
`newsletter_subscribers.unsubscribe_token`.
