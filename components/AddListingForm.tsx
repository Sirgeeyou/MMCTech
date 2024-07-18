"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { createSong } from "@/lib/actions/songs";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";
import { formatLength } from "@/utils/helpers/formatLength";
import { calculateLengthForAlbum } from "@/utils/helpers/calculateAlbumSongsLength";
import { createAlbum } from "@/lib/actions/albums";

// Define schemas
const songSchema = z.object({
  title: z.string().min(1, "Song name is required."),
  minutes: z.coerce.number().min(0).max(60, "1 hour per song allowed."),
  seconds: z.coerce.number().max(59, "No more than 59 seconds"),
});

const albumSchema = z.object({
  category: z.literal("album"),
  artist: z.string().min(1, "Artist name is required."),
  album: z.string().min(1, "Album name is required."),
  description: z.string().max(250, "Please write a shorter description."),
  songs: z.array(songSchema).nonempty("At least one song is required."),
});

const formSchema = z.union([
  songSchema.extend({
    category: z.literal("song"),
    artist: z.string().min(1, "Artist name is required."),
  }),
  albumSchema,
]);

type FormSchemaType = z.infer<typeof formSchema>;

function AddListingForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState<"song" | "album">("song");

  const defaultValues: FormSchemaType = {
    category: "song",
    artist: "",
    title: "",
    minutes: 0,
    seconds: 0,
    album: "",
    description: "",
    songs: [],
  } as FormSchemaType;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "songs",
  });

  useEffect(() => {
    if (category === "song") {
      form.reset({
        category: "song",
        artist: "",
        title: "",
        minutes: 0,
        seconds: 0,
      } as FormSchemaType);
    } else {
      form.reset({
        category: "album",
        artist: "",
        album: "",
        description: "",
        songs: [{ title: "", minutes: 0, seconds: 0 }],
      } as FormSchemaType);
    }
  }, [category]);

  const onSubmit = async (values: FormSchemaType) => {
    if (values.category === "song") {
      const length = formatLength(
        values.minutes.toString(),
        values.seconds.toString()
      );
      const res = await createSong(values.title, length, values.artist);
      toast(`${res.success?.title}`, {
        description: `${res.success?.description}`,
      });
      setIsOpen(false);
    } else {
      const updatedAlbum = calculateLengthForAlbum(values);
      const res = await createAlbum({ updatedAlbum });
      toast(`${res.success?.title}`, {
        description: `${res.success?.description}`,
      });
      setIsOpen(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select what you would like to share</FormLabel>
              <Select
                onValueChange={(value) => {
                  form.reset();
                  field.onChange(value);
                  setCategory(value as "song" | "album");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="song">Song</SelectItem>
                  <SelectItem value="album">Album</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist name</FormLabel>
              <FormControl>
                <Input placeholder="Artist name..." {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {category === "song" && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song name</FormLabel>
                  <FormControl>
                    <Input placeholder="Song name..." {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-7">
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song duration (minutes)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                          Minutes
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seconds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Song duration (seconds)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" />
                        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                          Seconds
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {category === "album" && (
          <>
            <FormField
              control={form.control}
              name="album"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album name</FormLabel>
                  <FormControl>
                    <Input placeholder="Album name..." {...field} type="text" />
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
                    <Input
                      placeholder="Add a description..."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {fields.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <FormField
                  control={form.control}
                  name={`songs.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Song Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Song name..."
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-7">
                  <FormField
                    control={form.control}
                    name={`songs.${index}.minutes`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minutes</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} type="number" />
                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                              Minutes
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`songs.${index}.seconds`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seconds</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} type="number" />
                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                              Seconds
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <Button type="button" onClick={() => remove(index)}>
                    Remove Song
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ title: "", minutes: 0, seconds: 0 })}
            >
              Add Song
            </Button>
          </>
        )}

        <div className="flex justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>Submit</span>
            )}
          </Button>

          <span
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 px-3 hover:cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </span>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddListingForm;
