# Build Prompt 1 of 2: Frontend, Homepage and All Pages

You are a senior frontend engineer and art director. Build a complete German
language website for independent testing and comparison of business software.
The audience is German companies choosing accounting, payroll, HR, CRM and ERP
software. Read this document fully before writing code. Every rule here is a
requirement, not a suggestion.

---

## 1. What the product is

A German editorial review platform. Not a SaaS marketing site. Not a directory
scraper. It publishes:

* **Software profiles** with verified prices, feature coverage and grades
* **Verified user reviews** with reviewer context
* **Head to head comparisons** between two products
* **Long form guides and articles** on buying and switching software

The whole promise is verifiability. The design must feel like a serious
financial publication: sober, dense, precise, quiet. Think of the way a bank
annual report or a broker research note is set. Not a startup landing page.

---

## 2. Hard constraints, non negotiable

These override anything else in this document and any instinct you have.

### 2.1 No gradients, anywhere

Forbidden everywhere in the codebase:

* `linear-gradient`, `radial-gradient`, `conic-gradient`
* gradient text fills, gradient borders, gradient shadows
* gradient mask fades on scrollers
* image overlays that fade from one opacity to another

Use instead: one flat colour, one flat tint, or a hairline rule. Where an
overflow scroller needs an edge signal, use a hard 1px vertical rule at the
boundary or clip cleanly. Where a photo needs text on it, lay a single flat
scrim of one fixed opacity across the whole image, not a fade.

### 2.2 No pill shapes

The header is not a floating capsule. Buttons are not capsules.

```
Radius scale, the only allowed values
  --radius-xs:  4px   inputs, chips, small controls
  --radius-sm:  6px   buttons
  --radius-md:  8px   cards, panels
  --radius-lg: 12px   large panels, media frames
```

`border-radius: 9999px` is forbidden on buttons, tabs, navigation and headers.
It is allowed only on a genuine circle: an avatar, a status dot, a numbered
step marker. Nothing else.

The header is a full width bar, flush to the viewport edges, separated from
the page by a single 1px bottom rule. It does not float, it does not shrink
into a capsule on scroll, it has no rounded corners.

### 2.3 Typography, exact stack

```
Display and headings   Inter Tight
Body and interface     Inter
Numerals and data      Inter with font-variant-numeric: tabular-nums
```

**About Google Sans.** You asked for Google Sans. It is Google proprietary, it
is not published on Google Fonts, and it is not licensed for use on third
party websites. Shipping it would be a licensing violation. Inter Tight is the
closest legitimate match for its geometry and is what this build uses. If you
later license a commercial equivalent, swap it at the `--font-display` token
and nothing else in the system changes.

Load with `next/font/google`, subsets `latin` and `latin-ext`. The `latin-ext`
subset is mandatory or umlauts fall back to a system font in the middle of a
word.

Weights, and never heavier:

```
Display 1  clamp(2.75rem, 6vw, 4.75rem)   weight 600  tracking -0.035em  leading 1.02
Display 2  clamp(1.9rem, 3.2vw, 2.9rem)   weight 600  tracking -0.028em  leading 1.08
Heading 3  clamp(1.3rem, 1.8vw, 1.55rem)  weight 600  tracking -0.02em   leading 1.2
Lede       17px    weight 400  leading 1.65
Body       15.5px  weight 400  leading 1.7
Small      13.5px  weight 400  leading 1.6
Micro      11px    weight 500  uppercase  tracking 0.16em
```

Never use weight 700, 800 or 900. At display sizes a heavy weight reads dated
and cheap. Size creates hierarchy, weight does not.

### 2.4 No dashes as punctuation

Do not use the em dash or the en dash anywhere in visible copy. Not in
headings, body, captions, buttons, alt text or meta descriptions.

Rewrite instead:

```
WRONG   Der Preis gilt pro Monat, zzgl. MwSt. — und ohne Mindestlaufzeit.
RIGHT   Der Preis gilt pro Monat, zzgl. MwSt., und ohne Mindestlaufzeit.

WRONG   Vier Dimensionen — Bedienung, Preis, Service, Funktionsumfang.
RIGHT   Vier Dimensionen: Bedienung, Preis, Service und Funktionsumfang.
```

Use a comma, a colon, a semicolon, a full stop, or the middle dot for
separating short meta items.

**Critical exception.** The hyphen inside a German compound noun is mandatory
spelling, not punctuation. These stay exactly as they are:

