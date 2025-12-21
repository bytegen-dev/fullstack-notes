#!/bin/bash
set -e

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# If running from apps/web/scripts/build.sh, go up to root
# If running from root with "cd apps/web && bash scripts/build.sh", we're already in apps/web
if [[ "$SCRIPT_DIR" == *"/apps/web/scripts" ]]; then
  PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
elif [[ "$PWD" == *"/apps/web" ]]; then
  PROJECT_ROOT="$(cd "../.." && pwd)"
else
  PROJECT_ROOT="$PWD"
fi

WEB_DIR="$PROJECT_ROOT/apps/web"
DB_DIR="$PROJECT_ROOT/packages/database"

# Build database package first (required for workspace dependency)
echo "Building database package..."
cd "$DB_DIR"
pnpm build

# Return to web directory
cd "$WEB_DIR"

# Generate Prisma client
pnpm prisma:generate

# Only run migrations if:
# 1. We're in Vercel (VERCEL env var is set)
# 2. OR DATABASE_URL is set and not pointing to localhost
if [ -n "$VERCEL" ] || ([ -n "$DATABASE_URL" ] && [[ ! "$DATABASE_URL" == *"localhost"* ]] && [[ ! "$DATABASE_URL" == *"127.0.0.1"* ]]); then
  echo "Running migrations for production database..."
  pnpm prisma:migrate:deploy
else
  echo "Skipping migrations (local development or no valid DATABASE_URL)"
fi

# Build Next.js app
next build

