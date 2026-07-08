import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import { refreshSpotifyAccessToken } from "@/lib/auth";

export async function getTokenAndRefreshIfNeeded(
  req: Parameters<typeof getToken>[0]["req"]
): Promise<{ token: JWT | null; wasRefreshed: boolean }> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return { token: null, wasRefreshed: false };

  const isExpired = Date.now() >= (token.expiresAt as number) * 1000;
  if (!isExpired) return { token, wasRefreshed: false };

  const refreshed = await refreshSpotifyAccessToken(token);
  return { token: refreshed, wasRefreshed: true };
}