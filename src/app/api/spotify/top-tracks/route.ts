import { withSpotifyAuth } from "@/lib/spotify/withSpotifyAuth";
import { getTopTracks, type TimeRange } from "@/lib/spotify/tracks";

export const GET = withSpotifyAuth((token, req) => {
  const timeRange = (req.nextUrl.searchParams.get("time_range") as TimeRange) || "medium_term";
  return getTopTracks(token, timeRange);
});