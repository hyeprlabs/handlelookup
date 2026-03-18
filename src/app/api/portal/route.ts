import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl).toString());
  }

  try {
    const polar = new Polar({
      server: "sandbox",
      accessToken: process.env.POLAR_ACCESS_TOKEN!,
    });

    // Look up the Polar customer by the Clerk user ID (stored as externalId)
    const customer = await polar.customers.getExternal({ externalId: userId });
    const session = await polar.customerSessions.create({
      customerId: customer.id,
    });

    return NextResponse.redirect(session.customerPortalUrl);
  } catch (err) {
    console.error("[Polar] portal error:", err);
    return NextResponse.redirect(
      new URL("/app/settings/billing", req.nextUrl).toString(),
    );
  }
}
