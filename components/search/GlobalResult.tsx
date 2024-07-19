"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSearchParams } from "next/navigation";
import { globalSearch } from "@/lib/actions/general";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/types/types_db";

interface QueryResult {
  artists: Tables<"artists">[];
  albums: (Tables<"albums"> & { artists: { name: string } | null })[];
  songs: (Tables<"songs"> & { artists: { name: string } | null })[];
}

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<QueryResult>({
    artists: [],
    albums: [],
    songs: [],
  });

  const global = searchParams.get("global");

  useEffect(() => {
    const fetchResult = async () => {
      setResult({ artists: [], albums: [], songs: [] });
      setIsLoading(true);

      try {
        // Everything | Everywhwere | All at once
        // Global Search
        const res = await globalSearch({ query: global });
        setResult(res);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global]);

  const renderResults = (title: string, items: any[], urlPath: string) =>
    items.length > 0 && (
      <div className="flex flex-col">
        <h1 className="font-bold">{title}</h1>
        {items.map((item) => (
          <Link key={item.id} href={`/${urlPath}/${item.id}`}>
            {item.title
              ? `${item.title} by ${
                  item.artists ? item.artists.name : "Unknown Artist"
                }`
              : item.name}
          </Link>
        ))}
      </div>
    );

  const noResults =
    !result.artists.length && !result.albums.length && !result.songs.length;

  return (
    <Card className="absolute top-full z-10 mt-3 w-full max-w-[600px]">
      <CardHeader>
        <CardTitle className="gap-2 flex border-b border-secondary"></CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoaderCircle className="size-10 animate-spin" />
        ) : (
          <div className="flex flex-col gap-2">
            {noResults ? (
              <p>Oops, no results found</p>
            ) : (
              <>
                {renderResults("Artists", result.artists, "artist")}
                {renderResults("Albums", result.albums, "album")}
                {renderResults("Songs", result.songs, "song")}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GlobalResult;
