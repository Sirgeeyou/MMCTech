"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAlbumDetails(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single(); // to ensure you only get one record

  if (error) {
    console.error("Error fetching album details:", error);
    return null; // or handle the error as needed
  }

  return data;
}
