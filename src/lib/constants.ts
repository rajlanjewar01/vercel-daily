// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api",
  BYPASS_TOKEN: process.env.VERCEL_DAILY_BYPASS_TOKEN || "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q",
  DEFAULT_LIMIT: 50,
  SEARCH_LIMIT: 5,
} as const;

// UI Constants
export const UI_CONFIG = {
  SEARCH_MIN_LENGTH: 3,
  DEBOUNCE_DELAY: 300,
  SUBSCRIPTION_SUCCESS_DELAY: 1000,
  MAX_CONTENT_WIDTH: "max-w-7xl",
  LOADING_SKELETON_ITEMS: 9,
} as const;

// Cookie Configuration
export const COOKIE_CONFIG = {
  SUBSCRIPTION_TOKEN: "x-subscription-token",
  MAX_AGE: 60 * 60 * 24, // 24 hours
  SECURE: process.env.NODE_ENV === "production",
  SAME_SITE: "strict" as const,
  HTTP_ONLY: true,
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
  CONTAINER: "mx-auto max-w-7xl px-6",
  SECTION_SPACING: "pt-16 pb-24",
  ARTICLE_GRID: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12",
  HEADING_XL: "text-4xl md:text-5xl font-bold tracking-tight text-brand-primary",
  HEADING_LG: "text-3xl font-bold tracking-tight text-brand-primary",
  HEADING_MD: "text-2xl font-semibold text-brand-primary",
  BODY_TEXT: "text-brand-secondary text-sm",
  CAPTION: "text-[11px] font-bold uppercase tracking-widest text-brand-secondary",
  BUTTON_PRIMARY: "inline-flex items-center justify-center rounded-button bg-brand-primary px-10 py-4 text-body-lg font-bold text-white hover:bg-gray-800 transition-all active:scale-95 shadow-button disabled:opacity-50 disabled:cursor-not-allowed",
  BUTTON_SECONDARY: "px-5 py-2.5 rounded-button text-body-sm font-semibold transition-all bg-brand-light text-brand-secondary hover:bg-gray-200 hover:text-brand-primary",
  INPUT_BASE: "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  SELECT_BASE: "block w-full max-w-sm px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  LOADING_SPINNER: "h-5 w-5 animate-spin rounded-full border-[3px] border-brand-secondary border-t-transparent",
  SKELETON: "bg-gray-200 animate-pulse rounded",
  CARD_BASE: "relative z-20 overflow-hidden rounded-section bg-brand-light border border-brand-border-light shadow-card",
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

// Validation Rules
export const VALIDATION = {
  SEARCH_MIN_LENGTH: 3,
  SEARCH_MAX_LENGTH: 100,
  TITLE_MAX_LENGTH: 200,
  EXCERPT_MAX_LENGTH: 300,
} as const;