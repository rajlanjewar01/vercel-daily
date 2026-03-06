// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vercel Daily News",
  description: "Latest insights for modern web developers.",
  other: {
    // Required by API Specification
    "generator": "vnews-cert-v3", 
  },
};

export const viewport: Viewport = {
  // Required by API Specification
  themeColor: "#1a1a2e", 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-[#1d1d1f] bg-white`}>
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="font-bold tracking-tight hover:text-blue-600 transition-colors">
              Vercel Daily
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
