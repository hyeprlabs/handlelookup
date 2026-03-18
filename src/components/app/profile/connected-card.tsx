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

export function ConnectedCard({ user }: { user: User }) {
  if (user.externalAccounts.length === 0) return null;

  return (
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
            className="flex items-center justify-between rounded-xl border px-3 py-2.5"
          >
            <Badge variant="secondary" className="capitalize">
              {account.provider}
            </Badge>
            <span className="text-xs text-muted-foreground truncate ml-3">
              {account.username || account.emailAddress}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
