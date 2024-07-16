import { getAlbumDetails } from "@/lib/actions/getAlbumDetails";

export default async function page({ ...props }) {
  const data = await getAlbumDetails(props.params.id);
  console.log(data);
  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md p-6">
      {data && (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl">{data[0]?.title}</h1>
            <h3>
              <p className="text-neutral-500">
                Album by{" "}
                <span className="text-white">
                  {Array.isArray(data[0].artists)
                    ? data[0].artists.map((artist) => artist.name).join(", ")
                    : data[0].artists.name}
                </span>
              </p>
            </h3>
            <h4 className="text-md">{data[0].description}</h4>
          </div>
          <p className="mt-5">
            Other albums by{" "}
            <span>
              {Array.isArray(data[0].artists)
                ? data[0].artists.map((artist) => artist.name).join(", ")
                : data[0].artists.name}{" "}
            </span>
          </p>
        </>
      )}
    </main>
  );
}
