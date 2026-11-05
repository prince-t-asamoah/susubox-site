# SusuBox
Your daily susu, recorded on WhatsApp — a fast, mobile-first website for a digital susu savings service for market traders in Ghana.

Status: in development

Live site: [LIVE_URL] · Design prototype: [PROTOTYPE_LINK]

## PageSpeed Insights (mobile)

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | [score] | [score] | [score] | [score] |
| Contact | [score] | [score] | [score] | [score] |

Screenshots: docs/pagespeed/

Target: 90+ in every category on mobile.

## Features

- Two pages (home + contact).
- Mobile-first layout tested on Android Chrome.
- Sticky header.
- Full-screen mobile menu overlay.
- Smooth scrolling to page sections.
- Floating WhatsApp button with pre-filled message.
- Netlify Forms contact form with spam protection.
- FAQ accordion that works without JavaScript.
- Accessible (WCAG 2.2 AA target).

## Tech stack

Astro (static output, near-zero client JavaScript), hand-written CSS with custom properties (no CSS framework), Netlify Forms, Netlify hosting.

Why Astro: it ships HTML with almost no JavaScript, has built-in responsive image optimisation, and provides a component structure that keeps copy easy to edit.

## Getting started

Prerequisites: Node.js LTS.

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Editing content

Site name, WhatsApp number, pre-filled message and email: `src/config.ts`. Page copy: `src/pages/index.astro` and `src/pages/contact/index.astro`.

## Changing the WhatsApp number and form

Set `whatsappNumber` in `src/config.ts` in international format, with no `+`, for example `233241234567`. Form submissions appear in the Netlify dashboard under Forms → "contact"; set email notifications there.

## Deploying to Netlify

Connect the GitHub repo in Netlify → build command `npm run build` → publish directory `dist` → deploy. The `netlify.toml` in the repo sets these automatically.

## Performance techniques

- Responsive AVIF/WebP images with fixed dimensions.
- Hero image preloaded; other images lazy-loaded.
- One self-hosted font, two weights.
- CSS inlined.
- No third-party scripts on page load.
- CSS-only smooth scroll and sticky header.

## Handover checklist

Sample content to confirm or replace with the owner's real details before launch:

- [ ] Business name
- [ ] WhatsApp number
- [ ] Email
- [ ] Statistics in the numbers strip
- [ ] Testimonial (real customer quote with permission, or remove)
- [ ] FAQ answers including pricing
- [ ] Office hours
- [ ] Open Graph image
- [ ] Custom domain

## Project documentation

- [docs/SPEC.md](docs/SPEC.md)
- [docs/SHARED-STANDARDS.md](docs/SHARED-STANDARDS.md)
- [docs/design/](docs/design/)

## Credits

Website by [Prince Twumasi Asamoah](https://github.com/prince-t-asamoah) ([LinkedIn](https://linkedin.com/in/prince-t-asamoah)).

Photo credits: [to be added]

## Licence

MIT — see LICENSE.
