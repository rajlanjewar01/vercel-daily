// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Article, fetchArticles } from '@/lib/api';
import DateText from '@/components/ui/DateText';
import { COMMON_STYLES, SEO_DEFAULTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: "Homepage - Vercel Daily News",
  description: SEO_DEFAULTS.description,
  keywords: [...SEO_DEFAULTS.keywords],
  openGraph: {
    title: "Homepage - Vercel Daily News",
    description: SEO_DEFAULTS.description,
    url: SEO_DEFAULTS.baseUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homepage - Vercel Daily News",
    description: SEO_DEFAULTS.description,
  },
};

// Loading component for the homepage content
function HomePageLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* Loading skeleton for breaking news */}
      <div className={`mt-4 mb-12 h-12 ${COMMON_STYLES.animations.pulse} rounded-md`}></div>
      
      {/* Loading skeleton for hero section */}
      <header className="mb-20">
        <div className={`h-4 w-32 ${COMMON_STYLES.animations.pulse} rounded mb-4`}></div>
        <div className="space-y-4 mb-8">
          <div className={`h-16 md:h-24 ${COMMON_STYLES.animations.pulse} rounded`}></div>
          <div className={`h-16 md:h-24 ${COMMON_STYLES.animations.pulse} rounded w-3/4`}></div>
        </div>
        <div className="flex gap-4">
          <div className={`h-12 w-32 ${COMMON_STYLES.animations.pulse} rounded-full`}></div>
          <div className={`h-12 w-28 ${COMMON_STYLES.animations.pulse} rounded-full`}></div>
        </div>
      </header>

      {/* Loading skeleton for featured grid */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div className={`h-8 w-24 ${COMMON_STYLES.animations.pulse} rounded`}></div>
          <div className={`h-4 w-16 ${COMMON_STYLES.animations.pulse} rounded`}></div>
        </div>
        <div className={COMMON_STYLES.layout.gridResponsive}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className={`aspect-video ${COMMON_STYLES.animations.pulse} rounded-2xl`}></div>
              <div className="space-y-2">
                <div className={`h-3 w-32 ${COMMON_STYLES.animations.pulse} rounded`}></div>
                <div className={`h-6 ${COMMON_STYLES.animations.pulse} rounded`}></div>
                <div className={`h-4 ${COMMON_STYLES.animations.pulse} rounded w-3/4`}></div>
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
        <p className={`${COMMON_STYLES.texts.metadata} mb-4`}>The Vercel Daily</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
          News and insights for <br />
          <span className={COMMON_STYLES.texts.muted}>modern web developers.</span>
        </h1>
        <div className="flex gap-4">
          <Link 
            href="/search" 
            className="inline-flex items-center justify-center rounded-button bg-brand-primary px-10 py-4 text-body-lg font-bold text-white hover:bg-gray-800 transition-all active:scale-95 shadow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Browse articles →
          </Link>
        </div>
      </header>

      {/* 3. Featured Grid */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <h2 className={COMMON_STYLES.texts.heading}>Featured</h2>
          <Link href="/search" className={`${COMMON_STYLES.texts.accent} text-sm hover:underline`}>View all</Link>
        </div>
        
        <div className={COMMON_STYLES.layout.gridResponsive}>
          {featuredArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="group space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100">
                {article.image && (
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill
                    className={`object-cover ${COMMON_STYLES.transitions.transform}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="space-y-2">
                <div className={COMMON_STYLES.texts.metadata}>
                  <span className={COMMON_STYLES.texts.accent}>{article.category}</span>
                  <span> • </span>
                  <DateText 
                    date={article.publishedAt} 
                    format="SHORT"
                    className="inline"
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
