"use client";
import { deleteSong } from "@/lib/actions/songs";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";

function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await deleteSong({ id });
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
        description: "An unexpected error occurred while removing the song.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      {isSubmitting ? <LoadingSpinner /> : <span>Delete</span>}
    </Button>
  );
}

export default DeleteButton;
