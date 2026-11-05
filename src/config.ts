/**
 * Site config: every business fact lives here (SHARED-STANDARDS §8).
 * Values marked SAMPLE are placeholders; confirm or replace them with the
 * owner before launch (see README "Handover checklist").
 */
export const site = {
  name: "SusuBox", // SAMPLE: confirm business name with owner
  url: "https://susubox-site.netlify.app", // SAMPLE: replace with custom domain (also update astro.config.mjs and public/robots.txt)
  whatsappNumber: "233241032732", // SAMPLE: developer's number for the demo; replace with owner's (international format, no +)
  /**
   * Set to true once whatsappNumber is the owner's real business number. Only then is it
   * published as the business phone in the page's structured data (SHARED-STANDARDS §8).
   */
  whatsappConfirmed: false,
  whatsappMessage: "Hello SusuBox, I want to start saving.",
  email: "hello@susubox.example", // SAMPLE: replace with owner's email
  repoUrl: "https://github.com/prince-t-asamoah/susubox-site",
  officeHours: "Mon–Sat, 7am–6pm", // SAMPLE: replace with owner's office hours
};

/** Numbers strip (SPEC §6.5). SAMPLE values: confirm with the owner before launch. */
export const stats = [
  { value: "GHS 20", label: "average daily contribution" }, // SAMPLE
  { value: "7 days", label: "to your first statement" }, // SAMPLE
  { value: "0", label: "apps to download" }, // SAMPLE
];

/**
 * Testimonial (SPEC §6.6). SAMPLE: replace with a real customer quote (with
 * their permission) before launch, or set to null to remove the section.
 */
export const testimonial: { quote: string; attribution: string } | null = {
  quote:
    "Before, I kept my susu card in my handbag and prayed it didn't get wet. Now I check my savings on my phone.",
  attribution: "Ama, fabric seller, Kumasi",
};

/** Pricing answer shown in the FAQ. SAMPLE: confirm pricing with owner. */
export const pricingAnswer =
  "Registration is free. A small monthly fee applies after your first month.";
