"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Category } from "@/lib/api";

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
}

export default function CategoryFilter({ categories, currentCategory, currentSearch }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (selectedCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Only retain search when selecting a specific category, clear when going to "All News"
    if (currentSearch && selectedCategory !== "") {
      params.set("search", currentSearch);
    } else if (selectedCategory === "") {
      params.delete("search");
    }
    
    if (selectedCategory && selectedCategory !== "") {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category
      </label>
      <select
        id="category-filter"
        value={currentCategory || ""}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="block w-full max-w-sm px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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