// lib/api.ts
import { API_CONFIG, ERROR_MESSAGES } from "./constants";

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

/**
 * Universal fetcher for the Vercel Daily News API.
 * Injects the required bypass token automatically with improved error handling.
 */
export async function fetchVercelDaily(endpoint: string, options: RequestInit = {}) {
  // Ensure token exists (runtime check)
  const bypassToken = API_CONFIG.BYPASS_TOKEN;
  if (!bypassToken) {
    throw new Error("API bypass token is required but not configured");
  }

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "x-vercel-protection-bypass": bypassToken,
        "Content-Type": "application/json",
        ...options.headers,
      },
      next: {
        revalidate: 300, // 5 minutes cache
        tags: [endpoint], // Enable tag-based revalidation
        ...options.next,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();
    
    if (!json.success) {
      throw new Error(json.error?.message || ERROR_MESSAGES.LOADING_FAILED);
    }
    
    return json.data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Cached function to fetch articles - optimized with Cache Components
 */
export async function fetchArticles(limit: number = API_CONFIG.DEFAULT_LIMIT) {
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
  const query = new URLSearchParams({ 
    limit: searchParams.limit || API_CONFIG.DEFAULT_LIMIT.toString()
  });
  
  if (searchParams.search?.trim()) {
    query.set("search", searchParams.search.trim());
  }
  
  if (searchParams.category?.trim()) {
    query.set("category", searchParams.category.trim());
  }
  
  return await fetchVercelDaily(`/articles?${query.toString()}`);
}