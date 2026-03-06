import { toggleSubscriptionAction } from "@/app/actions/subscription";

export default function PaywallCTA() {
  return (
    <div className="relative z-20 overflow-hidden rounded-[2.5rem] bg-[#f5f5f7] border border-gray-100 p-10 md:p-16 text-center shadow-sm">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">
          The story continues.
        </h2>
        <p className="text-[#86868b] text-lg leading-relaxed mb-10">
          Subscribe to Vercel Daily for full access to our engineering deep dives, 
          engineering changelogs, and community highlights.
        </p>

        <form action={toggleSubscriptionAction}>
          <button 
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-black px-10 py-4 text-lg font-bold text-white hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10"
          >
            Subscribe to Vercel Daily
          </button>
        </form>

        <p className="mt-6 text-[11px] text-[#86868b] font-medium uppercase tracking-widest">
          No account required • Instant access
        </p>
      </div>

      {/* Background visual elements */}
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#0066cc]/5 blur-3xl" />
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-black/5 blur-3xl" />
    </div>
  );
}