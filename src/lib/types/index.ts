// Shared TypeScript types for the application

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

export interface Category {
  slug: string;
  name: string;
  articleCount: number;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  error?: {
    message: string;
  };
}

// Subscription types
export interface SubscriptionStatus {
  isSubscribed: boolean;
}

export interface SubscriptionToggleResponse {
  success: boolean;
  subscribed: boolean;
  message?: string;
}