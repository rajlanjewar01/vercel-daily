"use client";

import { useState } from "react";

export default function PaywallCTA() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscription-toggle", {
        method: "POST",
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsSubscribed(true);
          // Small delay to show success state, then reload page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Failed to subscribe:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="relative z-20 overflow-hidden rounded-section bg-brand-light border border-brand-border-light p-10 md:p-16 text-center shadow-card">
      <div className="max-w-md mx-auto">
        <h2 className="text-title font-bold tracking-tight text-brand-primary mb-4">
          The story continues.
        </h2>
        <p className="text-brand-secondary text-body-lg leading-relaxed mb-10">
          Subscribe to Vercel Daily for full access to our engineering deep dives, 
          engineering changelogs, and community highlights.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleSubscribe(); }}>
          <button 
            type="submit"
            disabled={isLoading || isSubscribed}
            className="inline-flex items-center justify-center rounded-button bg-brand-primary px-10 py-4 text-body-lg font-bold text-white hover:bg-gray-800 transition-all active:scale-95 shadow-button disabled:opacity-50 disabled:cursor-not-allowed min-w-[250px]"
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <svg 
                  className="-ml-1 mr-3 h-5 w-5" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd"
                  />
                </svg>
                Subscribed! Reloading...
              </>
            ) : (
              "Subscribe to Vercel Daily"
            )}
          </button>
        </form>

        <p className="mt-6 text-xs text-brand-secondary font-medium uppercase tracking-widest">
          {isSubscribed ? "Access granted • Page reloading..." : "No account required • Instant access"}
        </p>
      </div>

      {/* Background visual elements */}
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-brand-accent/5 blur-3xl" />
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
    </div>
  );
}