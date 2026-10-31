import React from "react";
import { Book } from "@/types/book";
import BookCard from "../components/books/BookCard";

const Books = async () => {
  const response = await fetch("http://localhost:5001/books/latest");
  const books: Book[] = await response.json();

  return (
    <section className="bg-[var(--main-bg)] px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto w-full max-w-[94%]">
        <div className="mb-10 text-center md:mb-18">
          <span className="mb-5 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
            A World of Stories
          </span>

          <h2 className="font-serif text-3xl font-extrabold text-[var(--text-primary)] md:text-5xl">
            Find Your Next Read
          </h2>
        </div>

        {/* Book Cards */}

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Button */}
        <div className="mt-10 text-center md:mt-14">
          <a
            href="/all-books"
            className="inline-block rounded-lg border border-[var(--secondary)] bg-[var(--secondary)] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--secondary-hover)] hover:bg-[var(--secondary-hover)]"
          >
            Explore More Books
          </a>
        </div>
      </div>
    </section>
  );
}

export default Books;