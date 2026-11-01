import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Star,
} from "lucide-react";

type BookDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

const BookDetails = async ({ params }: BookDetailsProps) => {
  const { id } = await params;

  const response = await fetch(
    `http://localhost:5001/book-details/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book = await response.json();
  const isAvailable = book.copy > 0;

  return (
    <main className="min-h-screen bg-(--main-bg) px-4 py-5 sm:px-6 lg:py-5">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-(--text-secondary) transition-colors hover:text-(--primary)"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        {/* Details Card */}
        <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--primary-bg) shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Book Cover */}
            <div className="flex items-center justify-center bg-(--secondary-bg) p-8 sm:p-12 lg:p-14">
              <div className="relative w-full max-w-[300px] overflow-hidden rounded-xl shadow-xl">
                <Image
                  src={book.img}
                  alt={book.name}
                  width={500}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              {/* Category & Rating */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-md bg-(--secondary)/15 px-2.5 py-1 text-xs font-semibold text-(--secondary)">
                  {book.category}
                </span>

                <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-(--text-primary)">
                  <Star
                    size={15}
                    className="fill-(--secondary) text-(--secondary)"
                  />
                  {book.rating}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-(--text-primary) sm:text-4xl lg:text-[42px]">
                {book.name}
              </h1>

              {/* Author */}
              <p className="mt-3 text-base text-(--text-secondary)">
                by{" "}
                <span className="font-semibold text-(--text-primary)">
                  {book.author}
                </span>
              </p>

              {/* Divider */}
              <div className="my-7 h-px w-full bg-(--border)" />

              {/* Description */}
              <div>
                <h2 className="mb-3 text-lg font-bold text-(--text-primary)">
                  About This Book
                </h2>

                <p className="text-sm leading-7 text-(--text-secondary) sm:text-base">
                  {book.description}
                </p>
              </div>

              {/* Added By & Available Copies */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Added By */}
                <div className="rounded-xl border border-(--border) bg-(--main-bg)/60 p-4">
                  <p className="text-xs font-medium text-(--text-muted)">
                    Added By
                  </p>

                  <p className="mt-2 truncate text-sm font-bold text-(--text-primary)">
                    {book.addedBy?.name || "Unknown"}
                  </p>

                  <p className="mt-1 truncate text-xs text-(--text-secondary)">
                    {book.addedBy?.email || "No email available"}
                  </p>
                </div>

                {/* Available Copies */}
                <div className="rounded-xl border border-(--border) bg-(--main-bg)/70 p-4">
                  <p className="text-xs font-medium text-(--text-muted)">
                    Available Copies
                  </p>

                  <p className="mt-2 text-sm font-bold text-(--text-primary)">
                    {book.copy} {book.copy === 1 ? "Copy" : "Copies"}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="mt-6 flex items-center gap-2">
                {isAvailable ? (
                  <>
                    <CheckCircle2 size={17} className="text-(--primary)" />
                    <span className="text-sm font-semibold text-(--primary)">
                      Available for borrowing
                    </span>
                  </>
                ) : (
                  <>
                    <span className="size-2 rounded-full bg-red-500" />
                    <span className="text-sm font-semibold text-red-500">
                      Currently not available
                    </span>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  disabled={!isAvailable}
                  className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
                    isAvailable
                      ? "bg-(--primary) text-white hover:bg-(--primary-hover) active:scale-[0.98] cursor-pointer"
                      : "cursor-not-allowed bg-(--secondary-bg) text-(--text-muted)"
                  }`}
                >
                  <BookOpen size={18} />
                  {isAvailable ? "Borrow This Book" : "Not Available"}
                </button>

                <Link
                  href="/all-books"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-(--border) px-6 py-3 text-sm font-bold text-(--text-secondary) transition-colors hover:border-(--primary) hover:text-(--primary)"
                >
                  <ArrowLeft size={17} />
                  Back to All Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetails;