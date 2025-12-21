"use client";

import { useState, useEffect } from "react";
import type { Note } from "@notes/database";
import { NoteCard } from "./note-card";
import { Pagination } from "./pagination";
import { api } from "@/lib/api/client";
import { useRouter, useSearchParams } from "next/navigation";

interface NoteListProps {
  initialNotes: Note[];
  initialTotal: number;
  initialPage: number;
  initialTotalPages: number;
  search?: string;
  view?: "grid" | "list";
}

export function NoteList({
  initialNotes,
  initialTotal,
  initialPage,
  initialTotalPages,
  search,
  view = "grid",
}: NoteListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  // Reset when search or initial data changes
  useEffect(() => {
    setNotes(initialNotes);
    setCurrentPage(initialPage);
    setTotalPages(initialTotalPages);
  }, [initialNotes, initialPage, initialTotalPages]);

  async function handlePageChange(page: number) {
    if (page < 1 || page > totalPages || page === currentPage || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await api.notes.list(search, page, 10);
      setNotes(result.notes);
      setCurrentPage(result.page);
      setTotalPages(result.totalPages);

      // Update URL with page parameter
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      router.push(`?${params.toString()}`);
    } catch (error) {
      console.error("Error loading page:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>
          {search
            ? `No notes found matching "${search}"`
            : "No notes yet. Create your first note!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-4 ${
          view === "grid"
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
