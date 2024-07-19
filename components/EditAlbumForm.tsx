"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";
import { formatLength } from "@/utils/helpers/formatLength";
import { Tables } from "@/types/types_db";
import { transformSongLength } from "@/utils/helpers/parseLength";
import { useParams } from "next/navigation";
import { updateSong } from "@/lib/actions/songs";
import { Album } from "@/types";

const albumSchema = z.object({
  title: z.string().min(1, "Album title is required."),
  description: z.string().min(1, "Album description is required."),
  artists: z
    .object({
      id: z.number().optional(), // Adjusted to be optional
      name: z.string().min(1, "Artist name is required."),
    })
    .nullable(), // Allow null
  songs: z.array(
    z.object({
      id: z.number().nullable(),
      title: z.string().min(1, "Song title is required."),
      length: z
        .string()
        .min(1, "Song length is required.")
        .regex(
          /^(?:[0-5][0-9]):[0-5][0-9]$/,
          "Song length must be in MM:SS format."
        ),
    })
  ),
});

interface Song extends Tables<"songs"> {}

type AlbumFormType = z.infer<typeof albumSchema>;

function EditAlbumForm({
  setIsOpen,
  album,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  album: Album;
}) {
  const form = useForm<AlbumFormType>({
    resolver: zodResolver(albumSchema),
    defaultValues: album,
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "songs",
  });

  const params = useParams();

  const onSubmit = async (values: AlbumFormType) => {};

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album Title</FormLabel>
              <FormControl>
                <Input placeholder="Album title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album Description</FormLabel>
              <FormControl>
                <Input placeholder="Album description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artists.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input placeholder="Artist name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3>Songs</h3>
          {fields.map((song, index) => (
            <div key={song.id} className="space-y-2">
              <FormField
                control={form.control}
                name={`songs.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Song title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`songs.${index}.length`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song Length</FormLabel>
                    <FormControl>
                      <Input placeholder="Song length..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)}>
                Delete Song
              </Button>
            </div>
          ))}
          <Button
            className="mt-6"
            type="button"
            onClick={() => append({ id: null, title: "", length: "00:00" })}
          >
            Add Song
          </Button>
        </div>
        <div className="flex justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>Submit</span>
            )}
          </Button>
          <span
            className={`hover:cursor-pointer ${buttonVariants({
              variant: "secondary",
            })}`}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </span>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditAlbumForm;
