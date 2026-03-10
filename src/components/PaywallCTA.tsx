"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { UI_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES, COMMON_STYLES } from "@/lib/constants";
import Button from "./ui/Button";

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
          throw new Error(data.message || "Subscription failed");
        }
      } else {
        throw new Error("Network error occurred");
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
      COMMON_STYLES.CARD_BASE,
      "p-10 md:p-16 text-center",
      className
    )}>
      <div className="max-w-md mx-auto">
        <h2 className={cn(COMMON_STYLES.HEADING_LG, "mb-4")}>
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