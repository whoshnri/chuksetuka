import type { Metadata } from "next";
import { CookiePolicyPage } from "@/components/legal-pages";

export const metadata: Metadata = {
  title: "Cookie policy | Chuks Etuka Consulting",
  description: "Cookie and browser storage choices for the Chuks Etuka Consulting website.",
};

export default function Page() {
  return <CookiePolicyPage />;
}
