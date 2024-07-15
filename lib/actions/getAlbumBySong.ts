"use server";
import { createClient } from "@/utils/supabase/server";

export async function getAlbumBySong(song_id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", song_id);
  console.log(data);
  if (error) {
    console.error("Error fetching album details:", error);
    return null;
  }

  return data;
}
