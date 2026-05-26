# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static business card website for **Odyssey** — a venture studio building web and mobile app products. The site lives at `theodyssey.one` and is shared with counterparties such as payment acquirers, integrators, and business partners.

No build tools, no dependencies, no package manager. Three files do everything: `index.html`, `styles.css`, `script.js`. Open `index.html` directly in a browser to preview.

## Deploying

The repo is hosted at `git@github.com:Mycelium-Lab/odyssey-landing.git`. Push `main` to deploy (connected to hosting via GitHub). No CI pipeline exists yet.

## Architecture

| File | Role |
|---|---|
| `index.html` | Single-page site. All sections in one file: Nav, Hero, About, Verticals, Process, Contact, Footer, Cookie banner |
| `styles.css` | All styles. Uses CSS custom properties defined in `:root`. BEM-ish class naming. |
| `script.js` | Nav scroll behaviour, mobile menu toggle, fade-up IntersectionObserver, contact form handler, cookie banner (localStorage key: `odyssey_cookie_consent`) |
| `cookie-policy.html` | Standalone legal page. Shares `styles.css`; has its own inline `<style>` block for page-specific layout. |

## Key details

**Contact form** — currently uses a `mailto:` fallback (form `action` contains the placeholder `YOUR_FORM_ID`). To activate Formspree, replace `YOUR_FORM_ID` in the `<form action="...">` attribute with a real Formspree endpoint.

**Cookie consent** — stored in `localStorage` under `odyssey_cookie_consent` (`"accepted"` or `"declined"`). No actual tracking scripts are wired up yet; the banner is purely for GDPR compliance display.

**Fonts** — loaded from Google Fonts (Inter). The `cookie-policy.html` page also uses the same font link.

**Colours** — all defined as CSS variables in `:root` at the top of `styles.css`. Primary gradient: `#8B5CF6 → #22D3EE`.

## Company info (used across the site)

- Domain: `theodyssey.one`
- Email: `hello@theodyssey.one`
- Address: Workland Maakri 25, Tallinn, Estonia
- Copyright year: 2026
