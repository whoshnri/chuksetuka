import type { Metadata } from "next"
import { ContactPage } from "@/components/contact-pages"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chuks Etuka Consulting to discuss inclusion training, strategy, accessibility and leadership support.",
}

export default function Page() {
  return <ContactPage />
}
