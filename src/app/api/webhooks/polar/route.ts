import { Webhooks } from "@polar-sh/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

function planFromStatus(status: string): "pro" | "free" {
  return status === "active" || status === "trialing" ? "pro" : "free";
}

async function syncSubscription(payload: {
  data: {
    id: string;
    customerId: string;
    status: string;
    currentPeriodEnd: Date;
    customer: { externalId?: string | null };
  };
}) {
  const userId = payload.data.customer.externalId;
  if (!userId) return;

  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan: planFromStatus(payload.data.status),
      polarSubscriptionId: payload.data.id,
      polarCustomerId: payload.data.customerId,
      subscriptionStatus: payload.data.status,
      currentPeriodEnd: payload.data.currentPeriodEnd,
    },
  });
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onSubscriptionCreated: syncSubscription,
  onSubscriptionUpdated: syncSubscription,

  onSubscriptionRevoked: async (payload) => {
    const userId = payload.data.customer.externalId;
    if (!userId) return;

    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: "free",
        polarSubscriptionId: null,
        polarCustomerId: payload.data.customerId,
        subscriptionStatus: "canceled",
        currentPeriodEnd: null,
      },
    });
  },

  // Stub for future one-time credit top-ups
  onOrderPaid: async (payload) => {
    const userId = payload.data.customer.externalId;
    if (!userId) return;
    console.log(
      "[Polar] order.paid for user",
      userId,
      "order",
      payload.data.id,
    );
  },
});
