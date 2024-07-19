// Define the type for an artist
export interface Artist {
  id?: number; // Optional if not provided in your data
  name: string;
}

// Define the type for a song
export interface Song {
  id: number;
  title: string;
  length: string; // Length as a string (e.g., "05:24")
}

// Define the type for an album
export interface Album {
  title: string;
  description: string;
  songs: Song[];
  artists: Artist | null; // Nullable if there can be cases where the artist info might be missing
}
