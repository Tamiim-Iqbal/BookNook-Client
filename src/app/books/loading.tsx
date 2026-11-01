import React from "react";

const BooksSkeleton = () => {
  return (
    <section className="animate-pulse bg-[var(--main-bg)] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[94%]">
        {/* Section Heading */}
        <div className="mb-10 text-center md:mb-18">
          <div className="mx-auto mb-5 h-3 w-40 rounded-full bg-[var(--border)]" />

          <div className="mx-auto h-9 w-64 rounded-lg bg-[var(--border)] sm:w-80 md:h-12" />
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
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

        {/* Button Skeleton */}
        <div className="mt-10 flex justify-center md:mt-14">
          <div className="h-12 w-40 rounded-lg bg-[var(--border)]" />
        </div>
      </div>
    </section>
  );
};

export default BooksSkeleton;