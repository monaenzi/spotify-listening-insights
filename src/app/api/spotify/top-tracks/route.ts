import { NextRequest, NextResponse } from "next/server";
import { getValidSpotifyToken } from "@/lib/spotify/getValidToken";
import { getTopTracks } from "@/lib/spotify/tracks";
import { SpotifyApiError } from "@/lib/spotify/client";

export async function GET(req: NextRequest) {
  const { token, refreshedCookie } = await getValidSpotifyToken(req);

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  if (token.error === "RefreshAccessTokenError") {
    return NextResponse.json({ error: "Session expired, please sign in again" }, { status: 401 });
  }

  try {
    const data = await getTopTracks(token);
    const response = NextResponse.json(data);

    if (refreshedCookie) {
      response.cookies.set("next-auth.session-token", refreshedCookie, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (err) {
    if (err instanceof SpotifyApiError) {
      return NextResponse.json({ error: "Spotify API request failed", details: err.details }, { status: err.status });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}