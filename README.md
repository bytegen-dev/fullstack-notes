# note5

<div align="center">
  <img src="apps/web/public/logo-black.png" alt="note5 logo (light mode)" width="200" />
  <img src="apps/web/public/logo-white.png" alt="note5 logo (dark mode)" width="200" />
</div>

Simplified CRUD app built with Next.js, Prisma, PostgreSQL, Better Auth, and Zod.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Prisma** (PostgreSQL)
- **Better Auth** (Authentication)
- **Zod** (Validation)
- **Tailwind CSS** + **shadcn/ui**
- **next-themes** (Theme switching)

## Architecture

This project follows the three-layer architecture pattern:

1. **Repositories** (`packages/database/src/repositories/`) - Database access layer
2. **Services** (`apps/web/src/lib/services/`) - Business logic coordination
3. **Actions** (`apps/web/src/lib/actions/`) - Server mutations

## Project Structure

```
note5/
├── apps/
│   └── web/                   # Next.js application
│       ├── src/
│       │   ├── app/           # App Router routes
│       │   ├── components/    # UI components
│       │   └── lib/            # Domain logic
│       │       ├── actions/   # Server actions
│       │       ├── services/  # Business logic
│       │       ├── schemas/   # Zod schemas
│       │       └── auth/      # Better Auth setup
│       └── package.json
├── packages/
│   └── database/              # Shared database layer
│       ├── src/
│       │   ├── repositories/  # Prisma access layer
│       │   └── client.ts      # Prisma client
│       └── prisma/
│           └── schema.prisma  # Database schema
└── package.json               # Root workspace config
```

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

   Edit `apps/web/.env` with the following values:
   - **DATABASE_URL**: Your PostgreSQL connection string
     - Format: `postgresql://username:password@host:port/database?schema=public`
     - Example: `postgresql://postgres:mypassword@localhost:5432/notes?schema=public`

   - **BETTER_AUTH_SECRET**: A random secret key for signing session tokens
     - Generate one with: `openssl rand -base64 32`
     - Or use any secure random string (keep it secret!)

   - **BETTER_AUTH_URL**: Your application's base URL
     - For local development: `http://localhost:3000`
     - For production: Your production domain (e.g., `https://yourdomain.com`)

   - **GITHUB_CLIENT_ID** (optional): GitHub OAuth Client ID
     - Get one from: https://github.com/settings/developers
     - Create a new OAuth App
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github` (dev) or your production URL

   - **GITHUB_CLIENT_SECRET** (optional): GitHub OAuth Client Secret
     - Generated when you create the OAuth App on GitHub

   - **GOOGLE_CLIENT_ID** (optional): Google OAuth Client ID
     - Get one from: https://console.cloud.google.com/apis/credentials
     - Create a new OAuth 2.0 Client ID
     - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google` (dev) or your production URL

   - **GOOGLE_CLIENT_SECRET** (optional): Google OAuth Client Secret
     - Generated when you create the OAuth Client ID on Google Cloud Console

3. **Set up the database:**

   ```bash
   # Generate Prisma client
   pnpm prisma:generate

   # Run migrations
   pnpm prisma:migrate:dev

   # (Optional) Seed database with 50 sample notes for testing
   pnpm prisma:seed
   ```

   **Note:** The seed script uses Better Auth's signup API to create the test user, ensuring the password is hashed correctly in the format Better Auth expects. If a test user already exists, it will be deleted and recreated.

   **Test User Credentials** (created by seed script):
   - Email: `test@example.com`
   - Password: `password123`

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Features

- ✅ User authentication (signup/signin)
- ✅ GitHub OAuth sign-in (optional)
- ✅ Google OAuth sign-in (optional)
- ✅ Create notes
- ✅ Read notes
- ✅ Update notes
- ✅ Delete notes
- ✅ Search notes (server-side filtering)
- ✅ Pagination (offset-based with page numbers)
- ✅ Grid/List view toggle
- ✅ Dark/light theme (auto-detect)
- ✅ Cookie consent banner
- ✅ Privacy policy page
- ✅ Responsive design
- ✅ Server-side rendering with Suspense

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate:dev` - Run database migrations
- `pnpm prisma:migrate:deploy` - Apply migrations in production
- `pnpm prisma:seed` - Seed database with 50 sample notes (creates test user via Better Auth signup API, then creates 50 notes)
- `pnpm prisma:studio` - Open Prisma Studio (visual database browser)

**Additional Prisma commands** (available via Prisma CLI):

- `pnpm --filter @notes/database prisma migrate reset` - Reset database (drops all data and reruns migrations)
