
import type { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
  title: "My Profile | BookNook",
  description:
    "View and manage your BookNook account, personal information, and profile settings.",
};

export default function Page() {
  return <ProfilePage />;
}
