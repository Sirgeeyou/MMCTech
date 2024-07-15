"use client";
import { Album, Song } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { ReactNode, useState } from "react";
import { getRelatedSongs } from "@/lib/actions/getRelatedSongs";

function SongPopover({ children, song }: { children: ReactNode; song: Song }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const handleClick = async () => {
    try {
      const albumSongs = await getRelatedSongs(song.id);
      setSongs(albumSongs ?? []);
      console.log("handeclick:", songs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger onClick={handleClick}>{children}</DialogTrigger>
      <DialogContent className="p-4 overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-center pb-2">
            {song.title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {song.length.slice(0, -3)}
          </DialogDescription>
          <div className="pt-4">
            <h4 className="text-neutral-500 mb-2">
              Songs from the same album:
            </h4>
            <ul>
              {songs.map((song) => (
                <div
                  className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                  key={song.id}
                >
                  <li className="py-1.5">{song.title}</li>
                  <span>{song.length.slice(0, -3)}</span>
                </div>
              ))}
            </ul>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SongPopover;
