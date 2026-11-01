"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home, BookOpen } from "lucide-react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-(--main-bg) px-5 py-16">
      <section className="w-full max-w-[600px] text-center">
        {/* Icon */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-(--primary-bg)">
          <BookOpen
            size={42}
            strokeWidth={1.5}
            className="text-(--secondary)"
          />

          <span className="absolute -right-1 -top-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-(--main-bg) bg-red-50">
            <AlertCircle size={19} className="text-red-500" />
          </span>
        </div>

        {/* Error Content */}
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-(--secondary)">
          Something Went Wrong
        </p>

        <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-(--text-primary) sm:text-5xl">
          Oops! Something <span className="text-(--secondary)">Broke.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[440px] text-sm leading-7 text-(--text-muted) sm:text-base">
          We couldn&apos;t load this page due to an unexpected error.
          Please try again or head back to the homepage.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--secondary) px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-(--secondary-hover) sm:w-auto"
          >
            <RefreshCw size={17} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-6 py-3 text-sm font-semibold text-(--text-secondary) transition-all duration-300 hover:border-(--secondary) hover:text-(--secondary) sm:w-auto"
          >
            <Home size={17} />
            Back to Home
          </Link>
        </div>

        <p className="mt-10 text-xs font-medium text-(--text-muted)">
          Need a fresh start? Your next great read is waiting.
        </p>
      </section>
    </main>
  );
};

export default Error;