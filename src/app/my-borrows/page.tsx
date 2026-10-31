
"use client";

import React from "react";
import { CalendarDays, RotateCcw } from "lucide-react";

const borrowedBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    borrowDate: "October 20, 2026",
    returnDate: "November 05, 2026",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    borrowDate: "October 22, 2026",
    returnDate: "November 08, 2026",
  },
  {
    id: 3,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    borrowDate: "October 25, 2026",
    returnDate: "November 10, 2026",
  },
  {
    id: 4,
    title: "Deep Work",
    author: "Cal Newport",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500",
    borrowDate: "October 27, 2026",
    returnDate: "November 12, 2026",
  },
];

const MyBorrows = () => {
  return (
    <main className="min-h-screen bg-[var(--main-bg)] pb-16">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-[var(--primary-bg)] px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">
            <span className="h-px w-[38px] bg-[var(--secondary)]" />
            Your Reading Collection
            <span className="h-px w-[38px] bg-[var(--secondary)]" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            My Borrowed{" "}
            <span className="text-[var(--secondary)]">Books.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-[var(--text-secondary)] sm:text-[15px]">
            Keep track of your borrowed books and manage your reading
            collection. Return your books on time and discover more stories.
          </p>
        </div>
      </section>

      {/* Borrowed Books Section */}
      <section className="mx-auto mt-8 w-[calc(100%-24px)] md:mt-10 sm:w-[90%]">
        {/* Section Heading */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Borrowed Books
            </h2>
            <p className="mt-1.5 text-sm text-[var(--text-muted)]">
              Manage your borrowed books and return them on time.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-[var(--primary-bg)] px-4 py-2 text-xs font-semibold text-[var(--secondary)]">
            {borrowedBooks.length} Books
          </span>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--main-bg)]">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Book
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Title
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Borrow Date
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Return Date
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {borrowedBooks.map((book) => (
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

                    {/* Borrow Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-[var(--secondary)]"
                        />
                        {book.borrowDate}
                      </div>
                    </td>

                    {/* Return Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-[var(--secondary)]"
                        />
                        {book.returnDate}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[var(--secondary)] bg-[var(--secondary)] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                      >
                        <RotateCcw size={14} />
                        Return Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyBorrows;
