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
    <main className="min-h-screen bg-(--main-bg)">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-(--primary-bg) px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-(--secondary)">
            <span className="h-px w-[38px] bg-(--secondary)" />
            Explore Our Collection
            <span className="h-px w-[38px] bg-(--secondary)" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            Discover All <span className="text-(--secondary)">Books.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-(--text-secondary) sm:text-[15px]">
            Explore a world of stories, knowledge, and inspiration. Find your
            next favorite book from our growing collection.
          </p>

          <div className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-(--border) bg-(--surface) px-4 py-2.5">
            <BookOpen size={19} className="text-(--secondary)" />

            <span className="text-lg font-bold text-(--primary)">
              {books.length}
            </span>

            <span className="text-sm font-medium text-(--text-secondary)">
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
              <h2 className="font-serif text-2xl font-bold text-(--text-primary) md:text-4xl">
                Our Collection
              </h2>
              <p className="mt-2 font-medium text-(--text-muted)">
                Browse and discover your next read.
              </p>
            </div>

            <span className="text-sm font-medium text-(--text-secondary)">
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
            <div className="rounded-xl border border-(--border) bg-(--surface) px-6 py-20 text-center">
              <BookOpen
                size={40}
                className="mx-auto text-(--accent)"
              />
              <h3 className="mt-4 text-xl font-semibold text-(--text-primary)">
                No Books Found
              </h3>
              <p className="mt-2 text-sm text-(--text-muted)">
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