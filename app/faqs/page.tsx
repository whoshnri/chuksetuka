import type { Metadata } from "next"
import { FAQPage } from "@/components/resources-pages"
import { faqGroups } from "@/components/faq-data"

export const metadata: Metadata = {
  title: "Frequently Asked Questions — DEI&B Consultancy",
  description: "Answers about DEI&B consultancy, diversity training, accessibility audits, inclusive leadership and working with Chuks Etuka Consulting.",
  alternates: { canonical: "/faqs" },
}

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FAQPage />
    </>
  )
}
