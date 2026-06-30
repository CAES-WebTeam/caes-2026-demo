# CAES 2026 → WordPress Porting — Task List

One list of tasks for porting the demo into the theme (`caes-main-2026`) + plugin (`caes-blocks`). Related work is grouped under **umbrella tasks** (subtasks point to their umbrella via the `Parent task` column) — import-ready for Asana. Stable `ID` is the last column; reference it in PRs/conversations. **Reference notes for context (conventions, shared styles, dependencies, decisions) are at the end.**

| Task | Assignment | Notes | Parent task | ID |
|---|---|---|---|---|
| **Theme Setup** | Ashley | Foundational theme work — do first; everything else reads from it. | | |
| Design tokens | Ashley | Color palette, type scale, spacing, layout widths, shadows, motion → `theme.json` settings. Build first. Source: `_tokens.css` (1–104). | Theme Setup | THM-tokens |
| Core-block base styles | Ashley | Styles for core blocks (paragraph, list, quote, table, details, media-text, etc.) → `theme.json` `styles.blocks.*` (Elements tier). Source: `_tokens.css` (402–632). | Theme Setup | THM-coreblocks |
| Shared style primitives | Ashley | Theme-owned classes used across many pieces — blocks/patterns **emit** the class, never restyle. Card look (`.card`), stretched link (`.card-link`), fade-up reveal, button variations (core Button styles: White, Outline White, and Promo — red full-width trailing-arrow for the Connect dept-promo link, source `connect`/`connect-dept-card`), section type (`.eyebrow`/`.section-kicker`/`.section-lede`), `.link-arrow`, red rule (core Separator style). Standardize the card/reveal utilities from the per-section demo CSS. Build early — dependency of every card/section consumer. Full table in reference notes. | Theme Setup | STY |
| Berry decor | Ashley | Decorative berry/leaf flourish — theme style + asset, applied on homepage. Not a block/pattern. Source: `berry-decor`. | Theme Setup | THM-berry |
| Site header (UGA bar + masthead) | Ashley | Header template part (canonical chrome): UGA global bar (BLK-brand UGA option + quick links) above masthead (BLK-brand CAES + BLK-nav mega-menu + core Search). Depends on BLK-brand, BLK-nav. Source: `uga-global-bar`, `top-nav`. | Theme Setup | PART-header |
| Site footer (CAES + UGA) | Ashley | Footer template part: CAES footer (BLK-brand dark + social + 6 link cols, core blocks) + BLK-uga-footer block. Depends on BLK-brand, BLK-uga-footer. Source: `caes-footer`, `uga-footer`. | Theme Setup | PART-footer |
| **Templates** | Ashley | Block-theme templates. Depend on Theme Setup (chrome/styles) and Program CPT (program templates). | | |
| Homepage | Ashley | Landing-page template = Header part + `post-content` (full-width) + Footer part. Front page = a static Page edited in the normal Page editor (not Site Editor); header/footer locked, content `templateLock:false`; full-width via `theme.json` layout + `alignfull`. Seed with a homepage starter pattern. Source: `homepage.html`. | Templates | TPL-home |
| Interior-page template | Ashley | Shared template for interior pages (Academics landing, Interior page): locked top (breadcrumbs + faded image from featured image, or a dedicated field TBD) → editable `post-content` → footer. Interior video = `uga-caes/embed`. Source: `academics.html`, `interior-page`. | Templates | TPL-interior |
| Interior + sidebar | Ashley | Interior template variant with a sibling-page sidebar rail = BLK-nav (section-rail). Depends on TPL-interior, BLK-nav. Source: `interior-page-sidebar`. | Templates | TPL-interior-sidebar |
| Degrees & Programs | Ashley | Archive template for the `program` CPT: header (breadcrumbs + lead) + BLK-program-search. The faceted search/listing is its own block (not a Query loop). Depends on Program CPT, BLK-program-search. Source: `programs`. | Templates | TPL-programs-archive |
| Program detail | Ashley | Single-`program` template: header pattern (CPT fields) + bands + outcome bars + advisors + scroll-spy subnav (BLK-on-page-nav). Advisors = personnel cards linking to Field Report (MOD-personnel). Depends on Program CPT. Uses: STY-button, STY-red-rule, STY-link-arrow, STY-section-type. Source: `program-detail`. | Templates | TPL-program-single |
| Directory | Ashley | Unique template; faceted people list via MOD-personnel (CAES personnel DB). Source: `directory`. | Templates | TPL-directory |
| Experts | Ashley | Unique template; expertise view via MOD-personnel (same DB). Source: `experts`. | Templates | TPL-experts |
| **Patterns** | | Theme patterns of core blocks (+ referenced plugin blocks). Editor-insertable layouts. | | |
| Announcement bar | Ashley | Static pattern (place in a template part). Dismiss behavior dropped (would need `view.js`/cookie + a block). Source: `announcement`. | Patterns | PAT-announce |
| Impact mosaic | Ashley | Pattern of core blocks, classes pre-baked. No JS: stretched-link = CSS utility; fade-up = CSS scroll-driven (degrades to visible). Uses: STY-card, STY-card-link, STY-reveal, STY-section-type. Source: `impact-mosaic`. | Patterns | PAT-mosaic |
| Read all about | Ashley | Static pattern (full-bleed red strip, oversized italic lockup). Uses: STY-section-type. Source: `read-all-about`. | Patterns | PAT-read-about |
| Cards — narrative variant | Ashley | Card pattern, narrative visual variation (tag/title/body). Low-structure. Uses: STY-card, STY-section-type, STY-link-arrow. Source: `phase-cards`. | Patterns | PAT-cards-narrative |
| Cards — linked variant | Ashley | Card pattern, linked visual variation (title/copy/link). Used in program-detail's Paying-for-College band. Uses: STY-card, STY-card-link, STY-link-arrow, STY-section-type. Source: `info-cards`. | Patterns | PAT-cards-linked |
| Cards — numbered variant | Ashley | Card pattern, numbered visual variation (big number on top + body). Matches the program-detail "How to Prepare" look; the CPT-driven version is rendered by BLK-program-fields. Uses: STY-card, STY-section-type. Source: `program-detail` (`pd3-prep-card`). | Patterns | PAT-cards-numbered |
| FAQ | Ashley | Core `details` block + pattern (heading + stacked details). Single-open dropped. Uses: STY-section-type. Source: `faq`. | Patterns | PAT-faq |
| Closing CTA | Ashley | Static pattern ("Ready to grow your future?"): heading + red rule + copy + dual core Buttons. Uses: STY-button, STY-red-rule, STY-section-type. Source: `closing-cta`. | Patterns | PAT-closing-cta |
| **Plugin blocks (new)** | | New `uga-caes/` server-rendered blocks. Minimal structural CSS; look comes from theme tokens. | | |
| Brand / logo lockup | Ashley | New `uga-caes/brand` — CAES lockup for all sites. Bundled logo enum (CAES, UGA wordmark; Extension later); not media library. Variant attr (light/dark/mono) via `--wp--preset--color--*` tokens. Template-part contexts only. Folds in the home-link wrapper. Build before PART-header/PART-footer. Prior art: `caes-faculty-2023`. Source: `_shared.jsx`. | Plugin blocks (new) | BLK-brand |
| Navigation | | New `uga-caes/navigation`; modes `mega-menu` (site nav) and `section-rail` (hierarchy-aware parent/siblings/current). Server-rendered from page hierarchy/menu; mobile collapse built in; template-part only. Source: `_shared.jsx` (CollapsibleNav). | Plugin blocks (new) | BLK-nav |
| Hero carousel | | New `uga-caes/hero-carousel` — build as a carousel (demo is single hero). Model on `caes-hub` theme's hero. Photo is `background-image`. Uses: STY-button, STY-section-type. Source: `hero`. | Plugin blocks (new) | BLK-hero |
| Feature tabs | | New `uga-caes/feature-tabs` (generic; Student life is one instance). Synced feature panel swaps on select (`view.js`). Repeatable items (label/copy/image) as attributes. Uses: STY-card, STY-section-type. Source: `student-life`. | Plugin blocks (new) | BLK-feature-tabs |
| News | | New `uga-caes/news` — NOT `caes-rss-feed` (RSS too heavy). Pulls from CAES Field Report via a lighter source (pre-baked JSON or similar; mechanism TBD). Owns the asymmetric layout. Uses: STY-card, STY-card-link, STY-link-arrow, STY-section-type. Source: `news`. | Plugin blocks (new) | BLK-news |
| Stats | | New `uga-caes/stats` — repeatable stat items (big serif red number, optional progress bar at a % fill, condensed label) in a responsive grid. Parent block + `uga-caes/stat` child (InnerBlocks). Static. Doubles as the program "outcome bars" (TPL-program-single). Uses: STY-section-type. Source: `design-system` (`demo-statbars`). | Plugin blocks (new) | BLK-stats |
| UGA footer | Ashley | New `uga-caes/uga-footer` — reused across many UGA/CAES sites (plugin, not per-theme). Migrate/copy the `caes-faculty-2023` footer part into the block. Arch-bg SVG. Build before PART-footer. Source: `uga-footer`. | Plugin blocks (new) | BLK-uga-footer |
| Interior section footer | | New `uga-caes/section-footer` resolver block + a synced pattern per section. Content lives in the synced pattern (edit-once → updates everywhere); the resolver finds section = top-level ancestor, reads a reference field on that section's landing page ("Section footer pattern"), and renders it. Stores no content; renders nothing when unset. Depends on TPL-interior (footer zone). TODO: add the reference-field meta on landing pages; ancestor lookup; render via core `wp_block`. Source: `interior-page` ("Section footer area"). | Plugin blocks (new) | BLK-section-footer |
| Scroll-spy subnav | | New `uga-caes/on-page-nav` — IntersectionObserver + sticky + active-link tracking (`view.js`). Template-part contexts only. NOT `caes-toc` (that stays a simple content-manager TOC). Mobile collapse reuses BLK-nav. Source: `program-detail` (`pd3-subnav`). | Plugin blocks (new) | BLK-on-page-nav |
| Program search | | New `uga-caes/program-search` — faceted directory of the `program` CPT for the archive. Server-renders all programs (name, dept, type, interests, description, Double Dawgs flag); `view.js` owns the interactivity: free-text search (name + dept), three multi-select filters in modals (**Interest** primary / **Program Type** / **Department**) with per-option counts, active-filter chips + clear-all, live result count, cards⇄table view toggle, results grouped by program type. Interest emoji read from term-meta. Double Dawgs badge + modal (lists pairings from CPT-rel). Filters map to taxonomies (Interest, Program type, Department). Depends on Program CPT (CPT-tax Interest, CPT-rel Double Dawgs). Uses: STY-card, STY-card-link, STY-button, STY-section-type. Source: `programs`. | Plugin blocks (new) | BLK-program-search |
| Blocks for program details | Ashley | Field blocks exposing program-detail content so each piece is placeable anywhere on the single-`program` template (bindings for simple fields + small field blocks for structured/repeatable/relational data). Exact blocks TBD once the CPT fields (CPT-meta/CPT-tax/CPT-rel) are worked out. Source: `program-detail`. | Plugin blocks (new) | BLK-program-fields |
| Scholarships | | New `uga-caes/scholarships` — pulls from the CAES Scholarship database (data source/mechanism TBD; confirm API/feed). Lists scholarships with name + application open/close dates, derives an **open/closed** status from the dates, and shows an apply link when open. Reprises the scholarship sections on the current CAES site — check for prior art there to migrate. NOT in the demo. Uses: STY-card, STY-link-arrow, STY-section-type. | Plugin blocks (new) | BLK-scholarships |
| Expert Resources | | New `uga-caes/expert-resources` — pulls the Expert Resources CPT from CAES Field Report (**same source as BLK-news**, but a different CPT with its own taxonomies; reuse the news data mechanism once settled). Filter/select by its taxonomies. NOT in the demo. Uses: STY-card, STY-card-link, STY-link-arrow, STY-section-type. | Plugin blocks (new) | BLK-expert-resources |
| **Existing block updates** | | Already live on other CAES sites — additive changes only; existing attributes/markup must keep rendering. Confirm which sites consume each before editing. | | |
| Personnel (directory / experts / cards) | | Reuse/extend `uga-caes/personnel`: faceted directory + expertise view + profile cards. Cards link out to Field Report profiles — NOT `caes-individual-personnel` (no individual profile pages on the new site; that block is not used/deployed here). OPEN: data source (personnel DB vs Field Report import) — decide with devs. Uses: STY-card, STY-card-link, STY-link-arrow. Source: `directory`, `experts`, `connect`. | Existing block updates | MOD-personnel |
| **Program CPT** | | Register the `program` custom post type in the plugin (theme-agnostic; survives a theme change). Public, archive enabled. Underlies the program templates. Build before the program templates. | | |
| Register program CPT | | Register the `program` post type (public; archive = Degrees & Programs; single = Program detail). Source: `detail-hero`, `program-detail`. | Program CPT | CPT-register |
| Taxonomies | | <ul><li>**Interest** — primary filter axis on the archive (Animals, Food, Plants, Health and Nutrition, etc.; how prospective students think). Term-meta: **emoji** (decorative, `aria-hidden`; blank = none) — editable on the term add/edit screen. Drives BLK-program-search's Interest filter.</li><li>**Program type** — Major/Minor/Certificate/Graduate; drives header eyebrow + archive filtering.</li><li>**Degree awarded** — store abbreviation + written-out name (e.g. B.S.A. → Bachelor of Science in Agriculture).</li><li>**Department** — terms carry a URL term-meta (dept site link); feeds the Connect promo link.</li><li>**Campus** — Athens/Tifton/Griffin; filterable.</li></ul> | Program CPT | CPT-tax |
| Meta fields | | <ul><li>**Summary/lead** — textarea or excerpt.</li><li>**Apply URL** + **Visit URL** — global default + optional per-program override.</li><li>**How to prepare / Hands-on learning / Career roles** — repeatable text, stored on CPT so reusable.</li><li>**Career outcomes** — repeatable label + %, drives outcome bars; + **source/footnote**.</li><li>**Double Dawgs eligible** — boolean toggle.</li><li>**FAQ** — repeatable Q + A.</li></ul>About/Coursework narrative stays in post content. Dept promo link is derived from the Department term URL — not its own field. | Program CPT | CPT-meta |
| Relationships | | <ul><li>**Advisors** → personnel — relationship field; program stores references; rendered as cards linking to Field Report via MOD-personnel (no individual profile pages).</li><li>**Double Dawgs pairings** → program — program-to-program relationship to the paired master's posts.</li></ul> | Program CPT | CPT-rel |
| Program header pattern | | Pattern assembling the header fields (title, type, lead, facts, featured image, CTAs) via core blocks with Block Bindings (simple fields) + small field block(s) for structured facts. Lives as the default content of the single-`program` template (TPL-program-single). | Program CPT | CPT-header |

