import type { JWT } from "next-auth/jwt";
import { spotifyFetch } from "./client";

export type TimeRange = "short_term" | "medium_term" | "long_term";

export function getTopTracks(token: JWT, timeRange: TimeRange = "medium_term") {
  return spotifyFetch(`/me/top/tracks?time_range=${timeRange}&limit=20`, token);
}