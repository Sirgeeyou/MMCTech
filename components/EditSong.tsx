"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import EditSongForm from "./EditSongForm";
import { useState } from "react";
import { Tables } from "@/types/types_db";

interface Song extends Tables<"songs"> {}

function EditSong({ song }: { song: Song }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <span className={buttonVariants({ variant: "secondary" })}>Edit</span>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-center pt-4 pb-6 text-2xl">
              Edit Song
            </DialogTitle>
          </DialogHeader>
          <EditSongForm setIsOpen={setIsOpen} song={song} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSong;
