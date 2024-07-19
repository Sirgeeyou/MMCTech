"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteButtonProps {
  id: number;
  description: string;
  deleteFunction: (params: { id: number }) => Promise<{
    error?: { title: string; description: string };
    success?: { title: string; description: string };
  }>;
}

function DeleteButton({ id, deleteFunction, description }: DeleteButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await deleteFunction({ id });
      if (res.error) {
        toast.error(res.error.title, {
          description: res.error.description,
        });
      } else if (res.success) {
        toast.success(res.success.title, {
          description: res.success.description,
        });
        router.push("/");
      }
    } catch (error) {
      toast.error("Unexpected Error", {
        description: "An unexpected error occurred while removing the item.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({ variant: "destructive" })}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>{" "}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : <span>Delete</span>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
