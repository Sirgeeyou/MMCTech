"use server";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { ToggleTheme } from "./ToggleTheme";
import { createClient } from "@/utils/supabase/server";

async function Navbar() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10">
      <div className="max-w-screen-lg flex w-full justify-between items-center  h-16 px-4">
        <Link href={"/"}>Logo</Link>
        <div className="flex gap-3 p-3 text-sm items-center">
          <AuthButton />
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
