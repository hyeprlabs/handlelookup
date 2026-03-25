import { auth } from "@clerk/nextjs/server";
import { getRateLimitInfo } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId, has } = await auth();

  if (!userId) {
    return Response.json({ authenticated: false, isPro: false });
  }

  const isPro = has({ plan: "user:pro" });

  if (isPro) {
    return Response.json({ authenticated: true, isPro: true, unlimited: true });
  }

  const { remaining, limit, allowed } = getRateLimitInfo(userId);
  return Response.json({ authenticated: true, isPro: false, remaining, limit, allowed });
}
