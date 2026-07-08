import type { JWT } from "next-auth/jwt";
import { spotifyFetch } from "./client";
import type { TopTracksResponse, TopArtistsResponse, RecentlyPlayedResponse } from "./types";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export function getTopTracks(token: JWT, timeRange: TimeRange = "medium_term") {
  return spotifyFetch<TopTracksResponse>(`/me/top/tracks?time_range=${timeRange}&limit=20`, token);
}

export function getTopArtists(token: JWT, timeRange: TimeRange = "medium_term") {
  return spotifyFetch<TopArtistsResponse>(`/me/top/artists?time_range=${timeRange}&limit=20`, token);
}

export function getRecentlyPlayed(token: JWT, limit: number = 20) {
  return spotifyFetch<RecentlyPlayedResponse>(`/me/player/recently-played?limit=${limit}`, token);
}