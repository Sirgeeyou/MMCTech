import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "./ui/separator";
import { Home, Library } from "lucide-react";

function Sidebar({ className }: { className: string }) {
  return (
    <div className={cn(className, "border-r border-r-foreground/10")}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <Home />
          <span> Home</span>
        </div>
        <span> Search placeholder</span>
        <Separator />
        <div className="flex gap-2">
          <Library />
          <span>Your library</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
