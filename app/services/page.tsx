import type { Metadata } from "next"
import { ServicesPage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "DEI&B Training, Strategy & Accessibility Services",
  description: "DEI&B training, strategy, accessibility audits and inclusive leadership support for UK organisations. Tailored to your context.",
  alternates: { canonical: "/services" },
}

export default function Page() {
  return <ServicesPage />
}
