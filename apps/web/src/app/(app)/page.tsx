import { Suspense } from "react";

import { NoteList } from "@/components/note-list";
import { CreateNoteButton } from "@/components/create-note-button";

function NotesLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-lg bg-muted"
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Notes</h2>
        <CreateNoteButton />
      </div>
      <Suspense fallback={<NotesLoading />}>
        <NoteList />
      </Suspense>
    </div>
  );
}

