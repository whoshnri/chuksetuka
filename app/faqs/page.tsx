import type { Metadata } from "next"
import { FAQPage } from "@/components/resources-pages"

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about DEI&B consultancy, inclusion training, accessibility audits and working with Chuks Etuka Consulting.",
}

export default function Page() {
  return <FAQPage />
}
