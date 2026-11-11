import type { Metadata } from "next"
import { BookCallPage } from "@/components/contact-pages"

export const metadata: Metadata = {
  title: "Book a Call",
  description: "Book a free 30-minute discovery call with Chuks Etuka Consulting.",
}

export default function Page() {
  return <BookCallPage />
}
