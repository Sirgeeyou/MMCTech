import { Tables } from "@/types/types_db";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";

interface Artist extends Tables<"artists"> {}

function LatestArtists({ artists }: { artists: Artist[] }) {
  return (
    <section className="px-5">
      <h1 className="my-10 text-3xl">Popular Artists</h1>
      <ScrollArea className="flex h-[500px] w-full rounded-md border hover:border-primary/25">
        <div className="flex flex-wrap gap-12 mx-4 py-5">
          {artists?.map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`}>
              <div className="flex flex-col hover:bg-accent rounded-md">
                <Avatar className="md:h-56 md:w-56 h-32 w-32 px-3">
                  <AvatarImage
                    className="rounded-full"
                    src="https://github.com/shadcn.png"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 pl-3">
                  <p>{artist.name}</p>
                  <p className="text-gray-500">Arist</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}

export default LatestArtists;
