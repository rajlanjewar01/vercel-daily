"use client";

import { useEffect, useState } from "react";

export default function SubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch("/api/subscription-status");
      const data = await response.json();
      setIsSubscribed(data.isSubscribed);
    } catch (error) {
      console.error("Failed to check subscription status:", error);
      setIsSubscribed(false);
    }
  };

  useEffect(() => {
    checkSubscriptionStatus().finally(() => setIsLoading(false));
  }, []);

  const handleToggleSubscription = async () => {
    const wasSubscribed = isSubscribed;
    setIsToggling(true);
    try {
      const response = await fetch("/api/subscription-toggle", {
        method: "POST",
      });
      
      if (response.ok) {
        const data = await response.json();
        // Use the subscription status from the toggle response if available
        if (data.success && typeof data.subscribed === "boolean") {
          setIsSubscribed(data.subscribed);
          
          // Reload page when subscription status changes
          if (wasSubscribed !== data.subscribed) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else {
          // Fallback: refetch subscription status
          await checkSubscriptionStatus();
        }
      } else {
        console.error("Failed to toggle subscription");
        // Refetch status to ensure UI is in sync
        await checkSubscriptionStatus();
      }
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
      // Refetch status to ensure UI is in sync
      await checkSubscriptionStatus();
    } finally {
      setIsToggling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-full"></div>
    );
  }

  return (
    <button 
      onClick={handleToggleSubscription}
      disabled={isLoading || isToggling}
      className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all flex items-center gap-1 min-w-[80px] justify-center cursor-pointer ${
        isSubscribed 
        ? "bg-green-50 text-green-700 border border-green-200" 
        : "bg-black text-white hover:bg-zinc-800"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isToggling ? (
        <>
          <svg 
            className="animate-spin h-3 w-3" 
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
          <span>{isSubscribed ? "Unsubscribing..." : "Subscribing..."}</span>
        </>
      ) : (
        <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
      )}
    </button>
  );
}