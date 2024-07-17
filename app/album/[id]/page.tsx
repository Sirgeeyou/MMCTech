import { getAlbumDetails } from "@/lib/actions/albums";

export default async function page({ ...props }) {
  const data = await getAlbumDetails(props.params.id);
  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md p-6">
      {data && (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{data?.title}</h1>
          <h3>
            <p className="text-neutral-500">
              Album by <span className="text-white"></span>
            </p>
          </h3>
          <h4 className="text-md">{data.description}</h4>
          <div className="pt-4">
            <h4 className="text-neutral-500 pb-2">
              {data.title} contains the following songs:
            </h4>
            {data.songs && (
              <ul>
                {data.songs.map((song) => (
                  <div
                    className="flex justify-between hover:bg-accent items-center rounded-md px-3 my-2"
                    key={song.id}
                  >
                    <li className="py-1.5">{song.title}</li>
                    <span>{song.length.slice(0, -3)}</span>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
