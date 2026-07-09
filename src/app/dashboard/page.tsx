import { getServerSpotifyToken } from "@/lib/spotify/getServerToken";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotify/tracks";
import { compareTimeRanges } from "@/lib/spotify/rotation";
import { AuthButton } from "@/components/AuthButton";
import { FilterableStats } from "@/components/FilterableStats";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { TrackCard } from "@/components/TrackCard";
import { ArtistCard } from "@/components/ArtistCard";
import { EqualizerBars } from "@/components/EqualizerBars";

export default async function DashboardPage() {
  const token = await getServerSpotifyToken();

  if (!token) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 text-center">
        <span className="font-sans text-accent uppercase text-xs tracking-[0.3em]">
          Personal Listening Archive
        </span>

        <EqualizerBars />

        <h1 className="font-display text-4xl md:text-6xl uppercase tracking-wide leading-tight max-w-2xl">
          Your Sound,<br />Charted
        </h1>

        <p className="font-sans text-muted max-w-md text-sm leading-relaxed">
          Top tracks, top artists, and how your rotation shifts over time -
          pulled straight from your Spotify listening history.
        </p>

        <AuthButton />

        <p className="font-sans text-muted text-xs max-w-xs">
          Read-only. We only look at your top tracks, top artists, and recent
          plays. Nothing is ever written to your account.
        </p>
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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-16">
        <h1 className="font-display text-2xl uppercase tracking-wide">Listening Insights</h1>
        <AuthButton />
      </div>

      <FilterableStats initialTracks={topTracks} initialArtists={topArtists} />

      <Reveal>
        <SectionHeading index="03" title="Recently Played" />
        <p className="text-muted text-xs font-sans mb-4">
          May lag behind your actual listening by a few minutes — a known Spotify API limitation.
        </p>
        <HorizontalScroller>
          {recentlyPlayed.items.map((item, i) => (
            <TrackCard key={`${item.track.id}-${item.played_at}-${i}`} track={item.track} rank={i + 1} />
          ))}
        </HorizontalScroller>
      </Reveal>

      <Reveal>
        <SectionHeading index="04" title="Taste Rotation" />

        <h3 className="font-sans text-accent uppercase text-xs tracking-widest mb-3">
          Ride or Dies
        </h3>
        {rotation.shared.length > 0 ? (
          <HorizontalScroller>
            {rotation.shared.map((a, i) => (
              <ArtistCard key={a.id} artist={a} rank={i + 1} />
            ))}
          </HorizontalScroller>
        ) : (
          <p className="text-muted text-sm font-sans mb-8">No overlap yet — your taste is shifting fast.</p>
        )}

        <h3 className="font-sans text-accent uppercase text-xs tracking-widest mb-3 mt-10">
          Current Obsessions
        </h3>
        {rotation.currentObsessions.length > 0 ? (
          <HorizontalScroller>
            {rotation.currentObsessions.map((a, i) => (
              <ArtistCard key={a.id} artist={a} rank={i + 1} />
            ))}
          </HorizontalScroller>
        ) : (
          <p className="text-muted text-sm font-sans mb-8">Nothing new in rotation right now.</p>
        )}

        <h3 className="font-sans text-accent uppercase text-xs tracking-widest mb-3 mt-10">
          Old Favorites
        </h3>
        {rotation.oldFavorites.length > 0 ? (
          <HorizontalScroller>
            {rotation.oldFavorites.map((a, i) => (
              <ArtistCard key={a.id} artist={a} rank={i + 1} />
            ))}
          </HorizontalScroller>
        ) : (
          <p className="text-muted text-sm font-sans mb-8">You're still deep in your long-time favorites.</p>
        )}
      </Reveal>
    </main>
  );
}