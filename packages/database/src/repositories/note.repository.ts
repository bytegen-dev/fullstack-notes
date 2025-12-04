import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../client.js";

export const noteRepository = {
  async findMany(userId: string) {
    return prisma.note.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.note.findFirst({
      where: { id, userId },
    });
  },

  async create(data: { title: string; content: string; userId: string }) {
    return prisma.note.create({
      data,
    });
  },

  async update(
    id: string,
    userId: string,
    data: Prisma.NoteUpdateInput,
  ) {
    return prisma.note.updateMany({
      where: { id, userId },
      data,
    });
  },

  async delete(id: string, userId: string) {
    return prisma.note.deleteMany({
      where: { id, userId },
    });
  },
};

