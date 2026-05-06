# zen home

A minimal, text-centered Hugo theme for a personal professional site. Landing page, writings, useful things, and notes. Dark/light mode, KaTeX math, giscus comments (based on git discussions), configurable fonts, RSS, figure captions, gist, tweet and video embeds, and more.

## Repository layout

```
zenhome/                   ← theme repo (this repo)
  layouts/                  Hugo templates
  assets/scss/              SCSS (compiled via Hugo Pipes — requires extended binary)
  assets/js/                Vanilla JS (dark mode toggle)
  archetypes/               Content templates for hugo new
  data/socials.yaml         Default social links (override in your site)
  theme.toml                Theme metadata
  exampleSite/              Complete working demo — also the development harness
    hugo.toml               Site config (theme = "zenhome", themesDir = "../..")
    content/                Sample posts, things, and notes
    static/                 Sample images
    data/socials.yaml       Overrides the theme default
```

The theme and the demo site are developed together in one repo. To preview the demo:

```bash
cd exampleSite
hugo server --themesDir ../.. -D
```

`-D` includes draft posts. Visit http://localhost:1313. Changes to theme files hot-reload.

## Using this theme in your own site

### 1. Add the theme as a git submodule

```bash
# From your site's root
git submodule add https://github.com/jtbr/zenhome themes/zenhome
git submodule update --init
```

### 2. Configure hugo.toml

```toml
theme = "zenhome"
```

Everything else is the same as `exampleSite/hugo.toml` — copy it and fill in your values.

### 3. Override socials

