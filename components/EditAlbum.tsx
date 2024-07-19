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
import EditAlbumForm from "./EditAlbumForm";
import { Album } from "@/types";

function EditSong({ album }: { album: Album }) {
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
              Edit Album
            </DialogTitle>
          </DialogHeader>
          <EditAlbumForm setIsOpen={setIsOpen} album={album} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSong;
