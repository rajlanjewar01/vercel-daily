import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BYPASS_TOKEN = process.env.VERCEL_DAILY_BYPASS_TOKEN;
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

if (!BYPASS_TOKEN) {
  throw new Error("VERCEL_DAILY_BYPASS_TOKEN environment variable is required");
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const subscriptionToken = cookieStore.get("x-subscription-token")?.value;
    
    // If no token, definitely not subscribed
    if (!subscriptionToken) {
      return NextResponse.json({ isSubscribed: false });
    }
    
    // Check if this is a demo/fallback token
    if (subscriptionToken.startsWith("demo-")) {
      return NextResponse.json({
        isSubscribed: true, 
        demo: true,
        message: "Demo subscription active (external API unavailable)"
      });
    }
    
    // Validate real subscription with external API
    try {
      const response = await fetch(`${API_URL}/subscription`, {
        method: "GET",
        headers: {
          "x-subscription-token": subscriptionToken,
          "x-vercel-protection-bypass": BYPASS_TOKEN!,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Check if subscription is active based on API response
        const isActive = data.success && data.data?.status === "active";
        return NextResponse.json({ isSubscribed: isActive });
      } else {
        // If API returns error (e.g., expired/invalid token), clean up cookie
        cookieStore.delete("x-subscription-token");
        return NextResponse.json({ isSubscribed: false });
      }
    } catch (apiError) {
      // If external API is unreachable, fallback to token existence
      console.warn("External API error, using token existence as fallback:", apiError);
      return NextResponse.json({ 
        isSubscribed: true, 
        fallback: true,
        message: "Subscription status (external API unavailable)"
      });
    }
  } catch (error) {
    console.error("Subscription status check error:", error);
    return NextResponse.json({ isSubscribed: false });
  }
}