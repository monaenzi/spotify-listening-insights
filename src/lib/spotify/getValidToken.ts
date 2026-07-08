import { getToken, encode } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { refreshSpotifyAccessToken } from "@/lib/auth";

export async function getValidSpotifyToken(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) return { token: null, refreshedCookie: null };

  const isExpired = Date.now() >= (token.expiresAt as number) * 1000;
  if (!isExpired) return { token, refreshedCookie: null };

  const refreshed = await refreshSpotifyAccessToken(token);
  const encoded = await encode({
    token: refreshed,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return { token: refreshed, refreshedCookie: encoded };
}