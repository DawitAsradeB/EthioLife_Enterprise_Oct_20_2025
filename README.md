# EthioLife Enterprise – Full‑stack App

This repo contains a full‑stack Next.js application with a simple Todo feature to demonstrate end‑to‑end functionality:

- Frontend: Next.js 15 (App Router), React 19, Tailwind CSS 4
- API: Next.js Route Handlers (`/api/todos`)
- Database: SQLite via Prisma ORM
- TypeScript, ESLint

## Quick start

1) Install dependencies

```bash
npm --prefix web install
```

2) Generate Prisma client and create the SQLite database

```bash
cd web
npx prisma generate
npx prisma db push
```

3) Run the dev server

```bash
npm run dev --prefix web
```

Open `http://localhost:3000` and use the Todo UI to create, toggle, and delete items.

## Project layout

```
web/
  src/
    app/
      api/
        todos/route.ts        # GET, POST
        todos/[id]/route.ts   # PATCH, DELETE
      page.tsx                # Renders Todo UI
      layout.tsx
    components/
      TodoApp.tsx
    lib/
      prisma.ts               # Prisma client singleton
  prisma/
    schema.prisma             # Todo model
  .env                        # DATABASE_URL for SQLite
  package.json
```

## Environment

The app uses a local SQLite database by default:

```
DATABASE_URL="file:./dev.db"
```

Modify `web/.env` to point to a different database if needed.

## Build

```bash
npm run build --prefix web
```

## Notes

- API routes are dynamic (server‑rendered on demand).
- The Prisma client is created as a singleton in `src/lib/prisma.ts` to avoid hot‑reload connection issues.