**Dropped (not ported):** `IMG` map, Block preview shell, People data (`DIR_PEOPLE`) — demo-only scaffolding. Real content images = media library; static theme images → `theme:assets/images/`.

---

# Reference notes (context for devs / LLMs)

## Targets
- **Theme** — `caes-main-2026` (`https://github.com/CAES-WebTeam/caes-main-2026`). Block theme, `theme.json` v3 with **empty `settings`**; empty `parts/`, `patterns/`, `templates/`, `src/scss/`, `functions.php`. Build: `wp-scripts build`. WP ≥ 6.9, PHP ≥ 8.5.
- **Plugin** — `caes-blocks` (`https://github.com/CAES-WebTeam/caes-blocks`). Mature, theme-agnostic block library, namespace `uga-caes/`, server-rendered (`render.php`), `@wordpress/scripts`. **Already live on other CAES sites** — existing-block changes must stay backward-compatible.

## Guiding principles
**Build every block for more than one theme.** Each block in `caes-blocks` is written to be theme-agnostic and reusable across CAES/UGA sites — never hardcode anything specific to `caes-main-2026`. Assume another theme will consume it: no theme-specific class names, selectors, colors, fonts, or layout assumptions baked in; nothing that breaks when dropped into a different theme. This is why blocks live in the plugin, not the theme.

