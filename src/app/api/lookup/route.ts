import { type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAllPlatforms } from "@/lib/lookup";
import { getRateLimitInfo, incrementUsage, DAILY_LIMIT } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HANDLE_REGEX = /^[a-zA-Z0-9_.-]{1,50}$/;

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle")?.trim();

  if (!handle || !HANDLE_REGEX.test(handle)) {
    return Response.json({ error: "Invalid handle" }, { status: 400 });
  }

  const { userId, has } = await auth();
  let isUnlimited = false;

  if (!userId) {
    // Anonymous users cannot perform lookups — sign in required
    return Response.json(
      { error: "Sign in to use Handle Lookup", code: "UNAUTHENTICATED" },
      { status: 401 }
    );
  }

  // Authenticated user — check if they have an active Pro subscription via Clerk Billing
  const isPro = has({ plan: "user:pro" });

  if (isPro) {
    isUnlimited = true;
  } else {
    // Free authenticated user — apply per-user daily limit
    const { allowed } = getRateLimitInfo(userId);
    if (!allowed) {
      return Response.json(
        { error: "Daily limit reached", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }
    incrementUsage(userId);
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          // Client disconnected
        }
      };

      try {
        await checkAllPlatforms(handle, send);
      } finally {
        try {
          send({ done: true });
          controller.close();
        } catch {
          // Already closed
        }
      }
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
  // Only include the daily limit header for rate-limited users
  if (!isUnlimited) {
    headers["X-Daily-Limit"] = String(DAILY_LIMIT);
  }

  return new Response(stream, { headers });
}
