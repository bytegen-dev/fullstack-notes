import { noteService } from "@/lib/services";
import { getSession } from "@/lib/auth/utils";
import { NoteList } from "./note-list";

interface NoteListServerProps {
  search?: string;
  page?: number;
  view?: "grid" | "list";
}

export async function NoteListServer({
  search,
  page = 1,
  view = "grid",
}: NoteListServerProps) {
  const session = await getSession();
  if (!session?.user) {
    return null;
  }

  const result = await noteService.getNotes(session.user.id, search, page, 10);

  return (
    <NoteList
      initialNotes={result.notes}
      initialTotal={result.total}
      initialPage={result.page}
      initialTotalPages={result.totalPages}
      search={search}
      view={view}
    />
  );
}
