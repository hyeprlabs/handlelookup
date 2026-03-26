/**
 * Server-only rate limiter backed by Clerk private metadata.
 * Private metadata is never exposed to clients and cannot be edited by users.
 *
 * Usage stored as: privateMetadata.lookups = { date: "YYYY-MM-DD", count: number }
 * Only the current day's count is stored — old entries are auto-replaced on new day.
 */
import { clerkClient } from "@clerk/nextjs/server";
import { DAILY_LIMIT } from "@/lib/constants";

export { DAILY_LIMIT } from "@/lib/constants";

type LookupUsage = { date: string; count: number };

function today(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD" UTC
}

export async function getRateLimitInfo(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const usage = (user.privateMetadata as { lookups?: LookupUsage }).lookups;

    const day = today();
    if (!usage || usage.date !== day) {
      return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
    }

    const remaining = Math.max(0, DAILY_LIMIT - usage.count);
    return { allowed: remaining > 0, remaining, limit: DAILY_LIMIT };
  } catch {
    // Fail open — don't block users on transient Clerk API errors
    return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
  }
}

/**
 * Atomically reads the current count and increments it.
 * Returns false if the user is already at the limit (request should be denied).
 */
export async function checkAndIncrementUsage(userId: string): Promise<{
  allowed: boolean;
  remaining: number;
}> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const usage = (user.privateMetadata as { lookups?: LookupUsage }).lookups;

    const day = today();
    const count = usage?.date === day ? usage.count : 0;

    if (count >= DAILY_LIMIT) {
      return { allowed: false, remaining: 0 };
    }

    // Increment in Clerk — merge patch, other metadata keys are preserved
    await client.users.updateUserMetadata(userId, {
      privateMetadata: { lookups: { date: day, count: count + 1 } },
    });

    return { allowed: true, remaining: DAILY_LIMIT - count - 1 };
  } catch {
    // Fail open on errors
    console.error("[rate-limit] checkAndIncrementUsage failed for", userId);
    return { allowed: true, remaining: 0 };
  }
}
