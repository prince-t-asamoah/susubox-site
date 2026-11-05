import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

/**
 * Photos live in src/assets/ and are picked up by file name (any of jpg/jpeg/png/webp).
 * Drop the licensed photo in with the expected name and the site uses it; until then
 * Photo.astro renders the SHARED-STANDARDS §11 placeholder block.
 */
const files = import.meta.glob<{ default: ImageMetadata }>("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

export function findPhoto(name: string): ImageMetadata | undefined {
  for (const [path, mod] of Object.entries(files)) {
    if (path.split("/").pop()?.replace(/\.\w+$/, "") === name) return mod.default;
  }
  return undefined;
}

export interface PhotoOptions {
  /** Aspect ratio as [width, height], e.g. [4, 5]. */
  ratio: [number, number];
  /**
   * Crop focus, as a sharp position: a keyword ("center", "top", "right top"…) or a
   * smart-crop strategy ("attention" favours faces/detail, "entropy"). Not CSS percentages.
   */
  position?: string;
}

const WIDTHS = [480, 800, 1200];

/**
 * AVIF (q50) and WebP (q70) at 480/800/1200w, plus a single 800w JPEG fallback
 * (SHARED-STANDARDS §11). Cropped to the ratio at build time.
 */
export async function photoSources(src: ImageMetadata, { ratio, position = "attention" }: PhotoOptions) {
  const [rw, rh] = ratio;
  const crop = (width: number) => ({ src, width, height: Math.round((width * rh) / rw), fit: "cover", position });

  // Images are never upscaled, so cap the widths at the largest crop the source allows;
  // otherwise the srcset would advertise sizes (e.g. "1200w") the files don't have.
  const maxWidth = Math.floor(Math.min(src.width, (src.height * rw) / rh));
  const widths = WIDTHS.filter((w) => w < maxWidth);
  widths.push(Math.min(maxWidth, WIDTHS[WIDTHS.length - 1]));
  const largest = widths[widths.length - 1];

  const [avif, webp, jpg] = await Promise.all([
    getImage({ ...crop(largest), widths, format: "avif", quality: 50 }),
    getImage({ ...crop(largest), widths, format: "webp", quality: 70 }),
    getImage({ ...crop(Math.min(800, largest)), format: "jpg", quality: 65 }),
  ]);

  return { avif, webp, jpg };
}
