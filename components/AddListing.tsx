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
import AddListingForm from "./AddListingForm";
import { useState } from "react";

function AddListing() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 p-2 gap-2">
        <CirclePlus />
        <span>Add</span>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center pt-4 text-2xl">
            What would you like to add?
          </DialogTitle>
        </DialogHeader>
        <AddListingForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AddListing;
