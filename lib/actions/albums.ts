"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getAlbums() {
  const supabase = createClient();

  const { data } = await supabase.from("albums").select("*");
  return data || [];
}

export async function getAlbumDetails(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select(`title, description, songs(id,title, length), artists(name)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching album details:", error);
    return null;
  }

  return data || [];
}
