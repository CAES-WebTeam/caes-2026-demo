# CAES 2026 → WordPress Porting Manifest

Working document for porting this demo, piece by piece, into the two real targets:

- **Theme** — `caes-main-2026` (`/Users/aaw97657/Documents/_CODE/github/caes-main-2026`). A basic block theme, currently a skeleton (`theme.json` v3 with empty `settings`; empty `parts/`, `patterns/`, `templates/`, `src/scss/`).
- **Plugin** — `caes-blocks` (`/Users/aaw97657/Documents/_CODE/github/caes-blocks`). A mature, **theme-agnostic** block library. Blocks are namespaced `uga-caes/`, server-rendered (`render.php`), built with `@wordpress/scripts`.

## Guiding principle (from the plugin's design)
**Blocks provide structure/behavior; themes provide presentation.** A plugin block must work in *any* theme, so its `style.scss` carries only minimal structural CSS — the look (colors, type, spacing) comes from the theme via tokens the theme can override. So most pieces split: the *functional* part may map to a plugin block (new or existing), and its *styling* lands in the theme.

Each row is one piece. The decision columns — `Custom block?` and `Ports to` — are `TBD`; we fill them in together, one piece at a time. Everything else is observed fact (from this demo or the target repos).

## How we'll use this
- Decide one row at a time. Record the call in `Custom block?` and `Ports to`; capture the *why* in `Decision notes`.
- When a piece splits across both targets (block structure + theme styling), note both in `Ports to`.
- `Existing:` notes flag a plugin block that may already cover the piece — to reuse, extend, or reject.

## Column legend
- **State / Interactivity** — observed from the `.jsx` (state/effects/listeners vs. static). Fact, not a recommendation.
- **Custom block?** — the decision. Vocabulary: `Existing block` · `New plugin block` · `No — theme pattern` · `No — template part` · `No — template` · `No — theme.json / global styles` · `TBD`.
- **Ports to** — the decision. Real destinations:
  - `plugin:src/blocks/<name>/` (new or existing `uga-caes/` block)
  - `theme:theme.json` · `theme:/parts/` · `theme:/patterns/` · `theme:/templates/` · `theme:/src/scss/`
- **Decision notes** — rationale, open questions, dependencies, `Existing:` overlaps.

---

## Foundations & shared scaffolding

| Piece | Files | Summary | State / Interactivity | Custom block? | Ports to | Decision notes |
|---|---|---|---|---|---|---|
| Design tokens | `sections/_tokens.css` (1–104) | Color palette, type scale, spacing scale, layout widths, shadows, motion. | Static (CSS custom props) | TBD | TBD | Theme `settings` are empty today — natural home is `theme:theme.json`. Plugin expects themes to define/override tokens. |
| Core-block base styles | `sections/_tokens.css` (402–632) | Styles for core blocks: paragraph, list, quote, pullquote, table, details, media-text, footnotes, verse, code. | Static (CSS) | TBD | TBD | The "Elements" tier. Maps to `theme:theme.json` `styles.blocks.*` + style variations. |
| `IMG` map | `sections/_shared.jsx` (5–23) | Demo image refs (local to `sections/assets/img/`). | Static data | TBD | TBD | Demo scaffolding; real images = media library. Likely not ported. |
| `LogoMark` | `sections/_shared.jsx` (~26) | CAES horizontal lockup `<img>`. | Static | TBD | TBD | Site logo / site identity. |
| `Brand` | `sections/_shared.jsx` (~40) | Lockup + linked wrapper. | Static | TBD | TBD | |
| `CollapsibleNav` | `sections/_shared.jsx` (~59) + `_tokens.css` (179–192) | Shared collapsible-nav behavior + toggle styles. | Interactive (toggle state) | TBD | TBD | Used by nav/sidebar pieces. |
| Block preview shell | `sections/_block-shell.css` | Label header + centering for standalone previews. | Static (CSS) | TBD | TBD | Demo-only harness; likely not ported. |

## Patterns / sections

