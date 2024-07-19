"use server";

import { Tables } from "@/types/types_db";
import { createClient } from "@/utils/supabase/server";

export interface SearchParams {
  query?: string | null;
  type?: string | null;
}

export async function globalSearch(params: SearchParams) {
  try {
    const supabase = createClient();

    const { query } = params;

    let results = {
      artists: [] as Tables<"artists">[],
      albums: [] as (Tables<"albums"> & { artists: { name: string } | null })[],
      songs: [] as (Tables<"songs"> & { artists: { name: string } | null })[],
    };

    const { data: artistsData } = await supabase
      .from("artists")
      .select("*")
      .ilike("name", `%${query}%`);
    const { data: albumsData } = await supabase
      .from("albums")
      .select("*, artists (name)")
      .ilike("title", `%${query}%`);
    const { data: songsData } = await supabase
      .from("songs")
      .select("*, artists (name)")
      .ilike("title", `%${query}%`);

    results.artists = artistsData || [];
    results.albums = albumsData || [];
    results.songs = songsData || [];

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
