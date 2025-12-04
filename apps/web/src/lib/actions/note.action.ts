"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import { getSession } from "@/lib/auth/utils";
import { createNoteSchema, updateNoteSchema } from "@/lib/schemas/note";
import { noteService } from "@/lib/services";

export async function createNote(data: z.infer<typeof createNoteSchema>) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = createNoteSchema.parse(data);
  const note = await noteService.createNote(parsed, session.user.id);

  revalidatePath("/");
  return note;
}

export async function updateNote(data: z.infer<typeof updateNoteSchema>) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const parsed = updateNoteSchema.parse(data);
  await noteService.updateNote(parsed, session.user.id);

  revalidatePath("/");
  revalidatePath(`/notes/${parsed.id}`);
}

export async function deleteNote(id: string) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await noteService.deleteNote(id, session.user.id);

  revalidatePath("/");
}

