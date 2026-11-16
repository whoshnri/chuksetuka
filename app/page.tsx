import type { Metadata } from "next"
import { HomePage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "Decode DEI. Build trust. Boost impact.",
  description: "Lived experience-led DEI&B training, strategy and leadership support from Chuks Etuka Consulting. Practical inclusion for UK organisations.",
  alternates: { canonical: "/" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Chuks Etuka Consulting",
  description: "DEI&B strategy, training, accessibility audits and inclusive leadership support for UK organisations.",
  url: "https://www.chuksetukaconsulting.com",
  founder: {
    "@type": "Person",
    name: "Chuks Etuka",
    jobTitle: "DEI&B Leader, Speaker & Strategist",
    url: "https://www.chuksetukaconsulting.com/founder",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["DEI&B Consultancy", "Inclusion Training", "Accessibility Audits", "Inclusive Leadership Coaching", "Anti-Racism Workshops"],
  knowsAbout: ["Diversity Equity Inclusion", "Workplace Accessibility", "Psychological Safety", "Inclusive Leadership", "Anti-Racism"],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePage />
    </>
  )
}
