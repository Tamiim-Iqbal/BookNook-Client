"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Books",
    href: "/books",
  },
  {
    name: "Add Book",
    href: "/add-book",
  },
  {
    name: "My Books",
    href: "/my-books",
  },
  {
    name: "My Borrows",
    href: "/my-borrows",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${isScrolled
          ? "border-[var(--border)] bg-[var(--main-bg)]"
          : "border-transparent bg-[var(--main-bg)]"
        }`}
    >
      <nav className="relative mx-auto flex h-18 w-[90%] max-w-[1440px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BookOpen
            size={35}
            strokeWidth={2.2}
            className="text-white bg-[var(--primary-hover)] p-2 rounded-md"
          />

          <div className="text-2xl font-bold tracking-tight text-[var(--primary-hover)]">
            <span>Book</span>
            <span className="text-[var(--secondary)]">Nook</span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-[14px] font-medium text-[var(--primary)] transition-colors duration-200 hover:text-[var(--secondary)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Sign In */}
          <Link
            href="/sign-in"
            className="inline-flex h-[46px] items-center rounded-lg border border-transparent px-5 text-[14px] font-semibold tracking-wide text-[var(--primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--secondary-hover)]/50 hover:bg-[var(--primary-bg)] hover:text-[var(--secondary)]"
          >
            Sign In
          </Link>

          {/* Join the Library */}
          <Link
            href="/sign-up"
            className="inline-flex h-[46px] items-center gap-3 rounded-lg border border-[var(--secondary)] bg-[var(--secondary)] px-4 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--secondary-hover)] hover:bg-[var(--secondary-hover)]"
          >
            Join the Library
          </Link>
        </div>
      </nav>
    </header>
  );
}
