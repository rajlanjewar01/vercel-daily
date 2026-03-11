// app/actions/subscription.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BYPASS_TOKEN = process.env.VERCEL_DAILY_BYPASS_TOKEN;
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

export async function toggleSubscriptionAction() {
  console.log("[SUBSCRIPTION_ACTION] Starting server action for subscription toggle");
  
  if (!BYPASS_TOKEN) {
    console.error("[SUBSCRIPTION_ACTION] Missing VERCEL_DAILY_BYPASS_TOKEN environment variable");
    throw new Error("VERCEL_DAILY_BYPASS_TOKEN environment variable is required");
  }

  const cookieStore = await cookies();
  const existingToken = cookieStore.get("x-subscription-token")?.value;
  console.log("[SUBSCRIPTION_ACTION] Current token status:", existingToken ? "exists" : "none");

  if (!existingToken) {
    console.log("[SUBSCRIPTION_ACTION] Creating new subscription via server action");
    // 1. Create the subscription
    const createRes = await fetch(`${API_URL}/subscription/create`, {
      method: "POST",
      headers: { "x-vercel-protection-bypass": BYPASS_TOKEN },
    });
    
    const token = createRes.headers.get("x-subscription-token");

    if (token) {
      console.log("[SUBSCRIPTION_ACTION] Token received, activating subscription");
      // 2. Activate the subscription
      await fetch(`${API_URL}/subscription`, {
        method: "POST",
        headers: {
          "x-vercel-protection-bypass": BYPASS_TOKEN,
          "x-subscription-token": token,
        },
      });

      cookieStore.set("x-subscription-token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 24hr expiry
      });
      console.log("[SUBSCRIPTION_ACTION] Subscription created and cookie set");
    }
  } else {
    console.log("[SUBSCRIPTION_ACTION] Deactivating existing subscription");
    // Deactivate/Delete
    await fetch(`${API_URL}/subscription`, {
      method: "DELETE",
      headers: {
        "x-vercel-protection-bypass": BYPASS_TOKEN,
        "x-subscription-token": existingToken,
      },
    });
    cookieStore.delete("x-subscription-token");
    console.log("[SUBSCRIPTION_ACTION] Subscription deactivated and cookie removed");
  }

  console.log("[SUBSCRIPTION_ACTION] Revalidating homepage path");
  revalidatePath("/");
}