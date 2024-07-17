import LatestArtists from "@/components/LatestArtists";
import LatestMusic from "@/components/LatestMusic";
import PopularAlbums from "@/components/PopularAlbums";
import { getAlbums } from "@/lib/actions/albums";
import { getArtists } from "@/lib/actions/artists";
import { getSongs } from "@/lib/actions/songs";

export default async function HomePage() {
  const artists = await getArtists();
  const albums = await getAlbums();
  const songs = await getSongs();

  return (
    <main className="flex-1 flex flex-col gap-6  w-4/5 overflow-hidden">
      <LatestArtists artists={artists} />
      <PopularAlbums albums={albums} />
      <LatestMusic songs={songs} />
    </main>
  );
}
