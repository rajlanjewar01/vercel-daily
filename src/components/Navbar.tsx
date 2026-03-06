// components/Navbar.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { toggleSubscriptionAction } from "@/app/actions/subscription";

export default async function Navbar() {
  const cookieStore = await cookies();
  const isSubscribed = !!cookieStore.get("x-subscription-token");

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Vercel Daily
          </Link>
          <div className="hidden md:flex gap-6 text-[12px] font-medium text-[#86868b]">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/search?category=engineering" className="hover:text-black transition-colors">Engineering</Link>
            <Link href="/search?category=changelog" className="hover:text-black transition-colors">Changelog</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/search" className="p-2 text-[#86868b] hover:text-black">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Link>
          
          <form action={toggleSubscriptionAction}>
            <button 
              type="submit"
              className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                isSubscribed 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