**Blocks provide structure/behavior; themes provide presentation.** Following from the above: a plugin block's `style.scss` carries only minimal structural CSS — colors/type/spacing come from the theme via tokens the theme can override (`--wp--preset--*` from `theme.json`). Most pieces split: the functional part = a plugin block (new or existing), its styling = the theme.

## Shared style primitives (the horizontal layer)
Theme-owned (Theme Setup → `STY`). Consumers emit the class; they do not restyle. Build early — dependencies of every consumer.

| Primitive | Class / token (demo) | Used by | ID |
|---|---|---|---|
| Card look: shadow + hover + image zoom | `--shadow-card` / `--shadow-card-hover` + `--ratio-*` (standardize into `.card`) | PAT-mosaic, PAT-cards-narrative, PAT-cards-linked, BLK-news, BLK-feature-tabs, MOD-personnel | STY-card |
| Stretched "whole card is a link" | `.card-link` | PAT-mosaic, PAT-cards-linked, BLK-news, MOD-personnel | STY-card-link |
| Fade-up on scroll into view | mosaic's `is-armed`/`is-revealed` (standardize into a CSS scroll-driven utility) | PAT-mosaic (+ optional) | STY-reveal |
| Button variations | `.btn-filled` / `.btn-white` / `.btn-outline-white` → core Button styles | BLK-hero, PAT-closing-cta, PART-header, TPL-program-single, THM-btn-promo | STY-button |
| Eyebrow + kicker + display + lead | `.eyebrow` `.section-kicker` `.section-display` `.section-lead` | most patterns + section blocks | STY-section-type |
| Red arrow link | `.link-arrow` | BLK-news, PAT-cards-narrative, PAT-cards-linked, MOD-personnel, TPL-program-single | STY-link-arrow |
| Red divider rule | `.red-rule` → core Separator style | PAT-closing-cta, TPL-program-single | STY-red-rule |

