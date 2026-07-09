import Image from "next/image";
import { getImage } from "@/lib/spotify/images";
import type { SpotifyTrack } from "@/lib/spotify/types";

export function TrackCard({ track, rank }: { track: SpotifyTrack; rank: number }) {
  const image = getImage(track.album.images);

  return (
    <div className="flex-shrink-0 w-40 snap-start">
      <div className="relative aspect-square mb-2 bg-surface">
        {image && (
          <Image
            src={image}
            alt={track.album.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        )}
        <span className="absolute top-2 left-2 bg-accent text-foreground font-display text-xs px-2 py-1">
          {String(rank).padStart(2, "0")}
        </span>
      </div>
      <p className="text-sm text-foreground truncate">{track.name}</p>
      <p className="text-xs text-muted truncate">{track.artists.map((a) => a.name).join(", ")}</p>
    </div>
  );
}