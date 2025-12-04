/**
 * @notes/database
 *
 * Main entry point for Prisma types, models, and enums.
 * This file exports browser-safe types to avoid Node.js dependencies in client components.
 *
 * ## Usage:
 *
 * ### Import Prisma types and models:
 * ```typescript
 * import { Prisma, User, Note } from '@notes/database'
 * ```
 *
 * ### Import the Prisma client singleton:
 * ```typescript
 * import prisma from '@notes/database/client'
 * ```
 *
 * ### Import repositories:
 * ```typescript
 * import { noteRepository, userRepository } from '@notes/database/repositories'
 * ```
 */

// Export types from Prisma client
export type { Prisma, User, Note } from "./generated/prisma/client.js";

