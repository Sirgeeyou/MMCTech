import Link from "next/link";
import { ToggleTheme } from "./ToggleTheme";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

async function Footer() {
  return (
    <footer className="w-full flex justify-center border-t border-t-foreground/10">
      <div className="flex w-full justify-between items-center  h-20 px-4 sm:px-8">
        <Link href={"/"}>
          <Image height={64} width={64} src={"/logo.png"} alt="Logo" />
        </Link>

        <ToggleTheme />
      </div>
    </footer>
  );
}

export default Footer;
