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
    <article className="group overflow-hidden rounded-xl border border-(--border) bg-(--surface) transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-(--primary)/5">
      {/* Book Cover */}
      <div className="relative h-64 overflow-hidden bg-(--primary-bg)">
        {/* Image Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 z-10 animate-pulse bg-(--border)" />
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
            <span className="text-sm font-medium text-(--text-muted)">
              Image unavailable
            </span>
          </div>
        )}
      </div>

      {/* Book Details */}
<div className="space-y-2 p-4">
  {/* Category & Rating */}
  <div className="flex items-center justify-between gap-2">
    <span className="rounded-md bg-(--secondary)/10 px-2.5 py-1 text-xs font-semibold text-(--secondary)">
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

  {/* Book Name */}
  <h3 className="line-clamp-1 text-lg font-bold text-(--text-primary) transition-colors group-hover:text-(--secondary)">
    {book.name}
  </h3>

  {/* Author */}
  <p className="text-sm font-semibold text-(--text-secondary)">
    by {book.author}
  </p>

  {/* Bottom */}
  <div className="flex items-center justify-between border-t border-(--border) pt-3">
    <span className="text-xs font-semibold text-(--text-muted)">
      Available: {book.copy}
    </span>

    <Link
      href={`/book-details/${book._id}`}
      className="inline-flex items-center gap-1.5 rounded-md bg-(--primary-hover) px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--primary)"
    >
      Details
      <ArrowUpRight size={15} />
    </Link>
  </div>
</div>
    </article>
  );
}