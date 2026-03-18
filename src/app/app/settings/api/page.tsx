"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  KeyIcon,
  PlusIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
};

function generateApiKey() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return (
    "hl_" +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

function maskKey(key: string) {
  return key.slice(0, 6) + "••••••••" + key.slice(-4);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ApiKeysPage() {
  const { user, isLoaded } = useUser();
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-6 w-32 rounded-xl bg-muted" />
        <div className="h-48 rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!user) return null;

  const apiKeys: ApiKey[] = (user.unsafeMetadata?.apiKeys as ApiKey[]) ?? [];

  async function handleCreateKey() {
    if (!newKeyName.trim() || !user) return;
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: newKeyName.trim(),
      key: generateApiKey(),
      createdAt: new Date().toISOString(),
      lastUsed: null,
    };
    const updated = [...apiKeys, newKey];
    await user.update({
      unsafeMetadata: { ...user.unsafeMetadata, apiKeys: updated },
    });
    setRevealedKeys((prev) => new Set(prev).add(newKey.id));
    setNewKeyName("");
    setCreating(false);
  }

  async function handleRevokeKey(id: string) {
    if (!user) return;
    const updated = apiKeys.filter((k) => k.id !== id);
    await user.update({
      unsafeMetadata: { ...user.unsafeMetadata, apiKeys: updated },
    });
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function toggleReveal(id: string) {
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function copyToClipboard(id: string, key: string) {
    await navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">API Keys</h1>
        <p className="text-sm text-muted-foreground">
          Manage your Handle Lookup API keys
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Your API keys</CardTitle>
              <CardDescription>
                Keys are tied to your account and its credits
              </CardDescription>
            </div>
            {!creating && (
              <Button size="sm" onClick={() => setCreating(true)}>
                <PlusIcon />
                New key
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {creating && (
            <div className="flex gap-2 rounded-xl border p-3">
              <Input
                autoFocus
                placeholder="Key name (e.g. Production)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreateKey();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewKeyName("");
                  }
                }}
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleCreateKey}
                disabled={!newKeyName.trim()}
              >
                Create
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setCreating(false);
                  setNewKeyName("");
                }}
              >
                Cancel
              </Button>
            </div>
          )}

          {apiKeys.length === 0 && !creating ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <KeyIcon className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No API keys yet</p>
              <p className="text-xs text-muted-foreground">
                Create a key to start using the API
              </p>
            </div>
          ) : (
            apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
              >
                <KeyIcon className="size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{apiKey.name}</p>
                    {!apiKey.lastUsed && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {revealedKeys.has(apiKey.id)
                      ? apiKey.key
                      : maskKey(apiKey.key)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created {formatDate(apiKey.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => toggleReveal(apiKey.id)}
                    title={
                      revealedKeys.has(apiKey.id) ? "Hide key" : "Reveal key"
                    }
                  >
                    {revealedKeys.has(apiKey.id) ? (
                      <EyeOffIcon className="size-3.5" />
                    ) : (
                      <EyeIcon className="size-3.5" />
                    )}
                  </Button>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => copyToClipboard(apiKey.id, apiKey.key)}
                    title="Copy key"
                  >
                    <CopyIcon
                      className={
                        copiedId === apiKey.id
                          ? "size-3.5 text-green-600"
                          : "size-3.5"
                      }
                    />
                  </Button>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => handleRevokeKey(apiKey.id)}
                    title="Revoke key"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <TrashIcon className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>How to authenticate your requests</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Include your API key as a Bearer token in the{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              Authorization
            </code>{" "}
            header:
          </p>
          <div className="rounded-xl bg-muted px-4 py-3">
            <code className="font-mono text-xs">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            Keep your keys secure — do not expose them in public repositories or
            client-side code.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button asChild size="sm" variant="outline">
            <a href="/features/api">View API docs</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
