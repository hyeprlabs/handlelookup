import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";

// Only these exact product IDs may be used — prevents open-redirect / price-tampering attacks
function getAllowedProductIds(): Set<string> {
  return new Set(
    [
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_MONTHLY,
      process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_YEARLY,
    ].filter((id): id is string => Boolean(id)),
  );
}

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  const productId = req.nextUrl.searchParams.get("productId");

  // Validate product ID against known allowlist
  if (!productId || !getAllowedProductIds().has(productId)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  // Redirect unauthenticated users to sign-in first
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.nextUrl);
    signInUrl.searchParams.set(
      "redirect_url",
      `/api/checkout?productId=${productId}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  try {
    const polar = new Polar({
      server: "sandbox",
      accessToken: process.env.POLAR_ACCESS_TOKEN!,
    });

    const checkout = await polar.checkouts.create({
      products: [productId],
      successUrl: `${appUrl}/app/settings/billing?upgraded=true`,
      // Link to Clerk user: pre-fills email, locks it, and ties the order to the account
      externalCustomerId: userId,
    });

    return NextResponse.redirect(checkout.url!);
  } catch (err) {
    console.error("[Polar] checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
