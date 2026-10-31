
import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookNook | Your Personal Library",
  description: "Discover thoughtful reads and timeless classics.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfairDisplay.variable} min-h-full antialiased`}
    >
      <body className="flex min-h-screen w-full min-w-0 flex-col font-sans">
        <Navbar />

        <main className="w-full min-w-0 flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
