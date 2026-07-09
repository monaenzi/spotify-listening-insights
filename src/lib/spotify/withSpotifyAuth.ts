import { NextRequest, NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";
import { getValidSpotifyToken } from "./getValidToken";
import { SpotifyApiError } from "./client";

type Handler = (token: JWT, req: NextRequest) => Promise<unknown>;

export function withSpotifyAuth(handler: Handler) {
  return async function (req: NextRequest) {
    const { token, refreshedCookie } = await getValidSpotifyToken(req);

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    if (token.error === "RefreshAccessTokenError") {
      return NextResponse.json(
        { error: "Session expired, please sign in again" },
        { status: 401 }
      );
    }

    try {
      const data = await handler(token, req);
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
        return NextResponse.json(
          { error: "Spotify API request failed", details: err.details },
          { status: err.status }
        );
      }
      return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
  };
}