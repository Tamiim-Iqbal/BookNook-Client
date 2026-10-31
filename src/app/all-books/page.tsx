import React from "react";
import { Book } from "@/types/book";
import { BookOpen } from "lucide-react";
import BookCard from "../components/books/BookCard";

const AllBooks = async () => {
  const response = await fetch(`${process.env.BACKEND_API_URL}/books`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: Book[] = await response.json();

  return (
    <main className="min-h-screen bg-[var(--main-bg)]">
      {/* Page Header */}
      {/* Page Header */}
<section className="px-0 pt-5 sm:pt-10">
  <div className="relative mx-auto w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-[var(--primary-bg)] px-5 py-14 text-center sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-20">

    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--secondary)]">
      <BookOpen size={16} />
      Explore Our Collection
    </span>

    <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
      Discover All Books
    </h1>

    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base font-medium">
      Explore a world of stories, knowledge, and inspiration.
      Find your next favorite book from our growing collection.
    </p>

    <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3">
      <BookOpen size={22} className="text-[var(--secondary)]" />
      <span className="text-2xl font-bold text-[var(--primary)]">
        {books.length}
      </span>
      <span className="text font-medium text-[var(--text-secondary)]">
        Books Available
      </span>
    </div>

  </div>
</section>

      {/* Books Collection */}
      <section className="px-4 py-14 sm:py-18">
        <div className="mx-auto w-[calc(100%-24px)] sm:w-[90%]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
                Our Collection
              </h2>
              <p className="mt-2 font-medium text-[var(--text-muted)]">
                Browse and discover your next read.
              </p>
            </div>

            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {books.length} Results
            </span>
          </div>

          {books.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
              <BookOpen
                size={40}
                className="mx-auto text-[var(--accent)]"
              />
              <h3 className="mt-4 text-xl font-semibold text-[var(--text-primary)]">
                No Books Found
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                There are no books available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllBooks;