import { type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getRateLimitInfo } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (userId) {
    return Response.json({ authenticated: true, unlimited: true });
  }

  const ip = getClientIp(request);
  const { remaining, limit, allowed } = getRateLimitInfo(ip);
  return Response.json({ authenticated: false, remaining, limit, allowed });
}
