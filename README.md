# Fullstack Notes

A simple notes app built with Next.js, Prisma, PostgreSQL, Better Auth, and Zod. This project demonstrates understanding of the Sokosumi architecture pattern.

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
fullstack-notes/
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
   # Edit apps/web/.env with your database URL and Better Auth secret
   ```

3. **Set up the database:**

   ```bash
   # Generate Prisma client
   pnpm prisma:generate

   # Run migrations
   pnpm prisma:migrate:dev
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Features

- ✅ User authentication (signup/signin)
- ✅ Create notes
- ✅ Read notes
- ✅ Update notes
- ✅ Delete notes
- ✅ Dark/light theme (auto-detect)
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
- `pnpm prisma:studio` - Open Prisma Studio
