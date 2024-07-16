"use server";

import { AlbumDetails } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function getAlbumDetails(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select(`title, description, songs(id,title, length), artists(name)`)
    .eq("id", id);

  if (error) {
    console.error("Error fetching album details:", error);
    return null; // or handle the error as needed
  }

  return data as AlbumDetails[];
}
