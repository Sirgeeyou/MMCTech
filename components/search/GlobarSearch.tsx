"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";
import { Input } from "../ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils/helpers/formUrlQuery";

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

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // 👇 This dep. is needed too for the globalResult dialog close after click
  }, [pathname]);

  useEffect(() => {
    if (search.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [search, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-[600px]" ref={searchContainerRef}>
      <div className="flex grow items-center h-11 relative">
        <Search className="size-6 absolute top-2 right-2" />
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
      {isOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalResult />
        </Suspense>
      )}
    </div>
  );
};

export default GlobalSearch;
