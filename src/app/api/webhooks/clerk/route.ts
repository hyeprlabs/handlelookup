import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Polar } from "@polar-sh/sdk";

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Missing CLERK_WEBHOOK_SECRET", { status: 500 });
  }

  const headerStore = await headers();
  const svixId = headerStore.get("svix-id");
  const svixTimestamp = headerStore.get("svix-timestamp");
  const svixSignature = headerStore.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const body = await req.text();

  let evt: WebhookEvent;
  try {
    evt = new Webhook(secret).verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid webhook signature", { status: 400 });
  }

  const polar = new Polar({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
  });

  if (evt.type === "user.created") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      primary_email_address_id,
    } = evt.data;
    const primary = email_addresses.find(
      (e) => e.id === primary_email_address_id,
    );

    try {
      await polar.customers.create({
        email: primary?.email_address ?? "",
        name: [first_name, last_name].filter(Boolean).join(" ") || undefined,
        externalId: id,
      });
    } catch (err) {
      console.error("[Polar] Failed to create customer for", id, err);
    }
  }

  if (evt.type === "user.updated") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      primary_email_address_id,
    } = evt.data;
    const primary = email_addresses.find(
      (e) => e.id === primary_email_address_id,
    );

    try {
      await polar.customers.updateExternal({
        externalId: id,
        customerUpdateExternalID: {
          email: primary?.email_address,
          name: [first_name, last_name].filter(Boolean).join(" ") || undefined,
        },
      });
    } catch {
      // Customer may not exist yet in Polar — safe to ignore
    }
  }

  if (evt.type === "user.deleted" && evt.data.id) {
    try {
      await polar.customers.deleteExternal({ externalId: evt.data.id });
    } catch {
      // Customer may not exist in Polar — safe to ignore
    }
  }

  return new Response("OK", { status: 200 });
}
