// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://susubox-site.netlify.app", // keep in sync with site.url in src/config.ts
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "always", // total CSS is well under 14 KB (SHARED-STANDARDS §2)
  },
  compressHTML: true,
});
