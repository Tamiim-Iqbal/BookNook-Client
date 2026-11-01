const Loading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-(--main-bg) pb-16">
      {/* Hero Skeleton */}
      <section className="relative mx-auto mt-5 w-[calc(100%-24px)] rounded-[24px] bg-(--primary-bg) px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center">
          <div className="h-3 w-44 rounded-full bg-(--secondary)/15" />

          <div className="mt-5 h-10 w-64 rounded-lg bg-(--secondary)/15 sm:h-12 sm:w-80" />

          <div className="mt-5 h-3 w-full max-w-[420px] rounded-full bg-(--secondary)/10" />
          <div className="mt-2 h-3 w-3/4 max-w-[320px] rounded-full bg-(--secondary)/10" />
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="mx-auto mt-8 w-[calc(100%-24px)] md:mt-10 sm:w-[90%]">
        {/* Section Heading */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div className="flex-1">
            <div className="h-7 w-44 rounded-lg bg-(--border) sm:h-8 sm:w-52" />
            <div className="mt-3 h-3 w-64 max-w-full rounded-full bg-(--border)" />
          </div>

          <div className="h-8 w-20 shrink-0 rounded-full bg-(--border)" />
        </div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Header */}
              <div className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.2fr] gap-4 border-b border-(--border) bg-(--main-bg) px-6 py-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-3 w-20 rounded-full bg-(--border)"
                  />
                ))}
              </div>

              {/* Table Rows */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[100px_1.5fr_1fr_1fr_1.2fr] items-center gap-4 border-b border-(--border) px-6 py-4 last:border-0"
                >
                  {/* Book Image */}
                  <div className="h-[68px] w-[52px] rounded-lg bg-(--border)" />

                  {/* Title */}
                  <div>
                    <div className="h-3.5 w-32 rounded-full bg-(--border)" />
                    <div className="mt-2 h-3 w-24 rounded-full bg-(--border)" />
                  </div>

                  {/* Category / Date */}
                  <div className="h-7 w-24 rounded-full bg-(--border)" />

                  {/* Copies / Return Date */}
                  <div className="h-4 w-16 rounded-full bg-(--border)" />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <div className="h-9 w-20 rounded-lg bg-(--border)" />
                    <div className="h-9 w-20 rounded-lg bg-(--border)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;