import { getArtistRelatedMusic } from "@/lib/actions/artists";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default async function page({ ...props }) {
  const artistName = props.params.slug;
  const data = await getArtistRelatedMusic(props.params.id)!;
  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md">
      <div className="w-full bg-gradient-to-r from-slate-500 to-transparent pl-6 py-10">
        <h1 className="font-bold text-4xl">{artistName}</h1>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="mt-8 text-neutral-500 pl-6">
          Albums available by {artistName}
        </h2>
        {data?.map((album) => (
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
                <ul className="mt-5">
                  {album.songs.map((song) => (
                    <Link
                      href={`/song/${song.id}`}
                      className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                      key={song.id}
                    >
                      <li className="py-1.5">{song.title}</li>
                      <span>{song.length}</span>
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </main>
  );
}
