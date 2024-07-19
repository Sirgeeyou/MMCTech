import EditAlbum from "@/components/EditAlbum";
import { Button } from "@/components/ui/button";
import { getAlbumDetails } from "@/lib/actions/albums";
import Link from "next/link";

export default async function page({ ...props }) {
  const data = await getAlbumDetails(props.params.id);

  if (data === null) {
    return <p>Album not found</p>; 
  }
  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md p-6">
      {data && (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{data?.title}</h1>
          <div className="flex justify-between">
            <h3>
              <p className="text-neutral-500">
                Album by{" "}
                <span className="text-black dark:text-white">
                  {data.artists?.name}
                </span>
              </p>
            </h3>
            <div className="flex gap-5">
              <EditAlbum album={data} />
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
          <h4 className="text-md">{data.description}</h4>
          <div className="pt-4">
            <h4 className="text-neutral-500 pb-2">
              {data.title} contains the following songs:
            </h4>
            {data.songs && (
              <ul>
                {data.songs.map((song) => (
                  <Link
                    href={`/song/${song.id}`}
                    key={song.id}
                    className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                  >
                    <li className="py-1.5">{song.title}</li>
                    <span>{song.length}</span>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
