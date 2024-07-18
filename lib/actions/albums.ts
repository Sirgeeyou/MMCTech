"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAlbums() {
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

interface CreateAlbum {
  album: string;
  artist: string;
  description: string;
  songs: {
    title: string;
    length: string;
  }[];
}

export async function createAlbum({
  updatedAlbum,
}: {
  updatedAlbum: CreateAlbum;
}) {
  const supabase = createClient();
  const { album, artist, description, songs } = updatedAlbum;

  try {
    await supabase.from("artists").insert({ name: artist });

    const { data: latestArtist } = await supabase
      .from("artists")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (latestArtist) {
      await supabase
        .from("albums")
        .insert({ artist_id: latestArtist?.id, title: album, description });
    }

    const { data: latestAlbum } = await supabase
      .from("albums")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (latestAlbum) {
      const songsToUpsert = songs.map((song) => ({
        album_id: latestAlbum.id,
        title: song.title,
        length: song.length,
        artist_id: latestArtist?.id,
      }));
      await supabase.from("songs").upsert(songsToUpsert);
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
      description: "Your album has been successfully added!",
    },
  };
}
