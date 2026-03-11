import Link from "next/link";
import { cn } from "@/lib/utils";
import { SEO_DEFAULTS } from "@/lib/constants";
import SearchIcon from "./common/SearchIcon";
import SubscriptionButton from "./SubscriptionButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-lg font-bold tracking-tight text-brand-primary hover:text-brand-accent transition-colors"
            aria-label={`${SEO_DEFAULTS.SITE_NAME} homepage`}
          >
            {SEO_DEFAULTS.SITE_NAME.replace(" News", "")}
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          <Link 
            href="/search" 
            className={cn(
              "p-2 text-brand-secondary hover:text-brand-primary transition-colors",
              "rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            )}
            aria-label="Search articles"
          >
            <SearchIcon size={16} />
          </Link>
          
          <SubscriptionButton />
        </div>
      </div>
    </nav>
  );
}
