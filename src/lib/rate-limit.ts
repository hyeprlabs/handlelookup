/**
 * In-memory rate limiter.
 * - Anonymous users: keyed by IP address
 * - Authenticated free users: keyed by Clerk userId
 * - Pro subscribers: bypassed entirely (checked via Clerk billing)
 */

export const DAILY_LIMIT = 5;

type Entry = { count: number; day: string };
const store = new Map<string, Entry>();

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getRateLimitInfo(key: string): {
  allowed: boolean;
  remaining: number;
  limit: number;
} {
  const day = today();
  const entry = store.get(key);

  if (!entry || entry.day !== day) {
    return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
  }

  const remaining = Math.max(0, DAILY_LIMIT - entry.count);
  return { allowed: remaining > 0, remaining, limit: DAILY_LIMIT };
}

export function incrementUsage(key: string): void {
  const day = today();
  const entry = store.get(key);

  if (!entry || entry.day !== day) {
    store.set(key, { count: 1, day });
  } else {
    store.set(key, { count: entry.count + 1, day });
  }
}
