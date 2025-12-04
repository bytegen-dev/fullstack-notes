import "server-only";

import prisma from "@notes/database/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type SessionUser = typeof auth.$Infer.Session.user;

