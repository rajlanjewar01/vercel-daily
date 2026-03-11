"use client";

import { useRouter, usePathname } from "next/navigation";
import { Category } from "@/lib/api";
import { buildSearchUrl, cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
  className?: string;
}

export default function CategoryFilter({
  categories, 
  currentCategory, 
  currentSearch,
  className 
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (selectedCategory: string) => {
    // Build new URL with updated parameters
    const newUrl = buildSearchUrl(pathname, {
      search: currentSearch && selectedCategory !== "" ? currentSearch : undefined,
      category: selectedCategory !== "" ? selectedCategory : undefined,
    });
    
    router.push(newUrl);
  };

  return (
    <div className={cn("w-full", className)}>
      <label 
        htmlFor="category-filter" 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Filter by Category
      </label>
      
      <select
        id="category-filter"
        value={currentCategory || ""}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className={cn(
          "block w-full max-w-sm px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        )}
        aria-label="Filter articles by category"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name} ({cat.articleCount})
          </option>
        ))}
      </select>
    </div>
  );
}