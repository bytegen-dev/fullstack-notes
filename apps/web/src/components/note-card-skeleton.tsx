import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function NoteCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        {/* Title skeleton - 2 lines to match line-clamp-2 */}
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-muted" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </CardHeader>
      <CardContent>
        {/* Content skeleton - 3 lines to match line-clamp-3 */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>
        {/* Date skeleton */}
        <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

