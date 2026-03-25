import { type NextRequest } from "next/server";
import { checkAllPlatforms } from "@/lib/lookup";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HANDLE_REGEX = /^[a-zA-Z0-9_.-]{1,50}$/;

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get("handle")?.trim();

  if (!handle || !HANDLE_REGEX.test(handle)) {
    return Response.json({ error: "Invalid handle" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
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
