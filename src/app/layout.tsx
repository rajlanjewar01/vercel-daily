// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vercel Daily News",
  description: "Latest insights for modern web developers.",
  keywords: ["vercel", "nextjs", "web development", "react", "javascript", "news"],
  authors: [{ name: "Vercel Daily Team" }],
  creator: "Vercel Daily",
  publisher: "Vercel Daily",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vercel-daily.com",
    title: "Vercel Daily News",
    description: "Latest insights for modern web developers.",
    siteName: "Vercel Daily",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Daily News",
    description: "Latest insights for modern web developers.",
    creator: "@vercel_daily",
  },
  other: {
    // Required by API Specification
    "generator": "vnews-cert-v3", 
  },
};

export const viewport: Viewport = {
  // Required by API Specification
  themeColor: "#0f172a", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-brand-primary bg-brand-bg-primary`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
