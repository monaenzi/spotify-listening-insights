import { encode } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { getTokenAndRefreshIfNeeded } from "./tokenCore";

export async function getValidSpotifyToken(req: NextRequest) {
  const { token, wasRefreshed } = await getTokenAndRefreshIfNeeded(req);
  if (!token) return { token: null, refreshedCookie: null };

  if (!wasRefreshed) return { token, refreshedCookie: null };

  const refreshedCookie = await encode({ token, secret: process.env.NEXTAUTH_SECRET! });
  return { token, refreshedCookie };
}