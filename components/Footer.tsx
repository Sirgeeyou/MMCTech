import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { createClient } from "@/utils/supabase/server";

async function Footer() {
  const supabase = createClient();

  return (
    <footer className="w-full flex justify-center border-t border-t-foreground/10">
      <div className="max-w-screen-lg flex w-full justify-between items-center  h-16 px-4">
        <Link href={"/"}>Logo</Link>

        <ToggleTheme />
      </div>
    </footer>
  );
}

export default Footer;
