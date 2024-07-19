"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";

interface DeleteButtonProps {
  id: number;
  deleteFunction: (params: {
    id: number;
  }) => Promise<{
    error?: { title: string; description: string };
    success?: { title: string; description: string };
  }>;
}

function DeleteButton({ id, deleteFunction }: DeleteButtonProps) {
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
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isSubmitting}
    >
      {isSubmitting ? <LoadingSpinner /> : <span>Delete</span>}
    </Button>
  );
}

export default DeleteButton;
