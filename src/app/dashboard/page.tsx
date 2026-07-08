import { getServerSpotifyToken } from "@/lib/spotify/getServerToken";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify/tracks";
import { AuthButton } from "@/components/AuthButton";

export default async function DashboardPage() {
  const token = await getServerSpotifyToken();

  if (!token) {
    return (
      <main>
        <AuthButton />
      </main>
    );
  }

  const [topTracks, topArtists, recentlyPlayed] = await Promise.all([
    getTopTracks(token),
    getTopArtists(token),
    getRecentlyPlayed(token),
  ]);

  return (
    <main>
      <AuthButton />
      <h2>Top Tracks</h2>
      <ul>
        {topTracks.items.map((t) => (
          <li key={t.id}>{t.name} — {t.artists.map((a) => a.name).join(", ")}</li>
        ))}
      </ul>
      <h2>Top Artists</h2>
      <ul>
        {topArtists.items.map((a) => (
          <li key={a.id}>{a.name} ({a.genres?.join(", ") || "no genres listed"})</li>
        ))}
      </ul>
      <h2>Recently Played</h2>
      <ul>
        {recentlyPlayed.items.map((item, i) => (
          <li key={`${item.track.id}-${item.played_at}-${i}`}>
            {item.track.name} — {item.track.artists.map((a) => a.name).join(", ")}
            {" "}
            <small>({new Date(item.played_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>
    </main>
  );
}