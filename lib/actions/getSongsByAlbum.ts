"use server";
import { createClient } from "@/utils/supabase/server";

export async function getSongsByAlbum(album_id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("album_id", album_id);
  console.log(data);
  if (error) {
    console.error("Error fetching album details:", error);
    return null;
  }

  return data;
}
