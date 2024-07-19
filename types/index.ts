export interface Artist {
  id: number;
  name: string;
}

export interface Song {
  id: number;
  title: string;
  length: string;
}

export interface Album {
  title: string;
  description: string;
  songs: Song[];
  artists: Artist | null;
}
