import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Legacy checkout redirect — kept for any bookmarked links.
 * Clerk Billing checkout is now handled directly via the <PricingTable /> component.
 */
export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    const signInUrl = new URL("/sign-in", req.nextUrl);
    signInUrl.searchParams.set("redirect_url", "/pricing");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.redirect(new URL("/pricing", req.nextUrl));
}
