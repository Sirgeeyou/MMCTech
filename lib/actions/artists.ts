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

  // Fetch albums and their songs for the given artist
  const { data: albumsData, error: albumsError } = await supabase
    .from("albums")
    .select(`id, title, description, songs (id, title, length), artists (name)`)
    .eq("artist_id", artistId);
  if (albumsError) {
    console.error("Error fetching albums details:", albumsError);
    return null;
  }

  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select(`id, title, length`)
    .is("album_id", null)
    .eq("artist_id", artistId);

  if (songsError) {
    console.error("Error fetching standalone songs:", songsError);
    return null;
  }

  // Combine both results
  const combinedData = {
    albums: albumsData || [],
    standaloneSongs: songsData || [],
  };

  return combinedData;
}

export async function updateArtist(
  artistId: number,
  artistName: string,
  path: string
) {
  const supabase = createClient();
  try {
    await supabase
      .from("artists")
      .update({ name: artistName })
      .eq("id", artistId);
    revalidatePath(`${path}`);
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while editing the artist.",
      },
    };
  }
  return {
    success: {
      title: "Artist edited!",
      description: "The artist has been successfuly edited!",
    },
  };
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
