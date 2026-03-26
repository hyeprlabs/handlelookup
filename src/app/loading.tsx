import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Spinner />
    </main>
  );
}
