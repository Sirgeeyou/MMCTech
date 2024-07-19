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
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

function AddListing() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        <CirclePlus className="mr-2" />
        <span>Add Media</span>
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
