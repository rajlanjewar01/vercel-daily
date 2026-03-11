// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api",
  BYPASS_TOKEN: process.env.VERCEL_DAILY_BYPASS_TOKEN || "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q",
  DEFAULT_LIMIT: 50,
} as const;

// UI Constants
export const UI_CONFIG = {
  SEARCH_MIN_LENGTH: 3,
  DEBOUNCE_DELAY: 300,
  SUBSCRIPTION_SUCCESS_DELAY: 1000,
} as const;

// Common Class Names
export const COMMON_STYLES = {
  // Layout
  container: "mx-auto max-w-7xl px-6",
  section: "pt-16 pb-24",
  
  // Layout Utilities  
  layout: {
    gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12",
  },
  
  // Container styles
  containers: {
    card: "py-24 text-center rounded-[2rem] border border-dashed border-gray-200 bg-[#f5f5f7]/50",
  },
  
  // Text styles
  texts: {
    heading: 'text-xl font-semibold leading-tight text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors',
    body: 'text-[#86868b] text-sm line-clamp-2 leading-relaxed',
    articleParagraph: 'text-[19px] leading-[1.6] text-[#1d1d1f] font-normal',
    caption: 'mt-4 text-center text-sm text-[#86868b] font-medium italic',
    metadata: 'flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#86868b]',
    muted: 'text-[#86868b]',
    accent: 'text-[#0066cc]',
    nav: 'text-[#424245] hover:text-[#1d1d1f] transition-colors',
  },
  
  // Animation styles
  animations: {
    pulse: 'bg-gray-200 animate-pulse',
  },
  
  // Transition styles
  transitions: {
    colors: 'group-hover:text-[#0066cc] transition-colors',
    transform: 'transition-transform duration-500 group-hover:scale-105',
  },
  
  // Legacy uppercase constants for backward compatibility
} as const;

// Date Formatting Options
export const DATE_FORMAT_OPTIONS = {
  SHORT: { 
    month: 'short' as const, 
    day: 'numeric' as const, 
    year: 'numeric' as const 
  },
  LONG: { 
    weekday: 'long' as const, 
    year: 'numeric' as const, 
    month: 'long' as const, 
    day: 'numeric' as const 
  },
} as const;

// SEO Defaults  
export const SEO_DEFAULTS = {
  siteName: "Vercel Daily News",
  baseUrl: "https://vercel-daily.com",
  description: "Stay updated with the latest web development news, insights, and tutorials from the Vercel Daily team. Your hub for Next.js, React, and modern web development.",
  keywords: ["web development news", "nextjs", "react", "vercel", "javascript news", "frontend development"],
  twitterHandle: "@vercel",
  // Legacy uppercase for backward compatibility
  SITE_NAME: "Vercel Daily News",
  SITE_URL: "https://vercel-daily.com",
  DESCRIPTION: "Stay updated with the latest web development news, insights, and tutorials from the Vercel Daily team.",
  KEYWORDS: ["web development news", "nextjs", "react", "vercel", "javascript news", "frontend development"],
  TWITTER_HANDLE: "@vercel",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  SUBSCRIPTION_FAILED: "Failed to manage subscription. Please try again.",
  SEARCH_FAILED: "Search failed. Please try again.",
  LOADING_FAILED: "Failed to load content. Please refresh the page.",
  NOT_FOUND: "The requested content could not be found.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SUBSCRIPTION_CREATED: "Successfully subscribed!",
  SUBSCRIPTION_CANCELLED: "Successfully unsubscribed.",
} as const;