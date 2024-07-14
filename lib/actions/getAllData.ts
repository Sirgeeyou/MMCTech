"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getAllData() {
  const supabase = createClient();

  const { data: artists, error: errorArtists } = await supabase
    .from("artists")
    .select("*");
  const { data: songs, error: errorSongs } = await supabase
    .from("songs")
    .select("*");
  const { data: albums, error: errorAlbums } = await supabase
    .from("albums")
    .select("*");

  if (errorSongs || errorArtists || errorAlbums) {
    console.error(
      "Error fetching data:",
      errorSongs || errorArtists || errorAlbums
    );
    return null;
  }
  return { songs, artists, albums }; // Return fetched data from all tables
}
