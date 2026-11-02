"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";

const links = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isPending, isAuthenticated } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close profile dropdown on outside click and Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const { error } = await signOut();

      if (error) {
        toast.error("Failed to sign out. Please try again.");
        return;
      }

      toast.success("Signed out successfully!");
      setIsProfileOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${isScrolled
          ? "border-(--border) bg-(--main-bg)"
          : "border-transparent bg-(--main-bg)"
        }`}
    >
      <nav className="relative mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between px-4 sm:w-[90%] sm:px-0">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex shrink-0 items-center gap-2.5"
        >
          <BookOpen
            size={30}
            strokeWidth={2.2}
            className="rounded-md bg-(--primary-hover) p-1 text-white md:size-[35px] md:p-2"
          />

          <div className="text-lg font-bold tracking-tight text-(--primary) md:text-2xl">
            <span>Book</span>
            <span className="text-(--secondary)">Nook</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`whitespace-nowrap text-[14px] font-medium transition-colors duration-200 ${isActive
                    ? "text-(--secondary)"
                    : "text-(--primary) hover:text-(--secondary)"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-0 md:gap-3">
          {isPending ? (
            <div className="size-9 animate-pulse rounded-full bg-(--primary-bg)" />
          ) : isAuthenticated && user ? (
            /* Logged In User */
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-(--primary-bg)"
              >
                {/* Profile Image */}
                <div className="size-9 shrink-0 overflow-hidden rounded-full">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="User Avatar"
                      width={36}
                      height={36}
                      unoptimized
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center rounded-full border border-(--border) bg-(--primary-bg) text-sm font-bold text-(--primary)">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                <span className="hidden max-w-28 truncate text-sm font-semibold text-(--primary) sm:block">
                  {user.name}
                </span>

                <ChevronDown
                  size={15}
                  className={`text-(--text-secondary) transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-(--border) bg-(--surface) p-2 shadow-xl">
                  {/* User Details */}
                  <div className="border-b border-(--border) px-3 py-3">
                    <p className="truncate text-sm font-semibold text-(--primary)">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-(--text-secondary)">
                      {user.email}
                    </p>
                  </div>

                  {/* My Profile */}
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-(--primary) transition hover:bg-(--primary-bg)"
                  >
                    <span className="text-base">👤</span>
                    <span>My Profile</span>
                  </Link>

                  {/* Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <span className="text-base">↩</span>
                    <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Actions */
            <>
              <Link
                href="/sign-in"
                className="inline-flex items-center rounded-lg border border-transparent px-3 py-1 text-[14px] font-semibold tracking-wide text-(--primary) transition-all duration-300 hover:-translate-y-0.5 hover:border-(--secondary-hover)/90 hover:bg-(--main-bg) hover:text-(--secondary) md:py-2.5 sm:px-5"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center gap-3 rounded-lg border border-(--secondary) bg-(--secondary) px-3 py-1 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-(--secondary-hover) hover:bg-(--secondary-hover) md:py-2.5 sm:px-3"
              >
                <span className="md:hidden">Join</span>
                <span className="hidden md:inline">Join the Library</span>
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="ml-2 flex size-10 items-center justify-center rounded-lg text-(--primary) transition-colors hover:bg-(--primary-bg) lg:hidden"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-(--border) bg-(--main-bg) transition-all duration-300 ease-in-out lg:hidden ${isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 border-transparent opacity-0"
          }`}
      >
        <div className="mx-auto grid w-[calc(100%-24px)] grid-cols-3 gap-2 py-4 sm:w-[90%]">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-center rounded-lg border px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                    ? "border-(--secondary) bg-(--secondary)/10 text-(--secondary)"
                    : "border-(--border) bg-(--surface) text-(--text-secondary) hover:bg-(--primary-bg) hover:text-(--primary)"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
