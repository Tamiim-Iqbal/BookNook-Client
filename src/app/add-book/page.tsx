import type { Metadata } from "next";
import AddBook from "./AddBook";

export const metadata: Metadata = {
  title: "Add Book | BookNook",
  description:
    "Add a new book to the BookNook library and share it with the reading community.",
};

export default function Page() {
  return <AddBook />;
}