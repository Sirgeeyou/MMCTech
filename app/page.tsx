import LatestArtists from "@/components/LatestArtists";
import LatestMusic from "@/components/LatestMusic";
import PopularAlbums from "@/components/PopularAlbums";
import getAllData from "@/lib/actions/getAllData";

export default async function Index() {
  const data = await getAllData();

  return (
    <main className="flex-1 flex flex-col gap-6  w-4/5 overflow-hidden">
      {data?.artists && <LatestArtists artists={data.artists} />}
      {data?.albums && <PopularAlbums albums={data.albums} />}
      {data?.songs && <LatestMusic songs={data.songs} />}
    </main>
  );
}