## Existing blocks — modify with care
- **MOD-personnel** (`uga-caes/personnel`): used here for Directory + Experts lists and Connect/advisor cards. Additive changes only. _Consumed today by: (fill in which sites/themes before editing.)_
- **Reuse as-is** (no change, but cross-site — verify): `uga-caes/embed` (interior-page video/iframe).
- **NOT used on the new sites:** `uga-caes/caes-individual-personnel` — it builds full individual profile *pages*; the new site has none (cards link out to Field Report). Not modified/deployed here; still lives for sites that use it.
- **NOT modified:** `uga-caes/caes-toc` stays a simple content-manager TOC (scroll-spy = new BLK-on-page-nav). `uga-caes/caes-rss-feed` untouched (BLK-news is a new block).

## Build order / dependencies
- **THM-tokens first** — everything styled reads from it. Shared style primitives (`STY`) right after.
- **BLK-brand before** PART-header, PART-footer.
- **BLK-nav before** PART-header, TPL-interior-sidebar.
- **BLK-uga-footer before** PART-footer (the footer part embeds it).
- **Program CPT before** TPL-programs-archive, TPL-program-single, CPT-header (the header pattern), BLK-program-search.
- **BLK-program-search before** TPL-programs-archive (the archive embeds it). Needs the Interest taxonomy (CPT-tax) and Double Dawgs pairings (CPT-rel).
- **TPL-interior before** TPL-interior-sidebar and BLK-section-footer (footer zone lives in that template).

