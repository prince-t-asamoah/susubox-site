# Shared Standards — Portfolio Demo Sites

**Owner:** Prince Twumasi Asamoah
**Purpose:** Three client-ready websites that prove the requirements of a client brief (TradeBase, Ghana): fast, mobile-first, 2-page static sites with a contact form, floating WhatsApp button and clean GitHub handover.

> **For coding agents:** Read this file first, then the project spec (`01-…`, `02-…`, `03-…`). This file defines rules that apply to *every* project. Where a project spec conflicts with this file, the project spec wins. Do not invent copy — use the copy in the project spec verbatim. If something is missing, leave a `TODO:` comment and report it rather than guessing.

---

## 1. Non-negotiable requirements

| # | Requirement | How it is verified |
|---|---|---|
| R1 | Google PageSpeed Insights **mobile** score ≥ 90 for Performance, Accessibility, Best Practices and SEO, on both pages | Run PageSpeed on the live Netlify URL; screenshot results into `docs/pagespeed/` |
| R2 | Mobile-first CSS: base styles target 360px width; enhance with `min-width` media queries only | Code review: no `max-width` media queries for layout |
| R3 | Works on Android Chrome (test at 360×740 and 412×915) | Chrome DevTools device mode + one real Android phone |
| R4 | Two pages: `index.html` (home) and `contact/` (contact page) | Both routes resolve on the live site |
| R5 | Working contact form (Netlify Forms or Formspree, per project spec) with success and error states | Submit a test entry; confirm it arrives |
| R6 | Floating WhatsApp button on every page | Visible bottom-right on both pages, opens `wa.me` link with pre-filled message |
| R7 | No WordPress, Wix, page builders, CSS frameworks (no Tailwind/Bootstrap), UI libraries or jQuery | `package.json` review |
| R8 | Public GitHub repo with a complete README | See §9 |
| R9 | Developer credit in the footer; all business details editable in one content/config file | See §8 |

---

## 2. Performance budget (per page, mobile)

| Asset | Budget |
|---|---|
| Total page weight (first load) | ≤ 500 KB |
| HTML | ≤ 30 KB |
| CSS (total) | ≤ 20 KB, inlined if < 14 KB |
| JavaScript (total) | ≤ 10 KB; zero JS is preferred |
| Hero image | ≤ 100 KB (AVIF/WebP) |
| Any other image | ≤ 60 KB |
| Web fonts | Max 1 family, 2 weights, self-hosted WOFF2, ≤ 60 KB total — or system font stack |
| Third-party requests on load | 0 (Formspree is only called on submit) |

**Targets:** LCP < 2.5s, CLS < 0.05, TBT < 150ms on PageSpeed mobile.

