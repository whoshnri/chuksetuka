import type { Metadata } from "next"
import { TestimonialsPage } from "@/components/resources-pages"

export const metadata: Metadata = {
  title: "Client Testimonials — What People Say",
  description: "Feedback from training partners, practitioners and senior teams who have worked with Chuks Etuka Consulting on DEI&B.",
  alternates: { canonical: "/testimonials" },
}

export default function Page() {
  return <TestimonialsPage />
}
