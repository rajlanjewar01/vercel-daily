import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Metadata } from "next";
import { Article, Category, fetchArticlesWithParams, fetchCategories } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import CategoryFilter from "@/components/CategoryFilter";
import DateText from "@/components/common/DateText";
import { COMMON_STYLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Search Articles - Vercel Daily News",
  description: "Search through our extensive collection of web development articles, tutorials, and insights. Find content on Next.js, React, Vercel, and more.",
  keywords: ["search articles", "web development search", "nextjs tutorials", "react guides", "vercel content"],
  openGraph: {
    title: "Search Articles - Vercel Daily News",
    description: "Search through our extensive collection of web development articles, tutorials, and insights.",
    url: "https://vercel-daily.com/search",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Articles - Vercel Daily News", 
    description: "Search through our extensive collection of web development articles, tutorials, and insights.",
  },
};

// Loading component for the search page
function SearchPageLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 min-h-screen">
      <header className="mb-12">
        <div className="h-12 bg-gray-200 animate-pulse rounded mb-8"></div>
        
        {/* Search Bar Loading */}
        <div className="h-12 bg-gray-200 animate-pulse rounded mb-4"></div>
        
        {/* Category Filters Loading */}
        <div className="mt-8 flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 animate-pulse rounded-full"></div>
          ))}
        </div>
      </header>

      {/* Results Loading */}
      <section className="mt-16">
        <div className="mb-8">
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-4">
              <div className="aspect-video bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// Server component that fetches search data
async function SearchPageContent({ searchParams }: { searchParams: Promise<{ search?: string; category?: string }> }) {
  // Await searchParams as required in Next.js 15+ / 16 Canary
  const { search = "", category = "" } = await searchParams;

  // Fetch data in parallel to optimize load times using cached functions
  const [articles, categories]: [Article[], Category[]] = await Promise.all([
    fetchArticlesWithParams({
      limit: search ? "5" : "50",
      search: search || undefined,
      category: category || undefined,
    }),
    fetchCategories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-8">
          {search || category ? "Search Results" : "All Articles"}
        </h1>
        
        {/* Interactive Search Bar */}
        <SearchInput defaultValue={search} />
        
        {/* Dynamic Category Filters */}
        <div className="mt-8">
          <CategoryFilter 
            categories={categories} 
            currentCategory={category} 
            currentSearch={search} 
          />
        </div>
      </header>

      {/* Results Section */}
      <section className="mt-16">
        <div className="mb-8">
          <p className="text-brand-secondary text-sm">
            {search || category 
              ? `Found ${articles.length} article${articles.length !== 1 ? 's' : ''}` 
              : `Showing all ${articles.length} articles`
            }
            {search && (
              <span className="ml-2 text-brand-primary font-medium">
                for "{search}"
              </span>
            )}
            {category && (
              <span className="ml-2 text-brand-primary font-medium">
                in {categories.find(cat => cat.slug === category)?.name || category}
              </span>
            )}
          </p>
        </div>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article) => (
              <Link 
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex flex-col space-y-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className={COMMON_STYLES.texts.metadata}>
                    <span className={COMMON_STYLES.texts.accent}>{article.category}</span>
                    <span>•</span>
                    <DateText
                      date={article.publishedAt}
                      format="SHORT"
                      className="block"
                    />
                  </div>
                  <h3 className={`${COMMON_STYLES.texts.heading} ${COMMON_STYLES.transitions.colors}`}>
                    {article.title}
                  </h3>
                  <p className={COMMON_STYLES.texts.body}>
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={COMMON_STYLES.containers.card}>
            <h3 className={`${COMMON_STYLES.texts.heading} mb-2`}>No articles found</h3>
            <p className={COMMON_STYLES.texts.muted}>
              {search ? `We couldn't find any results for "${search}". Try adjusting your search or filters.` : "No articles are available at this time."}
            </p>
            <Link 
              href="/search" 
              className="inline-block mt-6 text-sm font-semibold text-[#0066cc] hover:underline"
            >
              Clear all filters
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  );
}