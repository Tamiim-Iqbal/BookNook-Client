# BookNook Client Guidelines

## Architecture

- This is a Next.js 16 App Router application using TypeScript, React 19, and Tailwind CSS v4.
- The root layout in `src/app/layout.tsx` owns the global fonts, metadata, `Navbar`, page content slot, and `Footer`. Preserve that shell when adding routes.
- Route pages live under `src/app/`. The home route composes the client-side `Hero` with the server-rendered latest-books section from `src/app/books/page.tsx`; `/all-books` fetches the complete collection.
- Book data is currently fetched from the separate local API at `http://localhost:5001` (`/books/latest` and `/books`). Keep API access in server components unless browser interactivity is required, and surface failed responses instead of rendering fabricated data.
- Reuse the shared `Book` contract in `src/types/book.ts` and `BookCard` for book grids. Add new book-related UI beside the existing feature components rather than duplicating card markup.
- Components that use React state, effects, browser APIs, or Embla carousel APIs must remain client components (`"use client"`). Keep data-fetching route components server components where possible.

## Build, Test, and Lint

Install dependencies with `npm install`, then use:

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run lint      # Run the configured ESLint checks
npm run build     # Create a production build and run Next validation
npm run start     # Serve the production build
```

There is currently no test script, test framework, or test-file suite in this repository. For a focused lint check, run `npx eslint path/to/file.tsx` (for example, `npx eslint src/app/page.tsx`).

## Conventions

- Use the `@/*` alias for imports from `src/*` (for example, `@/types/book` and `@/components/ui/carousel`); use relative imports for nearby route components as the existing routes do.
- Use `next/link` for internal navigation and `next/image` for book covers. Remote cover images must match the `covers.openlibrary.org` pattern configured in `next.config.ts`.
- Shared primitives in `src/components/ui` follow shadcn conventions and the aliases in `components.json`; prefer extending or composing those primitives instead of introducing a parallel UI system.
- The visual system is defined in `src/app/globals.css`: use its CSS variables (`--primary`, `--secondary`, `--main-bg`, `--surface`, text, and border variables) and Tailwind utility classes rather than hard-coding a new palette.
- The project uses DM Sans for sans text and Playfair Display for serif headings through `next/font`; use the existing `font-sans` and `font-serif` classes.
- Keep interactive navigation and carousel behavior in the existing client components (`Navbar`, `Hero`, and the shared carousel). New interactive components should follow the same explicit client boundary and clean up browser event listeners/effects.
- When changing Next.js behavior, retain the generated Next.js instructions in the root `AGENTS.md`; `next dev` may regenerate that block.