### Required techniques
- Every `<img>` has explicit `width` and `height` attributes and meaningful `alt` (or `alt=""` if decorative).
- Hero image: `fetchpriority="high"`, **not** lazy-loaded, preloaded with `<link rel="preload" as="image" imagesrcset=…>`.
- All images below the fold: `loading="lazy" decoding="async"`.
- Use `<picture>` with AVIF → WebP → JPEG fallback, and `srcset` at 480w, 800w, 1200w.
- Fonts: `font-display: swap`, preload the one primary WOFF2 file only.
- Icons: inline SVG only. No icon fonts, no icon libraries.
- No carousels, sliders, parallax, scroll-jacking or animation libraries.
- **Smooth scrolling for in-page section links** (nav and anchor links), CSS only — no JS scroll libraries:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    html { scroll-behavior: smooth; }
  }
  section[id] { scroll-margin-top: calc(var(--header-h) + 16px); } /* clears the sticky header */
  ```
  Users who prefer reduced motion get an instant jump. On mobile, tapping a link in the full-screen menu overlay closes the overlay first, then the page smooth-scrolls to the section (see §2b).
- CSS animations limited to `transform`/`opacity`, wrapped in `@media (prefers-reduced-motion: no-preference)`.
- No Google Maps embed (use a static link to Google Maps instead).
- No analytics scripts.

---

## 2a. Sticky header (all projects, mobile and desktop)

The site header stays fixed at the top of the screen while the user scrolls, on every page and every screen size.

- CSS only: `header.site-header { position: sticky; top: 0; z-index: 40; }` (below the WhatsApp button's `z-index: 50`). No scroll-listener JS.
- Define the height once as a token and reuse it: `--header-h: 60px` on mobile, `72px` at ≥ 768px. Keep the mobile header compact (one row) so it never takes more than ~10% of a 740px-tall screen.
- Solid background colour (no transparency or `backdrop-filter` blur — blur is expensive on low-end Android phones). Add a 1px bottom border or a light shadow so content scrolling underneath is clearly separated.
- Section links must land below the header: use `scroll-margin-top: calc(var(--header-h) + 16px)` on `section[id]`.
- On mobile the menu button in the sticky header opens a full-screen overlay (see §2b).
- Hero layouts must account for the header height so the H1 and primary button still fit above the fold at 360×740.
- No layout shift: the header must not change height or position when scrolling starts (CLS stays < 0.05).
- Skip link must still work and appear above the sticky header when focused.

## 2b. Mobile menu — full-screen overlay (all projects, < 768px)

On mobile, tapping the menu button opens a menu that **covers the entire screen**, including the header and the floating WhatsApp button.

**Build**
- Use a native `<dialog id="mobile-menu">` opened with `showModal()` and closed with `close()`. ~1 KB of vanilla JS, loaded with `defer`. No libraries.
- Style: `dialog#mobile-menu { position: fixed; inset: 0; width: 100%; height: 100dvh; max-width: none; max-height: none; margin: 0; padding: 0; border: 0; }` with the project's solid background colour (no transparency or blur). `::backdrop` not needed (the dialog fills the screen).
- Menu button: `<button aria-controls="mobile-menu" aria-expanded="false">` with a 24px hamburger icon and visible label "Menu"; 48×48px tap target. Set `aria-expanded="true"` while open.
- **No-JS fallback:** the menu button is wrapped so that without JS it is a link to `#footer-nav`, where the footer repeats every nav link.

