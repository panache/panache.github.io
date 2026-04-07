# Velocity Fund Website

Static site for [velocity.fund](https://velocity.fund) — Canada's pre-seed fund for founders who move fast.

---

## Pages

- `index.html` — Homepage: hero, stats, ticker, portfolio highlights, testimonials, CTA
- `portfolio.html` — Filterable portfolio grid (74+ companies, filter by fund/sector/location/year)
- `how-we-help.html` — Pillars, process timeline, thesis, testimonials
- `team.html` — GP bios (Akash Vaswani, Ross Robinson)

## File structure

```
/
├── index.html
├── portfolio.html
├── how-we-help.html
├── team.html
├── assets/
│   ├── css/
│   │   ├── main.css          # tokens, reset, nav, footer, buttons, shared utilities
│   │   ├── home.css          # hero, ticker, marquee, home portfolio cards
│   │   ├── portfolio.css     # filter bar, portfolio grid, co-card styles
│   │   └── interior.css      # team + how-we-help page components
│   ├── js/
│   │   ├── main.js           # reveal-on-scroll, apply mailto, nav state
│   │   ├── portfolio-data.js # PORTFOLIO array — one object per company
│   │   └── portfolio.js      # filter/search/render logic for portfolio page
│   └── images/
│       ├── logos/            # company logos (PNG, transparent bg)
│       ├── Akash-08.png
│       ├── Ross-3.png
│       └── VF Logo - White@4x.png
├── CNAME
├── .nojekyll
└── _config.yml
```

## Local development

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step. Pure HTML/CSS/JS.

## Portfolio data

Company records live in `assets/js/portfolio-data.js` as `window.PORTFOLIO`. Each entry:

```js
{
  display_name: "Scribenote",
  fund: "Fund II",
  fund_display: "Fund II",
  date: "2021-03-01",         // YYYY-MM-DD
  sector: "AI/ML",            // used for filter + badge colour
  location: "Canada",         // "Canada" | "United States"
  founders: "Ryan Gallagher · ...",
  desc: "...",
  round: "Pre-Seed",
  website: "https://...",
  logo: "assets/images/logos/scribenote.png",  // optional
  invested: 100000,
  fair_value: 150000,
  distributed: 0,
  status: "Active",
}
```

Cards with a `logo` field show the logo instead of the company name. Cards without a logo fall back to the text name.

## Company logos

Logos are stored in `assets/images/logos/`. They were downloaded from the live portfolio page and had backgrounds removed via flood-fill. To add a new logo:

1. Drop a PNG into `assets/images/logos/`
2. Add `"logo": "assets/images/logos/yourfile.png"` to the company object in `portfolio-data.js`

## Apply CTA

All "Apply" / "Tell Us About Your Company" links use `class="apply-mailto"`. `main.js` rewrites the `href` at runtime with a pre-filled mailto to `akash@velocity.fund`, `ross@velocity.fund`, `andrew@velocity.fund`.

## Nav logo

All pages use `assets/images/VF Logo - White@4x.png` in the nav. Turns yellow on hover via CSS filter.

## Deploy

Push to `main`. GitHub Pages serves from root. Custom domain configured via `CNAME` file (`velocity.fund`) + DNS A records pointing to GitHub Pages IPs.
