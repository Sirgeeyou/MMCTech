import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Tables } from "@/types/types_db";
import { ScrollArea } from "./ui/scroll-area";

interface Song extends Tables<"songs"> {}

function LatestMusic({ songs }: { songs: Song[] }) {
  return (
    <section className="w-full pb-10 px-5">
      <h1 className="mt-10 mb-7 ml-5 text-3xl">Latest Songs</h1>
      <ScrollArea className="flex h-[500px] w-full rounded-md border hover:border-primary/25">
        <div className="ml-5 flex gap-4 flex-wrap">
          {songs?.map((song) => (
            <Link key={song.id} href={`/song/${song.id}`}>
              <Card className="sm:h-40 sm:w-40 h-32 w-32 hover:bg-accent">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold">{song.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}

export default LatestMusic;
