import { Suspense } from "react";

import { NoteListServer } from "@/components/note-list-server";
import { CreateNoteButton } from "@/components/create-note-button";
import { SearchInput } from "@/components/search-input";
import { ViewToggle } from "@/components/view-toggle";
import { NoteListSkeleton } from "@/components/note-list-skeleton";

interface HomePageProps {
  searchParams: Promise<{ search?: string; page?: string; view?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const search = params.search;
  const page = params.page ? parseInt(params.page, 10) : 1;
  const view = (params.view === "list" ? "list" : "grid") as "grid" | "list";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Suspense
          fallback={
            <div className="h-9 w-full max-w-md rounded-md bg-muted animate-pulse" />
          }
        >
          <SearchInput />
        </Suspense>
        <div className="flex items-center gap-2">
          <ViewToggle view={view} />
          <CreateNoteButton />
        </div>
      </div>
      <Suspense fallback={<NoteListSkeleton view={view} />}>
        <NoteListServer search={search} page={page} view={view} />
      </Suspense>
    </div>
  );
}
