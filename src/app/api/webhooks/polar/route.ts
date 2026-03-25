/**
 * Polar webhook — no longer needed.
 * Subscription state is now managed natively by Clerk Billing.
 * This stub is kept to avoid breaking any configured webhook endpoints.
 */
export async function POST() {
  return new Response("OK", { status: 200 });
}
