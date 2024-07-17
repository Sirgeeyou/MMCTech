"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getArtists() {
  const supabase = createClient();

  const { data } = await supabase.from("artists").select("*");
  return data || [];
}

export async function getArtistRelatedMusic(artistId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select(`title, description, songs (id, title, length)`)
    .eq("artist_id", artistId);

  if (error) {
    console.error("Error fetching album details:", error);
    return null; // or handle the error as needed
  }

  return data || [];
}
