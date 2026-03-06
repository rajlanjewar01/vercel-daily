// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchVercelDaily, Article } from '@/lib/api';

// Experimental Next.js 16 Caching
async function getArticles() {
  "use cache";
  return await fetchVercelDaily("/products?featured=true");
}

export default async function HomePage() {
  const articles: Article[] = await getArticles();
  const breakingNews = articles[0]; // Using the first featured item as "Breaking"
  const featuredArticles = articles.slice(1, 7);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      {/* 1. Breaking News Banner */}
      <div className="mt-4 mb-12 flex items-center gap-4 bg-black p-2 text-white text-[13px] font-medium rounded-md">
        <span className="bg-white text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Breaking</span>
        <p className="truncate flex-1">Vercel CDN Now Collapses Over 3M Requests Per Day: {breakingNews.name}</p>
      </div>

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
                {article.images?.[0]?.url && (
                  <Image 
                    src={article.images[0].url} 
                    alt={article.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-apple-gray">
                  {article.category} • {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <h3 className="text-xl font-semibold leading-tight group-hover:text-apple-blue transition-colors">
                  {article.name}
                </h3>
                <p className="text-apple-gray text-sm line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
