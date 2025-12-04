import { notFound } from "next/navigation";
import { Suspense } from "react";
import { noteService } from "@/lib/services";
import { getSession } from "@/lib/auth/utils";
import { NoteForm } from "@/components/note-form";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

function NoteLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="h-64 animate-pulse rounded bg-muted" />
    </div>
  );
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session?.user) {
    notFound();
  }

  const note = await noteService.getNoteById(id, session.user.id);

  if (!note) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Suspense fallback={<NoteLoading />}>
        <h2 className="text-2xl font-semibold">Edit Note</h2>
        <NoteForm note={note} />
      </Suspense>
    </div>
  );
}

