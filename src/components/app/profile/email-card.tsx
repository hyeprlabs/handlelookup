import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
type User = NonNullable<ReturnType<typeof useUser>["user"]>;

export function EmailCard({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email addresses</CardTitle>
        <CardDescription>
          Email addresses linked to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {user.emailAddresses.map((email) => {
          const isPrimary = email.id === user.primaryEmailAddressId;
          const isVerified = email.verification?.status === "verified";
          return (
            <div
              key={email.id}
              className="flex items-center justify-between rounded-xl border px-3 py-2.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <p className="truncate text-sm">{email.emailAddress}</p>
                {isPrimary && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    Primary
                  </Badge>
                )}
              </div>
              <Badge
                variant={isVerified ? "outline" : "secondary"}
                className={
                  isVerified
                    ? "shrink-0 text-xs text-green-600 border-green-200 dark:text-green-400 dark:border-green-900"
                    : "shrink-0 text-xs"
                }
              >
                {isVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
