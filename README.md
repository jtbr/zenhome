# Personal site

Hugo site, deployed to Cloudflare Pages. Source is private; only the built `public/` is served.

## Requirements

Hugo **extended** (required for SCSS via Hugo Pipes):

```bash
# macOS
brew install hugo

# Linux — snap ships extended by default
sudo snap install hugo

# Or download the hugo_extended_* binary from:
# https://github.com/gohugoio/hugo/releases
```

Verify you have the right build:

```bash
hugo version   # must say "extended"
```

## Local preview

```bash
hugo server -D
```

`-D` shows draft posts. Visit http://localhost:1313. Changes hot-reload.

For a production-like build (no drafts, minified):

```bash
hugo --minify
# output is in public/
```

## Configuration

Edit `hugo.toml`. Minimum things to fill in before launch:

- `baseURL` — your domain
- `title` — your name
- `params.tagline`, `.description`
- `params.author.*` — name, email, bio, background, availability
- `data/socials.yaml` — GitHub, LinkedIn, Twitter, etc. handles

## Adding content

```bash
# New writing (long-form post)
hugo new content writings/your-slug.md

# New "useful thing" (project/tool card)
hugo new content things/your-slug.md

# New note (short snippet)
hugo new content notes/2026-05-01-your-note.md
```

All new content is created as a draft (`draft: true`). Remove or set `draft: false` to publish.

### Enabling a section

In `hugo.toml`, flip the relevant flag under `[params.sections]`:

```toml
[params.sections]
  writings = true   # shows "Writings" in the nav
  things   = false
  notes    = false
```

## Math

Set `math: true` in a post's front matter. Then use:

- Inline: `$E = mc^2$` or `\(E = mc^2\)`
- Block: `$$...$$` or `\[...\]`

The Goldmark passthrough extension (configured in `hugo.toml`) keeps these delimiters intact; KaTeX renders them in the browser.

## Shortcodes (in-post components)

```
{{</* side-by-side left="..." right="..." */>}}

{{</* evidence */>}}
A foregrounded claim or finding.
{{</* /evidence */>}}

{{</* breaker */>}}

{{</* video src="https://www.youtube.com/embed/VIDEO_ID" title="..." */>}}

{{</* twitter-card user="handle" id="tweet-id" */>}}

{{</* gist user="..." id="..." */>}}
```

See `content/writings/component-showcase.md` (draft) for a live example of every shortcode.

## Comments (giscus)

1. Create a **public** GitHub repo, e.g. `<yourname>-comments`.
2. Settings → Features → Discussions: enable. Create category "General".
3. Install the giscus app on that repo: https://github.com/apps/giscus
4. Go to https://giscus.app, configure, and copy `repoId` + `categoryId`.
5. Paste into `hugo.toml` under `[params.comments]`, then set `enabled = true`.
6. On any post, add `comments: true` to its front matter.

## Code highlighting

Token colors are in `assets/scss/_code.scss` (GitHub Light + GitHub Dark). To change:

```bash
hugo gen chromastyles --style=dracula > /tmp/dracula.css
# Then copy the token blocks into _code.scss, replacing the existing ones.
```

Available styles: `github`, `monokai`, `dracula`, `nord`, `solarized-dark`, `solarized-light`, etc.

## Cloudflare Pages deployment

1. Create a **private** GitHub repo and push this directory.
2. Cloudflare Pages → Create project → Connect to Git → select the repo.
3. Build settings:
   - Build command: `hugo --minify`
   - Build output directory: `public`
4. Environment variables:
   - `HUGO_VERSION` — set to the version from `hugo version` locally
   - `HUGO_ENVIRONMENT` = `production`
5. Custom domain: Pages → Custom domains → add apex and `www`.
   Cloudflare auto-creates the DNS records since DNS is already on Cloudflare.
6. Web Analytics: enable in Cloudflare dashboard → paste token into `params.cloudflare_analytics_token` in `hugo.toml`.

Preview deploys happen automatically on every non-`main` branch push.

## Attribution

Visual reference: [Pudhina Fresh](https://github.com/ritijjain/pudhina-fresh) (MIT),
[Chalk](https://github.com/nielsenramon/chalk) (MIT) — fonts and typography approach.
