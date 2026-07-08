import { getServerSpotifyToken } from "@/lib/spotify/getServerToken";
import { getTopTracks, getTopArtists } from "@/lib/spotify/tracks";
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

  const [topTracks, topArtists] = await Promise.all([
    getTopTracks(token),
    getTopArtists(token),
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
    </main>
  );
}