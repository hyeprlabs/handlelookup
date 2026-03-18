import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";
import { SectionShell } from "@/components/features/api/section-shell";

export function RequestFormatSection() {
  return (
    <SectionShell
      title="Request Format"
      description="Use this endpoint and payload to check one handle across selected platforms."
      className="mt-12 md:mt-16"
      sectionId="03"
    >
      <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5">
        <Card className="gap-0 p-0">
          <CardHeader className="border-b px-4 py-3">
            <CardTitle>Endpoint</CardTitle>
            <CardDescription>
              Send your request to the lookup endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4 py-3">
            <div className="overflow-hidden rounded-xl border">
              <div className="flex items-center gap-1 border-b bg-secondary/50 px-3 py-2">
                <span className="size-2 rounded-full bg-foreground/35" />
                <span className="size-2 rounded-full bg-foreground/35" />
                <span className="size-2 rounded-full bg-foreground/35" />
                <p className="ml-2 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                  Request Headers
                </p>
              </div>
              <pre className="overflow-x-auto bg-secondary/20 p-3 font-mono text-xs">
                {`POST /v1/lookup HTTP/1.1
Host: api.handlelookup.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
              </pre>
            </div>
            <div className="overflow-hidden rounded-xl border">
              <div className="border-b bg-secondary/50 px-3 py-2">
                <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                  Request Body
                </p>
              </div>
              <pre className="overflow-x-auto bg-secondary/20 p-3 font-mono text-xs">
                {`{
  "handle": "alex",
  "platforms": ["x", "instagram", "tiktok", "github"]
}`}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="border-t px-4 py-3">
            <p className="text-muted-foreground text-xs">
              Tip: send only platforms you need to keep responses small.
            </p>
          </CardFooter>
        </Card>

        <Card className="gap-0 p-0">
          <CardHeader className="border-b px-4 py-3">
            <CardTitle>Example Response</CardTitle>
            <CardDescription>
              The API returns one object per platform with direct lookup links.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-3">
            <div className="mb-3 inline-flex items-center gap-1 rounded-full border bg-secondary/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
              <ArrowRightLeft className="size-3" />
              200 OK · application/json
            </div>
            <pre className="overflow-x-auto rounded-xl border bg-secondary/20 p-3 font-mono text-xs">
              {`{
  "handle": "alex",
  "checkedAt": "2026-03-18T12:17:02Z",
  "results": [
    {
      "platform": "x",
      "available": false,
      "status": "taken",
      "url": "https://x.com/alex"
    },
    {
      "platform": "instagram",
      "available": true,
      "status": "available",
      "url": "https://instagram.com/alex"
    }
  ]
}`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
