import * as z from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const updateNoteSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;
export type UpdateNoteSchemaType = z.infer<typeof updateNoteSchema>;

