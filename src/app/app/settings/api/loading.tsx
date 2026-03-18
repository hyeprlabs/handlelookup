import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-48 rounded-2xl" />
      <Skeleton className="h-36 rounded-2xl" />
    </div>
  );
}
