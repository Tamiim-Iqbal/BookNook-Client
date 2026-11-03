"use client";

import React, { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Check,
  ExternalLink,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Technology",
  "Mystery",
  "Thriller",
  "Biography",
  "History",
  "Fantasy",
  "Science",
  "Others",
];

export type Book = {
  _id: string;
  name: string;
  author: string;
  category: string;
  copy: number;
  img: string;
  description: string;
  rating: number;
};

type EditBookDialogProps = {
  book: Book;
  onClose: () => void;
  onUpdated: (updatedBook: Book) => void;
};

const EditBookDialog = ({
  book,
  onClose,
  onUpdated,
}: EditBookDialogProps) => {
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState(book.category);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateBook = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const bookData = Object.fromEntries(formData.entries()) as {
      bookTitle: string;
      authorName: string;
      copy: string;
      coverImage: string;
      description: string;
      rating: string;
    };

    setIsSubmitting(true);

    try {
      const updatedBookData = {
        name: bookData.bookTitle.trim(),
        author: bookData.authorName.trim(),
        category: selectedCategory,
        copy: Number(bookData.copy),
        img: bookData.coverImage.trim(),
        description: bookData.description.trim(),
        rating: Number(bookData.rating),
      };

      // JWT token retrieval from cookies
      const { data, error } = await authClient.token();
      const token = data?.token;
      // console.log("JWT Token:", token); 

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
          },
          body: JSON.stringify(updatedBookData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update book.");
      }

      onUpdated({
        ...book,
        ...updatedBookData,
      });

      toast.success("Book updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating book:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-(--text-primary)";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-book-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-(--border) bg-(--primary-bg) shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-(--border) bg-(--primary-bg) px-5 py-4 sm:px-8">
          <div>
            <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-(--secondary)">
              MANAGE YOUR COLLECTION
            </p>

            <h2
              id="edit-book-title"
              className="text-xl font-bold text-(--text-primary) sm:text-2xl"
            >
              Edit Book
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit dialog"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-(--border) text-(--text-secondary) transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Section */}
        <div className="px-5 py-6 sm:px-8 sm:py-7">
          <p className="mb-5 text-sm text-(--text-secondary)">
            Update the book information in your collection.
          </p>

          <form
            key={book._id}
            onSubmit={handleUpdateBook}
            className="space-y-3"
          >
            {/* Book Title & Author */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-bookTitle" className={labelClass}>
                  Book Title
                </label>

                <input
                  id="edit-bookTitle"
                  name="bookTitle"
                  required
                  type="text"
                  defaultValue={book.name}
                  placeholder="Enter book title"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="edit-authorName" className={labelClass}>
                  Author Name
                </label>

                <input
                  id="edit-authorName"
                  name="authorName"
                  required
                  type="text"
                  defaultValue={book.author}
                  placeholder="Enter author name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category, Copies & Rating */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {/* Category */}
              <div className="relative">
                <label className={labelClass}>Category</label>

                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-left text-sm outline-none transition focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                >
                  <span
                    className={
                      selectedCategory
                        ? "text-(--text-primary)"
                        : "text-(--text-muted)"
                    }
                  >
                    {selectedCategory || "Select category"}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-(--text-secondary) transition-transform ${isCategoryOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute left-0 top-full z-30 mt-2 h-60 w-full overflow-y-auto rounded-xl border border-(--border) bg-white p-1.5 shadow-lg">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${selectedCategory === category
                            ? "bg-(--secondary)/10 font-medium text-(--secondary)"
                            : "text-(--text-primary) hover:bg-(--secondary)/10 hover:text-(--secondary)"
                          }`}
                      >
                        {category}

                        {selectedCategory === category && (
                          <Check
                            size={16}
                            className="shrink-0 text-(--secondary)"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Copies */}
              <div>
                <label htmlFor="edit-copy" className={labelClass}>
                  Copies
                </label>

                <input
                  id="edit-copy"
                  name="copy"
                  required
                  type="number"
                  min="1"
                  defaultValue={book.copy}
                  placeholder="Copies available"
                  className={inputClass}
                />
              </div>

              {/* Rating */}
              <div>
                <label htmlFor="edit-rating" className={labelClass}>
                  Rating
                </label>

                <input
                  id="edit-rating"
                  name="rating"
                  required
                  type="number"
                  min="0"
                  max="5"
                  step="0.01"
                  defaultValue={book.rating}
                  placeholder="0 - 5"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label htmlFor="edit-coverImage" className={labelClass}>
                Book Cover Image URL
              </label>

              <input
                id="edit-coverImage"
                name="coverImage"
                type="url"
                required
                defaultValue={book.img}
                placeholder="https://covers.openlibrary.org/..."
                className={inputClass}
              />

              <a
                href="https://openlibrary.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 ml-2 inline-flex items-center gap-1 text-sm font-medium text-(--secondary) transition hover:underline"
              >
                Find book cover on Open Library
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="edit-description" className={labelClass}>
                Book Description
              </label>

              <textarea
                id="edit-description"
                name="description"
                rows={3}
                required
                defaultValue={book.description}
                placeholder="Write a short description about the book..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Username & Email */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label htmlFor="edit-username" className={labelClass}>
                  Username
                </label>

                <input
                  id="edit-username"
                  type="text"
                  disabled
                  value={user?.name ?? ""}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="edit-email" className={labelClass}>
                  Email Address
                </label>

                <input
                  id="edit-email"
                  type="email"
                  disabled
                  value={user?.email ?? ""}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="cursor-pointer rounded-xl border border-(--border) px-5 py-3 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--main-bg) disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--secondary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--secondary-hover) disabled:cursor-not-allowed disabled:opacity-60"
              >
                <BookOpen size={17} />
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditBookDialog;
