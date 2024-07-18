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
          <span className={buttonVariants({ variant: "secondary" })}>
            dsadasd
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          {/* <EditSongForm /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditSong;
