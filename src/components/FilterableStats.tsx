"use client";

import { useState, useEffect } from "react";
import type { TopTracksResponse, TopArtistsResponse } from "@/lib/spotify/types";
import type { TimeRange } from "@/lib/spotify/tracks";
import { TimeRangeToggle } from "./TimeRangeToggle";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { HorizontalScroller } from "./HorizontalScroller";
import { TrackCard } from "./TrackCard";
import { ArtistCard } from "./ArtistCard";

interface Props {
  initialTracks: TopTracksResponse;
  initialArtists: TopArtistsResponse;
}

export function FilterableStats({ initialTracks, initialArtists }: Props) {
  const [timeRange, setTimeRange] = useState<TimeRange>("medium_term");
  const [tracks, setTracks] = useState(initialTracks);
  const [artists, setArtists] = useState(initialArtists);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timeRange === "medium_term") {
      setTracks(initialTracks);
      setArtists(initialArtists);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    Promise.all([
      fetch(`/api/spotify/top-tracks?time_range=${timeRange}`).then((r) => r.json()),
      fetch(`/api/spotify/top-artists?time_range=${timeRange}`).then((r) => r.json()),
    ]).then(([tracksData, artistsData]) => {
      if (cancelled) return;
      setTracks(tracksData);
      setArtists(artistsData);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [timeRange, initialTracks, initialArtists]);

  return (
    <div>
      <TimeRangeToggle value={timeRange} onChange={setTimeRange} />

      <div className={`transition-opacity duration-300 ${isLoading ? "opacity-40" : "opacity-100"}`}>
        <Reveal>
            <SectionHeading index="01" title="Top Tracks" />
            <HorizontalScroller>
                {tracks.items.map((t, i) => (
                <TrackCard key={t.id} track={t} rank={i + 1} />
                ))}
            </HorizontalScroller>
            </Reveal>

            <Reveal delay={100}>
            <SectionHeading index="02" title="Top Artists" />
            <HorizontalScroller>
                {artists.items.map((a, i) => (
                <ArtistCard key={a.id} artist={a} rank={i + 1} />
                ))}
            </HorizontalScroller>
            </Reveal>
      </div>
    </div>
  );
}