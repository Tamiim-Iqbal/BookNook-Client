import type { Metadata } from "next";
import SignUp from "./SignUp";

export const metadata: Metadata = {
    title: "Sign Up | BookNook",
    description:
        "Join BookNook and discover, share, and explore your favorite books.",
};

export default function Page() {
    return <SignUp />;
}