export interface User {
  user: {
    email: string;
    id: number;
  };
}

export interface Song {
  id: number;
  title: string;
  length: string;
}

export interface Album {
  id: number;
  artist_id: number;
  title: string;
  songs: Song[];
  description: string;
  artists?: { name: string };
}

export interface Artist {
  id: number;
  name: string;
  albums: Album[];
}

export interface SectionWrapperProps<T> {
  data: T[];
  title: string;
  dataKey: keyof T;
}
