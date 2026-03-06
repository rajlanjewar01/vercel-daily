// app/actions/subscription.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BYPASS_TOKEN = process.env.VERCEL_DAILY_BYPASS_TOKEN;
const API_URL = process.env.VERCEL_DAILY_API_URL || "https://vercel-daily-news-api.vercel.app/api";

if (!BYPASS_TOKEN) {
  throw new Error("VERCEL_DAILY_BYPASS_TOKEN environment variable is required");
}

export async function toggleSubscriptionAction() {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get("x-subscription-token")?.value;

  if (!existingToken) {
    // 1. Create the subscription
    const createRes = await fetch(`${API_URL}/subscription/create`, {
      method: "POST",
      headers: { "x-vercel-protection-bypass": BYPASS_TOKEN },
    });
    
    const token = createRes.headers.get("x-subscription-token");

    if (token) {
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
        maxAge: 60 * 60 * 24, // Matches 24hr expiry
      });
    }
  } else {
    // Deactivate/Delete
    await fetch(`${API_URL}/subscription`, {
      method: "DELETE",
      headers: {
        "x-vercel-protection-bypass": BYPASS_TOKEN,
        "x-subscription-token": existingToken,
      },
    });
    cookieStore.delete("x-subscription-token");
  }

  revalidatePath("/");
}