// lib/api.ts
export interface Article {
  id: string;
  name: string;      // We'll map this to 'Title'
  description: string; // We'll map this to 'Content'
  slug: string;
  category: string;
  price: number;      // Not used for news, but in API
  images: { url: string; alt: string }[];
  featured: boolean;
  createdAt: string;
}

const API_BASE = "https://vercel-swag-store-api.vercel.app/api";
const BYPASS_TOKEN = "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q";

export async function fetchVercelDaily(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "x-vercel-protection-bypass": BYPASS_TOKEN,
    },
    // This is where Next.js 16's internal caching logic lives
    next: { revalidate: 3600 } 
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  const json = await res.json();
  return json.data;
}
