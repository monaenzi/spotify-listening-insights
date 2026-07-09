import type { SpotifyImage } from "./types";

export function getImage(images: SpotifyImage[] | undefined, preferSize = 300): string | null {
  if (!images || images.length === 0) return null;

  const closest = images.reduce((best, img) => {
    const imgWidth = img.width ?? 0;
    const bestWidth = best.width ?? 0;
    const imgDistance = Math.abs(imgWidth - preferSize);
    const bestDistance = Math.abs(bestWidth - preferSize);
    return imgDistance < bestDistance ? img : best;
  });

  return closest.url;
}