# Project 1 — SusuBox (Astro)

**Repo:** `susubox-site` · **Stack:** Astro (latest stable), zero client JS except the form enhancement · **Form:** Netlify Forms · **Deploy:** Netlify (`publish = "dist"`)

**This file has two parts:** Part A is the build spec for the coding agent. Part B is the Claude Design brief for the mockups and prototype.

> Read `SHARED-STANDARDS.md` first. Copy below is final — use it verbatim.

> **Sample content:** every business fact on this site (name, address, prices, figures, history, people's names, testimonials) is sample content kept in the content/config files. Replace it with the owner's real details before handover — see the README handover checklist.

---

# Part A — Build spec

## 1. Overview

SusuBox is a WhatsApp-based digital susu savings service for market traders in Ghana. Traders send their daily contribution amount by WhatsApp; SusuBox keeps the record and sends a weekly statement. Purpose: show a fintech landing page for informal traders — the closest match to the TradeBase brief.

**Primary goal of the site:** get traders to start a WhatsApp chat. Secondary: contact form for collectors and associations.

---

## 2. Design tokens

```css
:root {
  --color-primary: #0B6E4F;      /* deep green — buttons, links, headings accent */
  --color-primary-dark: #08513A; /* hover */
  --color-accent: #F2A900;       /* gold — highlights, step numbers */
  --color-ink: #1B1B1B;          /* body text */
  --color-muted: #5A5A5A;        /* secondary text */
  --color-bg: #FFFFFF;
  --color-surface: #F4F7F5;      /* alternate section background */
  --color-border: #DDE5E0;
  --radius: 12px;
  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2rem; --space-6: 3rem; --space-8: 4rem;
  --container: 72rem;
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```
- Font: Inter, self-hosted WOFF2, weights 400 and 700 only. Body 1rem/1.6; H1 2rem mobile → 3rem ≥ 768px; H2 1.5rem → 2.25rem.
- Buttons: min-height 48px, radius `--radius`, primary = green bg/white text; secondary = white bg/green border.
- `theme-color`: `#0B6E4F`.

---

## 3. Site config (`src/config.ts`)

```ts
export const site = {
  name: "SusuBox",
  url: "https://susubox-site.netlify.app",
  whatsappNumber: "233000000000", // TODO: real number
  whatsappMessage: "Hello SusuBox, I want to start saving.",
  email: "hello@susubox.example",
  repoUrl: "https://github.com/prince-t-asamoah/susubox-site",
};
```

---

## 4. File structure

```
src/
  config.ts
  layouts/Base.astro          ← <head>, meta, skip link, Header, Footer, WhatsAppButton
  components/Header.astro
  components/Footer.astro
  components/WhatsAppButton.astro
  components/Button.astro
  components/StepCard.astro
  components/FaqItem.astro     ← uses <details>/<summary>
  pages/index.astro
  pages/contact/index.astro
  pages/contact/thanks.astro
  styles/global.css
public/
  fonts/inter-400.woff2, inter-700.woff2
  images/…  favicon.svg  apple-touch-icon.png  og.jpg  robots.txt
```
Use Astro's `<Image>`/`<Picture>` from `astro:assets` for responsive AVIF/WebP output where possible (images in `src/assets/`).

---

## 5. Header (both pages)

- Left: wordmark "SusuBox" (text, 700 weight, green) linking to `/`.
- Right: nav links "How it works" (`/#how-it-works`), "FAQ" (`/#faq`), "Contact" (`/contact/`).
- Mobile (< 768px): links move into a full-screen menu overlay (shared standards §2b). Overlay background white; links in `--color-ink`; bottom button `Start saving on WhatsApp`; secondary line: email from config.
- **Sticky:** header stays fixed at the top on mobile and desktop (see shared standards §2a). White background with a 1px `--color-border` bottom border.

---

## 6. Home page (`/`)

**Title:** `SusuBox — Daily susu savings on WhatsApp`
**Description:** `Save daily with your susu collector and get a clear record on WhatsApp. Built for market traders in Ghana.`

### 6.1 Hero
- Layout: mobile = text then image stacked; ≥ 768px = two columns (text 55% / image 45%).
- Eyebrow (small caps, gold): `For market traders in Ghana`
- H1: `Your daily susu, recorded on WhatsApp`
- Paragraph: `Send your contribution by WhatsApp. SusuBox keeps the record, sends you a weekly statement, and helps you show lenders how well you save.`
- Primary button: `Start saving on WhatsApp` → WhatsApp link (same as floating button).
- Secondary button: `How it works` → `#how-it-works`.
- Trust line (muted, small): `No app to download · Works on any phone with WhatsApp`
- **Image:** woman trader at a market stall in Ghana smiling, holding a phone. Aspect 4:5. Search: "Ghana market woman phone", "Makola market trader". Alt: `A market trader checks her savings record on her phone`.

### 6.2 Problem strip (`--color-surface` background)
- H2: `Saving every day, but no record to show for it`
- Three short items (icon + text, 1 col mobile, 3 col ≥ 768px):
  1. **Paper cards get lost** — `A torn or missing susu card can mean weeks of savings with no proof.`
  2. **Banks ask for history** — `Lenders want records. Most traders have none on paper.`
  3. **No time to visit a bank** — `Your stall can't close for half a day to queue.`

### 6.3 How it works (`id="how-it-works"`)
- H2: `How SusuBox works`
- Three numbered `StepCard`s (gold number circle):
  1. **Message us on WhatsApp** — `Say hello and we register you in under five minutes. Just your name, market and phone number.`
  2. **Send your daily amount** — `Each day, type what you paid your collector. For example: "Paid 20 cedis".`
  3. **Get your weekly statement** — `Every Sunday we send a clear summary of what you saved. Download it any time.`
- Button below: `Start saving on WhatsApp`.

### 6.4 Benefits (two-column ≥ 768px: image left, list right)
- H2: `Built for how you already work`
- Checklist (inline SVG check icons, green):
  - `Works with your existing susu collector`
  - `Records in English or Twi`
  - `Weekly statements you can share with a lender`
  - `Your data stays private — only you see your record`
- **Image:** susu collector writing in a book or talking with a trader. Aspect 1:1. Search: "Ghana market collector", "West Africa market money". Alt: `A susu collector visits a trader at her stall`.

### 6.5 Numbers strip (green background, white text)
- Three stats (SAMPLE values — confirm with the owner before launch):
  - `GHS 20` — `average daily contribution`
  - `7 days` — `to your first statement`
  - `0` — `apps to download`

### 6.6 Testimonial
- Quote: `"Before, I kept my susu card in my handbag and prayed it didn't get wet. Now I check my savings on my phone."`
- Attribution: `— Ama, fabric seller, Kumasi`
- SAMPLE testimonial: replace with a real customer quote (with their permission) before launch, or remove the section.
- No photo (avoid implying a real person).

### 6.7 FAQ (`id="faq"`) — `<details>` accordion, first item open
1. **Is SusuBox a bank?** — `No. SusuBox keeps a record of the savings you give your collector. Your money stays with your collector as it always has.`
2. **What does it cost?** — `Registration is free. A small monthly fee applies after your first month.`
3. **Do I need a smartphone?** — `You need WhatsApp. Any phone that runs WhatsApp will work.`
4. **Can I use it in Twi?** — `Yes. You can send your messages in English or Twi.`
5. **Who can see my records?** — `Only you, unless you choose to share your statement with a lender or your association.`

### 6.8 Final CTA (`--color-surface`)
- H2: `Start your record today`
- Paragraph: `It takes five minutes on WhatsApp.`
- Primary button: `Start saving on WhatsApp`
- Text link: `Are you a collector or association? Contact us →` → `/contact/`

---

## 7. Contact page (`/contact/`)

**Title:** `Contact SusuBox`
**Description:** `Talk to SusuBox about bringing digital susu records to your market, association or collector group.`

- H1: `Talk to us`
- Intro: `For collectors, market associations and partners. Traders, the fastest way to reach us is WhatsApp.`
- WhatsApp card (above form, green border): `Prefer WhatsApp? Chat with us now →` (WhatsApp link).
- **Form (Netlify, name `contact`)** — fields:
  | Label | name | type | required |
  |---|---|---|---|
  | Full name | `name` | text, `autocomplete="name"` | yes |
  | Phone number | `phone` | tel (Ghana pattern) | yes |
  | Email (optional) | `email` | email | no |
  | I am a… | `role` | select: Trader / Susu collector / Market association / Partner / Other | yes |
  | Market or town | `market` | text | no |
  | Message | `message` | textarea, 5 rows | yes |
  - Submit button: `Send message`
- Side/below info block: `Office hours: Mon–Sat, 7am–6pm` · email from config.
- **Thanks page (`/contact/thanks/`)**: H1 `Thank you — we'll be in touch within one working day.` + button `Back to home`.

---

## 8. Structured data
JSON-LD `Organization`: name, url, logo (`/favicon.svg`), `contactPoint` (telephone from config, `contactType: "customer support"`, `areaServed: "GH"`, `availableLanguage: ["en","tw"]`).

---

## 9. Project-specific acceptance criteria
- [ ] All six WhatsApp CTAs (hero, how-it-works, final CTA, contact card, floating button ×2 pages) use the single config value
- [ ] FAQ works with JS disabled
- [ ] Netlify detects the `contact` form after first deploy (check Netlify → Forms)
- [ ] Shipped client JS ≤ 5 KB (Astro build output)
- [ ] Hero LCP image is the only preloaded image

---

# Part B — Claude Design brief

**Purpose:** Paste-ready brief for producing high-fidelity mockups of SusuBox in Claude Design. Export the mockups into the repo under `docs/design/` so the coding agent builds against them.

## D1. How to use

1. Open a new Claude Design project named "SusuBox".
2. Attach **`00-SHARED-STANDARDS.md`** and **`01-SUSUBOX-SPEC.md`**.
3. Paste the full prompt in §D2 as your first message.
4. Review the result against the checklist in §D4 and ask for fixes in follow-up messages.
5. Click through the prototype on a phone and a laptop. Export each frame as PNG, the prototype as HTML (or its share link), and the developer handoff package (into `docs/design/handoff/`) to `docs/design/` using the file names in §D3.
6. If the design changes copy, colours or spacing, update `01-SUSUBOX-SPEC.md` too. **The spec wins if they conflict.**

## D2. Prompt (paste as one message)

```
You are designing high-fidelity mockups for a small, fast, 2-page static website.
The attached SPEC.md is the source of truth: use its copy verbatim, its colour tokens,
fonts and section order. Do not invent new sections, features or copy. If something
is missing, mark it "TODO" on the canvas.

Constraints the design must respect (the site must score 90+ on Google PageSpeed mobile):
- Mobile-first. Design the 360px-wide mobile screen first, then the 1280px desktop.
- STICKY HEADER: the page header stays fixed to the top of the screen while
  the user scrolls, on mobile AND desktop. Keep it to one compact row
  (about 60px tall on mobile, 72px on desktop) with a solid background and a
  thin bottom border or light shadow — no transparent or blurred header.
  Make sure the hero H1 and primary button still fit above the fold on a
  360x740 screen with the header in place.
- MOBILE MENU: on mobile, the menu button opens a FULL-SCREEN OVERLAY that
  covers the whole screen (header and WhatsApp button included), with a solid
  background. Top bar matches the header height: logo left, a close (X)
  button right in exactly the same spot as the menu button. Below it, the nav
  links stacked vertically in large text (24px, rows at least 56px tall, thin
  dividers, current page marked). A full-width WhatsApp button pinned to the
  bottom. No slide-in drawer, no half-screen dropdown.
- No carousels, sliders, video backgrounds, parallax or heavy animation.
- One web font family maximum, two weights (or system fonts where the spec says so).
- Icons are simple line icons that can be drawn as inline SVG (24px grid, 2px stroke).
- Images only where the spec places them, with the aspect ratios it gives. Use
  realistic placeholder photography matching the spec's photo direction
  (Ghanaian people and settings); label each image frame with its aspect ratio.
- Tap targets at least 48px tall. Body text 16px minimum on mobile.
- Colour contrast WCAG AA: 4.5:1 body text, 3:1 large text and controls.
- A floating WhatsApp button (56px green #25D366 circle, white glyph) sits
  bottom-right on every screen, 16px from the edges on mobile, 24px on desktop.
  Make sure it never covers a button or form field.
- Footer on every page includes the credit: "Website by Prince Twumasi
  Asamoah · GitHub"

Spacing: 8px base scale (8, 16, 24, 32, 48, 64). Container max width as in the spec.
Mobile side gutter 16px; desktop 32px.

Deliver, as separate frames:
1. Home — mobile (360 wide, full length)
2. Home — desktop (1280 wide, full length)
3. Contact — mobile (360 wide)
4. Contact — desktop (1280 wide)
5. Contact form states — mobile: empty, field error, submitting ("Sending…"),
   success, submission failed
6. Mobile menu overlay open (360 wide, full screen, covering the page)
7. Component sheet: colour tokens with hex values, type scale (H1, H2, H3, body,
   small) with sizes in rem, buttons (primary, secondary, hover, focus-visible,
   disabled), form inputs (default, focus, error), cards, the WhatsApp button,
   and the icon set used.

8. A DEVELOPER HANDOFF package for a coding agent, exported with the design:
   - design tokens as CSS custom properties (colours, spacing, radii, type
     scale, header height) using the exact names and values in SPEC.md;
   - per-screen specs: layout grid, column counts, spacing between sections
     and elements, font sizes and weights, image aspect ratios, at 360px and
     1280px;
   - component specs and states (default, hover, focus-visible, disabled,
     error) for buttons, inputs, cards, header, mobile menu overlay and the
     WhatsApp button;
   - the interaction notes: sticky header, smooth scroll, overlay open/close,
     form states and each project-specific interaction;
   - all icons as clean, optimised inline SVG files;
   - a short README listing every place the design differs from SPEC.md.
   Use the "handoff to Claude Code" / export-for-developers option if
   available; otherwise put this in a single Markdown document plus the SVGs.

Also build a clickable PROTOTYPE that links the frames together, so the site
can be walked through like the real thing:
- Two flows: a mobile flow (360 wide, the primary one) and a desktop flow
  (1280 wide). Both start on the Home screen.
- The header is pinned (fixed position on scroll) in both flows, so it stays
  visible at the top as the long Home and Contact screens scroll underneath
  it.
- Header nav links and in-page anchor links (e.g. "How it works", "Menu",
  "Benefits", "FAQ", "Meetings") SMOOTH-SCROLL to their section on the same
  page (about 400-600ms, ease-in-out) instead of jumping. The section heading
  must land fully visible below the sticky header, not hidden under it. When the link
  is tapped from the open mobile menu, close the menu first, then scroll.
  Links to a section on Home from the Contact screen open Home and then
  smooth-scroll to that section.
- Every "Contact" / "Join" / enquiry button opens the Contact screen; the logo
  returns to Home.
- The mobile menu button opens the full-screen overlay (short fade); the X
  closes it. Tapping a link closes the overlay, then goes to / smooth-scrolls
  to the target. The floating WhatsApp button is hidden while it is open.
- Every WhatsApp button (floating and inline) opens a simple overlay showing
  a mock WhatsApp chat with the pre-filled message from the spec, with a
  close control. Do not link to real WhatsApp.
- Contact form: tapping the submit button with the form empty shows the
  error state; a "filled" path goes submitting -> success. Add a small
  prototype-only toggle to show the failure state.
- Screen transitions: instant or a short fade only (no slide or bounce
  effects), to match the performance rules of the real site. Smooth scrolling
  within a page is the one exception.
- Hover and focus states on buttons work in the desktop flow.
Label prototype-only controls clearly so they are not mistaken for site features.

Annotate spacing and font sizes on the component sheet, not on the page frames.
Keep the design clean and credible: this is a portfolio piece for a client who
wants "fast and clean", so restraint beats decoration.

---

Project: SusuBox — a WhatsApp-based digital susu savings record for
market traders in Ghana. Audience: market women and men aged 25–60 using
mid-range Android phones, often outdoors in bright sunlight.

Look and feel: trustworthy, warm fintech — not a bank, not a startup cliché.
Think clear, calm and confident. Deep green (#0B6E4F) leads; gold (#F2A900) is
used sparingly for step numbers and the eyebrow text only. Lots of white space,
generous line height, rounded 12px corners. Font: Inter 400/700.

Key moments to get right:
- Hero: the H1 and the "Start saving on WhatsApp" button must both be visible
  without scrolling on a 360×740 screen. On mobile, text sits above the photo.
- "How it works": three numbered steps that read as a simple sequence, gold
  number circles. Stack on mobile, row of three on desktop.
- Numbers strip: green band with three large white figures.
- FAQ: accordion with the first item open; show the chevron/plus affordance.
- Contact page: a green-bordered WhatsApp card ABOVE the form, so traders see
  WhatsApp first; the form is aimed at collectors and associations.

Prototype interactions specific to SusuBox:
- FAQ items open and close; the first is open by default.
- "How it works" button in the hero jumps to the steps section.
- "Are you a collector or association? Contact us" opens the Contact screen.
- Contact form success leads to the Thanks screen with "Back to home".

Export names: susubox-home-mobile.png, susubox-home-desktop.png,
susubox-contact-mobile.png, susubox-contact-desktop.png,
susubox-form-states.png, susubox-nav-mobile.png, susubox-components.png
```

## D3. Expected exports

- [ ] `docs/design/susubox-home-mobile.png`
- [ ] `docs/design/susubox-home-desktop.png`
- [ ] `docs/design/susubox-contact-mobile.png`
- [ ] `docs/design/susubox-contact-desktop.png`
- [ ] `docs/design/susubox-form-states.png`
- [ ] `docs/design/susubox-nav-mobile.png`
- [ ] `docs/design/susubox-components.png`

- [ ] `docs/design/susubox-prototype/` — exported clickable prototype (HTML), or `docs/design/susubox-prototype-link.txt` with the share link
- [ ] `docs/design/handoff/` — developer handoff: tokens, screen and component specs, interaction notes, SVG icons, and a README of differences from SPEC.md

## D4. Review checklist (before exporting)

- [ ] Copy matches SPEC.md word for word; nothing invented
- [ ] Colour hex values on the component sheet match the spec tokens
- [ ] Only one font family (two weights) — or system fonts for the Kitchen site
- [ ] Mobile hero: H1 + primary button visible above the fold at 360×740
- [ ] All text meets AA contrast, including text over photos
- [ ] Every button and input is ≥ 48px tall
- [ ] WhatsApp button present on every frame and covering nothing
- [ ] Developer credit in every footer
- [ ] All form states designed (empty, error, sending, success, failure)
- [ ] No carousels, map embeds, video or decorative images the spec didn't ask for
- [ ] Image frames show their aspect ratios and match the spec's photo direction
- [ ] Mobile menu is a full-screen overlay with the close button where the menu button was; links close it and go to the right place
- [ ] Header stays pinned to the top while scrolling in both the mobile and desktop prototype flows
- [ ] Prototype: section links smooth-scroll and land with the heading visible below the header
- [ ] Handoff token names and values match SPEC.md exactly; any differences are listed in the handoff README
- [ ] Prototype: every link, button, menu, WhatsApp overlay and form state works in both mobile and desktop flows, with no dead ends
- [ ] Desktop layouts use the spec's column counts and container width

## D5. Hand-off to the coding agent

Add this line to the top of each repo's `docs/SPEC.md` once mockups are exported:

> Visual reference: see `docs/design/*.png`. Exact spacing, sizes and tokens are in `docs/design/handoff/` — use them as reference only and do not copy prototype code into `src/`. Match layout, spacing and hierarchy from the mockups, and the behaviour shown in the clickable prototype (ignore prototype-only controls and the mock WhatsApp overlay — the real button opens wa.me); take copy, tokens and behaviour from this spec. Where the mockup and this spec disagree, this spec wins — flag the difference in your report.
