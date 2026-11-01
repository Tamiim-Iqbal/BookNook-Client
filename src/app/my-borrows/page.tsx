"use client";

import { CalendarDays, RotateCcw, BookOpen } from "lucide-react";

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
    <main className="min-h-screen bg-(--main-bg) pb-16">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-(--primary-bg) px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-(--secondary)">
            <span className="h-px w-[38px] bg-(--secondary)" />
            Your Reading Collection
            <span className="h-px w-[38px] bg-(--secondary)" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            My Borrowed{" "}
            <span className="text-(--secondary)">Books.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-(--text-secondary) sm:text-[15px]">
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
            <h2 className="font-serif text-2xl font-bold text-(--text-primary) sm:text-3xl">
              Borrowed Books
            </h2>

            <p className="mt-1.5 text-sm text-(--text-muted)">
              Manage your borrowed books and return them on time.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-(--primary-bg) px-4 py-2 text-xs font-semibold text-(--secondary)">
            {borrowedBooks.length} Books
          </span>
        </div>

        {/* Books Table / Empty State */}
        {borrowedBooks.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-(--border) bg-(--main-bg)">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Book
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Title
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Borrow Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Return Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="border-b border-(--border) transition-colors duration-200 last:border-0 hover:bg-(--main-bg)"
                    >
                      {/* Book Image */}
                      <td className="px-6 py-4">
                        <div className="h-[68px] w-[52px] overflow-hidden rounded-lg bg-(--main-bg)">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Book Title */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          {book.title}
                        </p>

                        <p className="mt-1 text-xs text-(--text-muted)">
                          By {book.author}
                        </p>
                      </td>

                      {/* Borrow Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-(--text-secondary)">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-(--secondary)"
                          />
                          {book.borrowDate}
                        </div>
                      </td>

                      {/* Return Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-(--text-secondary)">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-(--secondary)"
                          />
                          {book.returnDate}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-(--secondary) bg-(--secondary) px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
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
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-(--border) bg-(--surface) px-5 py-14 text-center shadow-sm sm:py-16">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-(--primary-bg)">
              <BookOpen
                size={30}
                className="text-(--secondary)"
              />
            </div>

            <h3 className="font-serif text-2xl font-bold text-(--text-primary)">
              No Borrowed Books Yet!
            </h3>

            <p className="mt-2 max-w-[380px] text-sm leading-6 text-(--text-muted)">
              You haven&apos;t borrowed any books yet. Explore our library
              and discover your next favourite read!
            </p>

            <a
              href="/books"
              className="mt-6 rounded-lg border border-(--secondary) bg-(--secondary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Explore Books
            </a>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBorrows;