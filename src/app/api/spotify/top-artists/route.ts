import { withSpotifyAuth } from "@/lib/spotify/withSpotifyAuth";
import { getTopArtists } from "@/lib/spotify/tracks";

export const GET = withSpotifyAuth((token) => getTopArtists(token));