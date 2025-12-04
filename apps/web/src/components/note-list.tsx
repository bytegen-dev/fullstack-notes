import { noteService } from "@/lib/services";
import { getSession } from "@/lib/auth/utils";
import { NoteCard } from "./note-card";

export async function NoteList() {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }

  const notes = await noteService.getNotes(session.user.id);

  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

