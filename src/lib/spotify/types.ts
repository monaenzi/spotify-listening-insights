export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  images: SpotifyImage[];
  external_urls: { spotify: string };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  images: SpotifyImage[];
  release_date: string;
  release_date_precision: "year" | "month" | "day";
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Pick<SpotifyArtist, "id" | "name">[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: { spotify: string };
}

export interface SpotifyPagingObject<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export type TopTracksResponse = SpotifyPagingObject<SpotifyTrack>;
export type TopArtistsResponse = SpotifyPagingObject<SpotifyArtist>;