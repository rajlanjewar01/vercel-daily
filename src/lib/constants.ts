// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VERCEL_DAILY_API_URL,
  BYPASS_TOKEN: process.env.VERCEL_DAILY_BYPASS_TOKEN,
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
  page: "min-h-screen",
  
  // Layout Utilities  
  layout: {
    gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12",
  },
  
  // Text styles
  texts: {
    pageTitle: 'text-4xl md:text-5xl font-bold tracking-tight text-brand-primary mb-8',
    heading: 'text-xl font-semibold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors',
    body: 'text-slate-500 text-sm line-clamp-2 leading-relaxed',
    articleParagraph: 'text-[19px] leading-[1.6] text-slate-900 font-normal',
    caption: 'mt-4 text-center text-sm text-slate-500 font-medium italic',
    metadata: 'flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500',
    muted: 'text-slate-500',
    accent: 'text-blue-600',
    nav: 'text-slate-600 hover:text-slate-900 transition-colors',
    link: 'inline-block mt-6 text-sm font-semibold text-blue-600 hover:underline',
  },
  
  // Animation styles
  animations: {
    pulse: 'bg-gray-200 animate-pulse',
    skeleton: 'bg-gray-200 animate-pulse rounded',
  },
  
  // Image styles
  images: {
    container: 'relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100',
    responsive: 'object-cover transition-transform duration-700 group-hover:scale-105',
  },
  
  // Transition styles
  transitions: {
    colors: 'group-hover:text-blue-600 transition-colors',
    transform: 'transition-transform duration-500 group-hover:scale-105',
  },
  
  // Legacy uppercase constants for backward compatibility
} as const;

// Brand Colors
export const COLORS = {
  // Primary brand colors
  primary: '#0066cc',
  primaryHover: '#004499',
  
  // Background colors
  background: {
    light: '#f5f5f7',
    dark: '#1a1a2e',
  },
  
  // Text colors
  text: {
    primary: '#1d1d1f',
    secondary: '#86868b',
  },
} as const;

// Date Formatting Options
export const DATE_FORMAT_OPTIONS = {
  COMPACT: { 
    month: 'short' as const, 
    day: 'numeric' as const, 
    year: 'numeric' as const 
  },
  READABLE: { 
    month: 'long' as const, 
    day: 'numeric' as const, 
    year: 'numeric' as const 
  },
  DETAILED: { 
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