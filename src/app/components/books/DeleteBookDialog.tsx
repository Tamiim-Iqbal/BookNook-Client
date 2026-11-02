
"use client";

import { useState } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Book } from "./EditBookDialog";

type DeleteBookDialogProps = {
  book: Book;
  onClose: () => void;
  onDeleted: (bookId: string) => void;
};

const DeleteBookDialog = ({
  book,
  onClose,
  onDeleted,
}: DeleteBookDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/books/${book._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete book.");
      }

      onDeleted(book._id);
      toast.success("Book deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Error deleting book:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-book-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-(--border) bg-(--primary-bg) p-6 shadow-2xl sm:p-7"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          aria-label="Close dialog"
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-(--text-secondary) transition hover:bg-(--main-bg)"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-400">
          <AlertTriangle size={23} />
        </div>

        {/* Content */}
        <h2
          id="delete-book-title"
          className="mt-5 text-center text-xl font-semibold text-(--text-primary)"
        >
          Delete <span className="font-bold text-(--secondary)">{book.name}</span> ?
        </h2>

        <p className="mt-2 text-center text-sm font-medium leading-6 text-(--text-secondary)">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col-reverse justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="cursor-pointer rounded-xl border border-(--border) px-5 py-2.5 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--main-bg) disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 size={16} />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeleteBookDialog;