```
E-Rechnung            DATEV-Schnittstelle         Preis-Leistungs-Verhältnis
ELSTER-Übermittlung   Umsatzsteuer-Voranmeldung   GoBD-Testat
DSGVO-konform         Single-Sign-on              SV-Meldung
```

Removing those hyphens produces wrong German. The rule bans the long dash as a
punctuation mark. It does not ban German orthography.

### 2.5 Icons

One custom icon set, drawn in house, checked into the repository as React
components. No icon font, no emoji, no third party pack dropped in raw.

House rules, no exceptions:

```
Grid           24 x 24, geometry snapped to half pixels
Style          stroke only, never filled
Colour         stroke="currentColor", inherits from the parent
Stroke width   1.5
Caps and joins round
Background     none, ever. No circle behind it, no tinted square,
               no rounded plate, no coloured chip
Meaning        one literal object drawn from the noun it labels
```

An icon for a review is a speech bubble with a check inside it. An icon for a
price is a euro sign. An icon for a document is a document. Nothing abstract,
nothing decorative. No sparkles, no lightning bolts, no rockets, no gears
standing in for "features", no shields standing in for "trust".

If you cannot draw a literal object for a label, that label gets no icon. A
missing icon is always better than a meaningless one.

Sizes: 16px inline in text, 18px in list rows, 20px in buttons, 24px
standalone. Never larger than 24px. If a large graphic is needed, use a real
photograph or a commissioned illustration, not an inflated icon.

---

## 3. Colour, the German palette

Built from the federal flag. Black is the ink, red is the single accent, gold
appears rarely and never as text.

```css
:root {
  /* Ink, from flag black. Not pure #000, which sits harsh on a screen. */
  --ink:          #101014;   /* headings, primary text            */
  --ink-2:        #3F3F46;   /* body text                         */
  --ink-3:        #71717A;   /* secondary text, captions          */
  --ink-4:        #A1A1AA;   /* meta, disabled, placeholders      */

  /* Paper */
  --paper:        #FFFFFF;   /* page ground                       */
  --paper-2:      #F7F6F4;   /* panels, quiet sections            */
  --paper-3:      #EFEEEB;   /* nested fills                      */

  /* Rules */
  --rule:         #E4E4E7;   /* hairlines, card borders           */
  --rule-strong:  #101014;   /* active row, emphasis rule         */

  /* Accent, from flag red. Deepened for print weight on white. */
  --red:          #C0102A;   /* links, active state, one CTA      */
  --red-hover:    #9E0C22;
  --red-tint:     #FBEEF0;   /* flat tint fill only               */

  /* Gold, from flag gold. Decoration and data only. */
  --gold:         #C89B26;   /* star ratings, award marks         */
  --gold-tint:    #FAF3E2;

  /* Data signals, charts and verdicts only */
  --positive:     #1E6B4F;
  --negative:     #A3231B;
  --neutral:      #A1A1AA;
}
```

Measured contrast, and the rules that follow from it:

```
--red on white          6.27:1   passes AA for body text. Safe for links.
white on --red          6.27:1   passes. Safe for a filled button.
--gold on white         2.58:1   FAILS. Gold is never text and never a link.
--ink on --gold         7.20:1   passes. A gold fill carries black ink only.
--ink on white         18.10:1   the default for everything.
```

Usage discipline. This is what makes it read as finance rather than as a
template:

* Red appears **at most three times per screen**. One link cluster, one active
  nav item, one primary button. If a fourth red thing appears, one of the
  others was not important.
* Gold appears only in star ratings and an award mark. Never in navigation,
  never in a button, never as text.
* Everything else is ink, paper and hairlines. The page should read almost
  black and white at a glance, with red arriving only where a decision is.

Dark mode: build the tokens, ship it switched off. The site renders light
regardless of the operating system setting, because a review page dense with
tables and charts art directed for white does not survive a naive inversion.
Set `color-scheme: light` on `:root`.

---

## 4. Layout and spacing

```
Container      max-width 1280px, side padding 16 / 32 / 48px at sm / md / lg
Grid           12 columns, 24px gutter at lg, 16px below
Section rhythm 56px mobile, 80px tablet, 96px desktop vertical padding
Section divide one 1px --rule hairline, full container width, never a shadow
```

**Every section is separated by a hairline, never by a shadow and never by
whitespace alone.** Shadows appear in exactly two places: something genuinely
floating above the page (dropdown, modal, sticky bar) and the hover state of
an interactive card. Resting cards carry a 1px border.

