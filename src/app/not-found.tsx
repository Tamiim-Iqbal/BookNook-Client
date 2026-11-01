
import Link from "next/link";
import { BookOpen, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[var(--main-bg)] px-5 py-16">
      <section className="w-full max-w-[550px] text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[var(--primary-bg)]">
          <BookOpen
            size={48}
            strokeWidth={1.5}
            className="text-[var(--secondary)]"
          />

          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-bold text-white">
            !
          </span>
        </div>

        {/* 404 Text */}
        <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[var(--secondary)]">
          Error 404
        </p>

        <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Page Not <span className="text-[var(--secondary)]">Found.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[420px] text-sm leading-7 text-[var(--text-muted)] sm:text-base">
          Oops! The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to your reading journey.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary-hover)] sm:w-auto"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/all-books"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--secondary)] hover:text-[var(--secondary)] sm:w-auto"
          >
            <ArrowLeft size={17} />
            Explore Books
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
