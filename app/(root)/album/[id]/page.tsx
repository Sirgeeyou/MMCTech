import DeleteButton from "@/components/DeleteButton";
import EditAlbum from "@/components/EditAlbum";
import { Button } from "@/components/ui/button";
import { deleteAlbumById, getAlbumDetails } from "@/lib/actions/albums";
import Link from "next/link";

export default async function page({ ...props }) {
  const data = await getAlbumDetails(props.params.id);

  if (data === null) {
    return <p>Album not found</p>;
  }
  return (
    <div className="md:w-4/5 overflow-hidden flex flex-col rounded-md p-6 w-full">
      {data && (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{data?.title}</h1>
          <div className="flex justify-between items-center">
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
              <DeleteButton
                id={props.params.id}
                deleteFunction={deleteAlbumById}
                description="This action cannot be undone. This will permanently delete the album and its songs."
              />
            </div>
          </div>
          <h4 className="text-md">{data.description}</h4>
          <div className="pt-4">
            <h4 className="text-neutral-500 pb-2">
              {data.title} contains the following songs:
            </h4>
            {data.songs &&
              data.songs.map((song) => (
                <Link
                  key={song.id}
                  href={`/song/${song.id}`}
                  className="flex justify-between hover:bg-accent items-center rounded-md my-2 p-2"
                >
                  <span>{song.title}</span>
                  <span>{song.length}</span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
