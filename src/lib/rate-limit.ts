/**
 * In-memory rate limiter for authenticated free-tier users.
 * Keyed by Clerk userId. Pro subscribers bypass this entirely.
 */

export const DAILY_LIMIT = 5;

type Entry = { count: number; day: string };
const store = new Map<string, Entry>();

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getRateLimitInfo(userId: string): {
  allowed: boolean;
  remaining: number;
  limit: number;
} {
  const day = today();
  const entry = store.get(userId);

  if (!entry || entry.day !== day) {
    return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
  }

  const remaining = Math.max(0, DAILY_LIMIT - entry.count);
  return { allowed: remaining > 0, remaining, limit: DAILY_LIMIT };
}

export function incrementUsage(userId: string): void {
  const day = today();
  const entry = store.get(userId);

  if (!entry || entry.day !== day) {
    store.set(userId, { count: 1, day });
  } else {
    store.set(userId, { count: entry.count + 1, day });
  }
}
