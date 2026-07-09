import { withSpotifyAuth } from "@/lib/spotify/withSpotifyAuth";
import { getTopArtists } from "@/lib/spotify/tracks";
import { compareTimeRanges } from "@/lib/spotify/rotation";

export const GET = withSpotifyAuth(async (token) => {
  const [shortTerm, longTerm] = await Promise.all([
    getTopArtists(token, "short_term"),
    getTopArtists(token, "long_term"),
  ]);

  return compareTimeRanges(shortTerm.items, longTerm.items);
});