import type { SpotifyArtist } from "./types";

export interface RotationResult {
  shared: SpotifyArtist[];
  currentObsessions: SpotifyArtist[];
  oldFavorites: SpotifyArtist[];
}

export function compareTimeRanges(
  shortTerm: SpotifyArtist[],
  longTerm: SpotifyArtist[]
): RotationResult {
  const shortIds = new Set(shortTerm.map((a) => a.id));
  const longIds = new Set(longTerm.map((a) => a.id));

  return {
    shared: shortTerm.filter((a) => longIds.has(a.id)),
    currentObsessions: shortTerm.filter((a) => !longIds.has(a.id)),
    oldFavorites: longTerm.filter((a) => !shortIds.has(a.id)),
  };
}