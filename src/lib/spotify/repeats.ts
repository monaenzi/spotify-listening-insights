import type { SpotifyPlayHistoryItem } from "./types";

export interface RepeatedTrack {
  trackId: string;
  name: string;
  artists: string;
  playCount: number;
}

export function getMostRepeatedTracks(items: SpotifyPlayHistoryItem[]): RepeatedTrack[] {
  const counts = new Map<string, RepeatedTrack>();

  for (const item of items) {
    const existing = counts.get(item.track.id);
    if (existing) {
      existing.playCount++;
    } else {
      counts.set(item.track.id, {
        trackId: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((a) => a.name).join(", "),
        playCount: 1,
      });
    }
  }

  return Array.from(counts.values())
    .filter((t) => t.playCount > 1) // only show actual repeats
    .sort((a, b) => b.playCount - a.playCount);
}