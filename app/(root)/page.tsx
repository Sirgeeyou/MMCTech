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
    <div className="flex-col w-4/5">
      <LatestArtists artists={artists} />
      <PopularAlbums albums={albums} />
      <LatestMusic songs={songs} />
    </div>
  );
}
