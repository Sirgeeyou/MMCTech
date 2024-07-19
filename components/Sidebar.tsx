import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "./ui/separator";
import { Home, Library } from "lucide-react";
import AddListing from "./AddListing";
import { createClient } from "@/utils/supabase/server";

async function Sidebar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="border-r border-r-foreground/10 min-h-screen w-1/5 max-w-[280px] hidden md:block">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex gap-2">
          <Home />
          <span>Home</span>
        </div>
        <span>Search placeholder</span>
        <Separator />
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Library />
            <span>Your library</span>
          </div>
          {user && <AddListing />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
