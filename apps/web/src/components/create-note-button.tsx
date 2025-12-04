"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateNoteButton() {
  return (
    <Link href="/notes/new">
      <Button>
        <Plus className="mr-2 size-4" />
        New Note
      </Button>
    </Link>
  );
}

