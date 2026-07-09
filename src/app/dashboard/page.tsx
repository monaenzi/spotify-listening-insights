import { getServerSpotifyToken } from "@/lib/spotify/getServerToken";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify/tracks";
import { compareTimeRanges } from "@/lib/spotify/rotation";
import { AuthButton } from "@/components/AuthButton";
import { FilterableStats } from "@/components/FilterableStats";

export default async function DashboardPage() {
  const token = await getServerSpotifyToken();

  if (!token) {
    return (
      <main>
        <AuthButton />
      </main>
    );
  }

  const [topTracks, topArtists, recentlyPlayed, shortTermArtists, longTermArtists] =
    await Promise.all([
      getTopTracks(token),
      getTopArtists(token),
      getRecentlyPlayed(token),
      getTopArtists(token, "short_term"),
      getTopArtists(token, "long_term"),
    ]);

  const rotation = compareTimeRanges(shortTermArtists.items, longTermArtists.items);

  return (
    <main>
      <AuthButton />

      <FilterableStats initialTracks={topTracks} initialArtists={topArtists} />

      <h2>Recently Played</h2>
      <p><small>Note: this may lag behind your actual listening by a few minutes — a known Spotify API limitation.</small></p>
      <ul>
        {recentlyPlayed.items.map((item, i) => (
          <li key={`${item.track.id}-${item.played_at}-${i}`}>
            {item.track.name} — {item.track.artists.map((a) => a.name).join(", ")}
            {" "}
            <small>({new Date(item.played_at).toLocaleString()})</small>
          </li>
        ))}
      </ul>

      <h2>Taste Rotation</h2>
      <h3>Your ride-or-dies (in both short & long term)</h3>
      <ul>{rotation.shared.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
      <h3>Current obsessions (short term only)</h3>
      <ul>{rotation.currentObsessions.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
      <h3>Old favorites (long term only, not in current rotation)</h3>
      <ul>{rotation.oldFavorites.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
    </main>
  );
}