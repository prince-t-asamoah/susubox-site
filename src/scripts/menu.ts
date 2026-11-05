// Mobile menu: full-screen native <dialog> overlay (SHARED-STANDARDS §2b).
const dialog = document.getElementById("mobile-menu") as HTMLDialogElement | null;
const fallback = document.querySelector<HTMLAnchorElement>("[data-menu-toggle]");

if (dialog && fallback && typeof dialog.showModal === "function") {
  // Upgrade the no-JS "#footer-nav" link to a real button.
  const toggle = document.createElement("button");
  // Copy every attribute (class + Astro's scoped-style data attribute) except the link-only ones.
  for (const { name, value } of fallback.attributes) {
    if (name !== "href" && name !== "data-menu-toggle") toggle.setAttribute(name, value);
  }
  toggle.type = "button";
  toggle.innerHTML = fallback.innerHTML;
  toggle.setAttribute("aria-controls", "mobile-menu");
  toggle.setAttribute("aria-expanded", "false");
  fallback.replaceWith(toggle);

  // overflow: hidden locks scrolling without moving the page, so the position is kept.
  const root = document.documentElement;
  const unlock = () => (root.style.overflow = "");

  toggle.addEventListener("click", () => {
    root.style.overflow = "hidden";
    dialog.showModal();
    toggle.setAttribute("aria-expanded", "true");
  });

  // Runs for every way of closing: ✕, Esc, link tap, resize.
  dialog.addEventListener("close", () => {
    unlock();
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus({ preventScroll: true });
  });

  dialog.querySelector("[data-menu-close]")?.addEventListener("click", () => dialog.close());

  // Link tap: close the overlay first, then scroll (same page) or navigate.
  dialog.addEventListener("click", (event) => {
    const link = (event.target as Element).closest("a");
    if (!link) return;
    if (link.target === "_blank" || link.protocol === "mailto:") {
      dialog.close(); // let the browser open WhatsApp / mail as normal
      return;
    }

    const url = new URL(link.href);
    const samePage = url.pathname === location.pathname;
    const section = samePage && url.hash ? document.querySelector(url.hash) : null;

    event.preventDefault();
    dialog.close();
    unlock(); // the close event fires async; unlock now so the scroll below can run

    if (section) {
      // scrollIntoView follows the CSS scroll-behavior, so reduced motion gets an instant jump.
      section.scrollIntoView();
      history.pushState(null, "", url.hash);
    } else if (samePage && !url.hash) {
      window.scrollTo(0, 0);
    } else {
      location.href = url.href;
    }
  });

  matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches && dialog.open) dialog.close();
  });
}
