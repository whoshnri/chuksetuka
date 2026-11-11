import type { Metadata } from "next"
import { MasterclassPage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "The Inclusive Practice Masterclass",
  description: "A practical, lived experience-led workshop to help teams build more inclusive cultures.",
}

export default function Page() {
  return <MasterclassPage />
}
