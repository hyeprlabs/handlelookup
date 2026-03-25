import { type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkAllPlatforms } from "@/lib/lookup";
import { getRateLimitInfo, incrementUsage } from "@/lib/rate-limit";

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

  const { userId } = await auth();

  if (!userId) {
    const ip = getClientIp(request);
    const { allowed } = getRateLimitInfo(ip);
    if (!allowed) {
      return Response.json(
        { error: "Daily limit reached", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }
    incrementUsage(ip);
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

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
