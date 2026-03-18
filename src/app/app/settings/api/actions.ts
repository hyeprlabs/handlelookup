"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type Key = {
  id: string;
  name: string;
  subject: string;
  revoked: boolean;
  expired: boolean;
  lastUsedAt: number | null;
  createdAt: number;
  secret?: string;
};

async function getClient() {
  return clerkClient();
}

export async function listKeys(): Promise<Key[]> {
  const { userId } = await auth();
  if (!userId) return [];
  const clerk = await getClient();
  const res = await clerk.apiKeys.list({ subject: userId });
  return res.data.map((k) => ({
    id: k.id,
    name: k.name,
    subject: k.subject,
    revoked: k.revoked,
    expired: k.expired,
    lastUsedAt: k.lastUsedAt,
    createdAt: k.createdAt,
    secret: k.secret,
  }));
}

export async function createKey(name: string): Promise<Key> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const clerk = await getClient();
  const k = await clerk.apiKeys.create({ name, subject: userId });
  return {
    id: k.id,
    name: k.name,
    subject: k.subject,
    revoked: k.revoked,
    expired: k.expired,
    lastUsedAt: k.lastUsedAt,
    createdAt: k.createdAt,
    secret: k.secret,
  };
}

export async function revokeKey(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  const clerk = await getClient();
  await clerk.apiKeys.revoke({ apiKeyId: id });
}
