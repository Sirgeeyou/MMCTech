"use server";

import { Album } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAlbums() {
  const supabase = createClient();

  const { data } = await supabase.from("albums").select("*");
  return data || [];
}

export async function getAlbumDetails(id: number): Promise<Album | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select(
      `id, title, description, songs(id, title, length), artists(id, name)`
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching album details:", error);
    return null;
  }

  if (!data.artists) {
    console.error("Artists data is missing");
    return null;
  }

  return data as Album;
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

export async function updateAlbum(albumId: string, album: Album) {
  const supabase = createClient();
  console.log(album);
  const { title, description, artists: artist, songs } = album;
  try {
    await supabase
      .from("artists")
      .update({ name: artist.name })
      .eq("id", artist.id);

    await supabase
      .from("albums")
      .update({ title, description })
      .eq("id", albumId);

    const songsToUpsert = songs.map((song) => ({
      album_id: parseInt(albumId),
      title: song.title,
      length: song.length,
      artist_id: artist.id,
    }));
    await supabase.from("songs").upsert(songsToUpsert);
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while editing the album.",
      },
    };
  }
  return {
    success: {
      title: "Congratulations!",
      description: "Your album has been successfully edited!",
    },
  };
}

interface DeleteAlbumById {
  id: number;
}

export async function deleteAlbumById(params: DeleteAlbumById) {
  const supabase = createClient();

  const { id } = params;

  try {
    const { error } = await supabase.from("albums").delete().eq("id", id);
    revalidatePath("/");
  } catch (error) {
    return {
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occurred while removing the album.",
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
