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

async function checkPlatform(
  platform: Platform,
  handle: string
): Promise<PlatformResult> {
  const url = platform.url.replace(/\{\}/g, encodeURIComponent(handle));
  const profileUrl = platform.url.replace(/\{\}/g, handle); // unencoded for display
  const start = Date.now();

  // Validate username format if regex provided
  if (platform.usernameRegex) {
    const regex = new RegExp(platform.usernameRegex);
    if (!regex.test(handle)) {
      return {
        platform: platform.name,
        category: platform.category,
        url: profileUrl,
        status: "unknown",
        responseTime: 0,
      };
    }
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        ...platform.requestHeaders,
      },
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
 * Check all platforms for a handle. Calls onResult as each check completes.
 */
export async function checkAllPlatforms(
  handle: string,
  onResult: (result: PlatformResult) => void
): Promise<void> {
  await Promise.allSettled(
    PLATFORMS.map(async (platform) => {
      const result = await checkPlatform(platform, handle);
      onResult(result);
    })
  );
}

export { PLATFORMS };
