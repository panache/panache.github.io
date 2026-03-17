# Velocity Fund Website

Static site for [velocity.fund](https://velocity.fund) — Canada's pre-seed fund for founders who move fast.

## Structure

```
/
├── index.html              # Homepage
├── portfolio.html          # Full portfolio with filters
├── how-we-help.html        # Pillars, process, thesis, testimonials
├── team.html               # GP bios + Waterloo context
├── assets/
│   ├── css/
│   │   ├── main.css        # Shared: tokens, reset, nav, footer, buttons, utils
│   │   ├── home.css        # Homepage only: hero, ticker, marquee
│   │   ├── portfolio.css   # Portfolio page: filter bar, cards, grid
│   │   └── interior.css    # How We Help + Team: pillars, timeline, GP cards
│   └── js/
│       ├── main.js         # Shared: cursor, scroll reveal, nav active state
│       └── portfolio.js    # Portfolio data, filter logic, render
├── .nojekyll               # Skips Jekyll processing on GitHub Pages
├── _config.yml             # GitHub Pages config
└── README.md
```

## Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Site will be live at `https://<username>.github.io/<repo>/`

### Custom domain (velocity.fund)

Add a `CNAME` file to the repo root:
```
velocity.fund
```

Then in your DNS provider, add:
- `A` record → `185.199.108.153` (and the other three GitHub Pages IPs)
- Or `CNAME` record → `<username>.github.io`

GitHub Pages will auto-provision an SSL certificate via Let's Encrypt.

## Editing content

- **Portfolio data** lives entirely in `assets/js/portfolio.js` — the `PORTFOLIO` array at the top
- **Homepage portfolio highlights** are hand-picked cards in `index.html`
- **GP bios** are in `team.html`
- **Testimonials** are in `how-we-help.html`
- **Fonts** load from Google Fonts CDN — no local font files needed

## Adding a new page

1. Create `new-page.html` in root
2. Add `<link rel="stylesheet" href="assets/css/main.css">` + any page-specific CSS
3. Copy the `<nav>` and `<footer>` blocks from any existing page
4. Add `<script src="assets/js/main.js"></script>` before `</body>`
5. Add the page to the nav `<ul>` in all four HTML files
