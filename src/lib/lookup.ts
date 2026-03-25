import { PLATFORMS, type Platform } from "./platforms";

export type LookupStatus = "available" | "taken" | "unknown";

export interface PlatformResult {
  platform: string;
  category: string;
  url: string;
  status: LookupStatus;
  responseTime: number;
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const TIMEOUT_MS = 10_000;

function buildPayload(
  payload: Record<string, unknown>,
  handle: string
): string {
  return JSON.stringify(payload).replace(/\{\}/g, handle);
}

async function checkPlatform(
  platform: Platform,
  handle: string
): Promise<PlatformResult> {
  const profileUrl = platform.url.replace(/\{\}/g, handle);
  const start = Date.now();

  // Skip if handle fails the platform's regex
  if (platform.regexCheck) {
    try {
      if (!new RegExp(platform.regexCheck).test(handle)) {
        return { platform: platform.name, category: platform.category, url: profileUrl, status: "unknown", responseTime: 0 };
      }
    } catch {
      // ignore invalid regex
    }
  }

  const isPost = platform.requestMethod === "POST";
  // Use urlProbe if provided, otherwise use profile url
  const fetchUrl = (platform.urlProbe ?? platform.url).replace(
    /\{\}/g,
    encodeURIComponent(handle)
  );

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(fetchUrl, {
      method: isPost ? "POST" : "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        ...(isPost ? { "Content-Type": "application/json" } : {}),
        ...platform.headers,
      },
      body: isPost && platform.requestPayload
        ? buildPayload(platform.requestPayload, handle)
        : undefined,
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const responseTime = Date.now() - start;

    switch (platform.errorType) {
      case "status_code": {
        const notFoundCode = platform.errorCode ?? 404;
        return {
          platform: platform.name,
          category: platform.category,
          url: profileUrl,
          status: response.status === notFoundCode ? "available" : "taken",
          responseTime,
        };
      }

      case "message": {
        const body = await response.text();
        const errorStrings = platform.errorMsg ?? [];
        const isNotFound = errorStrings.some((msg) =>
          body.toLowerCase().includes(msg.toLowerCase())
        );
        return {
          platform: platform.name,
          category: platform.category,
          url: profileUrl,
          status: isNotFound ? "available" : "taken",
          responseTime,
        };
      }

      case "response_url": {
        const errorUrl = platform.errorUrl ?? "";
        return {
          platform: platform.name,
          category: platform.category,
          url: profileUrl,
          status: response.url.includes(errorUrl) ? "available" : "taken",
          responseTime,
        };
      }

      default:
        return {
          platform: platform.name,
          category: platform.category,
          url: profileUrl,
          status: "unknown",
          responseTime: Date.now() - start,
        };
    }
  } catch {
    return {
      platform: platform.name,
      category: platform.category,
      url: profileUrl,
      status: "unknown",
      responseTime: Date.now() - start,
    };
  }
}

/**
 * Check all platforms concurrently (max `concurrency` in flight at once).
 * Calls `onResult` as each check completes — ideal for SSE streaming.
 */
export async function checkAllPlatforms(
  handle: string,
  onResult: (result: PlatformResult) => void,
  concurrency = 50
): Promise<void> {
  const queue = [...PLATFORMS];
  const worker = async () => {
    while (queue.length > 0) {
      const platform = queue.shift();
      if (!platform) break;
      onResult(await checkPlatform(platform, handle));
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(concurrency, PLATFORMS.length) }, worker)
  );
}

export { PLATFORMS };
