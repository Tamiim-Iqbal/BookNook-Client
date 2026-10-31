"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        isScrolled
          ? "border-[var(--border)] bg-[var(--main-bg)]"
          : "border-transparent bg-[var(--main-bg)]"
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
            className="rounded-md bg-[var(--primary-hover)] p-1 text-white md:size-[35px] md:p-2"
          />

          <div className="text-lg font-bold tracking-tight text-[var(--primary)] md:text-2xl">
            <span>Book</span>
            <span className="text-[var(--secondary)]">Nook</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
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
        <div className="flex shrink-0 items-center gap-0 md:gap-3">
          {/* Sign In */}
          <Link
            href="/sign-in"
            className="inline-flex py-1 md:py-2.5 items-center rounded-lg border border-transparent px-3 text-[14px] font-semibold tracking-wide text-[var(--primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--secondary-hover)]/90 hover:bg-[var(--main-bg)] hover:text-[var(--secondary)] sm:px-5"
          >
            Sign In
          </Link>

          {/* Join the Library */}
          <Link
            href="/sign-up"
            className="inline-flex py-1 md:py-2.5 items-center gap-3 rounded-lg border border-[var(--secondary)] bg-[var(--secondary)] px-3 text-[14px] font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--secondary-hover)] hover:bg-[var(--secondary-hover)] sm:px-3"
          >
            <span className="md:hidden">Join</span>
            <span className="hidden md:inline">Join the Library</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="ml-2 flex size-10 items-center justify-center rounded-lg text-[var(--primary)] transition-colors hover:bg-[var(--primary-bg)] lg:hidden"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--main-bg)] transition-all duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto grid w-[calc(100%-24px)] grid-cols-3 gap-2 py-4 sm:w-[90%]">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:bg-[var(--primary-bg)] hover:text-[var(--primary)]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}