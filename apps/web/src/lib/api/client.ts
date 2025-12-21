import type { Note } from "@notes/database";
import type {
  CreateNoteSchemaType,
  UpdateNoteSchemaType,
} from "@/lib/schemas/note";

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface PaginatedNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  totalPages: number;
}

class ApiClient {
  private baseUrl = "/api";

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.error || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  notes = {
    /**
     * Get paginated list of notes
     */
    list: async (
      search?: string,
      page: number = 1,
      limit: number = 10
    ): Promise<PaginatedNotesResponse> => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      return this.request<PaginatedNotesResponse>(`/notes?${params.toString()}`);
    },

    /**
     * Get a single note by ID
     */
    get: async (id: string): Promise<Note> => {
      return this.request<Note>(`/notes/${id}`);
    },

    /**
     * Create a new note
     */
    create: async (data: CreateNoteSchemaType): Promise<Note> => {
      return this.request<Note>("/notes", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    /**
     * Update an existing note
     */
    update: async (data: UpdateNoteSchemaType): Promise<{ success: boolean }> => {
      return this.request<{ success: boolean }>(`/notes/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },

    /**
     * Delete a note
     */
    delete: async (id: string): Promise<{ success: boolean }> => {
      return this.request<{ success: boolean }>(`/notes/${id}`, {
        method: "DELETE",
      });
    },
  };
}

export const api = new ApiClient();

