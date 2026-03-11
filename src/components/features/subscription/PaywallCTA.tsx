"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { UI_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/lib/constants";
import Button from "../../ui/Button";

interface PaywallCTAProps {
  className?: string;
}

export default function PaywallCTA({ className }: PaywallCTAProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/subscription-toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsSubscribed(true);
          
          // Show success state before reload
          setTimeout(() => {
            window.location.reload();
          }, UI_CONFIG.SUBSCRIPTION_SUCCESS_DELAY);
        } else {
          throw new Error(data.error || data.message || "Subscription failed");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setError(error instanceof Error ? error.message : ERROR_MESSAGES.SUBSCRIPTION_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "relative z-20 overflow-hidden rounded-section bg-brand-light border border-brand-border-light shadow-card",
      "p-10 md:p-16 text-center",
      className
    )}>
      <div className="max-w-md mx-auto">
        <h2 className={cn("text-3xl font-bold tracking-tight text-brand-primary", "mb-4")}>
          The story continues.
        </h2>
        
        <p className="text-brand-secondary text-body-lg leading-relaxed mb-10">
          Subscribe to Vercel Daily for full access to our engineering deep dives, 
          engineering changelogs, and community highlights.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={(e) => { 
          e.preventDefault(); 
          handleSubscribe(); 
        }}>
          <Button
            type="submit"
            variant="primary"
            size="lg" 
            loading={isLoading}
            disabled={isSubscribed}
            className="min-w-[250px]"
          >
            {isSubscribed ? SUCCESS_MESSAGES.SUBSCRIPTION_CREATED : "Subscribe Now"}
          </Button>
        </form>

        {isSubscribed && (
          <p className="mt-4 text-sm text-green-600">
            Redirecting to updated content...
          </p>
        )}
      </div>
    </div>
  );
}