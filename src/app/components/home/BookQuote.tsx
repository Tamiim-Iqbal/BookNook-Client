const BookQuote = () => {
  return (
    <section
      aria-label="Book quote"
      className="bg-[var(--main-bg)] px-6 py-6 sm:px-10 sm:pt-20 lg:pt-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div
          aria-hidden="true"
          className="font-serif text-6xl leading-none text-[#ce5a35] sm:text-7xl -mb-7 font-bold"
        >
          &ldquo;
        </div>

        <blockquote className="mx-auto max-w-4xl font-serif text-3xl md:text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
          There is more treasure in books
          <br className="hidden sm:block" /> than in all the pirate&apos;s loot on
          <br className="hidden sm:block" /> Treasure Island.
        </blockquote> 

        <cite className="mt-4 md:mt-6 block not-italic text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          <span aria-hidden="true" className="mr-2">
            &mdash;
          </span>
          Walt Disney
        </cite>
      </div>
    </section>
  );
};

export default BookQuote;