```css
/* the only two shadows in the system */
--shadow-lift:  0 1px 2px rgba(16,16,20,.04), 0 8px 24px -12px rgba(16,16,20,.12);
--shadow-over:  0 2px 4px rgba(16,16,20,.06), 0 16px 40px -16px rgba(16,16,20,.22);
```

Motion: 200ms for colour and border, 300ms for transform, easing
`cubic-bezier(0.22, 1, 0.36, 1)`. No parallax. No scroll hijacking. No pinned
sections. No animation that moves content the reader is trying to read.
Everything inside `@media (prefers-reduced-motion: no-preference)` with a
reduce block that switches it off.

---

## 5. Tech stack

```
Next.js 15 or 16, App Router, TypeScript strict
Tailwind CSS v4, tokens declared in @theme
Server Components by default. "use client" only for real interactivity.
next/font/google for Inter and Inter Tight
next/image for every raster image, no bare <img>
Supabase as the data layer, read through one query module
```

Rules:

* No component library dropped in whole. Build the primitives you need.
* No runtime CSS in JS. Tailwind utilities plus a small `@layer components`
  block for repeated patterns.
* No client side fetching for content. Pages are server rendered with
  `export const revalidate = 3600`.
* `<html lang="de-DE">`. Required, or German hyphenation never activates.

German typesetting, put this in the global stylesheet:

```css
p, li, dd, figcaption, blockquote {
  hyphens: auto;          /* needs lang="de-DE" to do anything at all */
  overflow-wrap: break-word;
}
```

German runs 15 to 25 percent longer than English and the excess sits in
unbreakable compounds like `Lohnabrechnungssoftware` and
`Auftragsverarbeitungsvertrag`. One of those in a 170px footer column pushes
the whole document sideways. Test every layout with the longest real compound,
never with lorem ipsum.

---

## 6. Component inventory

Build these. Nothing else is needed and anything extra is scope creep.

**Primitives**

`Button` (primary, secondary, quiet, destructive; sizes sm, md, lg; radius 6px)
`Link` (inline, underlined, red)
`Input`, `Textarea`, `Select`, `Checkbox`, `Radio` (radius 4px, 1px border,
label always visible above the field, a placeholder is never a label)
`Card` (1px border, radius 8px, no shadow at rest)
`Badge` (radius 4px, flat tint, never a pill)
`Table` (hairline rows, tabular numerals, sticky header)
`Icon` (the 24 grid set described above)

**Composed**

`Header` (full width bar, hairline bottom, wordmark left, nav, search trigger;
no capsule, no blur, no shrink on scroll)
`Footer` (six link columns, operator line, legal bottom bar)
`SearchBar` and `SearchDialog` (command palette style, German full text)
`SoftwareCard`, `SoftwareRow`, `SoftwareLogo`
`StarRating` (gold, `aria-label` carries the numeric value, never colour alone)
`RatingBar`, `SentimentBar`, `ScorePlate`
`ReviewCard`, `ReviewForm`, `ReviewFilters`
`ComparisonTable`, `ComparisonSelector`
`ArticleCard`, `ArticleBody`
`PricingTable` (tiers as columns, middle tier emphasised with ink, never with
a gradient and never with a pill badge)
`FaqAccordion`
`Breadcrumb` (with BreadcrumbList JSON-LD)
`ConsentBanner`
`NewsletterForm`
`Pagination`

---

## 7. Pages, complete route map

Build every one of these. German URLs throughout, because English slugs on a
German site read as a translation.

### Marketing and index

```
/                                 Homepage
/software                         Directory, filter and sort
/software/[slug]                  Product profile
/software/[slug]/bewertungen      All reviews for a product, filterable
/software/[slug]/bewertungen/neu  Submit a review
/software/[slug]/alternativen     Alternatives to a product
/kategorien                       All categories
/kategorie/[slug]                 One category, ranked list
/vergleich                        Comparison hub, pick any two
/vergleich/[paar]                 Head to head, slug form "a-vs-b"
/ratgeber                         Article index
/ratgeber/[slug]                  Article
/glossar                          Glossary of German software and tax terms
/suche                            Search results
/e-rechnung                       Topic hub for the E-Rechnung obligation
```

### Company and trust

```
/ueber-uns                Who runs it, how it is funded
/redaktionsrichtlinien    Editorial policy, how grades are produced
/affiliate-hinweis        Advertising disclosure
/kontakt                  Contact
/presse                   Press
/software-eintragen       For vendors, listing criteria
/newsletter               Newsletter sign up
/newsletter/abmelden      Unsubscribe
```

### Legal, all mandatory in Germany

```
/impressum                Provider identification, § 5 DDG
/datenschutz              Privacy policy, Art. 13 DSGVO
/cookie-richtlinie        Cookie policy
/nutzungsbedingungen      Terms of use
/barrierefreiheit         Accessibility statement, BFSG
```

### System

```
/sitemap.xml   /robots.txt   /api/og   404   500
```

---

## 8. Homepage, section by section

The most important page on the site. Build it in exactly this order. Every
section is separated from the next by a hairline.

**1. Header.** Full width bar. Wordmark left. Primary nav: Software,
Kategorien, Vergleich, Ratgeber, E-Rechnung. Search trigger and a quiet
"Software eintragen" action right. One hairline bottom rule. On scroll the bar
does not change shape, it only gains the rule.

**2. Hero.** Left aligned, not centred. Centred heroes read as a template.

```
Micro label    UNABHÄNGIG GEPRÜFT
Display 1      Unternehmenssoftware, geprüft für den deutschen Mittelstand
Lede           One sentence, maximum 30 words, naming GoBD, DATEV, ELSTER and
               the E-Rechnungspflicht. Those four words tell a German buyer
               instantly that the site knows the market.
Search field   Full width up to 640px, 6px radius, 1px border
Popular chips  Five category shortcuts, radius 4px, never pills
```

No hero image. A photograph here would be decoration. The first thing on the
page should be the search field, because that is what the visitor came for.

**3. Trust rail.** Three figures side by side, separated by vertical
hairlines. Real counts from the database: verified reviews, listed programmes,
years active. Tabular numerals. One literal bare icon each.

**4. Category grid.** Every category with its live software count. Three
columns at desktop, one at mobile. Each cell is a hairline bordered card with
the category name, the count and one line of plain description.

**5. Top rated.** Four product cards. Logo, name, one line of positioning, the
grade with stars, the review count, the starting price in euro with the VAT
note. The whole card links to the profile.

**6. Comparison teaser.** Two select fields and a button. Pick two products,
go to the head to head. The only interactive block in the upper half.

**7. Recently checked.** Four products whose prices or grades were verified
most recently, each showing its verification date. This section is what proves
the site is maintained rather than abandoned.

**8. Guides.** Four article cards. Image, category tag, title, reading time.

**9. Review wall.** Real published reviews, three columns, each card carrying
the product it is about, the grade, the quote, and the reviewer's role and
company size. Static, not a carousel. A wall reads as evidence, a carousel
reads as marketing.

**10. Method.** How a grade is produced, four numbered steps on hairline rows.
This is the section that earns the site its authority. Link to the full
editorial policy.

**11. Newsletter.** One field, one button, one line of legal text linking to
the privacy policy.

**12. Footer.** Six columns: Entdecken, Unternehmen, Kategorien, Beliebt,
Vergleich, Rechtliches. Then the operator line naming the legal entity and
address, then the bottom bar with Impressum and cookie settings.

---

## 9. Key page specifications

### Software profile, `/software/[slug]`

Two columns at desktop, 8 and 4. Sticky right rail.

```
Left column
  Breadcrumb
  Product head: logo, name, tagline, category link, grade, review count
  Verdict box: three sentences on who it is for
  Screenshots
  Long description, editorial, never vendor copy pasted in
  Feature coverage, grouped, check or dash
  German compliance panel, the most valuable block on the page:
    GoBD, GoBD-Testat with auditor and year, ELSTER, DATEV export,
    DATEV interface, E-Rechnung receive, E-Rechnung send, ZUGFeRD version,
    XRechnung, hosting location, AVV, German language support.
    A blank cell means "we could not confirm this", never "it cannot do
    this". Say exactly that in a footnote under the table.
  Rating breakdown, four dimensions with bars
  Reviews, first five, then a link to all
  Alternatives
  FAQ with FAQPage JSON-LD

Right rail, sticky
  Score plate: grade over 5, stars, review count, sentiment bar
  Price plate: starting price, VAT note, verification date, free trial yes
    or no, free version yes or no, vendor, founded, category, languages
  Compliance chips
  Primary action to the vendor, with the advertising disclosure ABOVE it,
    never below it
  Secondary action to a comparison
```

### Comparison, `/vergleich/[paar]`

```
Head        Both products, logos, grades, entry prices side by side
Jump nav    Sticky, hairline bottom
Overview    The three differences that actually decide it
Ratings     Four dimensions, both products, one row each
Features    Full ledger, both columns, check or dash
Compliance  Same ledger form, German obligations
Pricing     Tabs by product, tiers as cards, middle tier in ink
Verdict     Two boxes: "Nehmen Sie A, wenn" and "Nehmen Sie B, wenn"
```

Tier matching honesty: tiers are matched by position in each vendor's own line
up, not by capability. State that in a footnote. An entry tier from one vendor
may cover more than the other's.

### Article, `/ratgeber/[slug]`

Single column, 680px measure. Article JSON-LD. Author block with a real name,
role and one line of background. Reading time computed from word count. Table
of contents for anything over 1200 words. In article product blocks styled as
bordered cards, never as advertisement units.

### Review submission, `/software/[slug]/bewertungen/neu`

Required: name, email, job title, company size, industry, usage duration,
overall grade, four dimension grades, title, summary, pros, cons. Honeypot
field. Salted IP hash for duplicate detection, never the raw address. A clear
statement that a person reads the review before it is published.

---

## 10. German content, the part that decides whether this looks real

The hardest requirement and the one most builds fail. Copy that reads as
machine written destroys the credibility the entire design exists to project.

### 10.1 Banned words and constructions

Never use these. They are the fingerprints of generated marketing German.

```
revolutionär       nahtlos            ganzheitlich       maßgeschneidert
innovativ          zukunftssicher     leistungsstark     benutzerfreundlich
intuitiv           State of the Art   Game Changer       Lösung für alles
Wir bei X glauben  In der heutigen schnelllebigen Geschäftswelt
Tauchen Sie ein    Entfesseln Sie     Heben Sie ... auf das nächste Level
Es ist wichtig zu beachten, dass      Zusammenfassend lässt sich sagen
```

Also banned as structure:

* The rule of three in every sentence. Real writing does not arrive in triads.
* `nicht nur ..., sondern auch ...` more than once per page.
* Every paragraph the same length. Vary between one and six sentences.
* Opening a section by restating its own heading.
* Closing a section with a summary of that section.
* Rhetorical questions used as headings.

### 10.2 What real German trade writing does instead

* **Names things.** Not "eine bekannte Buchhaltungssoftware" but "DATEV
  Unternehmen online". Not "gesetzliche Vorgaben" but "§ 14 UStG".
* **Carries numbers with provenance.** Not "günstige Preise" but "ab 16,90 EUR
  pro Monat, zzgl. 19 % MwSt., geprüft am 14.08.2026".
* **Admits limits.** "Wir konnten nicht bestätigen, ob der Export den
  DATEV-Standard in der Fassung von 2025 erfüllt." This one habit does more
  for credibility than any amount of confident prose.
* **Uses trade vocabulary correctly.** Umsatzsteuervoranmeldung, EÜR gegen
  Bilanz, Kleinunternehmerregelung, Lohnsteueranmeldung, SV-Meldung,
  Buchungssatz, Kontenrahmen SKR03 und SKR04, Wirtschaftsprüfer,
  Steuerberater, Betriebsprüfung.
* **Puts short sentences next to long ones.** German trade press does this
  constantly. Generated text almost never does.
* **Addresses the reader as Sie**, consistently. Never du, never mixed.

### 10.3 German formatting, get this exactly right

```
Decimal separator    comma             4,6 and never 4.6
Thousands separator  period            12.193 and never 12,193
Currency             symbol trails     16,90 EUR, non breaking space before it
Date                 14.08.2026, or 14. August 2026. Never 08/14/2026.
Percent              19 % with a space, because a percent is a unit
Quotation marks      German low high, opening mark sits on the baseline
Time                 14:30 Uhr
VAT default          zzgl. 19 % MwSt., because German B2B quotes net
```

Use `Intl.NumberFormat("de-DE")` for every number the interface renders. Never
hand format. Getting the separators backwards changes the number a reader sees
by three orders of magnitude.

### 10.4 Voice

Write as a small independent editorial team that checks things itself and says
so. Confident about what it verified, explicit about what it did not. Never
enthusiastic. Never salesy. The register of a Stiftung Warentest report or a
Handelsblatt product piece, not of a vendor blog.

Example of the right register:

