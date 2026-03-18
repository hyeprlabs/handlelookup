import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import Link from "next/link";

type PlatformsCardProps = {
  handle: string;
  name: string;
  status: string;
  url: string;
};

export function PlatformsCard({
  handle,
  name,
  status,
  url,
}: PlatformsCardProps) {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex items-center justify-between px-4 py-2">
        <CardTitle>{name}</CardTitle>
        <CardAction>
          <Badge variant="outline" className="w-full">
            {status}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="border-y px-4 py-3">
        <p>
          Handle: <span className="text-muted-foreground">@{handle}</span>
        </p>
      </CardContent>
      <CardFooter className="border-none px-4 py-3">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={url}>
            Open {name}
            <ExternalLink />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
