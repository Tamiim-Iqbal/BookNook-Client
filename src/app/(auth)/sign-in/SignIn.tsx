"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  LibraryBig,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  // Get the previous page URL
  const requestedCallback = searchParams.get("callbackUrl");

  // Allow only internal application paths
  const callbackURL =
    requestedCallback?.startsWith("/") &&
    !requestedCallback.startsWith("//") &&
    !requestedCallback.includes("\\")
      ? requestedCallback
      : "/";

  const handleGoogleSignUp = async () => {
    try {
        const { data, error } = await signIn.social({
            provider: "google",
            callbackURL,
        });

        if (error) {
            toast.error(error.message || "Google sign in failed!");
            return;
        }

        console.log("Google Sign In Response:", data);
    } catch (error) {
        console.error("Google sign in error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

  const handleEmailSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      setIsLoading(true);

      const formData = new FormData(e.currentTarget);

      const user = Object.fromEntries(formData.entries()) as {
        email: string;
        password: string;
      };

      const { data, error } = await signIn.email({
        ...user,
        callbackURL,
      });

      if (error) {
        toast.error("Invalid Email or Password");
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-(--main-bg) px-4 pt-2 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-(--border) bg-(--primary-bg) shadow-sm lg:grid-cols-[45%_55%]">

        {/* Left: Visual Panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-(--secondary) p-9 text-white lg:flex">

          {/* Decorative Background */}
          <div className="absolute -top-28 -right-28 size-80 rounded-full border border-white/10" />
          <div className="absolute -top-16 -right-16 size-56 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-28 size-96 rounded-full border border-white/10" />

          <div className="relative z-10">
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/70">
              WELCOME BACK
            </p>

            <h2 className="max-w-sm font-serif text-4xl leading-tight font-bold">
              Every great story begins with turning a page.
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/75">
              Sign in to continue your reading journey, discover new books,
              and keep your favorite stories close.
            </p>
          </div>

          {/* Book Illustration */}
          <div className="relative z-10 my-3 flex items-center justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center">
              <div className="absolute size-56 rounded-full border border-white/15" />
              <div className="absolute size-44 rounded-full border border-white/15" />

              <div className="relative flex items-end gap-2">
                <div className="h-28 w-14 -rotate-12 rounded-l-md rounded-r-sm border-l-4 border-white/30 bg-white/20 p-2 shadow-xl">
                  <div className="mt-5 h-1 w-full rounded bg-white/50" />
                  <div className="mt-2 h-1 w-3/4 rounded bg-white/30" />
                </div>

                <div className="z-10 flex h-36 w-18 flex-col items-center justify-center rounded-l-md rounded-r-lg border-l-4 border-white/40 bg-white p-2 text-(--secondary) shadow-2xl">
                  <BookOpen size={29} strokeWidth={1.5} />
                  <span className="mt-3 font-serif text-sm font-bold">
                    Read
                  </span>
                  <span className="text-[9px] tracking-widest">
                    DISCOVER
                  </span>
                </div>

                <div className="h-32 w-14 rotate-12 rounded-l-md rounded-r-sm border-l-4 border-white/30 bg-white/30 p-2 shadow-xl">
                  <div className="mt-6 h-1 w-full rounded bg-white/50" />
                  <div className="mt-2 h-1 w-3/4 rounded bg-white/30" />
                </div>
              </div>

              <div className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full bg-white/15">
                <Sparkles size={16} />
              </div>

              <div className="absolute bottom-7 left-4 flex size-9 items-center justify-center rounded-full bg-white/15">
                <LibraryBig size={18} />
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="relative z-10 border-t border-white/20 pt-5">
            <p className="font-serif text-lg leading-relaxed text-white/90 italic">
              A book is a dream that you hold in your hands.
            </p>

            <p className="mt-2 text-xs font-medium tracking-wide text-white/60">
              — Neil Gaiman
            </p>
          </div>
        </section>

        {/* Right: Sign In Form */}
        <section className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-8">

          {/* Logo */}
          <Link href="/" className="mb-5 inline-flex w-fit items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-(--secondary)">
              <BookOpen size={23} className="text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight text-(--primary)">
              Book<span className="text-(--secondary)">Nook</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="font-serif text-3xl font-bold text-(--text-primary) sm:text-4xl">
              Sign in to your account
            </h1>

            <p className="mt-2 text-sm text-(--text-muted)">
              Pick up where you left off. Your next story awaits.
            </p>
          </div>

          {/* Google Sign In */}
          <button onClick={handleGoogleSignUp}
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--main-bg) px-4 py-2.5 text-sm font-semibold text-(--text-primary) transition-colors hover:bg-(--main-bg)/70"
          >
            <Image
              src="/images/logo/google.png"
              alt="Google"
              width={18}
              height={18}
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mt-3 mb-3 flex items-center gap-4">
            <div className="h-px flex-1 bg-(--border)" />

            <span className="text-[11px] font-medium text-(--text-muted)">
              OR
            </span>

            <div className="h-px flex-1 bg-(--border)" />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-(--text-primary)"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-4 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-(--text-primary)"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-(--secondary) transition-colors hover:text-(--primary)"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-(--text-muted)"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-(--border) bg-(--main-bg) py-2.5 pr-12 pl-11 text-sm text-(--text-primary) outline-none transition-all placeholder:text-(--text-muted) focus:border-(--secondary) focus:ring-2 focus:ring-(--secondary)/10 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isLoading}
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-(--text-muted) transition-colors hover:text-(--text-primary) disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--secondary) px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-(--secondary-hover) active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-(--text-muted)">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-(--secondary) transition-colors hover:text-(--primary)"
            >
              Create Account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default SignIn;