import DeleteButton from "@/components/DeleteButton";
import EditSong from "@/components/EditSong";
import {
  deleteSongById,
  getSongById,
  getSongsFromSameAlbum,
} from "@/lib/actions/songs";
import { Tables } from "@/types/types_db";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface Song {
  id: number;
  title: string;
  length: string;
}

// Define Album interface using Tables type
interface Album extends Tables<"albums"> {
  songs: Song[];
}

interface PageProps {
  params: { id: number };
}

export default async function SongPage({ params }: PageProps) {
  const song = await getSongById(params.id);
  const supabase = createClient();
  const user = await supabase.auth.getSession();
  if (!song) {
    return <div>Song not found.</div>;
  }

  let songsFromSameAlbum: Album | null = null;

  if (song.album_id) {
    songsFromSameAlbum = await getSongsFromSameAlbum(song.album_id);
  }

  return (
    <div className="w-4/5 overflow-hidden flex flex-col rounded-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">{song?.title}</h1>
          <h3 className="text-xl text-neutral-500">{song?.length}</h3>
        </div>
        {user.data.session && (
          <div className="flex gap-5">
            <EditSong song={song} />
            <DeleteButton
              id={params.id}
              deleteFunction={deleteSongById}
              description="This action cannot be undone. This will permanently delete the song."
            />
          </div>
        )}
      </div>

      {songsFromSameAlbum && (
        <div>
          <h3 className="text-xl mt-6">Songs from the same album</h3>
          {songsFromSameAlbum.songs
            .filter((s) => s.id !== song.id)
            .map((relatedSong) => (
              <Link
                key={relatedSong.id}
                href={`/song/${relatedSong.id}`}
                className="flex justify-between hover:bg-accent items-center rounded-md  my-2 p-2"
              >
                <span>{relatedSong.title}</span>
                <span>{relatedSong.length}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
