import Link from "next/link";
import { Category } from "@/lib/api";

interface CategoryFilterProps {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
}

export default function CategoryFilter({ categories, currentCategory, currentSearch }: CategoryFilterProps) {
  // Helper to construct the URL retaining the current search term
  const buildUrl = (targetCategory: string | null) => {
    const params = new URLSearchParams();
    // Only retain search when selecting a specific category, clear when going to "All News"
    if (currentSearch && targetCategory) params.set("search", currentSearch);
    if (targetCategory) params.set("category", targetCategory);
    return `/search?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={buildUrl(null)}
        className={`px-5 py-2.5 rounded-button text-body-sm font-semibold transition-all ${
          !currentCategory
            ? "bg-brand-primary text-white shadow-button"
            : "bg-brand-light text-brand-secondary hover:bg-gray-200 hover:text-brand-primary"
        }`}
      >
        All News
      </Link>
      
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={buildUrl(cat.slug)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-button text-body-sm font-semibold transition-all ${
            currentCategory === cat.slug
              ? "bg-brand-primary text-white shadow-button"
              : "bg-brand-light text-brand-secondary hover:bg-gray-200 hover:text-brand-primary"
          }`}
        >
          {cat.name}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
            currentCategory === cat.slug ? "bg-white/20 text-white" : "bg-gray-200 text-brand-secondary"
          }`}>
            {cat.articleCount}
          </span>
        </Link>
      ))}
    </div>
  );
}