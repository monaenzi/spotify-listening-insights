import { cookies } from "next/headers";
import { getTokenAndRefreshIfNeeded } from "./tokenCore";

const SESSION_COOKIE_NAME = "next-auth.session-token";

export async function getServerSpotifyToken() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  const { token } = await getTokenAndRefreshIfNeeded({
    cookies: { [SESSION_COOKIE_NAME]: sessionCookie },
  } as any);

  return token;
}