**Layout inside the overlay (top to bottom)**
1. Top bar, same height as the sticky header (`--header-h`): logo/wordmark on the left (links Home), **close button (✕, 48×48px, `aria-label="Close menu"`) on the right in exactly the same spot as the menu button**.
2. Nav links stacked vertically: 24px text, 700 weight, each row ≥ 56px tall, with a thin divider between rows. Current page marked with `aria-current="page"` and an accent underline.
3. Bottom, pinned: full-width primary WhatsApp button (project's pre-filled message) and the project's secondary contact line. Respect `env(safe-area-inset-bottom)`.
- If the content is taller than the screen, the overlay scrolls internally (`overflow-y: auto`).

**Behaviour**
- Opening locks page scroll (`document.documentElement.style.overflow = "hidden"`); closing restores it and the scroll position.
- Closes on: ✕ button, Esc key, tapping any link, and resizing to ≥ 768px.
- Tapping a section link closes the overlay **then** smooth-scrolls to the section (or navigates to the other page and scrolls there).
- Focus moves to the first link on open and returns to the menu button on close (native `<dialog>` handles the trap).
- Floating WhatsApp button is hidden while the overlay is open (the overlay has its own WhatsApp button).
- Animation: 150ms fade (`opacity`) inside `@media (prefers-reduced-motion: no-preference)`; instant otherwise. No slide-in.
- Desktop (≥ 768px): menu button and overlay are not rendered; links show inline in the header.

## 3. Browser & device support

- Android Chrome (latest 2 versions) — primary
- iOS Safari, desktop Chrome, Firefox, Edge (latest) — secondary
- Minimum layout width: 320px, no horizontal scroll at any width

---

## 4. Accessibility (WCAG 2.2 AA)

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. One `<h1>` per page; no skipped heading levels.
- "Skip to content" link as first focusable element.
- Colour contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI controls.
- Tap targets ≥ 48×48px.
- Visible focus style on every interactive element (`:focus-visible`, 3px outline).
- Form fields have `<label>`s (not placeholder-only), `autocomplete` attributes, and errors announced with `aria-live="polite"`.
- `<html lang="en">`.
- Mobile navigation: full-screen overlay built on the native `<dialog>` element (see §2b) — focus trap, Esc-to-close and inert background come from the browser.

---

## 5. Floating WhatsApp button (all projects)

**Behaviour**
- Fixed position, bottom-right, `16px` from edges (`24px` at ≥ 768px), above all content (`z-index: 50`).
- 56×56px circle, background `#25D366`, white inline SVG WhatsApp glyph (24px).
- Link: `https://wa.me/<NUMBER>?text=<URL-encoded message>` — number and message come from the project's site config (see project spec).
- `target="_blank" rel="noopener"`.
- `aria-label="Chat with us on WhatsApp"`.
- Subtle shadow; on hover/focus scale to 1.05 (respect reduced motion).
- Must not cover the form submit button or footer links on a 360px screen — add `padding-bottom: 88px` to `<footer>` on mobile.
- Respect iOS safe area: `bottom: max(16px, env(safe-area-inset-bottom))`.

**Number:** use the placeholder `233000000000` in config and mark it `TODO`. Prince will set the real number before deploying.

**Reference markup**
```html
<a class="wa-float" href="https://wa.me/233000000000?text=Hello%2C%20I%20found%20you%20online"
   target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24"><!-- WhatsApp path --></svg>
</a>
```

---

## 6. Contact form standards

**Fields:** defined per project. All forms must:
- Use `method="POST"`, proper `name` attributes, `required` on mandatory fields, correct `type` (`email`, `tel`).
- Ghana phone field: `type="tel" inputmode="tel" autocomplete="tel" pattern="^(\+233|0)[0-9]{9}$"` with hint text "e.g. 024 123 4567 or +233 24 123 4567".
- Include a honeypot field for spam (`netlify-honeypot="bot-field"` for Netlify; `_gotcha` hidden input for Formspree).
- Show inline validation messages on blur and on submit.
- On success: show a confirmation message on the page (or a `/contact/thanks/` page for Netlify) — never a raw third-party page.
- On failure: show "Something went wrong. Please try again or message us on WhatsApp." with the WhatsApp link.
- Disable the submit button and show "Sending…" while submitting (JS enhancement only; form must still submit without JS).

### Netlify Forms pattern (Projects 1 and 3)
```html
<form name="contact" method="POST" action="/contact/thanks/" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact">
  <p hidden><label>Don't fill this out: <input name="bot-field"></label></p>
  <!-- fields -->
</form>
```
The form must exist in the **built static HTML** so Netlify detects it at deploy time.

### Formspree pattern (Project 2)
```html
<form action="https://formspree.io/f/FORM_ID" method="POST">
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off">
  <!-- fields -->
</form>
```
Progressive enhancement: intercept submit with `fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })` and render success/error inline. `FORM_ID` is a `TODO` placeholder.

---

## 7. SEO & meta (every page)

- Unique `<title>` (≤ 60 chars) and `<meta name="description">` (≤ 155 chars) — given per project.
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<meta name="theme-color">` matching the project's primary colour.
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630 JPEG ≤ 120 KB), `og:type=website`, `og:url`.
- `<link rel="canonical">`.
- Favicon: SVG favicon + 180×180 `apple-touch-icon.png`.
- `robots.txt` and `sitemap.xml`.
- JSON-LD `LocalBusiness` or `Organization` schema as specified per project.

---

## 8. Developer credit & sample content

**Footer credit (every page), exact text:**
> Website by Prince Twumasi Asamoah · [GitHub](REPO_URL)

Small text (14px), muted colour, still meeting contrast rules. The owner may remove it after handover.

**Sample content rule:** the sites are built to be handed over to real businesses. Until then, business facts (name, address, phone, prices, figures, history, people's names, testimonials) are *sample content*. Agents must:
- Keep every business fact in the project's content/config file(s), never hard-coded in templates.
- Mark each sample value with a `SAMPLE:` comment (e.g. `// SAMPLE: replace with owner's address`).
- List every sample value in the README **Handover checklist** so the owner can confirm or replace it.
- Never present sample testimonials or figures as verified facts in meta tags or structured data until the owner confirms them.

---

## 9. Repository & README

**Repo naming:** `susubox-site`, `auntie-esis-kitchen-site`, `kumasi-tailors-association-site`.

**Every repo contains:**
```
/docs/
  SPEC.md                 ← copy of the project spec
  SHARED-STANDARDS.md     ← copy of this file
  pagespeed/              ← mobile PageSpeed screenshots for both pages
/netlify.toml
/README.md
/LICENSE                  ← MIT
/.editorconfig
/.gitignore
```

**README must include:**
1. Project name, one-line description, live URL.
2. PageSpeed mobile scores table (Performance / Accessibility / Best Practices / SEO) for both pages, with screenshot links.
3. Tech stack and why it was chosen.
4. How to run locally (`npm install`, `npm run dev`) and build (`npm run build`).
5. How to edit the copy (point to the exact file).
6. How to change the WhatsApp number and form endpoint.
7. Deployment steps on Netlify.
8. Performance techniques used (bullet list).
9. Photo credits, and a **Handover checklist** listing every `SAMPLE:` value the owner must confirm or replace.

**Commits:** small, conventional commits (`feat:`, `fix:`, `perf:`, `docs:`, `chore:`). No generated build output committed (`dist/` and `.astro/` in `.gitignore`).

---

## 10. Netlify configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build"     # omit for Project 2 if no build step
  publish = "dist"              # Astro: dist · Plain HTML: "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "DENY"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```
Asset filenames must be hashed (Astro does this by default; for plain HTML, add a version suffix or rely on Netlify's asset handling and set cache for `/images/*` and `/fonts/*` instead).

---

## 11. Photography rules

- Source: Unsplash or Pexels only (free licence). Record photographer name + URL in README "Photo credits".
- Search terms are given per project. Prefer photos of **Ghanaian / West African** people and settings; avoid generic stock that obviously isn't Ghana.
- No photos of identifiable children.
- Process every image: crop to required aspect ratio → export AVIF (quality 50) and WebP (quality 70) at 480/800/1200w → JPEG fallback at 800w.
- Store originals outside the repo; commit only optimised files under `/public/images/` (Astro) or `/images/` (others).
- If a suitable photo cannot be found, use a solid colour block with an inline SVG illustration and leave a `TODO: photo` comment.

---

## 12. Definition of done (every project)

- [ ] Both pages built exactly to the project spec copy and layout
- [ ] Lighthouse mobile ≥ 90 in all four categories on both pages (local check), confirmed on live PageSpeed
- [ ] No console errors; HTML validates (W3C) with no errors
- [ ] No horizontal scroll at 320px; tested at 360px, 412px, 768px, 1280px
- [ ] Keyboard-only navigation works across both pages
- [ ] Mobile menu opens as a full-screen overlay; closes with ✕, Esc and link taps; page behind does not scroll; focus returns to the menu button
- [ ] Header stays stuck to the top while scrolling on mobile and desktop, without covering section headings
- [ ] Section links smooth-scroll (instant with reduced motion) and the heading lands below the header
- [ ] Form submission tested end to end (success + failure state)
- [ ] WhatsApp button opens chat with pre-filled message on Android
- [ ] Deployed to Netlify on a clean subdomain (e.g. `susubox-site.netlify.app`)
- [ ] README complete with live URL and score screenshots
- [ ] Developer credit in footer; every sample value marked `SAMPLE:` and listed in the README handover checklist

---

## 13. How a coding agent should work through a project

1. Read `SHARED-STANDARDS.md` and the project `SPEC.md` fully.
2. Produce an implementation plan (file tree + order of work) and **stop for review** before writing code.
3. Scaffold the project and `netlify.toml`; commit.
4. Build global styles: tokens (CSS custom properties), reset, typography, layout utilities; commit.
5. Build shared components: header/nav, footer (with disclaimer), WhatsApp button; commit.
6. Build home page section by section, in spec order; commit after each section.
7. Build contact page and form handling; commit.
8. Add meta, OG image, favicon, sitemap, robots, JSON-LD; commit.
9. Run Lighthouse mobile locally; fix anything below 90; commit with `perf:`.
10. Write README; commit.
11. Report: what was built, Lighthouse scores, all remaining `TODO`s.
