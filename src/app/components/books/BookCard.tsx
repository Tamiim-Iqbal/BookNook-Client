"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--primary)]/5">
      {/* Book Cover */}
      <div className="relative h-64 overflow-hidden bg-[var(--primary-bg)]">
        {/* Image Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 z-10 animate-pulse bg-[var(--border)]" />
        )}

        {/* Book Image */}
        {!imageError ? (
          <Image
            src={book.img}
            alt={book.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`object-contain transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Image unavailable
            </span>
          </div>
        )}

        {/* Category */}
        <span className="absolute left-3 top-3 z-20 rounded-md bg-[var(--primary-hover)] px-3 py-1 text-sm font-medium text-white">
          {book.category}
        </span>
      </div>

      {/* Book Details */}
      <div className="space-y-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--secondary)]">
            {book.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-[var(--text-primary)]">
            <Star
              size={15}
              className="fill-[var(--text-secondary)] text-[var(--text-secondary)]"
            />
            {book.rating}
          </div>
        </div>

        <p className="mb-3 text-sm font-semibold text-(--text-secondary)">
          by {book.author}
        </p>

        <div className="flex items-center justify-between border-t border-(--border) pt-2">
          <span className="text-xs font-semibold text-[var(--text-muted)]">
            Available: {book.copy}
          </span>

          <Link
            href={`/books/${book._id}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--secondary)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--secondary-hover)]"
          >
            Details
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}