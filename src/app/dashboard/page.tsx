import { getServerSpotifyToken } from "@/lib/spotify/getServerToken";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify/tracks";
import { compareTimeRanges } from "@/lib/spotify/rotation";
import { getMostRepeatedTracks } from "@/lib/spotify/repeats";
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

  const [topTracks, topArtists, recentlyPlayed, shortTermArtists, longTermArtists] =
    await Promise.all([
      getTopTracks(token),
      getTopArtists(token),
      getRecentlyPlayed(token),
      getTopArtists(token, "short_term"),
      getTopArtists(token, "long_term"),
    ]);

  const rotation = compareTimeRanges(shortTermArtists.items, longTermArtists.items);
  const repeatedTracks = getMostRepeatedTracks(recentlyPlayed.items);

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
          <li key={a.id}>{a.name}</li>
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

      <h2>Most Repeated Tracks</h2>
      {repeatedTracks.length === 0 ? (
        <p>No repeats yet — check back after you've listened to more.</p>
      ) : (
        <ul>
          {repeatedTracks.map((t) => (
            <li key={t.trackId}>{t.name} — {t.artists} ({t.playCount}x)</li>
          ))}
        </ul>
      )}

      <h2>Taste Rotation</h2>
      <h3>Your ride-or-dies (in both short & long term)</h3>
      <ul>
        {rotation.shared.map((a) => <li key={a.id}>{a.name}</li>)}
      </ul>
      <h3>Current obsessions (short term only)</h3>
      <ul>
        {rotation.currentObsessions.map((a) => <li key={a.id}>{a.name}</li>)}
      </ul>
      <h3>Old favorites (long term only, not in current rotation)</h3>
      <ul>
        {rotation.oldFavorites.map((a) => <li key={a.id}>{a.name}</li>)}
      </ul>
    </main>
  );
}