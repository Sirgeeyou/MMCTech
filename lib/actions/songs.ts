"use server";

import { createClient } from "@/utils/supabase/server";
import { data } from "autoprefixer";
import { revalidatePath } from "next/cache";
import { title } from "process";

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

export async function createSong(
  title: string,
  length: string,
  artistName: string
) {
  const supabase = createClient();

  try {
    const { data: newArtist } = await supabase
      .from("artists")
      .insert({ name: artistName })
      .select()
      .single();

    if (newArtist) {
      await supabase
        .from("songs")
        .insert({ title, length, artist_id: newArtist.id });
    }
    revalidatePath("/");
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while adding the song.",
      },
    };
  }
  return {
    success: {
      title: "Congratulations!",
      description: "Your song has been successfully added!",
    },
  };
}

export async function updateSong(
  title: string,
  length: string,
  songId: string
) {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("songs")
      .update({ title, length })
      .eq("id", songId);
    revalidatePath(`/song/${songId}`);
  } catch (error) {
    console.log(error);
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while adding the song.",
      },
    };
  }

  return {
    success: {
      title: "Congratulations!",
      description: "Your song has been successfully edited!",
    },
  };
}

interface DeleteSongById {
  id: number;
}

export async function deleteSongById(params: DeleteSongById) {
  const supabase = createClient();

  const { id } = params;

  try {
    const { error } = await supabase.from("songs").delete().eq("id", id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while removing the song.",
      },
    };
  }
  return {
    success: {
      title: "Song deleted!",
      description: "The song has been successfuly deleted!",
    },
  };
}
