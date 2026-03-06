// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchVercelDaily, Article, fetchArticles } from '@/lib/api';

export const metadata: Metadata = {
  title: "Homepage - Vercel Daily News",
  description: "Stay updated with the latest web development news, insights, and tutorials from the Vercel Daily team. Your hub for Next.js, React, and modern web development.",
  keywords: ["web development news", "nextjs", "react", "vercel", "javascript news", "frontend development"],
  openGraph: {
    title: "Homepage - Vercel Daily News",
    description: "Stay updated with the latest web development news, insights, and tutorials from the Vercel Daily team.",
    url: "https://vercel-daily.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homepage - Vercel Daily News",
    description: "Stay updated with the latest web development news, insights, and tutorials from the Vercel Daily team.",
  },
};

// Loading component for the homepage content
function HomePageLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* Loading skeleton for breaking news */}
      <div className="mt-4 mb-12 h-12 bg-gray-200 animate-pulse rounded-md"></div>
      
      {/* Loading skeleton for hero section */}
      <header className="mb-20">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="space-y-4 mb-8">
          <div className="h-16 md:h-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-16 md:h-24 bg-gray-200 animate-pulse rounded w-3/4"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-full"></div>
          <div className="h-12 w-28 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </header>

      {/* Loading skeleton for featured grid */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
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
    </div>
  );
}

// Server component that fetches data
async function HomePageContent() {
  const articles: Article[] = await fetchArticles(20);
    
    // Use the first article for breaking news if available
    const breakingNews = articles.length > 0 ? articles[0] : null;
    // Ensure we show at least 6 articles in the featured grid
    const featuredArticles = articles.length > 1 ? articles.slice(1, 7) : articles.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* 1. Breaking News Banner */}
      {breakingNews && (
        <div className="mt-4 mb-12 flex items-center gap-4 bg-black p-2 text-white text-[13px] font-medium rounded-md">
          <span className="bg-white text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Breaking</span>
          <p className="truncate flex-1">Vercel CDN Now Collapses Over 3M Requests Per Day: {breakingNews.title}</p>
        </div>
      )}

      {/* 2. Hero Section */}
      <header className="mb-20">
        <p className="text-apple-gray font-semibold uppercase tracking-wider text-xs mb-4">The Vercel Daily</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
          News and insights for <br />
          <span className="text-apple-gray">modern web developers.</span>
        </h1>
        <div className="flex gap-4">
          <Link href="/search" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-all">
            Browse articles →
          </Link>
          <button className="border border-gray-200 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all">
            Subscribe
          </button>
        </div>
      </header>

      {/* 3. Featured Grid */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-semibold">Featured</h2>
          <Link href="/search" className="text-apple-blue text-sm hover:underline">View all</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                {article.image && (
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-apple-gray">
                  {article.category} • {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-xl font-semibold leading-tight group-hover:text-apple-blue transition-colors">
                  {article.title}
                </h3>
                <p className="text-apple-gray text-sm line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageLoading />}>
      <HomePageContent />
    </Suspense>
  );
}
