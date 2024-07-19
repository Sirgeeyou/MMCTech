import { deleteArtistById, getArtistRelatedMusic } from "@/lib/actions/artists";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import console from "console";
import EditArtist from "@/components/EditArtist";
import DeleteButton from "@/components/DeleteButton";

export default async function page({ ...props }) {
  const artistName = props.params.slug;
  const data = await getArtistRelatedMusic(props.params.id)!;
  if (data === null) {
    return <p>Album not found</p>;
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
          <div className="flex gap-5 items-center">
            <EditArtist />
            <DeleteButton
              id={props.params.id}
              deleteFunction={deleteArtistById}
              description="This action cannot be undone. This will permanently delete the artist and its albums and songs."
            />
          </div>
        </div>
        {data?.albums.map((album) => (
          <Accordion
            type="single"
            collapsible
            key={album.title}
            className="p-6"
          >
            <AccordionItem value="item-1">
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
        {data.standaloneSongs &&
          data?.standaloneSongs.map((song) => (
            <Accordion
              type="single"
              collapsible
              key={song.title}
              className="p-6"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">Singles</AccordionTrigger>
                <AccordionContent>
                  <Link
                    href={`/song/${song.id}`}
                    className="flex justify-between hover:bg-accent items-center rounded-md my-2 p-2"
                    key={song.id}
                  >
                    <span>{song.title}</span>
                    <span>{song.length}</span>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
    </div>
  );
}
