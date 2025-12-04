import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Note } from "@notes/database";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-2">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {note.content}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {new Date(note.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

