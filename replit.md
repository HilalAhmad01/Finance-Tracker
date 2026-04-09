# VibeCheck - Personal Finance App

## Overview

VibeCheck is a dark-themed Gen-Z personal finance app with 4 core features:
- **Pulse** — Dashboard with balance, burn rate, savings streak, recent spends
- **Squads** — Friend leaderboard ("The Climb") with frugality scores and badges
- **Split** — Splitwise-style expense splitting with UPI payment requests ("The Divide")
- **History** — Transaction log with vibe tags, search and filters ("The Receipts")

## Artifacts

- `artifacts/vibecheck` — React + Vite frontend, dark mobile-first UI at `/`
- `artifacts/api-server` — Express API server at `/api`

## Database Tables

- `friends` — Squad members with frugality scores and UPI IDs
- `transactions` — All spending records with vibe labels
- `splits` — Split expense records with JSONB participants

---

# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
