"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSearchParams } from "next/navigation";
import { globalSearch } from "@/lib/actions/general";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/types/types_db";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const search = searchParams.get("search");

  useEffect(() => {
    const fetchResult = async () => {
      setResult({ artists: [], albums: [], songs: [] });
      setIsLoading(true);

      try {
        // Everything | Everywhwere | All at once
        // Global Search
        const res = await globalSearch({ query: search });
        setResult(res);
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (search) {
      fetchResult();
    }
  }, [search]);

  const renderResults = (title: string, items: any[], urlPath: string) =>
    items.length > 0 && (
      <div className="flex flex-col">
        <h1 className="font-bold mt-2">{title}</h1>
        {items.map((item) => (
          <Link key={item.id} href={`/${urlPath}/${item.id}`}>
            {item.title ? (
              <>
                <span>{item.title}</span>{" "}
                <span className="text-neutral-500">
                  {item.artists
                    ? `by ${item.artists.name}`
                    : "by Unknown Artist"}
                </span>
              </>
            ) : (
              item.name
            )}
          </Link>
        ))}
      </div>
    );

  const noResults =
    !result.artists.length && !result.albums.length && !result.songs.length;

  return (
    <Card className="absolute top-full z-10 mt-3 w-full max-w-[600px]">
      <CardContent>
        <ScrollArea className="h-80">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoaderCircle className="w-10 h-10 animate-spin" />
            </div>
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GlobalResult;
