import type { Metadata } from "next";
import SignIn from "./SignIn";

export const metadata: Metadata = {
  title: "Sign In | BookNook",
  description:
    "Sign in to your BookNook account to continue your reading journey, explore books, and manage your library.",
};

export default function Page() {
  return <SignIn />;
}