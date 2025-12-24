import { NoteCardSkeleton } from "./note-card-skeleton";

interface NoteListSkeletonProps {
  view?: "grid" | "list";
  count?: number;
}

export function NoteListSkeleton({
  view = "grid",
  count = 10,
}: NoteListSkeletonProps) {
  return (
    <div
      className={`grid gap-4 ${
        view === "grid"
          ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "grid-cols-1"
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <NoteCardSkeleton key={i} />
      ))}
    </div>
  );
}