## Plugin conventions (`caes-blocks`)
- Namespace `uga-caes/`; textdomain `uga-caes`. Build: `wp-scripts` (`--webpack-src-dir=src/blocks --output-path=build/blocks --webpack-copy-php`).
- Block anatomy: `block.json` (`apiVersion` 2, `render: file:./render.php`), `edit.js`, `index.js`, `style.scss` (front+editor, minimal), `editor.scss`, `view.js` (frontend interactivity only).
- Existing blocks: `before-after-slider`, `caes-events`, `google-search`, `embed`, `personnel`, `caes-individual-personnel`, `caes-rss-feed`, `caes-toc`, `reveal` (+ `reveal/frame`), `motion-scroll`. Optional blocks toggle in **Settings › CAES Blocks**.
- Theme↔block coupling: `data-caes-<state>` attribute on block root + bubbling `caes:<block>:<state>` CustomEvent (see `notes/theme-integration.md`). **Not** the Interactivity API.

## Decisions log
_Newest first._
- Added BLK-expert-resources (Field Report Expert Resources CPT — same source as BLK-news, different CPT + taxonomies). Not in the demo; share the news data mechanism once settled.
- Added BLK-scholarships (CAES Scholarship DB: name + dates + open/closed status + apply link). Not in the demo; reprises scholarship sections from the current CAES site. Data source TBD.
- "Phase cards" / "Info cards" renamed to Cards — narrative / linked variants (PAT-cards-narrative, PAT-cards-linked): they're the same card concept in different visual variations.
- Program archive search is its own block (BLK-program-search), not a Query loop — the demo has search + 3 faceted filter modals + cards/table toggle + grouping + Double Dawgs modal. Added an **Interest** taxonomy (primary filter axis) with an emoji term-meta field.
- Restructured into one umbrella/subtask task list (IDs last column); reference moved to the end. Owner/status dropped (tracked in Asana).
- `caes-individual-personnel` is out — no individual profile pages on the new sites; all profile cards link to Field Report.
- Header and footer are each one template part (PART-header = UGA bar + masthead; PART-footer = CAES + UGA footers).
- News is a new block (Field Report source), not `caes-rss-feed`. Scroll-spy is a new block, not `caes-toc`.
- Design tokens + core-block styles → `theme.json` (settings + `styles.blocks.*`); the plugin expects the theme to define/override tokens.
