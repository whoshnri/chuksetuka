import type { Metadata } from "next"
import { ContactPage } from "@/components/contact-pages"

export const metadata: Metadata = {
  title: "Contact Chuks Etuka Consulting",
  description: "Get in touch with Chuks Etuka Consulting to discuss inclusion training, DEI&B strategy, accessibility audits and leadership support.",
  alternates: { canonical: "/contact" },
}

export default function Page() {
  return <ContactPage />
}
