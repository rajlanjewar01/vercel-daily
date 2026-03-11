import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BYPASS_TOKEN = process.env.VERCEL_DAILY_BYPASS_TOKEN;
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

export async function GET() {
  console.log("[SUBSCRIPTION_STATUS] Checking subscription status");
  console.log("11 VERCEL_DAILY_API_URL", process.env.VERCEL_DAILY_API_URL);
  console.log("11 VERCEL_DAILY_BYPASS_TOKEN", process.env.VERCEL_DAILY_BYPASS_TOKEN);
  if (!BYPASS_TOKEN) {
    console.error("[SUBSCRIPTION_STATUS] Missing VERCEL_DAILY_BYPASS_TOKEN environment variable");
    return NextResponse.json(
      { error: "VERCEL_DAILY_BYPASS_TOKEN environment variable is required" },
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get("x-subscription-token")?.value;
    console.log("[SUBSCRIPTION_STATUS] Subscription token:", subscriptionToken ? "found" : "not found");
    
    // If no token, definitely not subscribed
    if (!subscriptionToken) {
      console.log("[SUBSCRIPTION_STATUS] No token found, returning not subscribed");
      return NextResponse.json({ isSubscribed: false });
    }
    
    // Validate subscription with external API
    console.log("[SUBSCRIPTION_STATUS] Validating subscription with external API");
    try {
      const response = await fetch(`${API_URL}/subscription`, {
        method: "GET",
        headers: {
          "x-subscription-token": subscriptionToken,
          "x-vercel-protection-bypass": BYPASS_TOKEN,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Check if subscription is active based on API response
        const isActive = data.success && data.data?.status === "active";
        console.log("[SUBSCRIPTION_STATUS] API validation successful, subscription active:", isActive);
        return NextResponse.json({ isSubscribed: isActive });
      } else {
        // If API returns error (e.g., expired/invalid token), clean up cookie
        console.log("[SUBSCRIPTION_STATUS] Subscription validation failed - cleaning up cookie");
        cookieStore.delete("x-subscription-token");
        return NextResponse.json({ isSubscribed: false });
      }
    } catch (apiError) {
      console.error("[SUBSCRIPTION_STATUS] External API error:", apiError);
      return NextResponse.json(
        { error: "Failed to check subscription status" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Subscription status check error:", error);
    return NextResponse.json({ isSubscribed: false });
  }
}