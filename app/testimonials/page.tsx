import type { Metadata } from "next"
import { TestimonialsPage } from "@/components/resources-pages"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Feedback from training partners, practitioners and senior teams working with Chuks Etuka Consulting.",
}

export default function Page() {
  return <TestimonialsPage />
}
