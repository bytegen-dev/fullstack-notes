import type { Prisma } from "../generated/prisma/client.js";
import prisma from "../client.js";

export interface PaginatedNotesResult {
  notes: Awaited<ReturnType<typeof prisma.note.findMany>>;
  total: number;
  page: number;
  totalPages: number;
}

export const noteRepository = {
  async findMany(
    userId: string,
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedNotesResult> {
    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.note.count({
      where: {
        userId,
        ...(search && {
          AND: [
            {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
              ],
            },
          ],
        }),
      },
    });

    const totalPages = Math.ceil(total / limit);

    const notes = await prisma.note.findMany({
      where: {
        userId,
        ...(search && {
          AND: [
            {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
              ],
            },
          ],
        }),
      },
      orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
      skip,
      take: limit,
    });

    return {
      notes,
      total,
      page,
      totalPages,
    };
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

  async update(id: string, userId: string, data: Prisma.NoteUpdateInput) {
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
