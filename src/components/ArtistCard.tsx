import { getImage } from "@/lib/spotify/images";
import type { SpotifyArtist } from "@/lib/spotify/types";

export function ArtistCard({ artist, rank }: { artist: SpotifyArtist; rank: number }) {
  const image = getImage(artist.images);

  return (
    <div className="flex-shrink-0 w-40 snap-start">
      <div className="relative aspect-square mb-2 bg-surface rounded-full overflow-hidden">
        {image && <img src={image} alt={artist.name} className="w-full h-full object-cover" />}
      </div>
      <p className="text-sm text-foreground text-center truncate">{artist.name}</p>
      <p className="text-xs text-accent text-center">{String(rank).padStart(2, "0")}</p>
    </div>
  );
}