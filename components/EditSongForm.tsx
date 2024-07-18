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
import { useEffect } from "react";
import { createSong } from "@/lib/actions/songs";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";
import { formatLength } from "@/utils/helpers/formatLength";

// Define schema
const formSchema = z.object({
  title: z.string().min(1, "Song name is required."),
  minutes: z.coerce.number().min(0).max(60, "1 hour per song allowed."),
  seconds: z.coerce.number().max(59, "No more than 59 seconds"),
});

type FormSchemaType = z.infer<typeof formSchema>;

function EditSongForm({
  setIsOpen,
  title,
  minutes,
  seconds,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  minutes: string;
  seconds: string;
}) {
  const defaultValues: FormSchemaType = {
    title: "",
    minutes: 0,
    seconds: 0,
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormSchemaType) => {
    // const length = formatLength(
    //   values.minutes.toString(),
    //   values.seconds.toString()
    // );
    // const res = await createSong(values.title, length);
    // toast(`${res.success?.title}`, {
    //   description: `${res.success?.description}`,
    // });
    // setIsOpen(false);
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <span>Submit</span>
            )}
          </Button>

          <span
            className={buttonVariants({ variant: "secondary" })}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </span>
        </div>
      </form>
    </FormProvider>
  );
}

export default EditSongForm;
