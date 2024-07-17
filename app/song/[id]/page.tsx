import { getSongById } from "@/lib/actions/songs";

export default async function page({ ...props }) {
  const data = await getSongById(props.params.id);
  return (
    <main className="w-4/5 overflow-hidden flex flex-col rounded-md p-6"></main>
  );
}
