import { type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getRateLimitInfo, DAILY_LIMIT } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function GET(request: NextRequest) {
  const { userId, has } = await auth();

  if (userId) {
    const isPro = has({ plan: "user:pro" });

    if (isPro) {
      return Response.json({ authenticated: true, plan: "pro", unlimited: true });
    }

    const { remaining, limit, allowed } = getRateLimitInfo(userId);
    return Response.json({
      authenticated: true,
      plan: "free",
      remaining,
      limit,
      allowed,
    });
  }

  const ip = getClientIp(request);
  const { remaining, allowed } = getRateLimitInfo(ip);
  return Response.json({
    authenticated: false,
    plan: null,
    remaining,
    limit: DAILY_LIMIT,
    allowed,
  });
}
