"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "./ui/button";
import { useState } from "react";
import EditArtistForm from "./EditArtistForm";
import { useParams } from "next/navigation";

function EditArtist() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <span className={buttonVariants({ variant: "secondary" })}>Edit</span>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined} className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center pt-4  text-2xl">
              Edit Artist
            </DialogTitle>
          </DialogHeader>
          <EditArtistForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditArtist;
