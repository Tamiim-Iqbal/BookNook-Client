
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type BorrowedBook = {
  _id: string;
  bookId: string;
  name: string;
  author: string;
  category: string;
  img: string;
  borrowedAt: string;
  returnDate: string;
  status: string;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

const MyBorrows = () => {
  const { user, isPending: isAuthPending } = useAuth();

  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const showSkeleton =
    isAuthPending || (!!user?.email && isLoading);

  // Fetch My Borrows
  useEffect(() => {
    if (isAuthPending || !user?.email) return;

    let isMounted = true;

    const fetchMyBorrows = async () => {
      try {
        // Get JWT token
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Failed to retrieve JWT token");
        }

        const token = data.token;

        // Fetch borrowed books with Authorization header
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/my-borrows?email=${encodeURIComponent(user.email)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }

        const result = await response.json();

        if (isMounted) {
          setBorrowedBooks(result);
        }
      } catch (error) {
        console.error("Error fetching borrowed books:", error);

        if (isMounted) {
          setBorrowedBooks([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMyBorrows();

    return () => {
      isMounted = false;
    };
  }, [user?.email, isAuthPending]);

  // Return Book
  const handleReturn = async (borrowId: string) => {
    try {
      setReturningId(borrowId);

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Failed to retrieve JWT token");
      }

      const token = data.token;

      // Return book with Authorization header
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/return/${borrowId}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      // Remove returned book from local state
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== borrowId)
      );

      toast.success("Book returned. Thank you!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setReturningId(null);
    }
  };

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

        {/* Loading State */}
        {showSkeleton ? (
          <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-(--border) bg-(--main-bg)">
                    {[
                      "Book",
                      "Title",
                      "Borrow Date",
                      "Return Date",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-(--text-secondary)"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3, 4].map((item) => (
                    <tr
                      key={item}
                      className="border-b border-(--border) last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div className="h-[68px] w-[52px] animate-pulse rounded-lg bg-(--primary-bg)" />
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 w-36 animate-pulse rounded bg-(--primary-bg)" />
                        <div className="mt-2 h-3 w-24 animate-pulse rounded bg-(--primary-bg)" />
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 w-32 animate-pulse rounded bg-(--primary-bg)" />
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 w-32 animate-pulse rounded bg-(--primary-bg)" />
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-10 w-28 animate-pulse rounded-lg bg-(--primary-bg)" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : borrowedBooks.length > 0 ? (
          /* Borrowed Books Table */
          <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-left">
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

                <tbody>
                  {borrowedBooks.map((book) => (
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
                            unoptimized
                          />
                        </div>
                      </td>

                      {/* Book Title */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-(--text-primary)">
                          {book.name}
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
                          {formatDate(book.borrowedAt)}
                        </div>
                      </td>

                      {/* Return Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-(--text-secondary)">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-(--secondary)"
                          />
                          {formatDate(book.returnDate)}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleReturn(book._id)}
                          disabled={returningId === book._id}
                          className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-(--secondary) bg-(--secondary) px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <RotateCcw size={14} />
                          {returningId === book._id
                            ? "Returning..."
                            : "Return Book"}
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
              <BookOpen size={30} className="text-(--secondary)" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-(--text-primary)">
              No Borrowed Books Yet!
            </h3>

            <p className="mt-2 max-w-[380px] text-sm leading-6 text-(--text-muted)">
              You haven&apos;t borrowed any books yet. Explore our library
              and discover your next favourite read!
            </p>

            <Link
              href="/books"
              className="mt-6 rounded-lg border border-(--secondary) bg-(--secondary) px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
            >
              Explore Books
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyBorrows;
