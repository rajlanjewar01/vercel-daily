import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Metadata } from "next";
import { fetchVercelDaily, Article, ContentBlock, fetchArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { toggleSubscriptionAction } from "@/app/actions/subscription";
import PaywallCTA from "@/components/PaywallCTA";

// Generate dynamic metadata based on the article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const articles: Article[] = await fetchArticles(50);
    const article = articles.find(a => a.slug === slug);

    if (!article) {
      return {
        title: "Article Not Found - Vercel Daily News",
        description: "The requested article could not be found.",
      };
    }

    return {
      title: `${article.title} - Vercel Daily News`,
      description: article.excerpt,
      keywords: [...(article.tags || []), article.category, "web development", "nextjs", "react"],
      authors: [{ name: article.author?.name || "Vercel Daily Team" }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `https://vercel-daily.com/articles/${article.slug}`,
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author?.name || "Vercel Daily Team"],
        section: article.category,
        tags: article.tags,
        images: article.image ? [{ url: article.image, alt: article.title }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: article.image ? [article.image] : undefined,
      },
    };
  } catch (error) {
    return {
      title: "Article - Vercel Daily News",
      description: "Read the latest web development insights and tutorials.",
    };
  }
}

// Loading component for the article page
function ArticlePageLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation - Show actual link since it doesn't depend on fetched data */}
      <div className="bg-[#f5f5f7] border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link 
            href="/search" 
            className="inline-flex items-center text-[#0066cc] hover:text-[#004499] transition-colors text-sm font-medium"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-16">
        {/* Article Header Loading */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-3 w-2 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          </div>
          
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-8"></div>

          {/* Author Loading */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100">
            <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-3 w-40 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </header>

        {/* Featured Image Loading */}
        <div className="relative aspect-video w-full bg-gray-200 animate-pulse rounded-2xl mb-12"></div>

        {/* Content Loading */}
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 bg-gray-200 animate-pulse rounded w-4/5"></div>
              <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Tags Loading */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Navigation Loading */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <div className="h-12 w-40 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </article>
    </div>
  );
}

