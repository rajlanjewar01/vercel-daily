"use client";

import { useEffect, useState } from "react";

export default function SubscriptionButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscription-toggle", {
        method: "POST",
      });
      
      if (response.ok) {
        const data = await response.json();
        // Use the subscription status from the toggle response if available
        if (data.success && typeof data.subscribed === "boolean") {
          setIsSubscribed(data.subscribed);
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
      setIsLoading(false);
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
      disabled={isLoading}
      className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
        isSubscribed 
        ? "bg-green-50 text-green-700 border border-green-200" 
        : "bg-black text-white hover:bg-zinc-800"
      } disabled:opacity-50`}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}