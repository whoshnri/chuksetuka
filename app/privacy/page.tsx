import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Privacy policy | Chuks Etuka Consulting",
  description: "How Chuks Etuka Consulting handles information collected through this website.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
