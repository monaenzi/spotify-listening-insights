"use client";

import { useState, useEffect } from "react";
import type { TopTracksResponse, TopArtistsResponse } from "@/lib/spotify/types";
import type { TimeRange } from "@/lib/spotify/tracks";

interface Props {
  initialTracks: TopTracksResponse;
  initialArtists: TopArtistsResponse;
}

const RANGE_LABELS: Record<TimeRange, string> = {
  short_term: "Last 4 weeks",
  medium_term: "Last 6 months",
  long_term: "All time",
};

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
      <div>
        {(Object.keys(RANGE_LABELS) as TimeRange[]).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            disabled={range === timeRange}
          >
            {RANGE_LABELS[range]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Top Tracks</h2>
          <ul>
            {tracks.items.map((t) => (
              <li key={t.id}>{t.name} — {t.artists.map((a) => a.name).join(", ")}</li>
            ))}
          </ul>

          <h2>Top Artists</h2>
          <ul>
            {artists.items.map((a) => (
              <li key={a.id}>{a.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}