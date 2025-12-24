import { notFound } from "next/navigation";
import { Suspense } from "react";
import { noteService } from "@/lib/services";
import { getSession } from "@/lib/auth/utils";
import { NoteForm } from "@/components/note-form";
import { NoteFormSkeleton } from "@/components/note-form-skeleton";

interface NotePageProps {
  params: Promise<{ id: string }>;
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
    <Suspense fallback={<NoteFormSkeleton />}>
      <div className="mx-auto max-w-2xl space-y-6">
        <h2 className="text-2xl font-semibold">Edit Note</h2>
        <NoteForm note={note} />
      </div>
    </Suspense>
  );
}

