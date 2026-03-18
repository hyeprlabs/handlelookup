"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: "usage",
    label: "Usage alerts",
    description: "Get notified when you're close to your API limit",
  },
  {
    id: "billing",
    label: "Billing updates",
    description: "Invoices and payment confirmations",
  },
  {
    id: "product",
    label: "Product updates",
    description: "New features and improvements",
  },
];

export default function SettingsPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="h-6 w-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-2xl bg-muted" />
        <div className="h-48 rounded-2xl bg-muted" />
      </div>
    );
  }

  if (!user) return null;

  const isPro =
    (user.publicMetadata as { plan?: string } | undefined)?.plan === "pro";
  const credits = isPro ? "50,000" : "250";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account status and plan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Current plan</p>
              <p className="text-xs text-muted-foreground">
                You are on the {isPro ? "Pro" : "Free"} plan
              </p>
            </div>
            {!isPro && (
              <Button size="sm" asChild>
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            )}
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">API credits</p>
              <p className="text-xs text-muted-foreground">
                {credits} credits / month
              </p>
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/app/settings/billing">View billing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {notifications.map(({ id, label, description }, i) => (
            <div key={id}>
              {i > 0 && <Separator className="mb-4" />}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor={id} className="text-sm font-medium">
                    {label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <input
                  id={id}
                  type="checkbox"
                  defaultChecked
                  className="size-4 rounded border-border accent-primary"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
          <CardDescription>
            Control your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Data export</p>
            <p className="text-xs text-muted-foreground">
              Download all your account data
            </p>
          </div>
          <Button size="sm" variant="outline">
            Export data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
