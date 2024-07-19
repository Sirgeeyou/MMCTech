import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";

const ThemeToggle = dynamic(() => import("@/components/ToggleTheme"), {
  ssr: false,
  loading: () => (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1 px-2 text-lg font-semibold md:text-base"
    >
      <div className="h-6 w-6 animate-pulse rounded-full bg-muted-foreground/70" />
      <span className="w-14 animate-pulse rounded bg-muted-foreground/70 capitalize">
        &nbsp;
      </span>
    </Button>
  ),
});

async function Footer() {
  return (
    <footer className="w-full flex justify-center border-t border-t-foreground/10">
      <div className="flex w-full justify-between items-center  h-20 px-4 sm:px-8">
        <Link href={"/"}>
          <Image height={64} width={64} src={"/logo.png"} alt="Logo" />
        </Link>

        <ThemeToggle />
      </div>
    </footer>
  );
}

export default Footer;
