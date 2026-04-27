# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quantum Shop Studio LLC portfolio: a Shopify development freelancer portfolio. Two implementations coexist in this repo:

1. **Static HTML/CSS/JS** (primary): `index.html`, `portfolio.html`, `css/main.css`, `js/nav.js`, `js/portfolio.js`
   - Pure static site, no build step, instant load
   - Dark quantum aesthetic: magenta (#FF2EBF) + cyan (#2EEBFF) on deep space black (#070A12)
   - WCAG 2.1 AA + ADA accessible, screen reader optimized
   
2. **Next.js/React** (legacy): `app/`, `components/`, `lib/`, `content/`
   - Kept for reference; not actively used

## Quick Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Build for production
npm start            # Run production server
npm run lint         # Run ESLint
```

## Static Site Structure (Current Active Implementation)

### Files
- `index.html` — Home/splash page: hero, services (5), workflow (3-step), about, contact stub
- `portfolio.html` — Work samples: 6 project cards, filterable by 6 categories, with screenshots + Loom embeds
- `terms.html`, `privacy.html` — Legal pages
- `css/main.css` — Complete design system via CSS custom properties; all responsive layouts
- `js/nav.js` — Mobile menu: aria-expanded toggle, Tab trap, Escape, focus management
- `js/portfolio.js` — Filter functionality: show/hide by data-tags, aria-pressed state, aria-live count announcements

### Design System (`css/main.css`)
All design via `:root` CSS variables — change one place to update everything:
- **Colors**: `--color-magenta` (#FF2EBF), `--color-cyan` (#2EEBFF), `--color-bg` (#070A12), with dim/glow variants
- **Typography**: Fluid scales via `clamp()` (no fixed px), system fonts + Google (Inter, JetBrains Mono)
- **Spacing**: `--max-w` (75rem), `--touch-min` (44px), nav height, page padding, radius utilities
- **Motion**: All animations wrapped in `@media (prefers-reduced-motion: no-preference)` — static by default
- **Shadows**: Cyan/magenta glow effects for interactive feedback

### WCAG 2.1 AA / ADA Compliance (Non-Negotiable)
- **Skip Link**: First DOM element; activating focuses `<main tabindex="-1">` (NVDA/JAWS requirement)
- **Semantic HTML**: `<header role="banner">`, `<main>`, `<section aria-labelledby="...">`, `<article aria-labelledby="...">`, `<footer role="contentinfo">`
- **Heading Hierarchy**: Single h1 per page; strict h2 → h3, no skipped levels
- **Images & Iframes**: All `<img>` have descriptive alt text; all `<iframe>` have unique, descriptive `title` attributes
- **Live Regions**: `aria-live="polite" aria-atomic="true"` region pre-exists in HTML (not created by JS)
- **Mobile Menu**: `aria-expanded` state, `aria-controls` reference, Tab-wraps within menu, Escape closes + returns focus
- **Filter Buttons**: `aria-pressed="true/false"` state, `role="group"` container label
- **Motion**: All animations/transitions inside prefers-reduced-motion media query (static is the default)
- **High Contrast**: `@media (forced-colors: active)` ensures borders/outlines visible in Windows High Contrast mode
- **Touch Targets**: 44px minimum via `--touch-min` CSS variable on all buttons/links
- **Color Contrast**: 4.5:1 or higher for normal text (tested: text/bg ~16:1, cyan/bg ~10.5:1, magenta/bg ~5.8:1)
- **Keyboard**: Only native `<button>` and `<a>` elements; no div-click patterns; all interactive elements are natively focusable
- **Focus Indicator**: `*:focus-visible` rule applies visible outline (3px cyan, offset 3px); never suppressed

### Content Updates
- **Add project card**: Duplicate `<article class="card card--project" data-tags="slug1 slug2">` block with `<img>` screenshot and/or `<iframe>` Loom video
- **Update filter categories**: Button `data-filter` attribute must exactly match card `data-tags` values (space-separated slugs)
- **Hero/services/about**: Edit HTML text directly; no separate content file like site.js

### Common Edits
- Change colors: update `:root` in css/main.css (affects all pages)
- Adjust spacing: modify `--px-page`, `--max-w`, or `--touch-min` in css/main.css
- Add portfolio project: copy a card block in portfolio.html, update title/description/tags/media, ensure data-tags matches button filters
- Update legal pages: edit terms.html or privacy.html directly

### Gotchas (Critical)
1. **`<main tabindex="-1">`** is **required** for skip link to deliver focus; without it, screen readers won't announce the main content
2. **`aria-live` region must pre-exist** in static HTML, never created by JS; JS only populates content
3. **Use `hidden` attribute** (not CSS class) to hide filter results; removes from a11y tree correctly
4. **Loom iframe `title` attribute** is critical — each embed needs a unique, descriptive title; easy to forget on copy-paste
5. **rAF trick in portfolio.js**: clear live region text on one frame, then set new text on next (requestAnimationFrame) to force JAWS re-announcement when same filter is re-applied
6. **`aria-current="page"`** is hard-coded per page in HTML nav links; setAriaCurrent() in nav.js is a safety check only

## Architecture & Structure (Legacy Next.js — Reference Only)

### Content Layer: `content/site.js`
Single source of truth for all portfolio content (hero text, services, samples, about section). Exported as `site` object. Pages/components import and destructure needed sections. Update here when changing any copy, service descriptions, or sample entries.

### Page Structure: `app/` directory
Next.js App Router with file-based routing:
- `layout.js` — Root layout with header, footer, skip link, metadata
- `page.js` — Home page featuring hero, services preview, samples grid, workflow section
- `services/page.js`, `about/page.js`, `samples/page.js` — Dedicated pages
- `contact/page.js` — Form-based contact with Mautic CRM integration
- `globals.css` — Base styles, custom CSS variables, animations

### Components: `components/`
- `Section.js` — Reusable section wrapper with auto-generated heading IDs for accessibility
- `Nav.js` — Sticky header with mobile-responsive hamburger menu, keyboard navigation (Escape, Tab trap)
- `ContactForm.js` — Contact form with Zod validation, Mautic API submission

### Utilities: `lib/`
- `mauticClient.js` — Mautic CRM API client
- `mauticAuth.js` — Bearer token authentication for Mautic
- `contactSchema.js` — Zod schema for contact form validation
- `rateLimit.js` — Rate limiting middleware for form submissions

### Design System: `tailwind.config.js`
Custom colors extend Tailwind:
- `bg: #070A12` — Main background
- `panel: #0B1020` — Card/panel backgrounds
- `neonCyan: #2EEBFF` — Primary accent
- `neonViolet: #A78BFA` — Secondary accent

Custom box shadows for glow effects on interactive elements.

## Key Patterns & Decisions

**Content Management:** All text content lives in `content/site.js`. This allows easy updates without touching components. Avoid hardcoding strings in JSX.

**Accessibility:** Built-in throughout:
- Skip link in root layout
- Semantic HTML (`<main>`, `<section>`, `<header>`, `<footer>` with roles)
- ARIA labels and `aria-current` for navigation state
- Auto-generated heading IDs in `Section.js` for screen reader navigation
- Keyboard navigation traps in mobile menu (Escape key, Tab cycling)
- `role="list"` and `role="listitem"` for capability cards

**Styling:** Tailwind utility classes. Custom glow effects via `shadow-glow` and `shadow-glow2`. Gradient/blur overlays use `aria-hidden` to exclude from a11y tree.

**Forms:** Contact form uses Zod for client-side validation. Server-side rate limiting prevents abuse. Mautic CRM integration handles lead capture.

## Development Workflow Notes

- Pages are server-side rendered by default; client interactivity uses `"use client"` pragma (see `Nav.js`)
- Component hierarchy is flat; prefer composition over abstraction unless component is reused 3+ times
- Tailwind IntelliSense in IDE may require `content` globs to be accurate in `tailwind.config.js`
- Focus styles and hover states are critical for accessibility; maintain consistent transition timing (`transition` class)

## When Refactoring or Adding Features

- If changing layout, typography, or spacing, start in `globals.css` or Tailwind config
- If adding a new service/sample/section, update `content/site.js` first; component changes cascade from there
- Form submissions go through Mautic; ensure rate limiting is not accidentally removed
- Mobile menu keyboard navigation is complex; test thoroughly if modifying `Nav.js` (Escape, Tab cycling, focus management)
- All section headings should use `Section.js` component to maintain consistent ID generation for a11y
