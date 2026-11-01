import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-[var(--main-bg)]">
      {/* Hero Section Skeleton */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-[var(--primary-bg)] px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-[38px] bg-[var(--border)]" />
            <div className="h-3 w-44 rounded-full bg-[var(--border)]" />
            <span className="h-px w-[38px] bg-[var(--border)]" />
          </div>

          {/* Title */}
          <div className="mt-5 h-10 w-64 rounded-lg bg-[var(--border)] sm:h-12 sm:w-80" />

          {/* Description */}
          <div className="mt-5 flex w-full max-w-[550px] flex-col items-center gap-2">
            <div className="h-3 w-full rounded-full bg-[var(--border)]" />
            <div className="h-3 w-[85%] rounded-full bg-[var(--border)]" />
          </div>

          {/* Book Count */}
          <div className="mt-6 flex h-11 w-40 items-center justify-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4">
            <div className="h-5 w-5 rounded bg-[var(--border)]" />
            <div className="h-5 w-6 rounded bg-[var(--border)]" />
            <div className="h-3 w-20 rounded-full bg-[var(--border)]" />
          </div>
        </div>
      </section>

      {/* Books Collection Skeleton */}
      <section className="px-4 py-14 sm:py-18">
        <div className="mx-auto w-[calc(100%-24px)] sm:w-[90%]">
          {/* Section Heading */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-8 w-44 rounded-lg bg-[var(--border)] md:h-10 md:w-56" />
              <div className="mt-3 h-3 w-52 rounded-full bg-[var(--border)]" />
            </div>

            <div className="h-4 w-20 rounded-full bg-[var(--border)]" />
          </div>

          {/* Book Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
              >
                {/* Book Image */}
                <div className="h-64 w-full bg-[var(--border)]" />

                {/* Book Details */}
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded-md bg-[var(--border)]" />
                  <div className="h-3 w-1/2 rounded-full bg-[var(--border)]" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="h-5 w-20 rounded-full bg-[var(--border)]" />
                    <div className="h-5 w-16 rounded-full bg-[var(--border)]" />
                  </div>

                  <div className="h-10 w-full rounded-lg bg-[var(--border)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;