import { Label } from "@/components/ui/label";

export function NoteFormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Page title skeleton */}
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      
      {/* Form skeleton */}
      <form className="space-y-4">
        {/* Title field skeleton */}
        <div className="space-y-2">
          <Label className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>

        {/* Content field skeleton */}
        <div className="space-y-2">
          <Label className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-64 w-full animate-pulse rounded-md bg-muted" />
        </div>

        {/* Buttons skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </form>
    </div>
  );
}

