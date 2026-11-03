# BookNook Client Guidelines

## Project Setup

- This is a Next.js 16 App Router application using TypeScript, React 19, Tailwind CSS v4, Better Auth, and a separate BookNook backend API.
- Install dependencies with `npm install`. Local development also requires a running backend and `.env.local` values for `NEXT_PUBLIC_BACKEND_API_URL`, `BETTER_AUTH_URL`, `MONGODB_URI`, and the Google OAuth credentials when Google sign-in is enabled. Use the variable names and example values in `README.md`; never commit credentials.

## Architecture

- Route segments and their loading/error UI live under `src/app/`. The route groups are home/collection pages, auth pages under `(auth)`, book details, authenticated book management, profile, and the Better Auth handler at `src/app/api/auth/[...all]/route.js`.
- `src/app/layout.tsx` owns the global fonts, metadata, `AuthProvider`, `Navbar`, `Footer`, and toast container. Preserve this shell when adding routes.
- The home route composes interactive home sections with the async `src/app/books/page.tsx` component to show the latest books. `/all-books` is a separate server-rendered collection page; both use the shared `Book` type and `BookCard`.
- The frontend talks to the separate backend through `NEXT_PUBLIC_BACKEND_API_URL` (for example `/books/latest`, `/books`, `/book-details/:id`, `/borrow`, and the user book/borrow endpoints). Public collection/detail reads belong in server components and use uncached fetches so inventory is current. Client components perform authenticated mutations and session-dependent reads.
- Better Auth is initialized in `src/lib/auth.ts`, exposed to the browser through `src/lib/auth-client.js`, and mounted globally by `AuthProvider` in `src/app/context/AuthContext.tsx`. Server routes retrieve auth/session data through Better Auth and `next/headers`; client actions use the auth client token/session APIs.
- `src/proxy.ts` redirects unauthenticated users from `/add-book`, `/profile`, `/book-details/*`, `/my-borrows`, and `/my-books` to sign-in while preserving the callback URL. Keep the matcher aligned with any new protected route.
- `src/types/book.ts` is the shared backend response contract. Reuse `Book` rather than defining route-specific book shapes. Keep collection markup in `BookCard` and book actions in `BorrowBookButton`, `EditBookDialog`, and `DeleteBookDialog`.
- Components that use state, effects, browser APIs, auth hooks, or Embla carousel APIs must remain client components with `"use client"`. Keep route data fetching server-side unless browser interactivity requires otherwise.

## Build, Test, and Lint

Install dependencies with `npm install`, then use:

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run lint      # Run ESLint
npm run build     # Create a production build and run Next validation
npm run start     # Serve the production build
```

- There is no test script, test framework, or test-file suite configured. For focused validation of one file, run `npx eslint path/to/file.tsx` (for example, `npx eslint src/app/page.tsx`); this is the closest equivalent to a single-test command.
- Run `npm run build` when changes affect routing, server/client boundaries, environment access, or Next configuration.

## Conventions

- Use the `@/*` alias for imports from `src/*`; relative imports are also used for nearby route components. Reuse `src/types/book.ts` rather than redefining book shapes.
- Use `next/link` for internal navigation and `next/image` for covers. Remote image hosts are configured in `next.config.ts`; preserve those patterns when adding cover sources.
- Shared primitives in `src/components/ui` follow shadcn conventions. Extend or compose them instead of introducing a parallel primitive system.
- Use the design tokens in `src/app/globals.css` (`--primary`, `--secondary`, `--main-bg`, `--surface`, text, and border variables) with Tailwind utilities. Use the existing `font-sans` and `font-serif` classes backed by DM Sans and Playfair Display.
- Preserve the existing loading, error, empty-state, toast, and `notFound()` behavior. Check backend responses before parsing or rendering them, and surface failures through the existing UX rather than rendering fabricated data.
- Preserve the generated Next.js instructions in the root `AGENTS.md`; `next dev` may regenerate that block. Read the relevant Next guide under `node_modules/next/dist/docs/` before changing Next-specific behavior.
