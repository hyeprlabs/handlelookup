"use client";

import { useState, useTransition } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import {
  KeyIcon,
  PlusIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { createKey, revokeKey } from "./actions";
import { cn } from "@/lib/utils";

type Key = {
  id: string;
  name: string;
  revoked: boolean;
  expired: boolean;
  lastUsedAt: number | null;
  createdAt: number;
  secret?: string;
};

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function KeyForm({
  className,
  onSubmit,
  pending,
}: {
  className?: string;
  onSubmit: (name: string) => void;
  pending: boolean;
}) {
  const [name, setName] = useState("");
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-1.5">
        <Label htmlFor="key-name">Key name</Label>
        <Input
          id="key-name"
          autoFocus
          placeholder="e.g. Production"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) onSubmit(name);
          }}
        />
      </div>
      <Button
        onClick={() => onSubmit(name)}
        disabled={!name.trim() || pending}
      >
        {pending ? "Creating…" : "Create key"}
      </Button>
    </div>
  );
}

function CreateKeyModal({
  onCreated,
}: {
  onCreated: (key: Key) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleSubmit(name: string) {
    startTransition(async () => {
      const key = await createKey(name);
      onCreated(key);
      setOpen(false);
    });
  }

  const trigger = (
    <Button size="sm">
      <PlusIcon />
      New key
    </Button>
  );

  const header = {
    title: "Create API key",
    description: "Give your key a name to identify it later.",
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{header.title}</DialogTitle>
            <DialogDescription>{header.description}</DialogDescription>
          </DialogHeader>
          <KeyForm onSubmit={handleSubmit} pending={pending} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{header.title}</DrawerTitle>
          <DrawerDescription>{header.description}</DrawerDescription>
        </DrawerHeader>
        <KeyForm
          className="px-4"
          onSubmit={handleSubmit}
          pending={pending}
        />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function ApiKeysUi({ initialKeys }: { initialKeys: Key[] }) {
  const [keys, setKeys] = useState<Key[]>(initialKeys);
  const [revealed, setRevealed] = useState<Set<string>>(
    // auto-reveal brand-new keys that came with a secret
    new Set(initialKeys.filter((k) => k.secret).map((k) => k.id)),
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revoking, startRevoke] = useTransition();

  function handleCreated(key: Key) {
    setKeys((prev) => [key, ...prev]);
    // auto-reveal because secret is only returned on creation
    setRevealed((prev) => new Set(prev).add(key.id));
  }

  function toggleReveal(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function copyToClipboard(id: string, secret: string) {
    await navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleRevoke(id: string) {
    startRevoke(async () => {
      await revokeKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      setRevealed((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    });
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
            <CreateKeyModal onCreated={handleCreated} />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {keys.length === 0 ? (
            <Empty className="border-0 py-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <KeyIcon />
                </EmptyMedia>
                <EmptyTitle className="text-sm font-medium">
                  No API keys yet
                </EmptyTitle>
                <EmptyDescription className="text-xs">
                  Create a key to start using the API
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            keys.map((key) => {
              const isRevealed = revealed.has(key.id);
              const display = key.secret
                ? isRevealed
                  ? key.secret
                  : key.secret.slice(0, 6) + "••••••••" + key.secret.slice(-4)
                : "Secret not available — only shown at creation";

              return (
                <div
                  key={key.id}
                  className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
                >
                  <KeyIcon className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{key.name}</p>
                      {!key.lastUsedAt && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                      {key.revoked && (
                        <Badge variant="destructive" className="text-xs">
                          Revoked
                        </Badge>
                      )}
                    </div>
                    <p className="font-mono text-xs text-muted-foreground">
                      {display}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {formatDate(key.createdAt)}
                      {key.lastUsedAt
                        ? ` · Last used ${formatDate(key.lastUsedAt)}`
                        : ""}
                    </p>
                  </div>

                  <TooltipProvider>
                    <div className="flex items-center gap-0.5">
                      {key.secret && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              onClick={() => toggleReveal(key.id)}
                            >
                              {isRevealed ? (
                                <EyeOffIcon className="size-3.5" />
                              ) : (
                                <EyeIcon className="size-3.5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {isRevealed ? "Hide" : "Reveal"}
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {key.secret && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              onClick={() =>
                                copyToClipboard(key.id, key.secret!)
                              }
                            >
                              <CopyIcon
                                className={cn(
                                  "size-3.5",
                                  copiedId === key.id && "text-green-600",
                                )}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {copiedId === key.id ? "Copied!" : "Copy"}
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <AlertDialog>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="icon-xs"
                                variant="ghost"
                                disabled={revoking || key.revoked}
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <TrashIcon className="size-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                          </TooltipTrigger>
                          <TooltipContent>Revoke</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent size="sm">
                          <AlertDialogHeader>
                            <AlertDialogMedia>
                              <TrashIcon />
                            </AlertDialogMedia>
                            <AlertDialogTitle>Revoke key?</AlertDialogTitle>
                            <AlertDialogDescription>
                              &quot;{key.name}&quot; will stop working
                              immediately. This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleRevoke(key.id)}
                            >
                              Revoke
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TooltipProvider>
                </div>
              );
            })
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
