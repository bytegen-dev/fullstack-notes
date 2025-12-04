import { createAuthClient } from "better-auth/react";

import { auth } from "./auth";

export const authClient = createAuthClient({});

export const { signUp, signIn, signOut, useSession } = authClient;

