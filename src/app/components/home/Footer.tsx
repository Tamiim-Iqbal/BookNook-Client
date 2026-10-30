
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[var(--tertiary-bg)] mt-25">
      <div className="mx-auto w-[90%] max-w-[1440px] pt-16 sm:pt-20">
        <div className="grid gap-12 border-b border-[var(--primary)]/15 pb-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-16 lg:pb-16">

          {/* Brand */}
          <div className="max-w-[380px]">
            <div className="inline-flex items-center gap-2.5">
              <BookOpen
            size={35}
            strokeWidth={2.2}
            className="text-white bg-[var(--primary-hover)] p-2 rounded-md"
          />

              <span className="text-2xl font-bold tracking-tight text-[var(--primary)]">
                Book
                <span className="text-[var(--secondary)]">
                  Nook
                </span>
              </span>
            </div>

            <p className="mt-5 text-[14px] leading-[1.9] text-[var(--text-secondary)]">
              A small neighbourhood library on the web.
              Share the books on your shelf and borrow the
              ones you have been meaning to read.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--primary)]">
              Contact
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]">
                <Mail
                  size={17}
                  className="shrink-0 text-[var(--secondary)]"
                />
                <span>hello@booknook.com</span>
              </div>

              <div className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]">
                <Phone
                  size={17}
                  className="shrink-0 text-[var(--secondary)]"
                />
                <span>+880 1700 000 000</span>
              </div>

              <div className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)]">
                <MapPin
                  size={17}
                  className="shrink-0 text-[var(--secondary)]"
                />
                <span>12 Reading Lane, Dhaka</span>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[var(--primary)]">
              Follow us
            </h3>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-[var(--primary)]/15 text-[var(--primary)] transition-colors duration-200 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white cursor-pointer">
                <FaXTwitter size={16} />
              </div>

              <div className="flex size-10 items-center justify-center rounded-full border border-[var(--primary)]/15 text-[var(--primary)] transition-colors duration-200 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white cursor-pointer">
                <FaFacebookF size={16} />
              </div>

              <div className="flex size-10 items-center justify-center rounded-full border border-[var(--primary)]/15 text-[var(--primary)] transition-colors duration-200 hover:border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white cursor-pointer">
                <FaInstagram size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center py-6 text-center">
          <p className="text-[13px] text-[var(--text-muted)]">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
