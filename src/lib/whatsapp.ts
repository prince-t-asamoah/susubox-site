import { site } from "../config";

/** The single wa.me link used by every WhatsApp CTA on the site. */
export const waLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;
