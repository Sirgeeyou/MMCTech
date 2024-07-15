"use client";

import { Album } from "@/types";
import React from "react";
import { Card, CardContent } from "./ui/card";
import AlbumPopover from "./AlbumPopover";

function PopularAlbums({ albums }: { albums: Album[] }) {
  return (
    <section className="w-full">
      <h1 className="my-10 ml-5 text-3xl">Popular Albums</h1>
      <div className="w-full flex gap-4 mx-4 flex-wrap">
        {albums.map((album) => (
          <div key={album.id}>
            <AlbumPopover album={album}>
              <Card className="sm:h-40 sm:w-40 h-32 w-32 hover:bg-accent">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold">{album.title}</span>
                  <span>{album.artist_id}</span>
                </CardContent>
              </Card>
            </AlbumPopover>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularAlbums;
