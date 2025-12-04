import { NoteForm } from "@/components/note-form";

export default function NewNotePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold">Create New Note</h2>
      <NoteForm />
    </div>
  );
}

