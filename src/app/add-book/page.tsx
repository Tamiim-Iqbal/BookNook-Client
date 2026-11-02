"use client";

import React, { useState } from "react";
import {
  BookOpen,
  LibraryBig,
  Sparkles,
  ChevronDown,
  Check,
  ExternalLink,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

const AddBook = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const bookData = Object.fromEntries(formData.entries()) as {
      bookTitle: string;
      authorName: string;
      copy: string;
      coverImage: string;
      description: string;
      rating: string;
    };

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    if (!user) {
      toast.error("Please login to add a book.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newBook = {
        category: selectedCategory,
        name: bookData.bookTitle,
        author: bookData.authorName,
        copy: Number(bookData.copy),
        img: bookData.coverImage,
        description: bookData.description,
        rating: Number(bookData.rating),
        addedBy: {
          name: user.name,
          email: user.email,
        },
      };

      const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      console.log("Backend URL:", API_URL);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );

      const result = await response.json();

      if (response.ok && result.insertedId) {
        toast.success("Book added successfully!");

        form.reset();
        setSelectedCategory("");

        setTimeout(() => {
          router.push("/books");
        }, 1200);
      } else {
        toast.error(result.message || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-(--main-bg) pt-6 sm:pt-8">
      <div className="mx-auto grid w-[calc(100%-24px)] overflow-hidden rounded-3xl border border-(--border) bg-(--primary-bg) shadow-sm sm:w-[90%] lg:grid-cols-[40fr_60fr]">

        {/* Left Section */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-(--secondary) p-8 text-white lg:flex xl:p-7">

          {/* Decorative Circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full border border-white/10" />

          {/* Top Content */}
          <div className="relative z-10 ml-2">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-widest text-white/90">
              <Sparkles size={14} />
              JOIN OUR READING ROOM
            </div>

            <h2 className="text-3xl font-bold leading-tight xl:text-4xl">
              SHARE YOUR
              <br />
              LOVE FOR
              <br />
              <span className="text-white/70">BOOKS.</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Every book has a story to tell. Add your favorite books to our
              library and help others discover their next great read.
            </p>
          </div>

          {/* Book Illustration */}
          <div className="relative z-10 flex items-center justify-center py-4">
            <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-white/15 bg-white/5 xl:h-60 xl:w-60">
              <div className="absolute h-40 w-40 rounded-full border border-white/15 xl:h-48 xl:w-48" />

              <div className="relative flex h-32 w-2 -rotate-6 items-center justify-center rounded-lg border border-white/30 bg-white/15 shadow-2xl xl:h-36 xl:w-32">
                <div className="absolute left-2 top-0 h-full w-px bg-white/20" />
                <BookOpen size={50} strokeWidth={1.2} />
              </div>

              <div className="absolute -right-2 top-8 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                <LibraryBig size={20} />
              </div>

              <div className="absolute -bottom-1 left-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <Sparkles size={16} />
              </div>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 border-t border-white/20 pt-5">
            <p className="text-sm italic leading-6 text-white/80">
              A book is a dream that you hold in your hands.
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wide text-white/60">
              — NEIL GAIMAN
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex flex-col justify-center bg-(--primary-bg) px-5 py-7 sm:px-8 sm:py-8 lg:px-9 xl:px-12">

          {/* Heading */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-(--secondary)">
              EXPAND THE COLLECTION
            </p>

            <h1 className="text-2xl font-bold text-(--text-primary) sm:text-3xl">
              Add New Book
            </h1>

            <p className="mt-2 text-sm text-(--text-secondary)">
              Share a book with the reading community.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAddBook} className="space-y-3">

            {/* Book Title & Author */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bookTitle"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Book Title
                </label>

                <input
                  id="bookTitle"
                  name="bookTitle"
                  required
                  type="text"
                  placeholder="Enter book title"
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                />
              </div>

              <div>
                <label
                  htmlFor="authorName"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Author Name
                </label>

                <input
                  id="authorName"
                  name="authorName"
                  required
                  type="text"
                  placeholder="Enter author name"
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                />
              </div>
            </div>

            {/* Category, Copies & Rating */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">

              {/* Category Dropdown */}
              <div className="relative">
                <label className="mb-1.5 block text-sm font-medium text-(--text-primary)">
                  Category
                </label>

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
                <label
                  htmlFor="copy"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Copies
                </label>

                <input
                  id="copy"
                  name="copy"
                  required
                  type="number"
                  min="1"
                  placeholder="Copies available"
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                />
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor="rating"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Rating
                </label>

                <input
                  id="rating"
                  name="rating"
                  type="number"
                  required
                  min="0"
                  max="5"
                  step="0.01"
                  defaultValue="0"
                  placeholder="0 - 5"
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
                />
              </div>
            </div>

            {/* Book Cover URL */}
            <div>
              <label
                htmlFor="coverImage"
                className="mb-1.5 block text-sm font-medium text-(--text-primary)"
              >
                Book Cover Image URL
              </label>

              <input
                id="coverImage"
                type="url"
                name="coverImage"
                required
                placeholder="https://covers.openlibrary.org/..."
                className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
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
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-(--text-primary)"
              >
                Book Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={2}
                required
                placeholder="Write a short description about the book..."
                className="w-full resize-none rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10"
              />
            </div>

            {/* Username & Email */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  disabled
                  value={user?.name ?? ""}
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-(--text-primary)"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  disabled
                  value={user?.email ?? ""}
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) px-3.5 py-2.5 text-sm text-(--text-primary) outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--secondary) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--secondary-hover) active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              <BookOpen size={18} />
              {isSubmitting ? "Adding Book..." : "Add Book to Library"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AddBook;
