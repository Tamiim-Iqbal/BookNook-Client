"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const AddBook = () => {
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "Biography",
    "History",
    "Fantasy",
    "Others",
  ];

  return (
    <main className="bg-(--main-bg)">
      {/* Hero Section */}
      <section className="relative isolate mx-auto mt-5 w-[calc(100%-24px)] overflow-hidden rounded-[24px] bg-(--primary-bg) px-5 py-10 sm:mt-10 sm:w-[90%] sm:rounded-[28px] sm:px-10 sm:py-12 lg:py-14">
        <div className="relative mx-auto max-w-[1320px] text-center">
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-(--secondary)">
            <span className="h-px w-[38px] bg-(--secondary)" />
            Share Your Stories
            <span className="h-px w-[38px] bg-(--secondary)" />
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold tracking-[-0.045em] text-[#102D24] sm:text-5xl">
            Add a New{" "}
            <span className="text-(--secondary)">Book.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[550px] text-sm font-medium leading-[1.8] text-(--text-secondary) sm:text-[15px]">
            Share your favourite books with our community and help other
            readers discover their next great story.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto mt-8 w-[calc(100%-24px)] md:mt-10 sm:w-[55%]">
        <div className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm sm:p-7 lg:p-8">
          {/* Form Heading */}
          <div className="mb-5 border-b border-(--border) pb-5">
            <h2 className="font-serif text-2xl font-bold text-(--text-primary) sm:text-3xl">
              Book Information
            </h2>
            <p className="mt-1.5 text-sm leading-6 text-(--text-muted)">
              Provide the details of your book to add it to the BookNook
              library.
            </p>
          </div>

          <form className="space-y-4">
            {/* Book Title & Author */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                  Book Title
                </label>
                <input
                  type="text"
                  placeholder="Enter book title"
                  className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="Enter author's name"
                  className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />
              </div>
            </div>

            {/* Category & Copies */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Custom Category Dropdown */}
              <div className="relative">
                <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                  Category
                </label>

                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`flex w-full items-center justify-between rounded-lg border bg-(--main-bg) py-2 pl-4 pr-4 text-left text-sm outline-none transition ${
                    isCategoryOpen
                      ? "border-(--primary) ring-2 ring-(--primary)/10"
                      : "border-(--border)"
                  }`}
                >
                  <span
                    className={
                      category
                        ? "text-(--text-secondary)"
                        : "text-(--text-muted)"
                    }
                  >
                    {category || "Select a category"}
                  </span>

                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-(--text-secondary) transition-transform duration-200 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <>
                    {/* Close dropdown on outside click */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsCategoryOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-(--border) bg-white p-2 shadow-lg">
                      {categories.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setCategory(item);
                            setIsCategoryOpen(false);
                          }}
                          className={`flex w-full items-center justify-between cursor-pointer rounded-md px-5 py-1.5 text-left text-sm transition ${
                            category === item
                              ? "bg-(--primary-bg) font-semibold text-(--primary)"
                              : "bg-white text-(--primary) hover:bg-(--primary-bg) hover:text-(--primary)"
                          }`}
                        >
                          {item}

                          {category === item && (
                            <Check
                              size={16}
                              className="text-(--primary)"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Number of Copies */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                  Number of Copies
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter available copies"
                  className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                Book Cover Image URL
              </label>
              <input
                type="url"
                placeholder="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
                className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
              />

              <p className="-mt-2 ml-2 mt-2 text-sm font-medium text-(--secondary)">
                Please visit this site to find the cover image URL for your
                book:{" "}
                <a
                  href="https://openlibrary.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--primary) underline transition-colors hover:text-(--primary-hover)"
                >
                  Open Library
                </a>
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                Book Description
              </label>
              <textarea
                rows={2}
                placeholder="Write a short description about the book..."
                className="w-full resize-y rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm leading-6 text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
              />
            </div>

            {/* User Information */}
            <div className="border-t border-(--border) pt-3">
              <div className="mb-2">
                <h3 className="font-serif text-xl font-bold text-(--text-primary) sm:text-2xl">
                  Your Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-(--text-primary)">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-(--border) bg-(--main-bg) px-4 py-2 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center border-t border-(--border) pt-6">
              <button
                type="button"
                className="w-full cursor-pointer rounded-lg border border-(--secondary) bg-(--secondary) px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--secondary-hover) hover:bg-(--secondary-hover) sm:w-auto"
              >
                Add Book to Library
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddBook;