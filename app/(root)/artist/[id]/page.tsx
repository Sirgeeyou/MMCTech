import {
  deleteArtistById,
  getArtistById,
  getArtistRelatedMusic,
} from "@/lib/actions/artists";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import EditArtist from "@/components/EditArtist";
import DeleteButton from "@/components/DeleteButton";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
  params: { id: number };
}

export default async function ArtistPage({ params }: PageProps) {
  // Fetch related music and artist information
  const [relatedMusic, artistResult] = await Promise.all([
    getArtistRelatedMusic(params.id),
    getArtistById({ id: params.id }),
  ]);

  const supabase = createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session;

  if (!artistResult || !artistResult.data) {
    return <p className="text-lg mt-5 pl-5 mx-auto">Artist not found.</p>;
  }

  const artistName = artistResult.data.name;

  if (
    !relatedMusic ||
    (!relatedMusic.albums.length && !relatedMusic.standaloneSongs.length)
  ) {
    return (
      <p className="text-lg mt-5 mx-auto">
        This artist has no music posted yet.
      </p>
    );
  }

  return (
    <div className="md:w-4/5 w-full overflow-hidden flex flex-col rounded-md">
      <div className="w-full bg-gradient-to-r from-slate-500 to-transparent pl-6 py-10">
        <h1 className="font-bold text-4xl">{artistName}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pr-6 mt-6">
          <h2 className="text-neutral-500 pl-6">
            Albums available by {artistName}
          </h2>
          {user && (
            <div className="flex gap-5 items-center">
              <EditArtist />
              <DeleteButton
                id={params.id}
                deleteFunction={deleteArtistById}
                description="This action cannot be undone. This will permanently delete the artist and its albums and songs."
              />
            </div>
          )}
        </div>
        {relatedMusic.albums.map((album) => (
          <Accordion type="single" collapsible key={album.id} className="p-6">
            <AccordionItem value={`album-${album.id}`}>
              <AccordionTrigger className="text-xl">
                {album.title}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-neutral-500">{album.description}</p>
                {album.songs.map((song) => (
                  <Link
                    key={song.id}
                    href={`/song/${song.id}`}
                    className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                  >
                    <span className="py-1.5">{song.title}</span>
                    <span>{song.length}</span>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        {relatedMusic.standaloneSongs.length > 0 && (
          <Accordion
            type="single"
            collapsible
            key="standalone-songs"
            className="p-6"
          >
            <AccordionItem value="standalone-songs">
              <AccordionTrigger className="text-xl">Singles</AccordionTrigger>
              <AccordionContent>
                {relatedMusic.standaloneSongs.map((song) => (
                  <Link
                    key={song.id}
                    href={`/song/${song.id}`}
                    className="flex justify-between hover:bg-accent items-center rounded-md my-2 p-2"
                  >
                    <span>{song.title}</span>
                    <span>{song.length}</span>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}
