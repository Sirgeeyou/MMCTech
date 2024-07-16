import { Artist } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";

function LatestArtists({ artists }: { artists: Artist[] }) {
  return (
    <section>
      <h1 className="my-10 ml-5 text-3xl">Popular Artists</h1>

      <div className="flex gap-12 mx-4 ">
        {artists.map((artist) => (
          <Link key={artist.id} href={`/artist/${artist.id}/${artist.name}`}>
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
    </section>
  );
}

export default LatestArtists;
