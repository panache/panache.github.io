# Velocity Fund Website

Static site for [velocity.fund](https://velocity.fund) — Canada’s pre-seed fund for founders who move fast.

---

## 🚀 What this repo contains

- `index.html` – Homepage with hero, stats, ticker, company highlights, CTA
- `portfolio.html` – Filterable portfolio list (data+logic in assets/js/portfolio.js)
- `how-we-help.html` – Process, pillars, thesis, testimonials
- `team.html` – Founders + leadership profile
- `assets/css` – all CSS files
- `assets/js` – all behavior scripts
- `.nojekyll`, `_config.yml` — GitHub Pages config

## 📁 Current structure

```
/
├── index.html
├── portfolio.html
├── how-we-help.html
├── team.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── home.css
│   │   ├── portfolio.css
│   │   └── interior.css
│   └── js/
│       ├── main.js
│       └── portfolio.js
├── .nojekyll
├── _config.yml
└── README.md
```

## 🛠️ Local development

1. `cd /path/to/panache.github.io`
2. Start local server (any static server works):
   - `python3 -m http.server 8000`
   - or `npx serve .`
3. Open `http://localhost:8000`

### Quick validation

- In browser devtools Network tab, verify CSS/JS paths load from:
  - `assets/css/main.css`
  - `assets/css/home.css`
  - `assets/css/portfolio.css`
  - `assets/css/interior.css`
  - `assets/js/main.js`
  - `assets/js/portfolio.js`
- No 404s for CSS/JS.
- Console should be clean except known warnings.

## 🧩 HTML include conventions

All pages should include:

- Google fonts (same on all pages)
- Shared CSS: `<link rel="stylesheet" href="assets/css/main.css">`
- Page-specific CSS:
  - `index.html` → `assets/css/home.css`
  - `portfolio.html` → `assets/css/portfolio.css`
  - `how-we-help.html` + `team.html` → `assets/css/interior.css`
- Shared JS before `</body>`: `<script src="assets/js/main.js"></script>`
- Portfolio page also includes: `<script src="assets/js/portfolio.js"></script>`

## 🔧 Assets details

- `assets/css/main.css` – base typography, variables, layout, nav, footer, buttons, utility classes
- `assets/css/home.css` – hero, ticker, marquee, portfolio highlights, home-specific sections
- `assets/css/portfolio.css` – portfolio filters, cards, table/list styles
- `assets/css/interior.css` – interior page generic components for how-we-help/team

- `assets/js/main.js` – cursor effect, reveal-on-scroll, current nav highlight, shared interactive behavior
- `assets/js/portfolio.js` – data array and filtering rendering for portfolio page

## 🐛 Recent bug and fix history

- Issue: CSS/JS previously referenced `assets/css/...` and `assets/js/...`, but files were in root, causing 404s.
- Fixed: moved `.css` / `.js` files into `assets/` and standardized all HTML refs.

## ➕ Adding a new page

1. create `new-page.html`
2. include standard head block:
   - `<link rel="stylesheet" href="assets/css/main.css">`
   - page-specific CSS file under `assets/css`
3. include standard footer block with `<script src="assets/js/main.js"></script>`
4. add link to nav in all pages (or in global layout if refactor to template system)

## 🧪 Maintenance checklist

- Keep all shared style/behaviors in main assets.
- Keep page-specific logic in relevant HTML + per-page CSS/JS.
- When editing portfolio data: use array in `assets/js/portfolio.js`.
- If one page gets heavy logic, consider moving to a modular JS import setup (future refactor).

---

## 📦 Deploy to GitHub Pages

1. Push branch to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Expect site at `https://<username>.github.io/panache.github.io/` (or custom domain).

### Custom domain setup (`velocity.fund`)

- Root: `CNAME` file containing `velocity.fund`
- DNS record: `A` pointing to GitHub Pages IPs or `CNAME` to your github.io site
- GitHub handles SSL.

