import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

import { getSession } from "@/lib/auth/utils";
import {
  createNoteSchema,
  listNotesQuerySchema,
} from "@/lib/schemas/note";
import { noteService } from "@/lib/services";

// GET /api/notes - List notes with search and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const queryParams = Object.fromEntries(searchParams.entries());
    const parsed = listNotesQuerySchema.parse(queryParams);

    const result = await noteService.getNotes(
      session.user.id,
      parsed.search,
      parsed.page,
      parsed.limit,
    );

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST /api/notes - Create a new note
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createNoteSchema.parse(body);

    const note = await noteService.createNote(parsed, session.user.id);

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
