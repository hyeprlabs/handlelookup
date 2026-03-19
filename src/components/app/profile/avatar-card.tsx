"use client";

import { useRef } from "react";
import initials from "initials";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadIcon } from "lucide-react";

type User = NonNullable<ReturnType<typeof useUser>["user"]>;

export function AvatarCard({ user }: { user: User }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abbr = initials(
    user.fullName || user.emailAddresses[0]?.emailAddress || "U",
  ) as string;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await user.setProfileImage({ file });
    e.target.value = "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile photo</CardTitle>
        <CardDescription>
          Shown on your profile and in comments
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Avatar className="size-16 shrink-0 self-start sm:size-20">
            <AvatarImage src={user.imageUrl} alt={user.fullName ?? "User"} />
            <AvatarFallback className="text-lg">{abbr}</AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate font-medium">
              {user.fullName || "No name set"}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG or GIF · Max 5 MB
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadIcon />
          Upload photo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </CardFooter>
    </Card>
  );
}
