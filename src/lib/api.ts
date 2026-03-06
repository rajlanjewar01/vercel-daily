// lib/api.ts

// Define the exact block types based on the Vercel Daily API specification
export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "blockquote"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface Author {
  name: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category: string;
  author: Author;
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

export interface BreakingNews {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
}

export interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

const API_BASE = "https://vercel-daily-news-api.vercel.app/api";
const BYPASS_TOKEN = "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q";

/**
 * Universal fetcher for the Vercel Daily News API.
 * Injects the required bypass token automatically.
 */
export async function fetchVercelDaily(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "x-vercel-protection-bypass": BYPASS_TOKEN,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const json = await res.json();
  
  if (!json.success) {
    throw new Error(json.error?.message || "An error occurred while fetching data.");
  }
  
  return json.data;
}

/**
 * Cached function to fetch articles - optimized with Cache Components
 */
export async function fetchArticles(limit: number = 50) {
  "use cache";
  return await fetchVercelDaily(`/articles?limit=${limit}`);
}

/**
 * Cached function to fetch categories - optimized with Cache Components
 */
export async function fetchCategories() {
  "use cache";
  return await fetchVercelDaily("/categories");
}

/**
 * Cached function to fetch articles with search/filter parameters
 */
export async function fetchArticlesWithParams(searchParams: {
  limit?: string;
  search?: string;
  category?: string;
}) {
  "use cache";
  const query = new URLSearchParams({ limit: searchParams.limit || "50" });
  if (searchParams.search) query.set("search", searchParams.search);
  if (searchParams.category) query.set("category", searchParams.category);
  
  return await fetchVercelDaily(`/articles?${query.toString()}`);
}