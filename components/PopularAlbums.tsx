"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Tables } from "@/types/types_db";
import { ScrollArea } from "./ui/scroll-area";

interface Album extends Tables<"albums"> {}

function PopularAlbums({ albums }: { albums: Album[] }) {
  return (
    <section className="w-full px-5">
      <h1 className="my-10 ml-5 text-3xl">Popular Albums</h1>
      <ScrollArea className="flex h-[500px] w-full rounded-md border hover:border-primary/25">
        <div className="w-full flex gap-4 mx-4 flex-wrap py-5">
          {albums.map((album) => (
            <Link key={album.id} href={`/album/${album.id}`}>
              <Card className="sm:h-40 sm:w-40 h-32 w-32 hover:bg-accent">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold">{album.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}

export default PopularAlbums;
