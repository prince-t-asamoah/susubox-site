import type { APIRoute } from "astro";
import { site } from "../config";

// Indexable pages only (the form thanks page is noindex).
const pages = ["/", "/contact/"];

export const GET: APIRoute = () => {
  const urls = pages.map((path) => `  <url><loc>${new URL(path, site.url).href}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
