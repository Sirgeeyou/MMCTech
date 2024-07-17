"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import AddListingForm from "./AddListingForm";

function AddListing() {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-2 w-full">
        <CirclePlus />
        <span>Add</span>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center pt-4 pb-6 text-2xl">
            What would you like to add?
          </DialogTitle>
        </DialogHeader>
        <AddListingForm />
      </DialogContent>
    </Dialog>
  );
}

export default AddListing;
