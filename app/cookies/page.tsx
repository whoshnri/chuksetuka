import type { Metadata } from "next";
import { CookiePolicyPage } from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie and browser storage choices for the Chuks Etuka Consulting website.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return <CookiePolicyPage />;
}
