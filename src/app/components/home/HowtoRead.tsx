const HowToRead = () => {
  return (
    <section className="bg-(--secondary-bg) px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--secondary)">
            How It Works
          </p>

          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-(--text-primary) sm:text-5xl">
            Start Reading in 4 Easy Steps
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-6 text-(--text-secondary) font-medium">
            Discover, borrow, read, and return books with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: "01",
              title: "Explore Books",
              description:
                "Browse our collection and find your next favorite book.",
              icon: "🔍",
            },
            {
              number: "02",
              title: "Borrow It",
              description:
                "Choose a book and borrow it from our online library.",
              icon: "📚",
            },
            {
              number: "03",
              title: "Read & Enjoy",
              description:
                "Enjoy your borrowed book and make time for reading.",
              icon: "📖",
            },
            {
              number: "04",
              title: "Return It",
              description:
                "Return the book when you finish reading so others can enjoy it too.",
              icon: "↩️",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-(--border) bg-(--surface) p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{step.icon}</span>
                <span className="font-serif text-2xl font-bold text-(--secondary)">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-(--text-primary)">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-(--text-secondary)">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-(--primary) px-6 py-8 text-center sm:py-10">
          <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
            Ready to Discover Your Next Read?
          </h3>

          <p className="mt-2 text-sm text-white/75">
            Explore the BookNook library and start your reading journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToRead;