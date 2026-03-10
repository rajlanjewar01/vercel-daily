// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_FORMAT_OPTIONS } from "./constants";

/**
 * Utility function to merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date with consistent options
 */
export function formatDate(date: string | Date, format: keyof typeof DATE_FORMAT_OPTIONS = "SHORT"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS[format]);
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Generate loading skeleton array
 */
export function generateSkeletonArray(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i);
}

/**
 * Safe URL parameter handling
 */
export function buildSearchUrl(
  basePath: string, 
  params: Record<string, string | undefined>
): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value && value.trim()) {
      searchParams.set(key, value.trim());
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Validate search input
 */
export function validateSearchInput(input: string, minLength: number = 3): {
  isValid: boolean;
  message?: string;
} {
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    return { isValid: true }; // Empty is valid (clears search)
  }
  
  if (trimmed.length < minLength) {
    return { 
      isValid: false, 
      message: `Search must be at least ${minLength} characters` 
    };
  }
  
  return { isValid: true };
}

/**
 * Extract and format error message from API response
 */
export async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    return data.error?.message || data.message || "An unexpected error occurred";
  } catch {
    return `Request failed with status ${response.status}`;
  }
}

/**
 * Create consistent meta tags
 */
export function createMetaTags({
  title,
  description,
  keywords = [],
  image,
  url,
  publishedTime,
  author,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  publishedTime?: string;
  author?: string;
}) {
  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description,
      url,
      type: publishedTime ? ("article" as const) : ("website" as const),
      publishedTime,
      authors: author ? [author] : undefined,
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/**
 * Check if element is in viewport (for lazy loading)
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  
  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
}