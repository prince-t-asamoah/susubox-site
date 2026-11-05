// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://susubox-site.netlify.app", // keep in sync with site.url in src/config.ts
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    // SHARED-STANDARDS §2: inline CSS only when it is under 14 KB. Page-specific sheets
    // (≤ 6.5 KB) are inlined; the shared Base sheet (~9 KB, used by every page) is linked
    // so it is cached once, which keeps each page's inline CSS < 14 KB and HTML < 30 KB.
    inlineStylesheets: "auto",
  },
  vite: {
    build: { assetsInlineLimit: 8 * 1024 },
  },
  compressHTML: true,
  scopedStyleStrategy: "class", // shorter selectors than data-astro-cid attributes
});
