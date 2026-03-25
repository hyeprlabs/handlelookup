import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Legacy billing portal redirect — kept for any bookmarked links.
 * Billing management is now handled via the Clerk <UserButton /> or the Billing settings page.
 */
export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl).toString());
  }

  return NextResponse.redirect(
    new URL("/app/settings/billing", req.nextUrl).toString(),
  );
}
