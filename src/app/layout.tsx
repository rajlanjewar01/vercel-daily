// app/layout.tsx
import { Inter } from 'next/font/google';
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-white`}>
        <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
            <Link href="/" className="text-lg font-bold tracking-tight">Vercel Daily</Link>
            <div className="flex gap-8 text-[12px] font-medium text-apple-gray">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/search" className="hover:text-foreground transition-colors">Search</Link>
              {/* We'll add the Subscription button here in the next step */}
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-100 py-12 mt-20">
          <div className="mx-auto max-w-7xl px-6 text-xs text-apple-gray">
            © 2024 Vercel Daily News Publication.
          </div>
        </footer>
      </body>
    </html>
  );
}
