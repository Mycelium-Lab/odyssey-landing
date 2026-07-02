# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static business card website for **Odyssey** — a venture studio building web and mobile app products. The site lives at `theodyssey.one` and is shared with counterparties such as payment acquirers, integrators, and business partners.

No build tools, no dependencies, no package manager — a hand-written multi-page static site. All pages share `styles.css` + `script.js` and a duplicated (inline) nav / footer / cookie-banner block. Open any `.html` directly in a browser, or serve the folder (`python3 -m http.server -d . 8000`) to preview with correct relative paths.

**Design language:** dark "cosmic" theme — deep navy background, purple→cyan gradient, twinkling starfields (JS-generated into any `.starfield` element), a glowing planet on the homepage hero, and the compass logo (`assets/logo-mark.svg`). Interior pages use the `.page-hero` pattern; emoji icons were replaced by inline SVG line icons in gradient "chips" (`.icon-chip`).

## Deploying

The repo is hosted at `git@github.com:Mycelium-Lab/odyssey-landing.git`. Push `main` to deploy (connected to hosting via GitHub). No CI pipeline exists yet.

## Architecture

| File | Role |
|---|---|
| `index.html` | Homepage. Cosmic hero (starfield + planet + logo + tagline), then About, Verticals, Process, Contact sections, Footer, Cookie banner. Carries SEO/OG/JSON-LD in `<head>`. |
| `about.html` | Company story, facts panel, values. |
| `ventures.html` | Verticals (Health / Legal / Edu / Ent) + W2W/W2A models. |
| `approach.html` | Playbook (4-stage process) + "Before you build — 5 questions" checklist. |
| `insights.html` | Blog/insights index — article cards (topic previews, mostly "coming soon"). |
| `career.html` | Careers — perks + "no open roles yet" notice → `hello@theodyssey.one`. Has its own inline `<style>` block. |
| `contact.html` | Dedicated contact page (form + details). Primary target of "Get in touch". |
| `privacy.html`, `terms.html`, `cookie-policy.html` | Legal pages. Use shared `.policy` styles (`cookie-policy.html` still has a legacy inline `<style>` block). |
| `404.html` | Cosmic "Lost in space" page. |
| `styles.css` | All styles. CSS custom properties in `:root`. Sections: base, components, cosmic hero, interior pages, legal, motion/polish. |
| `script.js` | Nav scroll, mobile menu, fade-up observer, contact form (null-safe), cookie banner, magnetic primary buttons, starfield generator (fills every `.starfield`). |
| `assets/logo-mark.svg` | Compass logo — used in nav, footer, and as favicon on every page. |
| `assets/og.png` | 1200×630 social share image (referenced by `og:image`). Regenerate by screenshotting an HTML template. |
| `robots.txt`, `sitemap.xml` | SEO. Sitemap lists all public pages under `https://theodyssey.one/`. |

**Shared blocks are duplicated** across every page (nav, mobile menu, footer, cookie banner). When editing navigation or the footer, update it in **all** pages — there is no include mechanism.

## Key details

**Contact form** — currently uses a `mailto:` fallback (form `action` contains the placeholder `YOUR_FORM_ID`). To activate Formspree, replace `YOUR_FORM_ID` in the `<form action="...">` attribute with a real Formspree endpoint.

**Cookie consent** — stored in `localStorage` under `odyssey_cookie_consent` (`"accepted"` or `"declined"`). No actual tracking scripts are wired up yet; the banner is purely for GDPR compliance display.

**Fonts** — loaded from Google Fonts (Inter). The `cookie-policy.html` page also uses the same font link.

**Colours** — all defined as CSS variables in `:root` at the top of `styles.css`. Primary gradient: `#8B5CF6 → #22D3EE`.

**Logo** — `assets/logo-mark.svg` (gradient compass). Used inline in nav/footer (`.nav__logo` + `.nav__logo-mark`) and as the SVG favicon on every page.

**Starfields** — any element with class `starfield` is filled with twinkling star `<span>`s by `script.js` on load; control density with `data-stars="N"`.

**SEO** — `index.html` carries canonical, Open Graph, Twitter card, and JSON-LD `Organization`. Other pages carry canonical + `og:image` (`assets/og.png`). Keep `sitemap.xml` in sync when adding pages.

**Legal** — `privacy.html`, `terms.html`, `cookie-policy.html` are template copy (GDPR-flavoured) operated under Baltic Mobile OÜ; have counsel review before relying on them.

**Motion** — magnetic primary buttons + hero blob drift + starfield twinkle, all gated behind `prefers-reduced-motion`.

## Company info (used across the site)

- Domain: `theodyssey.one`
- Email: `hello@theodyssey.one`
- Address: Workland Maakri 25, Tallinn, Estonia
- Copyright year: 2026
