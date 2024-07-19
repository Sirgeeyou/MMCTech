"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
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

// Define schema
const formSchema = z.object({
  title: z.string().min(1, "Song name is required."),
  minutes: z.coerce.number().min(0).max(60, "1 hour per song allowed."),
  seconds: z.coerce.number().max(59, "No more than 59 seconds"),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Song extends Tables<"songs"> {}

function EditSongForm({
  setIsOpen,
  song,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  song: Song;
}) {
  const { minutes, seconds } = transformSongLength(song);
  const params = useParams();

  const defaultValues: FormSchemaType = {
    title: song.title,
    minutes: minutes,
    seconds: seconds,
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormSchemaType) => {
    const parsedIntoLength = formatLength(
      values.minutes.toString(),
      values.seconds.toString()
    );
    const res = await updateSong(
      values.title,
      parsedIntoLength,
      params.id as string
    );
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
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
        <div className="flex justify-between">
          <button
            className={buttonVariants({ variant: "secondary" })}
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

export default EditSongForm;
