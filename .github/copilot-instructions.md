# BookNook Client Guidelines

## Architecture

- This is a Next.js 16 App Router application using TypeScript, React 19, and Tailwind CSS v4. Route segments and their loading/error UI live under `src/app/`.
- `src/app/layout.tsx` owns the global fonts, metadata, `AuthProvider`, `Navbar`, `Footer`, and toast container. Preserve this shell when adding routes.
- The home route composes interactive home sections with the async `src/app/books/page.tsx` component to show the latest books. `/all-books` is a separate server-rendered collection page; both use the shared `Book` type and `BookCard`.
- The frontend talks to the separate backend through `NEXT_PUBLIC_BACKEND_API_URL` (for example `/books/latest`, `/books`, `/book-details/:id`, `/borrow`, and the user book/borrow endpoints). Keep public reads in server components where possible. Client components perform authenticated mutations and user-specific reads when they need session state.
- Better Auth is initialized in `src/lib/auth.ts` and `src/lib/auth-client.js`. `AuthProvider` exposes the client session through `useAuth`; `src/proxy.ts` redirects unauthenticated users from `/add-book`, `/profile`, `/book-details/*`, `/my-borrows`, and `/my-books` to sign-in while preserving the callback URL.
- Components that use state, effects, browser APIs, auth hooks, or Embla carousel APIs must remain client components with `"use client"`. Keep route data fetching server-side unless browser interactivity requires otherwise.

## Build, Test, and Lint

Install dependencies with `npm install`, then use:

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run lint      # Run ESLint
npm run build     # Create a production build and run Next validation
npm run start     # Serve the production build
```

There is no test script, test framework, or test-file suite configured, so there is no single-test command. For a focused validation of one file, run `npx eslint path/to/file.tsx` (for example, `npx eslint src/app/page.tsx`).

## Conventions

- Use the `@/*` alias for imports from `src/*`; relative imports are also used for nearby route components. Reuse `src/types/book.ts` rather than redefining book shapes.
- Use `next/link` for internal navigation and `next/image` for covers. Remote image hosts are configured in `next.config.ts`; preserve those patterns when adding cover sources.
- Shared primitives in `src/components/ui` follow shadcn conventions. Extend or compose them instead of introducing a parallel primitive system.
- Use the design tokens in `src/app/globals.css` (`--primary`, `--secondary`, `--main-bg`, `--surface`, text, and border variables) with Tailwind utilities. Use the existing `font-sans` and `font-serif` classes backed by DM Sans and Playfair Display.
- Keep book-grid markup in `BookCard` and book actions in the existing book components (`BorrowBookButton`, `EditBookDialog`, and `DeleteBookDialog`). Surface failed backend responses through the existing error/loading UX rather than rendering fabricated data.
- Preserve the generated Next.js instructions in the root `AGENTS.md`; `next dev` may regenerate that block.
