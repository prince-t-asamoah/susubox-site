# Handoff: SusuBox — 2-page marketing site (Home + Contact)

## Overview
SusuBox is a WhatsApp-based digital susu savings record for market traders in Ghana. The site is a fast, mobile-first, 2-page static site: **Home** (`/`) drives traders to start a WhatsApp chat; **Contact** (`/contact/`, + `/contact/thanks/`) is a Netlify form for collectors and associations. Target: PageSpeed mobile ≥ 90 in all four categories.

**Source of truth order:** `01-SUSUBOX-SPEC.md` (copy, tokens, structure) → `00-SHARED-STANDARDS.md` (behaviour, a11y, perf) → this handoff (layout, spacing, states). Where the mockups and the spec disagree, **the spec wins** — every known difference is listed in [Differences from SPEC](#differences-from-spec).

## About the design files
Everything in `design/` is a **design reference built in HTML** — it shows intended look and behaviour; it is not production code. Rebuild it in the target stack (Astro, per the spec: zero client JS except the form enhancement and the ~1 KB mobile-menu `<dialog>` script). Ignore prototype-only UI: the dark "PROTOTYPE CONTROLS" bar, the mock WhatsApp chat overlay (the real buttons open `wa.me`), and "Fill form with sample data".

## Fidelity
**High-fidelity.** Final colours, type, spacing and interactions. Match them exactly using the tokens in `tokens.css`.

---

## Design tokens
See **`tokens.css`** (drop-in `:root` block, mobile-first with one `min-width: 768px` override). Spec names are used verbatim; anything not in the spec is marked `PROPOSED`.

| Token | Value | Notes |
|---|---|---|
| `--color-primary` | `#0B6E4F` | white text 6.3:1 |
| `--color-primary-dark` | `#08513A` | hover |
| `--color-accent` | `#F2A900` | fill only (step circles, eyebrow chip) |
| `--color-ink` | `#1B1B1B` | body, focus ring |
| `--color-muted` | `#5A5A5A` | small/secondary text |
| `--color-bg` / `--color-surface` | `#FFFFFF` / `#F4F7F5` | |
| `--color-border` | `#DDE5E0` | dividers, card borders |
| `--color-border-strong` *(proposed)* | `#7C8C84` | inputs, menu button (3.5:1) |
| `--color-error` / `-bg` *(proposed)* | `#B3261E` / `#FCEDEC` | |
| `--color-disabled-bg` *(proposed)* | `#E4EAE6` | |
| `--color-whatsapp` | `#25D366` | floating button |
| `--radius` | `12px` | buttons, cards, inputs, images |
| spacing | `8 16 24 32 48 64` (`--space-1…8`) + `96` proposed | |
| `--container` | `72rem` (1152px) | centred; gutters 16 / 32 |
| `--header-h` | `60px` → `72px` ≥768 | |

### Type scale (Inter 400 / 700 only)
| Style | Mobile | ≥768px | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 | 2rem / 32px | 3rem / 48px | 700 | 1.15 → 1.1 | −0.02em |
| H2 | 1.5rem / 24px | 2.25rem / 36px | 700 | 1.25 → 1.2 | −0.015em |
| H3 | 1.25rem / 20px | same | 700 | 1.3 | 0 |
| Lead | 1rem | 1.125rem / 18px | 400 | 1.6 | 0 |
| Body | 1rem / 16px | same | 400 (700 for labels/buttons) | 1.6 | 0 |
| Small | 0.875rem / 14px | same | 400 | 1.5 | 0 |
| Eyebrow | 0.875rem | same | 700 uppercase | 20px | +0.08em |
| Stat figure | 2.5rem / 40px | 3rem / 48px | 700 | 1.1 | −0.025em |
| Quote | 1.25rem / 20px | 1.75rem / 28px | 400 | 1.45–1.5 | −0.01em |
| Menu link (overlay) | 1.5rem / 24px | n/a | 700 | 1.25 | 0 |
| Wordmark | 1.25rem (20px) | 1.375rem (22px) | 700 green | — | −0.01em |

Shadows: floating WhatsApp `0 2px 4px rgba(0,0,0,.12), 0 6px 16px rgba(0,0,0,.16)`. Focus ring everywhere: `outline: 3px solid #1B1B1B; outline-offset: 2–3px` on `:focus-visible`.

---

## Screens

Global layout: every section = full-bleed background + inner `max-width: 72rem; margin: 0 auto`. Section padding **48px 16px** mobile / **64px 32px** desktop unless noted. Heading → content gap **32px** mobile / **48px** desktop (24px where noted).

### Header (both pages) — sticky
- `position: sticky; top: 0; z-index: 40;` white, `border-bottom: 1px solid --color-border`. No blur, no transparency, no height change on scroll.
- **Mobile (60px):** padding 0 16. Wordmark "SusuBox" left (min-height 48). Right: menu button — `[menu icon 24] Menu`, 48px tall, padding 0 16, gap 8, 1px `--color-border-strong`, radius 12, 16px/700 ink. `aria-controls="mobile-menu" aria-expanded`.
- **Desktop (72px):** container 1152 + 32 gutters. Nav links "How it works", "FAQ", "Contact": 48px tall, padding 0 16, radius 12, 16px/400 ink, gap 8. Hover: bg `--color-surface`, text green. Current page (`aria-current="page"`): green, 700, underline 2px, offset 6px.

### 1 · Home — 360px
1. **Hero** — padding 24 16 48; single column, gap 16.
   - Eyebrow chip: gold fill, ink text, padding 4 12, pill radius.
   - H1 (3 lines at 360).
   - Paragraph (body).
   - Buttons stacked, full width, gap 16, margin-top 8: Primary "Start saving on WhatsApp" (20px WhatsApp glyph, gap 8), Secondary "How it works".
   - Trust line, small, muted.
   - Image **4:5**, full width (328×410), radius 12, margin-top 8. `fetchpriority="high"`, preloaded, not lazy.
   - **Fold check:** header 60 + content puts the primary button bottom at ≈ 440px, well above 740.
2. **Problem strip** — surface bg. H2, then 3 items, gap 24. Item = row: 48×48 icon tile (white, 1px border, radius 12, green 24px icon) + text column (H3 20px, body), gap 16.
3. **How it works** `#how-it-works` — H2; ordered list of 3 StepCards stacked, gap 16. A 2px gold vertical line runs behind the cards at x=48 (centre of the number circles), visible only in the gaps. Then full-width primary button.
4. **Benefits** — 1px top border. H2, checklist (gap 16; 24px green check + 16px text, gap 12), then image **1:1** full width (lazy).
5. **Numbers strip** — green bg, white text; 3 stats stacked, gap 24; stats 2 and 3 have a 1px `rgba(255,255,255,.3)` top border + 24px top padding.
6. **Testimonial** — padding 64 16; left aligned; quote 20px/1.5; attribution small muted, gap 16. No photo.
7. **FAQ** `#faq` — 1px top border. H2, gap 24; accordion (top border + bottom border per item). Summary: min-height 56, padding 12 0, 16px/700, chevron 24 green on the right (down closed / up open). Answer: body, padding 0 40 16 0. First item open.
8. **Final CTA** — surface bg; left aligned, gap 16; H2, paragraph, full-width primary (margin-top 8), text link "Are you a collector or association? Contact us →" (green 700, underline offset 4, min-height 48).
9. **Footer** — see Components.

### 2 · Home — 1280px
Container 1152, gutters 32.
1. **Hero** — padding 64 32; grid `55fr 45fr`, gap 64, vertically centred. Text column gap 24; paragraph 18px, max-width 34em; buttons in a row, gap 16 (wrap if needed). Image 4:5 fills column (~497×621).
2. **Problem** — H2 max-width 20em; grid 3 cols, gap 32; items stack vertically (icon above text, gap 16).
3. **How it works** — grid 3 cols, gap 32; card padding 24, internal gap 24; 2px gold horizontal line at y=48 from left 48 to right 48 behind cards. Button centred below.
4. **Benefits** — grid 2 cols, gap 64, centred; **image left** (1:1), list right; list text 18px.
5. **Numbers** — grid 3 cols; stats 2 and 3 have a 1px left border + 32px left padding; stat 48px.
6. **Testimonial** — padding 96 32; centred, max-width 800; quote 28px; attribution 16px.
7. **FAQ** — grid `1fr 2fr`, gap 64: H2 left, accordion right; summary min-height 64, 18px.
8. **Final CTA** — padding 96 32; centred column, max-width 640; paragraph 18px; button + link centred.
9. Footer.

### 3 · Contact — 360px
`main` padding 32 16 48, gap 16:
- H1 "Talk to us", intro (body).
- **WhatsApp card** above the form: margin 8 0 16; full-width link, min-height 72, padding 16, **2px green border**, radius 12, gap 16; 40px `#25D366` circle with 20px white glyph; text 16px/700 green "Prefer WhatsApp? Chat with us now →". Hover: bg surface.
- **Form** (gap 24 between fields), see Components → Inputs.
- **Info block** (margin-top 48): surface bg, radius 12, padding 24, gap 16; clock icon + "Office hours: Mon–Sat, 7am–6pm"; mail icon + email link (green 700 underline, min-height 48).

### 4 · Contact — 1280px
`main` padding 64 32 96. **≥1024px:** grid `7fr 4fr`, gap 64. Left column: H1 48px, intro 18px, WhatsApp card (padding 16 24, text 18px), form; submit button auto width, left aligned. Right column: info block (padding 32), margin-top 176 so it aligns with the WhatsApp card. **768–1023px:** single column like mobile, so the email never overflows.

### 5 · Form states (mobile)
- **Empty**: labels + inputs only.
- **Field error** (on blur and on submit): input border 1px `--color-error` + `inset 0 0 0 1px` (2px total); message row below, `aria-live="polite"`: 24px alert icon + 16px text in `--color-error`, gap 8. On submit, focus moves to the first invalid field.
- **Submitting**: button disabled → bg `#E4EAE6`, text muted, 20px spinner (rotating, reduced-motion: static) + "Sending…". Fields read-only.
- **Success**: redirect to `/contact/thanks/`. 56px `--color-success-tint` disc with 32px green check, H1 "Thank you — we'll be in touch within one working day.", primary "Back to home" (full width mobile / auto desktop), gap 24, padding 48 16.
- **Failed**: banner above the submit button, `role="alert"`: 1px error border, `#FCEDEC` bg, radius 12, padding 16, alert icon + "Something went wrong. Please try again or message us on WhatsApp." The last phrase links to WhatsApp. Values are kept.

### 6 · Mobile menu overlay (360 × full screen)
See Components → Mobile menu overlay.

---

## Components & states

### Buttons (min-height 48, padding 12/24, radius 12, 16px/700, line-height 1.5)
| | Default | Hover | Focus-visible | Disabled |
|---|---|---|---|---|
| Primary | bg `#0B6E4F`, white | bg `#08513A` | + 3px ink outline, offset 3 | bg `#E4EAE6`, text `#5A5A5A` |
| Secondary | white bg, 2px green border, green text (padding 10/24) | bg surface, border+text `#08513A` | same outline | border `#C5CFC9`, text muted |
| Text link | green 700, underline offset 4, min-height 48 | `#08513A`, underline 2px | outline offset 2 | n/a |

WhatsApp CTAs carry a 20px WhatsApp glyph, gap 8. On mobile, hero/section buttons are full width; on desktop they're auto width.

### Inputs
Label 16px/700 ink, line-height 1.4, 8px above the field. Field: min-height 48, padding 11/16, 1px `--color-border-strong`, radius 12, 16px/1.6 ink, white. **Focus:** border green + 3px ink outline, offset 2. **Error:** as above. Phone hint (small muted, sits 4px tighter under the label): "e.g. 024 123 4567 or +233 24 123 4567". Select: native, `appearance: none`, 24px chevron-down at right 12, padding-right 48. Textarea: 5 rows (min-height 152), vertical resize.

Validation (client, mirrors HTML attributes):
- name: required
- phone: required, `^(\+233|0)[0-9]{9}$` after stripping spaces and dashes
- email: optional, valid if present
- role: required
- message: required

Messages: see Differences (they are TODO copy).

### Cards
- **StepCard**: white, 1px `--color-border`, radius 12, padding 24, gap 16 (mobile) / 24 (desktop). Number circle 48, `--color-accent` fill, ink 20px/700. H3 + body, gap 8.
- **Problem item**: 48 icon tile (white, 1px border, radius 12) + H3 + body.
- **WhatsApp card**: see Contact.
- **FAQ item**: `<details>/<summary>`; chevron rotates (down → up) on `[open]`. Summary hover: text green.

### Header
See Screens. Sticky, z-index 40, solid white, 1px bottom border.

### Mobile menu overlay (<768px) — native `<dialog id="mobile-menu">`, `showModal()`
- Full screen (`inset:0; width:100%; height:100dvh; max-*: none; margin:0; border:0`), solid white, flex column.
- **Top bar** 60px, padding 0 16, bottom border: wordmark left (links Home); **close button 48×48** (1px border-strong, radius 12, ✕ 24px, `aria-label="Close menu"`) right-aligned **exactly where the Menu button's right edge sits**.
- **Links** (padding 8 16, scrolls internally): "How it works", "FAQ", "Contact". 24px/700 ink, rows **64px** tall, 1px bottom divider, 24px green chevron-right. Current page: `aria-current="page"` + 3px green underline, offset 8.
- **Pinned bottom** (padding 16 16 24 + `env(safe-area-inset-bottom)`, top border, gap 8): full-width primary "Start saving on WhatsApp"; email line (mail icon + `hello@susubox.example`, green 700, centred, min-height 48).
- 150ms opacity fade in `prefers-reduced-motion: no-preference`; otherwise instant.
- No-JS fallback: the Menu button links to `#footer-nav`.

### Floating WhatsApp button
56×56 circle `#25D366`, white 24px glyph, `--shadow-float`, `position: fixed; right/bottom: max(16px, env(safe-area-inset-bottom))` (24px ≥768), z-index 50. Hover/focus: `scale(1.05)` (no motion if reduced) + focus ring. `aria-label="Chat with us on WhatsApp"`, `target="_blank" rel="noopener"`. Hidden while the menu overlay is open. Footer gets `padding-bottom: 88px` on mobile so it never covers footer links.

### Footer (`#footer-nav`)
Top border, white. **Mobile:** padding 24 16 88, column, gap 8: wordmark (18px); footer nav (How it works · FAQ · Contact; 16px ink, underline `#7C8C84` offset 4, min-height 48, column-gap 24, wraps); credit. **Desktop:** padding 32, one row, gap 32: wordmark, nav, credit (kept left, so the floating button covers nothing). Credit, 14px muted: "Website by Prince Twumasi Asamoah · [GitHub](https://github.com/prince-t-asamoah/susubox-site)" (GitHub green 700 underlined).

---

## Interactions & behaviour
- **Sticky header:** CSS only. `section[id] { scroll-margin-top: calc(var(--header-h) + 16px); }`
- **Smooth scroll:** `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`. In-page links: "How it works" (header, menu, hero secondary button), "FAQ". From `/contact/`, links go to `/#how-it-works` / `/#faq`. The prototype animates ~500ms ease-in-out; the real site uses native CSS smooth scroll.
- **Mobile menu:** Menu → `showModal()`, `aria-expanded="true"`, lock page scroll (`documentElement.style.overflow = "hidden"`), focus the first link. Close on ✕, Esc, any link tap, or resize ≥768. On close, restore scroll and return focus to the Menu button. Link tap: close first, **then** scroll or navigate.
- **FAQ:** native `<details>`; the first has `open`. Works without JS.
- **Navigation:** wordmark → `/`; "Contact" (header, menu, footer) and "Are you a collector or association? Contact us →" → `/contact/`; "Back to home" → `/`.
- **WhatsApp:** all six CTAs (hero, how-it-works, final CTA, contact card, floating ×2 pages) plus the menu-overlay button use one config value: `https://wa.me/233000000000?text=Hello%20SusuBox%2C%20I%20want%20to%20start%20saving.`
- **Form:** Netlify `name="contact"`, honeypot, `action="/contact/thanks/"`. JS enhancement validates on blur and submit. While sending: disable the button and show "Sending…". Success → thanks page. Failure → inline banner.
- **Transitions:** none, apart from the 150ms menu fade and the 1.05 hover scale on the WhatsApp button. Both are disabled under reduced motion.

## State (JS enhancement only)
- `menuOpen` (dialog open/closed).
- Form: `values`, `errors{field}`, `touched{field}`, `status: idle | sending | failed`.

Everything else is static HTML/CSS.

---

## Differences from SPEC
1. **Eyebrow** — spec says "small caps, gold". Gold text on white is 2.1:1 and fails AA, so it's a **gold pill with ink text** (8.1:1).
2. **Proposed colours not in the spec:** `--color-border-strong #7C8C84` (`--color-border` is 1.3:1, too faint for controls), `--color-error #B3261E` and `-bg #FCEDEC`, `--color-disabled-bg #E4EAE6`, `--color-success-tint #E3F0EA`. **TODO:** confirm.
3. **FAQ H2** — spec gives no heading. The design uses "Frequently asked questions". **TODO copy.**
4. **Field error messages** — not in spec. The design uses: "Enter your full name." · "Enter your phone number." / "Enter a Ghana phone number, e.g. 024 123 4567" · "Enter a valid email address, or leave it blank." · "Choose one option." · "Enter a message." **TODO copy.**
5. **Extra type styles** — H3, lead, stat, quote and small sizes are not given in the spec (spec gives body, H1 and H2 only). Values are in the type table.
6. **Desktop padding of 96px** for the testimonial and final CTA sections (outside the stated 8–64 scale).
7. **Decorative additions:**
   - gold connector line behind the step circles;
   - WhatsApp glyph inside WhatsApp CTA buttons;
   - check-mark disc on the thanks page;
   - problem-strip icons (card-lost, bank, clock — spec says "icon + text" without naming icons).
8. **Benefits on mobile** — spec defines the ≥768 order only (image left). On mobile, the list comes first and the image second.
9. **Contact layout** — spec says "Side/below info block". The design puts it beside the form at ≥1024 and below it under 1024 (avoids overflow at tablet widths).
10. **Footer nav links** — added per SHARED-STANDARDS §2b (no-JS menu fallback). Not listed in the spec's page sections.
11. **Menu overlay rows** are 64px tall (standard: ≥56px).
12. **WhatsApp green `#25D366` + white glyph is 2.0:1** — mandated by the brief and standards. Flagged as below the 3:1 non-text contrast guideline.
13. **Sample content** (confirm with owner): numbers-strip values, Ama testimonial, `233000000000`, `hello@susubox.example`.
14. **Photos** in the mocks are placeholders supplied for the design. Source final images from Unsplash or Pexels per Standards §11: hero 4:5 ≤100 KB, collector 1:1 ≤60 KB.

## Assets
- `icons/*.svg` — 24×24 grid, 2px stroke, `currentColor`, round caps and joins. Inline them; no icon font.
  - `whatsapp` (floating button, CTAs, card)
  - `menu`, `close`
  - `chevron-down`, `chevron-up` (FAQ)
  - `chevron-right` (menu rows)
  - `arrow-right` (prototype send button only)
  - `check` (benefits, thanks page)
  - `card-lost`, `bank`, `clock` (problem strip)
  - `clock`, `mail` (contact info)
  - `alert` (errors)
  - `loader` (Sending…)
- `design/uploads/woman-trader-at-market-stall.jpg` (hero, crop 4:5, focal point ~51% 40%) and `design/uploads/susu-collector-writing-in-a-book.jpg` (benefits, crop 1:1, centred) — design placeholders; replace with licensed photos and add credits to the README.

## Files
- `tokens.css` — tokens.
- `icons/` — SVGs.
- `design/SusuBox Mockups.dc.html` — static frames 1–7: home and contact at 360 and 1280, form states, menu overlay, component sheet.
- `design/SusuBox Prototype.dc.html` — clickable prototype, mobile and desktop flows. Ignore the prototype-only controls bar and the mock WhatsApp chat.
- `design/SusuHeader.dc.html`, `design/SusuFooter.dc.html`, `design/SusuForm.dc.html` — shared pieces used by the mockups.
- `design/support.js` — runtime needed to open the `.dc.html` files in a browser.

- `screens/` — exported PNG frames (copy into the repo's `docs/design/`):
  - `susubox-home-mobile.png` (360 @2x), `susubox-home-desktop.png` (1280 @1x)
  - `susubox-contact-mobile.png` (360 @2x), `susubox-contact-desktop.png` (1280 @1x)
  - `susubox-form-states.png` (5 × 360: empty, field error, sending, success, failed)
  - `susubox-nav-mobile.png` (360×740 @2x, full-screen menu overlay)
  - `susubox-components.png` (1280, component sheet with spacing/type annotations)
- Prototype export for `docs/design/susubox-prototype/`: copy the whole `design/` folder and open `SusuBox Prototype.dc.html`.
