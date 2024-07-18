"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
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
import { formatLength } from "@/utils/helpers/formatLength";
import { createSong } from "@/lib/actions/songs";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";

// Define schemas
const songSchema = z.object({
  category: z.literal("song"),
  artist: z.string().min(1, "Artist name is required."),
  songName: z.string().min(1, "Song name is required."),
  minutes: z.string().min(1, "Minutes are required."),
  seconds: z.string().min(1, "Seconds are required."),
});

const albumSchema = z.object({
  category: z.literal("album"),
  album: z.string().min(1, "Album name is required."),
});

const formSchema = z.union([songSchema, albumSchema]);

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
    songName: "",
    minutes: "",
    seconds: "",
  } as FormSchemaType;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (category === "song") {
      form.reset({
        category: "song",
        artist: "",
        minutes: "",
        seconds: "",
        songName: "",
      } as FormSchemaType);
    } else {
      form.reset({
        category: "album",
        album: "",
      } as FormSchemaType);
    }
  }, [category]);

  const onSubmit = async (values: FormSchemaType) => {
    if (values.category === "song") {
      const length = formatLength(values.minutes, values.seconds);
      const res = await createSong(values.songName, length, values.artist);
      toast(`${res.success?.title}`, {
        description: `${res.success?.description}`,
      });
      setIsOpen(false);
    } else {
      toast("Error :(", {
        description: "An unexpected error has ocurred. Please try again later.",
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
              <FormLabel>Select what would you like to share</FormLabel>
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

        {category === "song" && (
          <>
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Artist name..."
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="songName"
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
                    <FormLabel>Song duration</FormLabel>
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
                    <FormLabel>Song duration</FormLabel>
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
