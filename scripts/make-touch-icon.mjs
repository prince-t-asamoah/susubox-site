// Renders public/apple-touch-icon.png (180×180, opaque) from public/favicon.svg.
// Run: node scripts/make-touch-icon.mjs
import sharp from "sharp";

await sharp("public/favicon.svg", { density: 300 })
  .resize(180, 180)
  .flatten({ background: "#0B6E4F" })
  .png({ compressionLevel: 9 })
  .toFile("public/apple-touch-icon.png");
console.log("wrote public/apple-touch-icon.png");
