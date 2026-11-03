"use client";

import { useAuth } from "../context/AuthContext";
import { signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  Mail,
  ShieldCheck,
  LogOut,
  UserRound,
} from "lucide-react";
import Image from "next/image";



const Page = () => {
  const { user, isPending } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error("Failed to sign out. Please try again.");
        return;
      }

      toast.success("Signed out successfully!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--main-bg)">
        <div className="size-9 animate-spin rounded-full border-4 border-(--border) border-t-(--secondary)" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-(--main-bg) px-4">
        <div className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-8 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-(--secondary)/10 text-(--secondary)">
            <UserRound size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-(--primary)">
            Sign in to continue
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary)">
            Please sign in to access your profile information.
          </p>

          <button
            onClick={() => router.push("/sign-in")}
            className="mt-6 rounded-xl bg-(--secondary) px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <main className="min-h-screen bg-(--main-bg) px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-(--secondary)">
            <BookOpen size={17} />
            <span>BookNook Account</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-(--primary) sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-(--text-secondary) sm:text-base">
            Manage and view your personal account information.
          </p>
        </div>

        {/* Profile Hero */}
        <section className="rounded-3xl border border-(--border) bg-(--secondary)/10 shadow-sm">
          <div className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:p-9 sm:text-left">
            {/* Profile Image */}
            <div className="size-24 shrink-0 overflow-hidden rounded-full border-4 border-(--border) bg-(--secondary) sm:size-28">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-4xl font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-sm font-medium text-(--secondary)">
                Welcome to your library
              </p>

              <h2 className="mt-1 break-words text-2xl font-bold text-(--primary) sm:text-3xl">
                {user.name || "BookNook User"}
              </h2>

              <p className="mt-2 flex items-center justify-center gap-2 break-all text-sm text-(--text-secondary) sm:justify-start">
                <Mail size={15} className="shrink-0" />
                {user.email}
              </p>
            </div>

            {/* Account Status */}
            <div className="rounded-full border border-(--secondary)/20 bg-(--secondary)/10 px-4 py-2 text-xs font-semibold text-(--secondary)">
              Active Member
            </div>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-7">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-(--primary)">
              Account Information
            </h3>

            <p className="mt-1 text-sm text-(--text-secondary)">
              Your registered account details.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Member Since */}
            <div className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface) p-5 transition hover:border-(--secondary)/40">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
                <CalendarDays size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-(--text-secondary)">
                  Member Since
                </p>

                <p className="mt-1 text-sm font-semibold text-(--primary)">
                  {joinedDate}
                </p>
              </div>
            </div>

            {/* Email Verification */}
            <div className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface) p-5 transition hover:border-(--secondary)/40">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-(--secondary)/10 text-(--secondary)">
                <ShieldCheck size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-(--text-secondary)">
                  Email Verification
                </p>

                <p className="mt-1 text-sm font-semibold text-(--primary)">
                  {user.emailVerified ? "Verified Email" : "Not Verified"}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user.emailVerified
                    ? "bg-green-500/10 text-green-600"
                    : "bg-amber-500/10 text-amber-600"
                }`}
              >
                {user.emailVerified ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        </section>

        {/* Sign Out */}
        <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-(--border) bg-(--surface) p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h3 className="font-semibold text-(--primary)">
              Sign out of your account
            </h3>

            <p className="mt-1 text-sm text-(--text-secondary)">
              You can sign in again whenever you want.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300/60 px-5 py-2.5 text-sm font-semibold text-red-400 transition hover:border-red-400 hover:bg-red-50/60 hover:text-red-500"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </section>
      </div>
    </main>
  );
};

export default Page;