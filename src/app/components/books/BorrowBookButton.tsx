"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

type BorrowBookButtonProps = {
  bookId: string;
  bookName: string;
  isAvailable: boolean;
};

const BorrowBookButton = ({
  bookId,
  bookName,
  isAvailable,
}: BorrowBookButtonProps) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [error, setError] = useState("");

  const user = session?.user;

  const handleBorrow = async () => {
    if (!user?.name || !user?.email) return;

    try {
      setIsBorrowing(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/borrow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId,
            borrower: {
              name: user.name,
              email: user.email,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to borrow book");
      }

      setIsModalOpen(false);

      toast.success("Book borrowed! Return it within 7 days!");

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      setError(message);
      toast.error(message);
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <>
      {/* Borrow Button */}
      <button
        disabled={!isAvailable || isPending || !user}
        onClick={() => setIsModalOpen(true)}
        className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${
          isAvailable && !isPending && user
            ? "cursor-pointer bg-(--primary) text-white hover:bg-(--primary-hover) active:scale-[0.98]"
            : "cursor-not-allowed bg-(--secondary-bg) text-(--text-muted)"
        }`}
      >
        <BookOpen size={18} />

        {isPending
          ? "Loading..."
          : !user
            ? "Login to Borrow"
            : isAvailable
              ? "Borrow This Book"
              : "Not Available"}
      </button>

      {/* Borrow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-(--border) bg-(--primary-bg) p-6 shadow-2xl sm:p-8">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isBorrowing}
              className="absolute right-4 top-4 rounded-full p-2 text-(--text-secondary) transition-colors hover:bg-(--secondary)/20 hover:text-(--secondary) cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Heading */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-(--primary)/10 text-(--primary)">
                <BookOpen size={26} />
              </div>

              <h2 className="text-xl font-bold text-(--text-primary)">
                Borrow{" "}
                <span className="text-(--secondary)">
                  {bookName}
                </span>
              </h2>

              <p className="mt-2 text-sm font-medium text-(--text-secondary)">
                You can keep this book for 7 days.
              </p>
            </div>

            {/* User Information */}
            <div className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Your Name
                </label>

                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full rounded-xl border border-(--border) bg-(--secondary-bg) px-4 py-3 text-sm text-(--text-secondary) outline-none font-medium"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                  Your Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full rounded-xl border border-(--border) bg-(--secondary-bg) px-4 py-3 text-sm text-(--text-secondary) outline-none font-medium"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="mt-4 text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            {/* Confirm Button */}
            <div className="mt-7 flex justify-center">
              <button
                onClick={handleBorrow}
                disabled={isBorrowing || !user}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary) px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-(--primary-hover) disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isBorrowing ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowBookButton;