| Piece | Files | Summary | State / Interactivity | Custom block? | Ports to | Decision notes |
|---|---|---|---|---|---|---|
| UGA global bar | `sections/uga-global-bar/*` | Black bar: UGA wordmark + quick links, site-wide. | Static | TBD | TBD | |
| Top nav (masthead) | `sections/top-nav/*` | White masthead, red rule, lockup, primary nav, search button. | Interactive (menu/search state) | TBD | TBD | `Existing: uga-caes/google-search` for the search field. Nav itself = core Navigation? |
| Hero | `sections/hero/*` | Off-white card floating over full-bleed photo; CTA pair. | Minor (menu trigger prop) | TBD | TBD | Photo is `background-image`, not `<img>`. |
| Announcement bar | `sections/announcement/*` | Red site-wide notice bar. | Interactive (dismissible) | TBD | TBD | Dismiss → needs a `view.js`/cookie if a block. |
| Impact mosaic | `sections/impact-mosaic/*` | Asymmetric 4×2 grid of photos + stat tiles; capstone + chips. | Interactive (state) | TBD | TBD | Confirm what the state drives. |
| Student life | `sections/student-life/*` | Two-column: tabbed list + sticky feature image. | Interactive (tabs) | TBD | TBD | |
| Latest news | `sections/news/*` | Asymmetric: one feature story + three stacked rows. | Static (hardcoded) | TBD | TBD | `Existing: uga-caes/caes-rss-feed` if RSS-driven; else Query Loop / CPT. |
| Read all about | `sections/read-all-about/*` | Full-bleed red strip, oversized italic lockup. | Static | TBD | TBD | |
| CAES footer | `sections/caes-footer/*` | Black CAES footer: lockup, social, 6 link cols. | Static | TBD | TBD | |
| UGA footer | `sections/uga-footer/*` | UGA site-wide footer: arch bg, red rule, links, social, address. | Static (+ SVG markup) | TBD | TBD | |
| Detail hero | `sections/detail-hero/*` | Page-top metadata header: breadcrumb, title, dept, facts, CTAs, faded photo. | Static | TBD | TBD | |
| Phase cards | `sections/phase-cards/*` | Labeled card pair (e.g. Years 1–2 / 3–4). | Static | TBD | TBD | |
| Info cards | `sections/info-cards/*` | Side-by-side titled cards w/ copy + link. | Static | TBD | TBD | |
| FAQ | `sections/faq/*` | Section of native `<details>` disclosures. | Optional JS (single-open) | TBD | TBD | Core `details` block may cover most of this. |
| Connect | `sections/connect/*` | Red department-promo card + profile cards. | Static | TBD | TBD | `Existing: uga-caes/caes-individual-personnel` for profile cards. |
| Closing CTA | `sections/closing-cta/*` | Full-width band: headline, rule, copy, dual CTA. | Static | TBD | TBD | |
| Berry decor | `sections/berry-decor/*` (no preview) | Decorative berry/leaf flourish. | Static | TBD | TBD | Decoration — likely theme styling/asset. |

## Pages / templates

| Piece | Files | Summary | State / Interactivity | Custom block? | Ports to | Decision notes |
|---|---|---|---|---|---|---|
| Homepage | `homepage.html` | Composed homepage — sections in order. | Composes sections | TBD | TBD | Assembles patterns → `theme:/templates/`. |
| Academics landing | `academics.html` | Light page header + two tabbed sections + closing CTA. | Interactive (tabs) | TBD | TBD | |
| Degrees & Programs | `sections/programs/*` | Searchable degree list w/ modal filters. | Interactive (search + modal filters) | TBD | TBD | Custom data source? |
| Program detail | `sections/program-detail/*` | Faded-photo title, sticky scroll-spy nav, bands, outcome bars, advisors. | Interactive (scroll-spy) | TBD | TBD | `Existing: uga-caes/caes-toc` for scroll-spy nav; `uga-caes/caes-individual-personnel` for advisors. |
| Directory | `sections/directory/*` | Faceted people directory: sidebar filters, search, collapsible groups, pagination. | Interactive (filters/search/pagination) | TBD | TBD | `Existing: uga-caes/personnel` (filtered list from CAES personnel DB). Consumes `DIR_PEOPLE` in demo. |
| Experts | `sections/experts/*` | Expertise-first companion: modal filters + search. | Interactive (filters/search) | TBD | TBD | `Existing: uga-caes/personnel` (same DB, expertise view). |
| Interior page | `sections/interior-page/*` | No section rail: header → intro + video → full-width zone → footer. | Static (+ video embed) | TBD | TBD | `Existing: uga-caes/embed` for the video/iframe. |
| Interior page + sidebar | `sections/interior-page-sidebar/*` | Interior page + right rail of sibling pages. | Static | TBD | TBD | |
| People data | `sections/directory/directory-data.jsx` | `window.DIR_PEOPLE` — ~50 records. | Static data | TBD | TBD | Demo-only; real source = CAES personnel DB (via `uga-caes/personnel`). |

## Reference (likely not ported)

| Piece | Files | Summary | Custom block? | Ports to | Decision notes |
|---|---|---|---|---|---|
| Design system | `sections/design-system.html` | Living reference doc (tiers, tokens, core-block styles, WP mapping). | TBD | TBD | Documentation, not site output. |
| Archived v2 | `_reference/*` | Earlier snapshot, not wired into the live site. | — | — | Excluded. |

---

## Target repo conventions (reference facts)

### Plugin — `caes-blocks`
- Namespace `uga-caes/`; textdomain `uga-caes`. Build: `wp-scripts` (`--webpack-src-dir=src/blocks --output-path=build/blocks --webpack-copy-php`).
- Block anatomy: `block.json` (`apiVersion` 2, `render: file:./render.php`), `edit.js`, `index.js`, `style.scss` (front+editor), `editor.scss`, `view.js` (frontend interactivity only).
- **Server-rendered** (dynamic) blocks; `style.scss` is intentionally minimal (theme owns the look).
- Existing blocks: `before-after-slider`, `caes-events`, `google-search`, `embed` (iFrame), `personnel`, `caes-individual-personnel`, `caes-rss-feed`, `caes-toc`, `reveal` (+ `reveal/frame`), `motion-scroll`. Optional blocks toggle in **Settings › CAES Blocks**.
- Theme↔block coupling contract: `data-caes-<state>` attribute on block root + bubbling `caes:<block>:<state>` CustomEvent (see `notes/theme-integration.md`). **Not** the Interactivity API.

### Theme — `caes-main-2026`
- Block theme, `theme.json` v3, **empty `settings`** today. Build: `wp-scripts build`. WP ≥ 6.9, PHP ≥ 8.5.
- Empty `parts/`, `patterns/`, `templates/`, `src/scss/`, `functions.php` — greenfield for foundations.

---

## Decisions log
_Newest first. Record notable per-piece decisions and reasoning._

-