// Loading component for trending articles
function TrendingArticlesLoading() {
  return (
    <section className="mt-16 pt-8 border-t border-gray-100">
      <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-2xl">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-3 w-16 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Component to render different content blocks
function ContentRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[#1d1d1f] text-lg leading-relaxed mb-6">
          {block.text}
        </p>
      );
    
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="text-3xl font-bold text-[#1d1d1f] mt-12 mb-6">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="text-2xl font-semibold text-[#1d1d1f] mt-10 mb-4">
          {block.text}
        </h3>
      );
    
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-[#0066cc] pl-6 py-2 my-8 bg-[#f5f5f7] rounded-r-lg">
          <p className="text-xl italic text-[#1d1d1f] font-medium">
            {block.text}
          </p>
        </blockquote>
      );
    
    case "unordered-list":
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">
          {block.items.map((item, index) => (
            <li key={index} className="text-[#1d1d1f] text-lg leading-relaxed ml-4">
              {item}
            </li>
          ))}
        </ul>
      );
    
    case "ordered-list":
      return (
        <ol className="list-decimal list-inside mb-6 space-y-2">
          {block.items.map((item, index) => (
            <li key={index} className="text-[#1d1d1f] text-lg leading-relaxed ml-4">
              {item}
            </li>
          ))}
        </ol>
      );
    
    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#f5f5f7]">
            {block.src && block.src.trim() !== "" ? (
              <Image 
                src={block.src} 
                alt={block.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#86868b]">
                <span>Image not available</span>
              </div>
            )}
          </div>
          {block.caption && (
            <figcaption className="text-center text-[#86868b] text-sm mt-3 italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    
    default:
      return null;
  }
}

// Server component that fetches article data
async function ArticlePageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Check subscription status
  const cookieStore = await cookies();
  const isSubscribed = !!cookieStore.get("x-subscription-token");
  
  // Fetch all articles using cached function and find the one with matching slug
  const articles: Article[] = await fetchArticles(50);
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-[#f5f5f7] border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link 
            href="/search" 
            className="inline-flex items-center text-[#0066cc] hover:text-[#004499] transition-colors text-sm font-medium"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-16">
        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-4">
            <span className="text-[#0066cc]">{article.category}</span>
            <span>•</span>
            <time>
              {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              })}
            </time>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-[1.1]">
            {article.title}
          </h1>
          
          <p className="text-xl text-[#86868b] leading-relaxed mb-8 font-medium">
            {article.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-gray-100">
            {article.author?.avatar && (
              <Image 
                src={article.author.avatar} 
                alt={article.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-[#1d1d1f]">
                {article.author?.name || 'Unknown Author'}
              </p>
              <p className="text-sm text-[#86868b]">
                Published {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                  month: 'long', day: 'numeric', year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 bg-[#f5f5f7]">
            <Image 
              src={article.image} 
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {isSubscribed ? (
            // Full content for subscribed users
            <>
              {article.content && Array.isArray(article.content) ? (
                article.content.map((block, index) => (
                  <ContentRenderer key={index} block={block} />
                ))
              ) : (
                <p className="text-[#1d1d1f] text-lg leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              )}
            </>
          ) : (
            // Limited content for non-subscribed users
            <>
              {/* Show first paragraph or excerpt as teaser */}
              <div className="relative">
                {article.content && Array.isArray(article.content) && article.content.length > 0 ? (
                  <>
                    {/* Show first paragraph/content block */}
                    <ContentRenderer block={article.content[0]} />
                    {/* Show second block if it exists and is short */}
                    {article.content.length > 1 && article.content[1].type === "paragraph" && (
                      <ContentRenderer block={article.content[1]} />
                    )}
                  </>
                ) : (
                  <p className="text-[#1d1d1f] text-lg leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                )}
                
                {/* Paywall CTA */}
                <PaywallCTA />
              </div>
            </>
          )}
        </div>

        {/* Tags - Only show for subscribed users */}
        {isSubscribed && article.tags && article.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-[#f5f5f7] text-[#1d1d1f] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Subscribe CTA - Only show for subscribed users (different from paywall) */}
        {isSubscribed && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="bg-gradient-to-r from-[#f5f5f7] to-[#fafafa] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
                Get the latest insights delivered to your inbox
              </h3>
              <p className="text-[#86868b] mb-6 max-w-2xl mx-auto">
                Join thousands of developers who stay ahead with our weekly newsletter covering the latest in web development, frameworks, and best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="px-4 py-3 border border-gray-200 rounded-full text-center sm:text-left w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent"
                />
                <button className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-medium hover:bg-[#004499] transition-colors w-full sm:w-auto">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-[#86868b] mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        )}

        {/* Trending Articles - Only show for subscribed users */}
        {isSubscribed && (
          <Suspense fallback={<TrendingArticlesLoading />}>
            <TrendingArticles currentSlug={article.slug} />
          </Suspense>
        )}

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <Link 
            href="/search" 
            className="bg-[#0066cc] text-white px-8 py-3 rounded-full font-medium hover:bg-[#004499] transition-colors"
          >
            View more articles
          </Link>
        </div>
      </article>
    </div>
  );
}

// Trending Articles Component
async function TrendingArticles({ currentSlug }: { currentSlug: string }) {
  try {
    // Fetch articles and filter out current article, get first 4 as trending
    const articles: Article[] = await fetchArticles(20);
    const trendingArticles = articles
      .filter(article => article.slug !== currentSlug)
      .slice(0, 4);

    if (trendingArticles.length === 0) {
      return null;
    }

    return (
      <section className="mt-16 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-[#1d1d1f] mb-8">Trending Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingArticles.map((article, index) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`}
              className="group flex gap-4 p-4 rounded-2xl hover:bg-[#f5f5f7] transition-colors"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#f5f5f7] rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-[#0066cc]">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-2">
                  {article.category}
                </p>
                <h3 className="font-semibold text-[#1d1d1f] leading-tight group-hover:text-[#0066cc] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[#86868b] mt-2">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric' 
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    // Silently fail - don't show trending articles if there's an error
    return null;
  }
}

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ArticlePageLoading />}>
      <ArticlePageContent params={params} />
    </Suspense>
  );
}