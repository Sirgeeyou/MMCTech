import Link from "next/link";
import AuthButton from "./AuthButton";
// import GlobalSearch from "./search/GlobarSearch";
import Image from "next/image";

async function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 px-4">
      <div className=" flex w-full justify-between items-center  h-20 px-4 sm:px-0">
        <Link href={"/"}>
          <Image height={64} width={64} src={"/logo.png"} alt="Logo" />
        </Link>
        {/* <GlobalSearch /> */}
        <div className="flex gap-3  text-sm items-center">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
