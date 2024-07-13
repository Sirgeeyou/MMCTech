import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "./ui/separator";

function Sidebar({ className }: { className: string }) {
  return (
    <div className={cn(className, "border-r border-r-foreground/10")}>
      <div className="flex flex-col gap-4 p-4">
        <span> Home</span>
        <span> Search placeholder</span>
        <Separator />
        <span>Your library</span>
      </div>
    </div>
  );
}

export default Sidebar;
