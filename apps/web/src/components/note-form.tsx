"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api/client";
import type { Note } from "@notes/database";
import { createNoteSchema, updateNoteSchema } from "@/lib/schemas/note";
import { Trash2 } from "lucide-react";

interface NoteFormProps {
  note?: Note;
}

const formSchema = createNoteSchema;

type FormValues = z.infer<typeof formSchema>;

export function NoteForm({ note }: NoteFormProps) {
  const router = useRouter();
  const isEditing = !!note;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      if (isEditing && note) {
        const updateData = updateNoteSchema.parse({ ...data, id: note.id });
        await api.notes.update(updateData);
      } else {
        await api.notes.create(data);
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error saving note:", error);
      // TODO: Add proper error handling/toast notification
    }
  }

  async function handleDelete() {
    if (!note) return;
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.notes.delete(note.id);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
      // TODO: Add proper error handling/toast notification
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...form.register("title")}
          placeholder="Note title"
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...form.register("content")}
          placeholder="Note content"
          rows={10}
        />
        {form.formState.errors.content && (
          <p className="text-sm text-destructive">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? "Saving..."
            : isEditing
              ? "Update Note"
              : "Create Note"}
        </Button>
        {isEditing && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={form.formState.isSubmitting}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        )}
      </div>
    </form>
  );
}

