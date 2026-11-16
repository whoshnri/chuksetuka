import type { Metadata } from "next"
import FounderPage from "@/components/founder-page"

export const metadata: Metadata = {
  title: "About Chuks Etuka — DEI&B Leader, Speaker & Strategist",
  description: "Meet Chuks Etuka, a DEI&B leader, speaker and strategist with 20+ years experience bringing lived experience and practical inclusion expertise to UK organisations.",
  alternates: { canonical: "/founder" },
}

export default function Page() {
  return <FounderPage />
}
