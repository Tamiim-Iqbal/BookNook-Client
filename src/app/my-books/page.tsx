"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Book = {
  _id: string;
  name: string;
  author: string;
  category: string;
  copy?: number;
  img: string;
};

const MyBooks = () => {
  const { user } = useAuth();

  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setMyBooks([]);
      setIsLoading(false);
      return;
    }

    const fetchMyBooks = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/books/my-books?email=${encodeURIComponent(user.email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setMyBooks(data);
      } catch (error) {
        console.error("Error fetching my books:", error);
        setMyBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyBooks();
  }, [user?.email]);

  return (
    <main className="min-h-screen bg-(--main-bg) pb-16">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-(--primary-bg) px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-(--secondary)">
            <span className="h-px w-[38px] bg-(--secondary)" />
            Your Personal Collection
            <span className="h-px w-[38px] bg-(--secondary)" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            My <span className="text-(--secondary)">Books.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-(--text-secondary) sm:text-[15px]">
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
            <h2 className="font-serif text-2xl font-bold text-(--text-primary) sm:text-3xl">
              My Collection
            </h2>

            <p className="mt-1.5 text-sm text-(--text-muted)">
              Manage all the books you have added to the library.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-(--primary-bg) px-4 py-2 text-xs font-semibold text-(--secondary)">
            {myBooks.length} Books
          </span>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-(--border) bg-(--surface) py-16">
            <p className="text-sm font-medium text-(--text-muted)">
              Loading your books...
            </p>
          </div>
        ) : myBooks.length > 0 ? (
          /* Books Table */
          <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-(--border) bg-(--main-bg)">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Book
                    </th>

                    <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Title
                    </th>

                    <th className="pl-1 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Available Copies
                    </th>

                    <th className="px-6 pl-18 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {myBooks.map((book) => (
                    <tr
                      key={book._id}
                      className="border-b border-(--border) transition-colors duration-200 last:border-0 hover:bg-(--main-bg)"
                    >
                      {/* Book Image */}
                      <td className="px-6 py-4">
                        <div className="relative h-[68px] w-[52px] overflow-hidden rounded-lg bg-(--main-bg)">
                          <Image
                            src={book.img}
                            alt={book.name}
                            fill
                            sizes="52px"
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Book Title */}
                      <td className="px-4 py-4">
                        <p className="text-base font-semibold text-(--text-primary)">
                          {book.name}
                        </p>

                        <p className="mt-1 text-xs text-(--text-muted)">
                          By {book.author}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="pl-0 pr-8 py-4">
                        <span className="inline-flex rounded-full bg-(--primary-bg) px-3 py-1.5 text-xs font-medium text-(--secondary)">
                          {book.category}
                        </span>
                      </td>

                      {/* Available Copies */}
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-(--text-primary) ml-4 sm:ml-8">
                          {book.copy ?? 0}
                        </span>

                        <span className="ml-2 text-xs text-(--text-muted)">
                          Copies
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Edit ${book.name}`}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-(--border) bg-(--surface) px-3 py-2.5 text-xs font-semibold text-(--text-secondary) transition-all duration-300 hover:border-(--secondary)  hover:text-(--secondary)"
                          >
                            <Pencil size={14} />
                            Edit
                          </button>

                          <button
                            type="button"
                            aria-label={`Delete ${book.name}`}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-(--surface) px-3 py-2.5 text-xs font-semibold text-red-500 transition-all duration-300 hover:bg-red-50"
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
          <div className="flex flex-col items-center justify-center rounded-2xl border border-(--border) bg-(--surface) px-5 py-14 text-center sm:py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary-bg) text-(--secondary)">
              <BookOpen size={30} strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 font-serif text-xl font-bold text-(--text-primary) sm:text-2xl">
              No Books Added Yet!
            </h3>

            <p className="mt-2 max-w-[400px] text-sm leading-7 text-(--text-muted)">
              Your collection is waiting to grow. Start adding books and manage
              your personal library in one place.
            </p>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--secondary) px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-(--secondary-hover)"
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
