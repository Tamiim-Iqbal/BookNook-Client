
import type { Metadata } from "next";
import MyBorrows from "./MyBorrows";

export const metadata: Metadata = {
  title: "My Borrows | BookNook",
  description:
    "View your borrowed books, track borrowing and return dates, and manage your reading collection.",
};

export default function Page() {
  return <MyBorrows />;
}
