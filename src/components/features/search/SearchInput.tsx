"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useCallback } from "react";
import { cn, debounce } from "@/lib/utils";
import { UI_CONFIG } from "@/lib/constants";
import SearchIcon from "../../ui/SearchIcon";
import LoadingSpinner from "../../ui/LoadingSpinner";

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ 
  defaultValue = "",
  placeholder = "Search for articles, engineering deep dives...",
  className 
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const performSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term.trim().length >= UI_CONFIG.SEARCH_MIN_LENGTH) {
      params.set("search", term.trim());
    } else if (term.trim().length === 0) {
      params.delete("search");
    } else {
      // Do nothing until minimum length or clear input
      return; 
    }

    // Reset pagination on new searches
    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [router, searchParams, pathname, startTransition]);

  // Debounced search to improve performance
  const debouncedSearch = debounce(performSearch, UI_CONFIG.DEBOUNCE_DELAY);

  const handleSearch = (term: string) => {
    // Immediate update for clearing
    if (term.trim().length === 0) {
      performSearch(term);
    } else {
      debouncedSearch(term);
    }
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <SearchIcon 
          size={20} 
          className="text-brand-secondary" 
        />
      </div>
      
      <input
        type="text"
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-input bg-brand-light pl-12 pr-6 py-4",
          "text-content text-brand-primary outline-none",
          "border border-transparent transition-all",
          "focus:border-brand-border-light focus:bg-brand-bg-primary focus:shadow-input",
          "placeholder:text-brand-secondary"
        )}
        aria-label="Search articles"
      />
      
      {isPending && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  );
}