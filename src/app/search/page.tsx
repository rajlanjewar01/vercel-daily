import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { fetchVercelDaily, Article, Category } from "@/lib/api";
import SearchInput from "@/components/SearchInput";
import CategoryFilter from "@/components/CategoryFilter";

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

  // Construct the API query string dynamically - show all articles by default
  const query = new URLSearchParams({ limit: "50" }); // Increased limit to show all available articles
  if (search) query.set("search", search);
  if (category) query.set("category", category);

  // Fetch data in parallel to optimize load times
  const [articles, categories]: [Article[], Category[]] = await Promise.all([
    fetchVercelDaily(`/articles?${query.toString()}`),
    fetchVercelDaily("/categories"),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 pt-16 pb-24 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-8">
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
          <p className="text-[#86868b] text-sm">
            {search || category ? `Found ${articles.length} articles` : `Showing all ${articles.length} articles`}
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
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#86868b]">
                    <span className="text-[#0066cc]">{article.category}</span>
                    <span>•</span>
                    <time>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold leading-tight text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#86868b] text-sm line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-[2rem] border border-dashed border-gray-200 bg-[#f5f5f7]/50">
            <h3 className="text-xl font-semibold text-[#1d1d1f] mb-2">No articles found</h3>
            <p className="text-[#86868b]">
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