import type { Metadata } from "next"
import { MasterclassPage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "Inclusive Practice Masterclass — DEI Workshop for Leaders",
  description: "A practical, lived experience-led DEI workshop for SME leaders, local authorities and teams who want to stop panicking and start building inclusive culture.",
  alternates: { canonical: "/masterclass" },
}

export default function Page() {
  return <MasterclassPage />
}
