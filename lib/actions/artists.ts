"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getArtists() {
  const supabase = createClient();

  const { data } = await supabase.from("artists").select("*");
  return data || [];
}

export async function getArtistRelatedMusic(artistId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select(`title, description, songs (id, title, length), artists(name)`)
    .eq("artist_id", artistId);

  if (error) {
    console.error("Error fetching album details:", error);
    return null; // or handle the error as needed
  }

  return data || [];
}

interface DeleteArtistById {
  id: number;
}

export async function deleteArtistById(params: DeleteArtistById) {
  const supabase = createClient();

  const { id } = params;

  try {
    const { error } = await supabase.from("artists").delete().eq("id", id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while removing the artist.",
      },
    };
  }
  return {
    success: {
      title: "Artist deleted!",
      description: "The artist has been successfuly deleted!",
    },
  };
}