Copy `themes/zenhome/data/socials.yaml` to `data/socials.yaml` in your site and edit. Your copy takes precedence. Any [Remix icon](https://remixicon.com/) works — set `icon` to the name including the `ri-` prefix (e.g. `ri-instagram-lines`).

### 4. Update the theme later

```bash
git submodule update --remote
```

### Cloudflare Pages — submodule note

In the Cloudflare Pages build settings, enable **"Clone submodules"** (under Build → Advanced). Otherwise the theme directory will be empty at build time.

---

## Requirements

Hugo **extended** is required for SCSS compilation via Hugo Pipes:

```bash
# macOS
brew install hugo

# Linux
sudo snap install hugo   # snap ships extended by default
# (or other native installer)

# Or download hugo_extended_* from https://github.com/gohugoio/hugo/releases
```

Verify:

```bash
hugo version   # must say "extended"
```

---

## Configuration

All settings live in `hugo.toml`. Minimum to fill in before launch:

| Key | Description |
|---|---|
| `baseURL` | Your domain (`https://yourdomain.com/`) |
| `title` | Your name |
| `params.tagline` | One-line professional tagline |
| `params.description` | 1–2 sentences for SEO / OG tags |
| `params.author.name` | Displayed in nav, homepage `<h1>`, and schema.org markup |
| `params.author.email` | Used in schema.org markup; include in `content/_index.md` if you want it on the page |
| Landing page body | Written as markdown in `content/_index.md`; use `##` for section labels (Background, Availability, etc.) |

### Enabling sections

Sections are hidden by default. Flip the relevant flag when you have content:

```toml
[params.sections]
  writings = true   # shows "Writings" in nav, enables /writings/
  things   = false
  notes    = false
```

### Fonts

Change the Google Fonts loaded and used sitewide:

```toml
[params.fonts]
  display          = "Cormorant Garamond"           # headings + landing name
  display_weights  = "ital,wght@0,500;0,700;1,500"
  display_fallback = "Georgia, 'Times New Roman', serif"
  body             = "Raleway"                      # body text + nav
  body_weights     = "wght@300;400;600;700"
  body_fallback    = "-apple-system, system-ui, sans-serif"
  mono             = "JetBrains Mono"               # code blocks
  mono_weights     = "wght@400;600"
  mono_fallback    = "'SF Mono', Menlo, Consolas, monospace"
```

`*_weights` is the Google Fonts CSS2 API weight spec — find the right value on [fonts.google.com](https://fonts.google.com). `*_fallback` is the system font stack shown during load or if Google Fonts is unavailable; update it if you switch font categories (e.g. swapping `display` to a sans-serif means `Georgia, serif` is the wrong fallback).

---

## Adding content

```bash
# Long-form post
hugo new content writings/your-slug.md

# Useful thing (external link + description, shown as a modal card)
hugo new content things/your-slug.md

# Short note
hugo new content notes/your-slug.md
```

New content is created as `draft: true`. Remove the `draft` line or set it to `false` to publish.

### Useful Things front matter

Things are designed as a curated links page. Cards with a `link:` open a modal; cards without navigate to their own page.

```yaml
---
title: "Tool or resource name"
date: 2026-01-01
tagline: "One sentence description shown on the card."
link: "https://example.com"        # omit for an internal detail page instead
image: "/img/things/screenshot.jpg" # optional 16:9 card image
---
Longer description shown in the modal or on the detail page.
```

---

## Math

Set `math: true` in front matter. Then use:

- Inline: `$E = mc^2$` or `\(E = mc^2\)`
- Block: `$$...$$` or `\[...\]`

KaTeX renders in the browser. The Goldmark passthrough extension (in `hugo.toml`) keeps delimiters intact through Markdown processing.

---

## Shortcodes

```
{{</* figure src="/img/photo.jpg" alt="..." caption="Caption." credit="Source" crediturl="https://..." */>}}

{{</* video src="https://www.youtube.com/embed/VIDEO_ID" title="..." caption="Optional caption." */>}}

{{</* side-by-side left="**Left** column." right="**Right** column." */>}}

{{</* evidence */>}}
A foregrounded claim or key finding.
{{</* /evidence */>}}

{{</* breaker */>}}

{{</* twitter-card user="handle" id="tweet-id" */>}}

{{</* gist user="..." id="..." */>}}
```

See `exampleSite/content/writings/component-showcase.md` (draft) for a live example of every shortcode.

---

## Comments (giscus)

1. Create a **public** GitHub repo, e.g. `yourname-comments` (it doesn't have to host your site, just needs to be public)
2. Settings → Features → Discussions: enable. Create a "General" category.
3. Install the giscus GitHub App on that repo: https://github.com/apps/giscus
4. Go to https://giscus.app, select the repo, copy `repoId` and `categoryId`.
5. Fill in `hugo.toml` under `[params.comments]`, then set `enabled = true`.
6. On any post, add `comments: true` to its front matter.

---

## Code highlighting

Token colors are in `assets/scss/_code.scss` — GitHub Light by default, with GitHub Dark overrides under `[data-theme="dark"]`. To use a different theme:

```bash
hugo gen chromastyles --style=dracula
```

Copy the output into `_code.scss`, replacing the existing token blocks. Available themes include `github`, `monokai`, `dracula`, `nord`, `solarized-dark`, `solarized-light` full list [here](https://xyproto.github.io/splash/docs/all.html)

---

## Cloudflare Pages deployment (recommended)

1. Push your site repo (with the theme submodule) to a **private** GitHub repo.
2. Cloudflare Pages → Create project → Connect to Git → select the repo.
3. Build settings:
   - Build command: `hugo --minify`
   - Output directory: `public`
4. Advanced → enable **Clone submodules**.
5. Environment variables:
   - `HUGO_VERSION` — match the version from `hugo version` locally
   - `HUGO_ENVIRONMENT` = `production`
6. Custom domain: Pages → Custom domains → add apex and `www`. Cloudflare auto-creates DNS records.
7. Web Analytics: enable in Cloudflare dashboard → paste the token into `params.cloudflare_analytics_token`.

Branch preview deploys are created automatically for every non-`main` push.

---

## GitHub Pages deployment

Hugo requires the extended binary, which GitHub Actions can install directly.

### 1. Enable GitHub Pages

In your site repo: **Settings → Pages → Source** → select **GitHub Actions**.

### 2. Add the workflow

A custom deployment will be necessary. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.145.0   # keep in sync with your local version
    steps:
      - name: Install Hugo (extended)
        run: |
          wget -O ${{ runner.temp }}/hugo.deb \
            https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb
          sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Checkout (with submodules)
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Configure Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Build
        run: hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

The `configure-pages` action automatically sets the correct `baseURL` — for a user/org site (`username.github.io`) that is `https://username.github.io/`, for a project site (`username.github.io/repo`) it includes the path prefix.

### 3. Disable relativeURLs

The example `hugo.toml` has `relativeURLs = true`, which breaks project sites (where the site lives at a sub-path). Remove or comment it out:

```toml
# relativeURLs = true   # remove this for GitHub Pages
```

### 4. Custom domain (optional)

Add a `CNAME` file to your site's `static/` directory containing just your domain:

```
yourdomain.com
```

Then in **Settings → Pages → Custom domain**, enter the same domain. GitHub creates the DNS verification record; point your domain's DNS to GitHub's servers per [their docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## Attribution

Typography and visual approach inspired by [Chalk](https://github.com/nielsenramon/chalk) (MIT) and [Pudhina Fresh](https://github.com/ritijjain/pudhina-fresh) (MIT).
