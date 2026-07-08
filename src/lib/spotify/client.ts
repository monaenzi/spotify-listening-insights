import type { JWT } from "next-auth/jwt";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export class SpotifyApiError extends Error {
  constructor(public status: number, public details: string) {
    super(`Spotify API error (${status}): ${details}`);
    this.name = "SpotifyApiError";
  }
}

export async function spotifyFetch<T>(endpoint: string, token: JWT): Promise<T> {
  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  if (!res.ok) {
    const details = await res.text();
    throw new SpotifyApiError(res.status, details);
  }

  return res.json();
}