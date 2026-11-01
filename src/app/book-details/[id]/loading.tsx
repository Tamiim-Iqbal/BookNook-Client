
const Loading = () => {
  return (
    <main className="min-h-screen bg-(--main-bg) px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        {/* Back Button */}
        <div className="mb-8 h-5 w-36 rounded-md bg-(--secondary-bg)" />

        {/* Details Card */}
        <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--primary-bg) shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Book Cover Skeleton */}
            <div className="flex items-center justify-center bg-(--secondary-bg) p-8 sm:p-12 lg:p-14">
              <div className="aspect-[5/7] w-full max-w-[300px] rounded-xl bg-(--border)" />
            </div>

            {/* Book Information Skeleton */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              {/* Category & Rating */}
              <div className="mb-5 flex items-center justify-between">
                <div className="h-6 w-32 rounded-md bg-(--secondary-bg)" />
                <div className="h-5 w-12 rounded-md bg-(--secondary-bg)" />
              </div>

              {/* Title */}
              <div className="h-9 w-4/5 rounded-md bg-(--secondary-bg) sm:h-11" />

              {/* Author */}
              <div className="mt-4 h-5 w-2/5 rounded-md bg-(--secondary-bg)" />

              {/* Divider */}
              <div className="my-7 h-px w-full bg-(--border)" />

              {/* Description */}
              <div>
                <div className="mb-4 h-6 w-40 rounded-md bg-(--secondary-bg)" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-md bg-(--secondary-bg)" />
                  <div className="h-4 w-full rounded-md bg-(--secondary-bg)" />
                  <div className="h-4 w-4/5 rounded-md bg-(--secondary-bg)" />
                </div>
              </div>

              {/* Added By & Available Copies */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-(--border) bg-(--secondary-bg) p-4">
                  <div className="h-3 w-16 rounded bg-(--border)" />
                  <div className="mt-3 h-4 w-32 rounded bg-(--border)" />
                  <div className="mt-2 h-3 w-40 rounded bg-(--border)" />
                </div>

                <div className="rounded-xl border border-(--border) bg-(--secondary-bg) p-4">
                  <div className="h-3 w-28 rounded bg-(--border)" />
                  <div className="mt-3 h-4 w-24 rounded bg-(--border)" />
                </div>
              </div>

              {/* Availability */}
              <div className="mt-6 h-4 w-44 rounded-md bg-(--secondary-bg)" />

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="h-12 flex-1 rounded-xl bg-(--secondary-bg)" />
                <div className="h-12 flex-1 rounded-xl border border-(--border) bg-(--secondary-bg)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
