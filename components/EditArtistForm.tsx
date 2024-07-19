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
import { useParams } from "next/navigation";
import { updateArtist } from "@/lib/actions/artists";

const formSchema = z.object({
  artistName: z.string().min(1, "Artist name is required."),
});

type FormSchemaType = z.infer<typeof formSchema>;

function EditArtistForm({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams();
  const revalidationPath = `/artist/${params.id}/${params.slug}`;
  console.log(params);

  const defaultValues: FormSchemaType = {
    artistName: params.slug as string,
  };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormSchemaType) => {
    const res = await updateArtist(
      Number(params.id),
      values.artistName,
      revalidationPath
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
          name="artistName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist Name</FormLabel>
              <FormControl>
                <Input placeholder="Artist name..." {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default EditArtistForm;
