import { getSongById, getSongsFromSameAlbum } from "@/lib/actions/songs";
import { Tables } from "@/types/types_db";
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

export default async function page({ ...props }) {
  const song = await getSongById(props.params.id);

  if (!song) {
    return <div>Song not found.</div>;
  }

  let songsFromSameAlbum: Album | null = null;

  if (song.album_id) {
    songsFromSameAlbum = await getSongsFromSameAlbum(song.album_id);
    console.log(songsFromSameAlbum);
  }

  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md p-6">
      <h1 className="text-4xl font-bold">{song?.title}</h1>
      <h3 className="text-xl text-neutral-500">{song?.length.slice(0, -3)}</h3>

      {songsFromSameAlbum && (
        <div>
          <h3 className="text-xl mt-6">Songs from the same album</h3>
          <ul>
            {songsFromSameAlbum.songs
              .filter((s) => s.id !== song.id)
              .map((relatedSong) => (
                <li key={relatedSong.id}>
                  <Link
                    href={`/song/${relatedSong.id}`}
                    className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                  >
                    <span className="py-1.5">{relatedSong.title}</span>
                    <span>{relatedSong.length.slice(0, -3)}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </main>
  );
}
