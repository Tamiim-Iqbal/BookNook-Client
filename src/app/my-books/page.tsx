
import type { Metadata } from "next";
import MyBooks from "./MyBooks";

export const metadata: Metadata = {
  title: "My Books | BookNook",
  description:
    "Manage your personal book collection, edit book details, delete books, and track available copies.",
};

export default function Page() {
  return <MyBooks />;
}
