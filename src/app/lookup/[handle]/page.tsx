import { redirect } from "next/navigation";

// The lookup experience now lives on the homepage with URL state (?q=handle)
export default async function LookupPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  redirect(`/?q=${encodeURIComponent(handle)}`);
}
