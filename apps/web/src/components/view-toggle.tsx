"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleViewChange(newView: ViewMode) {
    if (onViewChange) {
      onViewChange(newView);
      return;
    }

    // Update URL with view parameter
    const params = new URLSearchParams(searchParams.toString());
    if (newView === "grid") {
      params.delete("view");
    } else {
      params.set("view", newView);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="icon"
        className={cn("size-8", view === "grid" && "bg-primary text-primary-foreground")}
        onClick={() => handleViewChange("grid")}
        aria-label="Grid view"
      >
        <Grid3x3 className="size-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="icon"
        className={cn("size-8", view === "list" && "bg-primary text-primary-foreground")}
        onClick={() => handleViewChange("list")}
        aria-label="List view"
      >
        <List className="size-4" />
      </Button>
    </div>
  );
}

