# AGENTS.md — AcademyCoreAPI

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm build` | `tsc && tsc-alias` (resolves path aliases to relative paths) |
| `pnpm dev` | `ts-node-dev src/main.ts` (hot-reload dev server) |
| `pnpm test` | `jest --no-cache --verbose --detectOpenHandles` |
| `pnpm lint` | `eslint . --ext .ts` |
| `pnpm lint:fix` | `eslint . --ext .ts --fix` (no Prettier — ESLint only) |

Husky `pre-commit` hook: `pnpm lint:fix && pnpm test` (runs lint+fix AND all tests).

No `typecheck` script exists. To type-check: `npx tsc --noEmit`.

## Architecture

- **Clean Architecture** — files grouped by module, then by layer (`domain/`, `application/`, `infrastructure/`).
- **Express app** — entrypoint `src/main.ts` → `src/app.ts`.
- **API docs** at `http://localhost:3000/docs` (Swagger UI via swagger-jsdoc).
- **Prisma ORM** with SQLite (`prisma/schema.prisma`). Run `npx prisma generate` after schema changes.
- **No router layer wired yet** — swagger config references `src/modules/user/infrastructure/router/user.router.ts` which does not exist yet.
- **pnpm** is the package manager (run `pnpm install`, not `npm install`).

## Path aliases (tsconfig → tsc-alias)

```
@shared/*  → src/modules/shared/*
@user/*    → src/modules/user/*
@student/* → src/modules/student/*
@tests/*   → src/tests/*
```

Jest resolves these via `ts-jest`'s `pathsToModuleNameMapper`.

## Testing

- **Jest + ts-jest**, tests co-located in `__tests__/` dirs next to source files.
- **Prisma mocked** globally via `jest-mock-extended` — import `prismaMock` from `@tests/lib/mocks/prisma.mock`.
- Factories: `generateFakeUser()` / `generateManyFakeUser(n)` from `@tests/utils/mocks/user.fake`.
- `src/tests/setup.ts` exists but is empty and **not wired** (commented out in jest.config.js).

## Domain patterns

- **Entities** extend `Entity` (abstract class with `id: string`).
- **Repositories** implement interfaces extending `Repository<T>`, consume `PrismaClient` via constructor injection.
- **Use cases** are standalone functions (not classes), injected with repo + transaction manager.
- **Result type**: `{ isSuccess: true; value: T } | { isSuccess: false; error: E }`.
- **Transactions**: `Transaction` class collects promises, `TransactionManager.commit<T>()` runs them in `prisma.$transaction`.

## Config quirks

- `strictPropertyInitialization: false` in tsconfig (entity `id` is `string` not `string | undefined`).
- `noUnusedLocals: true`, but `noUnusedParameters` is **off**.
- `removeComments: true` in tsconfig.
- `.env` is required — copy `.env.example` and set `DATABASE_URL`, `NODE_ENV`, `PORT`, `JWT_SECRET`.

## Important gotchas

- **When editing entity classes**, remember `strictPropertyInitialization: false` means uninitialized props won't error.
- **After Prisma schema changes**: run `npx prisma generate` to update the client.
- **Lint uses 4-space indentation** (`indent: ["error", 4]`), single quotes, semicolons required.
