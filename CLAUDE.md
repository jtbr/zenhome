# zenhome — Hugo theme

Minimal personal site Hugo theme. The `exampleSite/` directory is the reference
site used for development; run the dev server from there:

```
cd exampleSite && hugo server --themesDir ../..
```

This theme may sometimes be tested as a submodule of a customized site; if the changes to a toml file are reported not to have the expected effect, the custom outer file may be overriding it.

## Architecture

- **Hugo theme** — layouts in `layouts/`, SCSS in `assets/scss/`, JS in `assets/js/`
- **No JS framework** — vanilla JS only
- **Icons** — RemixIcon 4 CDN (`head.html`); full class name stored in `data/socials.yaml` (e.g. `ri-github-line`)
- **Math** — rendered at build time by Hugo's embedded KaTeX (`transform.ToMath` in `layouts/_default/_markup/render-passthrough.html`); no client JS, no front-matter flag. KaTeX CSS is loaded by `layouts/partials/math.html` only on pages containing math (via the `hasMath` page store flag). Requires the Goldmark passthrough block in the **site's** `hugo.toml` — Hugo does not merge a theme's `markup` config, so consuming sites must copy it from `exampleSite/hugo.toml`.
- **Comments** — giscus (opt-in via `params.comments.enabled`)

## CSS approach — no Bootstrap

Bootstrap is NOT loaded. Instead, `assets/scss/_utilities.scss` implements only
the handful of Bootstrap-compatible class names that the layouts actually use
(e.g. `.d-flex`, `.container`, `.gap-3`). When a layout needs a new utility
class, add it there — do not pull in Bootstrap or any other CSS framework. Using these classes
is generally preferable to using custom CSS rules.
Check `_utilities.scss` before adding a new class; the missing class is often
the root cause when a Bootstrap-named class has no visible effect.

## SCSS structure

| File | Purpose |
|------|---------|
| `main.scss` | Entry point; custom properties, base styles, header, footer, landing page |
| `_utilities.scss` | Minimal Bootstrap-compatible utility classes |
| `_typography.scss` | Prose typography for articles |
| `_dark.scss` | Dark mode overrides (`[data-theme="dark"]`) |
| `_code.scss` | Syntax highlighting |
| `_cards.scss` | Card components (writings, things, notes lists) |
| `_components.scss` | Everything else (modals, evidence, breaker, post-nav, giscus…) |

## Key params (`exampleSite/hugo.toml`)

| Param | Effect |
|-------|--------|
| `params.header_title` | Nav bar brand text; falls back to `author.name` |
| `params.home_title` | Homepage `<h1>`; falls back to `author.name` |
| `params.copyright` | Footer left-side text; if absent, social links are centered |
| `params.author.{name,email}` | Used in SEO/schema; `name` also falls back for nav/homepage titles |
| `params.tagline` | Subtitle line under the homepage `<h1>` |
| Landing page body | Written as markdown in `content/_index.md`; use `##` for section labels |
| `params.sections.{writings,things,notes}` | Show/hide nav links and listing pages |
| `params.sections.things_layout` | `"masonry"` for two-column masonry layout; omit for default auto-fill grid |
| `params.fonts.{display,body,mono}` | Google Fonts families |
| `params.fonts.graphic` | Optional Google Fonts family for `image_text` graphics; falls back to `display` font if unset |

## Social links (`data/socials.yaml`)

Each entry needs `name`, `icon` (full Remixicon class, e.g. `ri-github-line`),
and `url`. The full class is used directly in the template (`class="{{ .icon }}"`).
Footer renders them as lowercase text; the icon fades in to the right on hover
via an opacity transition.

## Things front matter

| Field | Effect |
|-------|--------|
| `weight` | Sort order on the listing page — lower appears first. Falls back to date then title. |
| `tagline` | Short blurb shown on the card and the detail page header. |
| `description` | Longer text shown in the modal (falls back to `tagline` if absent). |
| `image` | Path relative to `static/` (e.g. `img/things/foo.jpg`). Shown on card and larger in modal. |
| `image_text` | Short phrase rendered as large display text over a gradient background. Fills the image slot on the card and modal when no `image` is set. |
| `image_text_hue` | Override the auto-derived hue (0–360) for the gradient while keeping theme-aware lightness/saturation. |
| `image_text_bg` | Background mode: `"plain"` (default gradient), `"textured"` (bundled texture, auto-darkens), `"dark <path>"` or `"light <path>"` (image shown in both modes with light or dark font respectively), `"dark <path> light <path>"` or `"light <path> dark <path>"` (separate images per theme, each with matching font), or raw CSS. |
| `date` | Optional. Full, fully-parsable date (`2024-03-15`) for display and sort. Do NOT put a year-only or year-month value here — Hugo >= 0.135.0 hard-fails the build if `date` (or its aliases `publishdate`/`pubdate`/`published`/`lastmod`) isn't a parsable date. |
| `partial_date` | Optional, mutually exclusive with `date`. A quoted partial string (`"2024"` or `"2024-03"`) to show only year or month/year — kept out of Hugo's reserved date fields to avoid the strict-parsing build failure above. Use `weight` for sort order when using `partial_date` or when no date is set, since these pages have no `.Date` to sort by. |
| `links` | Array of `{label, url}` — up to two buttons shown in the modal. |
| `link` | Legacy single URL; treated as one "Visit" button. Use `links` instead. |

A details page is generated for every thing. A **Details →** button appears in the modal only when the markdown body is non-empty (`WordCount > 0`); the card's noscript fallback link also points there in that case, or to the first link otherwise.

## Dark mode

`assets/js/darkmode.js` — reads/writes `localStorage` key `theme`, sets
`data-theme` on `<html>`. Theme is applied before first paint via an inline
script in `head.html` to avoid flash. The toggle button title and `aria-label`
update dynamically to reflect what clicking will switch to.

## Avoiding a flash of stale content for JS-set values

For any other element whose real content is only known once a script runs
(a randomized greeting, a client-computed date, etc.), add the `.js-pending`
class (`_components.scss`) to its static/placeholder markup. That class sets
`visibility: hidden` from first paint (the stylesheet is a blocking `<link>`
in `<head>`, so this is guaranteed to apply before the placeholder is ever
painted, regardless of where in `<body>` the script itself lives). The script
is responsible for removing the class once it sets the final value — there is
no automatic fallback, so a script that errors or forgets to reveal its
element will leave it hidden; that's a bug in the script to fix, not
something the theme papers over. No-JS visitors see the placeholder
immediately via the `.js-pending { visibility: visible; }` override in
`head.html`'s `<noscript>` block.
