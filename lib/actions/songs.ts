"use server";

import { createClient } from "@/utils/supabase/server";

export async function getSongs() {
  const supabase = createClient();

  const { data } = await supabase.from("songs").select("*");
  return data || [];
}

export async function getSongById(songId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("songs")
    .select(
      `
        *,
        albums (
          id,
          title
        )
      `
    )
    .eq("id", songId)
    .single();

  if (error) {
    console.error("Error fetching song details:", error);
    return null;
  }

  return data || [];
}

interface AlbumData {
  id: number;
  created_at: string;
  artist_id: number;
  title: string;
  description: string;
  songs: { id: number; title: string; length: string }[];
}

export async function getSongsFromSameAlbum(albumId: number) {
  const supabase = createClient();

  const { data } = await supabase
    .from("albums")
    .select(`*, songs(id, title, length)`)
    .eq("id", albumId)
    .single();

  return (data as AlbumData) || {};
}
