import type { SpotifyImage } from "./types";

export function getImage(images: SpotifyImage[] | undefined, preferSize = 300): string | null {
  if (!images || images.length === 0) return null;
  
  const closest = images.reduce((best, img) =>
    Math.abs(img.width ?? 0 - preferSize) < Math.abs(best.width ?? 0 - preferSize) ? img : best
  );
  return closest.url;
}