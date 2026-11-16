import type { Metadata } from "next"
import { BookCallPage } from "@/components/contact-pages"

export const metadata: Metadata = {
  title: "Book a Free Discovery Call",
  description: "Book a free 30-minute inclusion discovery call with Chuks Etuka Consulting. Explore your DEI&B priorities and find the right next step.",
  alternates: { canonical: "/book-a-call" },
}

export default function Page() {
  return <BookCallPage />
}
