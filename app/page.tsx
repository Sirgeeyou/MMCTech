import LatestArtists from "@/components/LatestArtists";
import getAllData from "@/lib/actions/getAllData";

export default async function Index() {
  const data = await getAllData();
  console.log(data?.artists);
  return (
    <main className="flex-1 flex flex-col gap-6  w-4/5 overflow-hidden">
      {data?.artists && <LatestArtists artists={data.artists} />}
      <div>Albums</div>
      <div>Songs</div>
    </main>
  );
}
