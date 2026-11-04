import type { Metadata } from "next"
import { ServicesPage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "Services",
  description: "DEI&B training, strategy, accessibility and inclusive leadership support for organisations.",
}

export default function Page() {
  return <ServicesPage />
}
