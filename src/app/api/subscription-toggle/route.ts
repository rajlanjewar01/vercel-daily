import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BYPASS_TOKEN = 'OykROcuULI6YJwAwk3VnWv4gMMbpAq6q';
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

export async function POST() {
  console.log("[SUBSCRIPTION_TOGGLE] Starting subscription toggle request");
  
  if (!BYPASS_TOKEN) {
    console.error("[SUBSCRIPTION_TOGGLE] Missing VERCEL_DAILY_BYPASS_TOKEN environment variable");
    return NextResponse.json(
      { error: "VERCEL_DAILY_BYPASS_TOKEN environment variable is required" },
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const existingToken = cookieStore.get("x-subscription-token")?.value;
    console.log("[SUBSCRIPTION_TOGGLE] Current subscription token:", existingToken ? "exists" : "none");

    if (!existingToken) {
      console.log("[SUBSCRIPTION_TOGGLE] Creating new subscription");
      // Create a new subscription
      try {
        const createRes = await fetch(`${API_URL}/subscription/create`, {
          method: "POST",
          headers: { "x-vercel-protection-bypass": BYPASS_TOKEN },
        });
        
        if (createRes.ok) {
          const createData = await createRes.json();
          const token = createData.data?.token || createRes.headers.get("x-subscription-token");
          console.log("[SUBSCRIPTION_TOGGLE] Subscription creation successful, token received:", !!token);

          if (token) {
            // Activate the subscription
            const activateRes = await fetch(`${API_URL}/subscription`, {
              method: "POST",
              headers: {
                "x-vercel-protection-bypass": BYPASS_TOKEN,
                "x-subscription-token": token,
              },
            });

            if (activateRes.ok) {
              console.log("[SUBSCRIPTION_TOGGLE] Subscription activation successful");
              // Store the token in secure cookie
              cookieStore.set("x-subscription-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // 24 hours
                sameSite: "strict",
              });
              console.log("[SUBSCRIPTION_TOGGLE] Cookie set, subscription complete");
              return NextResponse.json({ success: true, subscribed: true });
            }
          }
        }
        
        console.error("[SUBSCRIPTION_TOGGLE] Failed to create subscription - invalid response");
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 400 }
        );
      } catch (error) {
        console.error("[SUBSCRIPTION_TOGGLE] Subscription creation error:", error);
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }

    } else {
      console.log("[SUBSCRIPTION_TOGGLE] Unsubscribing existing subscription");
      // Unsubscribe: Remove existing subscription
      try {
        // Try to deactivate via external API
        await fetch(`${API_URL}/subscription`, {
          method: "DELETE",
          headers: {
            "x-vercel-protection-bypass": BYPASS_TOKEN,
            "x-subscription-token": existingToken,
          },
        });
      } catch (apiError) {
        console.warn("[SUBSCRIPTION_TOGGLE] External API unavailable for unsubscribe:", apiError);
      }

      // Remove cookie (always do this regardless of API response)
      console.log("[SUBSCRIPTION_TOGGLE] Removing subscription cookie");
      cookieStore.delete("x-subscription-token");
      
      console.log("[SUBSCRIPTION_TOGGLE] Unsubscription complete");
      return NextResponse.json({ 
        success: true, 
        subscribed: false,
        message: "Successfully unsubscribed"
      });
    }
  } catch (error) {
    console.error("[SUBSCRIPTION_TOGGLE] Unexpected error during subscription toggle:", error);
    return NextResponse.json(
      { 
        error: "Failed to toggle subscription", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}