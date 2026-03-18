"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarCard } from "@/components/app/profile/avatar-card";
import { PersonalInfoCard } from "@/components/app/profile/personal-info-card";
import { EmailCard } from "@/components/app/profile/email-card";
import { ConnectedCard } from "@/components/app/profile/connected-card";
import { DangerCard } from "@/components/app/profile/danger-card";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <ProfileSkeleton />;
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      <AvatarCard user={user} />
      <PersonalInfoCard user={user} />
      <EmailCard user={user} />
      <ConnectedCard user={user} />
      <DangerCard user={user} />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-20 rounded-2xl" />
      <Skeleton className="h-52 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
    </div>
  );
}
