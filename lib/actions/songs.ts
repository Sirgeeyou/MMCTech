"use server";

import { createClient } from "@/utils/supabase/server";

export default async function getSongs() {
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
    .eq("id", songId);

  if (error) {
    console.error("Error fetching song details:", error);
    return null;
  }

  return data || [];
}
