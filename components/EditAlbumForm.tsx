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
import { useParams } from "next/navigation";
import { Album } from "@/types";
import { updateAlbum } from "@/lib/actions/albums";
import { toast } from "sonner";

const albumSchema = z.object({
  title: z.string().min(1, "Album title is required."),
  description: z.string().min(1, "Album description is required."),
  artists: z.object({
    id: z.number(),
    name: z.string().min(1, "Artist name is required."),
  }),
  songs: z.array(
    z.object({
      id: z.number().optional(),
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

  const onSubmit = async (values: AlbumFormType) => {
    const res = await updateAlbum(params.id as string, values);
    if (res.error) {
      toast.error(`${res.error?.title}`, {
        description: `${res.error?.description}`,
      });
      setIsOpen(false);
    }
    if (res.success) {
      toast.success(`${res.success?.title}`, {
        description: `${res.success?.description}`,
      });
      setIsOpen(false);
    }
  };

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
            onClick={() => append({ title: "", length: "00:00" })}
          >
            Add Another Song
          </Button>
        </div>
        <div className="flex justify-between">
          <button
            className={`hover:cursor-pointer ${buttonVariants({
              variant: "secondary",
            })}`}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditAlbumForm;
