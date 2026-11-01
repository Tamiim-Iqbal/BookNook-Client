"use client";

import React from "react";
import Link from "next/link";
import { Pencil, Trash2, BookOpen } from "lucide-react";

const myBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    copies: 5,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Non-Fiction",
    copies: 3,
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    category: "Finance",
    copies: 4,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    category: "Productivity",
    copies: 2,
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
  },
];

const MyBooks = () => {
  return (
    <main className="min-h-screen bg-[var(--main-bg)] pb-16">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-[var(--primary-bg)] px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
            <span className="h-px w-[38px] bg-[var(--secondary)]" />
            Your Personal Collection
            <span className="h-px w-[38px] bg-[var(--secondary)]" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            My <span className="text-[var(--secondary)]">Books.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-[var(--text-secondary)] sm:text-[15px]">
            Manage your book collection, keep track of available copies,
            and share your favourite reads with the community.
          </p>
        </div>
      </section>

      {/* My Books Section */}
      <section className="mx-auto mt-8 w-[calc(100%-24px)] md:mt-10 sm:w-[90%]">
        {/* Section Heading */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              My Collection
            </h2>

            <p className="mt-1.5 text-sm text-[var(--text-muted)]">
              Manage all the books you have added to the library.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[var(--primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--secondary)]">
            {myBooks.length} Books
          </span>
        </div>

        {/* Books Table / Empty State */}
        {myBooks.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--main-bg)]">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Book
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Available Copies
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {myBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b border-[var(--border)] transition-colors duration-200 last:border-0 hover:bg-[var(--main-bg)]"
                    >
                      {/* Book Image */}
                      <td className="px-6 py-4">
                        <div className="h-[68px] w-[52px] overflow-hidden rounded-lg bg-[var(--main-bg)]">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Book Title */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {book.title}
                        </p>

                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          By {book.author}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-full bg-[var(--primary-bg)] px-3 py-1.5 text-xs font-medium text-[var(--secondary)]">
                          {book.category}
                        </span>
                      </td>

                      {/* Available Copies */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {book.copies}
                        </span>
                        <span className="ml-1 text-xs text-[var(--text-muted)]">
                          Copies
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${book.title}`}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--secondary)] hover:bg-[var(--primary-bg)] hover:text-[var(--secondary)]"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            aria-label={`Delete ${book.title}`}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-[var(--surface)] px-3 py-2.5 text-xs font-semibold text-red-500 transition-all duration-300 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-14 text-center sm:py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-bg)] text-[var(--secondary)]">
              <BookOpen size={30} strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 font-serif text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
              No Books Added Yet!
            </h3>

            <p className="mt-2 max-w-[400px] text-sm leading-7 text-[var(--text-muted)]">
              Your collection is waiting to grow. Start adding books and manage
              your personal library in one place.
            </p>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--secondary)] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--secondary-hover)]"
            >
              <BookOpen size={16} />
              Explore Books
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBooks;