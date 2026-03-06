"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function SearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    // Set or remove the search parameter based on input
    if (term.trim().length >= 3) {
      params.set("search", term.trim());
    } else if (term.trim().length === 0) {
      params.delete("search");
    } else {
      // Do nothing until they hit 3 characters or clear the input
      return; 
    }

    // Reset to page 1 on new searches if pagination was implemented
    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#86868b]">
          <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      </div>
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for articles, engineering deep dives..."
        className="w-full rounded-[2rem] bg-[#f5f5f7] pl-12 pr-6 py-4 text-[19px] text-[#1d1d1f] outline-none border border-transparent focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-black/5 transition-all placeholder:text-[#86868b]"
      />
      {isPending && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <div className="h-5 w-5 animate-spin rounded-full border-[3px] border-[#86868b] border-t-transparent" />
        </div>
      )}
    </div>
  );
}