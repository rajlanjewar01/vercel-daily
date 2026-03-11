import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BYPASS_TOKEN = process.env.VERCEL_DAILY_BYPASS_TOKEN;
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

export async function POST() {
  if (!BYPASS_TOKEN) {
    return NextResponse.json(
      { error: "VERCEL_DAILY_BYPASS_TOKEN environment variable is required" },
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const existingToken = cookieStore.get("x-subscription-token")?.value;

    if (!existingToken) {
      // Create a new subscription
      try {
        const createRes = await fetch(`${API_URL}/subscription/create`, {
          method: "POST",
          headers: { "x-vercel-protection-bypass": BYPASS_TOKEN },
        });
        
        if (createRes.ok) {
          const createData = await createRes.json();
          const token = createData.data?.token || createRes.headers.get("x-subscription-token");

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
              // Store the token in secure cookie
              cookieStore.set("x-subscription-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // 24 hours
                sameSite: "strict",
              });
              return NextResponse.json({ success: true, subscribed: true });
            }
          }
        }
        
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 400 }
        );
      } catch (error) {
        console.error("Subscription creation error:", error);
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }

    } else {
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
        console.warn("External API unavailable for unsubscribe:", apiError);
      }

      // Remove cookie (always do this regardless of API response)
      cookieStore.delete("x-subscription-token");
      
      return NextResponse.json({ 
        success: true, 
        subscribed: false,
        message: "Successfully unsubscribed"
      });
    }
  } catch (error) {
    console.error("Subscription toggle error:", error);
    return NextResponse.json(
      { 
        error: "Failed to toggle subscription", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}