"use client";
import { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  formUrlQuery,
  removeKeysFromQuery,
} from "@/utils/helpers/formUrlQuery";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 👇 close the global result modal
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    // 👇 this setIsOpen closes the GlobarResult after you change the pathname
    // (after you click on smth from the results)
    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["global", "type"],
    });

    router.push(newUrl, { scroll: false });

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // 👇 This dep. is needed too for the globalResult dialog close after click
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "global",
        value: search,
      });
      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-[600px]" ref={searchContainerRef}>
      <div className="flex grow items-center h-11">
        <Search className="size-6" />
        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);

            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className={search && "text-muted-foreground"}
        />
      </div>

      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;