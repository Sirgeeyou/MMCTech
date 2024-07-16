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
}

export interface Artist {
  id: number;
  name: string;
  albums: Album[];
}

export interface Artist2 {
  name: string;
}

export interface SectionWrapperProps<T> {
  data: T[];
  title: string;
  dataKey: keyof T;
}

export interface AlbumDetails {
  title: any;
  description: any;
  songs: {
    id: any;
    title: any;
    length: any;
  }[];
  artists:
    | {
        id: string;
        name: any;
      }
    | { id: string; name: any }[];
}
