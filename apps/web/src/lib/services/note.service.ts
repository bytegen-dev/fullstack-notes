import { noteRepository } from "@notes/database/repositories";

import type { CreateNoteSchemaType, UpdateNoteSchemaType } from "@/lib/schemas/note";

export const noteService = {
  async getNotes(
    userId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    return noteRepository.findMany(userId, search, page, limit);
  },

  async getNoteById(id: string, userId: string) {
    return noteRepository.findById(id, userId);
  },

  async createNote(data: CreateNoteSchemaType, userId: string) {
    return noteRepository.create({
      ...data,
      userId,
    });
  },

  async updateNote(data: UpdateNoteSchemaType, userId: string) {
    const { id, ...updateData } = data;
    return noteRepository.update(id, userId, updateData);
  },

  async deleteNote(id: string, userId: string) {
    return noteRepository.delete(id, userId);
  },
};

