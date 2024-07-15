import React from "react";
import { Song } from "@/types";
import { Card, CardContent } from "./ui/card";
import SongPopover from "./SongPopover";

function LatestMusic({ songs }: { songs: Song[] }) {
  return (
    <section className="w-full pb-10">
      <h1 className="mt-10 mb-7 ml-5 text-3xl">Latest Songs</h1>
      <div className="ml-5 flex gap-4 flex-wrap">
        {songs.slice(0, 10).map((song) => (
          <SongPopover song={song} key={song.id}>
            <Card className="sm:h-40 sm:w-40 h-32 w-32 hover:bg-accent">
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="font-semibold">{song.title}</span>
              </CardContent>
            </Card>
          </SongPopover>
        ))}
      </div>
    </section>
  );
}

export default LatestMusic;
