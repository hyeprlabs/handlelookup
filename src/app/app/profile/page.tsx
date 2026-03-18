"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CameraIcon, CheckIcon } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <ProfileSkeleton />;
  if (!user) return null;

  return <ProfileForm user={user} />;
}

function ProfileForm({ user }: { user: UserResource }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [username, setUsername] = useState(user.username ?? "");

  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";

  async function handleSaveProfile() {
    setSaving(true);
    try {
      await user.update({
        firstName,
        lastName,
        username: username || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
    setSaving(false);
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await user.setProfileImage({ file });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Your profile picture visible to others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-16">
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName ?? "User"}
                />
                <AvatarFallback className="text-base">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background transition-opacity hover:opacity-80"
              >
                <CameraIcon className="size-3" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <p className="text-sm font-medium">
                {user.fullName || "No name set"}
              </p>
              <p className="text-xs text-muted-foreground">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Update your name and username</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </div>
          <div>
            <Button
              onClick={handleSaveProfile}
              disabled={saving}
              size="sm"
              className="gap-1.5"
            >
              {saved ? (
                <>
                  <CheckIcon className="size-3.5" /> Saved
                </>
              ) : saving ? (
                "Saving…"
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email addresses</CardTitle>
          <CardDescription>Manage your email addresses</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {user.emailAddresses.map((email) => (
            <div
              key={email.id}
              className="flex items-center justify-between rounded-xl border px-3 py-2.5"
            >
              <div>
                <p className="text-sm">{email.emailAddress}</p>
                {email.id === user.primaryEmailAddressId && (
                  <p className="text-xs text-muted-foreground">Primary</p>
                )}
              </div>
              <span
                className={cn(
                  "text-xs",
                  email.verification?.status === "verified"
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground",
                )}
              >
                {email.verification?.status === "verified"
                  ? "Verified"
                  : "Unverified"}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {user.externalAccounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Connected accounts</CardTitle>
            <CardDescription>
              Social logins connected to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {user.externalAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
              >
                <span className="text-sm capitalize">{account.provider}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {account.username || account.emailAddress}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <Button variant="destructive" size="sm" onClick={() => user.delete()}>
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 w-32 rounded-xl bg-muted" />
      <div className="h-28 rounded-2xl bg-muted" />
      <div className="h-52 rounded-2xl bg-muted" />
      <div className="h-32 rounded-2xl bg-muted" />
    </div>
  );
}
