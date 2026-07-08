import { withSpotifyAuth } from "@/lib/spotify/withSpotifyAuth";
import { getRecentlyPlayed } from "@/lib/spotify/tracks";

export const GET = withSpotifyAuth((token) => getRecentlyPlayed(token));