```
Sage 50 richtet sich an Betriebe, die ihre Buchhaltung im eigenen Haus führen
und dabei einen Fachhändler an der Seite haben. Die Software läuft lokal, nicht
im Browser. Für Unternehmen mit eigener IT ist das ein Vorteil. Für alle
anderen ist es der Hauptgrund, sich etwas anderes anzusehen.

Den Preis nennt Sage auf Anfrage. Die von uns am 14.08.2026 geprüften
Listenkonditionen beginnen bei 31,90 EUR pro Monat und Arbeitsplatz, zzgl.
19 % MwSt. Ein GoBD-Testat liegt vor, ausgestellt von der Wirtschaftsprüfung
Moore Stephens im Jahr 2023.
```

Note what that does: names the product, states a limitation plainly, gives a
number with a date, names the auditor. No adjective is doing work that a fact
should be doing.

---

## 11. Accessibility

Target WCAG 2.2 AA. Germany's BFSG applies from June 2025 and a public
accessibility statement is required, which is why `/barrierefreiheit` is in
the route map.

* Every interactive element reachable and operable by keyboard
* Visible focus ring, 2px `--red`, 2px offset. Never `outline: none`.
* One `<h1>` per page, heading levels never skipped
* Every form field has a visible `<label>`. A placeholder is not a label.
* Colour never carries meaning alone. A grade has stars **and** a number. A
  sentiment bar has colour **and** a written percentage. A check icon carries
  an `sr-only` word beside it.
* Tap targets 44px minimum
* Decorative images `alt=""`, meaningful images described
* Tables use `<th scope>` and a `<caption>`
* Test at 200 percent zoom and with a screen reader

---

## 12. Performance and SEO

```
LCP   under 2.0s    no hero image, so this is the display heading
CLS   under 0.05    every image has width and height, or fill inside a sized box
INP   under 200ms   almost everything is a Server Component
```

* `next/image` with explicit `sizes`, AVIF ahead of WebP
* Fonts self hosted through `next/font`, `display: swap`
* Metadata per page, canonical on every route, OG image via `/api/og`
* JSON-LD: `Organization` site wide, `BreadcrumbList` on every page,
  `SoftwareApplication` with `AggregateRating` on profiles that actually have
  reviews, `Article` on guides, `FAQPage` where an FAQ exists
* **Never emit `AggregateRating` for a product with zero reviews.** Google
  treats invented aggregate ratings as structured data spam, and it is false.
* `sitemap.xml` generated from the database, never hand written
* `hreflang="de-DE"`, single locale, no language switcher

---

## 13. Legal blocks that must exist

Germany is strict and none of these are optional.

* **Impressum**, § 5 DDG. Name of the natural person or company, address,
  email, phone, and where applicable the VAT ID under § 27a UStG. Reachable
  from every page in one click and labelled exactly "Impressum".
* **Editorial responsibility**, § 18 Abs. 2 MStV, because the site publishes
  editorial content. Name and address of the responsible person.
* **Review verification disclosure**, § 5b Abs. 3 UWG. If you make consumer
  reviews accessible you must state what you do to ensure they come from
  people who actually used the product. Describe the real process. A vague
  claim is worse than silence, because it can be disproved.
* **Advertising disclosure.** Affiliate links labelled before the link, never
  after, using the words Werbung or Anzeige.
* **Cookie consent**, § 25 TDDDG. Nothing non essential loads before consent.
  Withdrawal must be as easy as granting and reachable from every page.
* **Privacy policy**, Art. 13 DSGVO, naming the legal basis, the retention
  period and the competent supervisory authority.

---

## 14. Definition of done

Do not report the build complete until every line here is true.

```
[ ] Zero gradients in the codebase. Grep for "gradient" returns nothing.
[ ] Zero border-radius above 12px except on true circles.
[ ] No font weight above 600 anywhere.
[ ] No em dash or en dash in any visible German string.
[ ] German compound hyphens intact and spelled correctly.
[ ] Every icon stroke only, 1.5 width, currentColor, no background.
[ ] Red appears at most three times per screen.
[ ] Gold is never used as text and never as a link.
[ ] All 28 routes render and return 200.
[ ] Every number formatted through Intl with de-DE.
[ ] lang="de-DE" set, hyphens auto active on running text.
[ ] No horizontal scroll at 320, 375, 768, 1024, 1440 and 1920.
[ ] Keyboard reachable end to end, visible focus everywhere.
[ ] Lighthouse: Performance 90+, Accessibility 100, SEO 100.
[ ] Impressum, Datenschutz, Cookie-Richtlinie, Nutzungsbedingungen and
    Barrierefreiheit all present and linked from the footer.
[ ] No AggregateRating emitted for a zero review product.
[ ] A native German speaker reads three pages and flags nothing.
```

That last line is the real test. Everything above it is in service of it.
