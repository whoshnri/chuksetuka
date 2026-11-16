import type { Metadata } from "next";
import { PrivacyPolicyPage } from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Chuks Etuka Consulting handles information collected through this website.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
