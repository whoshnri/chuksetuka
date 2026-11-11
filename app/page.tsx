import type { Metadata } from "next"
import { HomePage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "Decode DEI. Build trust. Boost impact.",
  description: "Lived experience-led DEI&B training, strategy and leadership support from Chuks Etuka Consulting.",
}

export default function Page() {
  return <HomePage />
}
