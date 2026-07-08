import { withSpotifyAuth } from "@/lib/spotify/withSpotifyAuth";
import { getTopTracks } from "@/lib/spotify/tracks";

export const GET = withSpotifyAuth((token) => getTopTracks(token));