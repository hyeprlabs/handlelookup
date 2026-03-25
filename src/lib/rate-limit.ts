/** In-memory rate limiter — unauthenticated users get ANON_DAILY_LIMIT lookups per day per IP. */

const ANON_DAILY_LIMIT = 5;

type Entry = { count: number; day: string };
const store = new Map<string, Entry>();

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getRateLimitInfo(ip: string): {
  allowed: boolean;
  remaining: number;
  limit: number;
} {
  const day = today();
  const entry = store.get(ip);

  if (!entry || entry.day !== day) {
    return { allowed: true, remaining: ANON_DAILY_LIMIT, limit: ANON_DAILY_LIMIT };
  }

  const remaining = Math.max(0, ANON_DAILY_LIMIT - entry.count);
  return { allowed: remaining > 0, remaining, limit: ANON_DAILY_LIMIT };
}

export function incrementUsage(ip: string): void {
  const day = today();
  const entry = store.get(ip);

  if (!entry || entry.day !== day) {
    store.set(ip, { count: 1, day });
  } else {
    store.set(ip, { count: entry.count + 1, day });
  }
}
