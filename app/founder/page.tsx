import type { Metadata } from "next"
import FounderPage from "@/components/founder-page"

export const metadata: Metadata = {
  title: "About Chuks Etuka",
  description: "Meet Chuks Etuka, a DEI&B leader, speaker and strategist bringing lived experience and practical inclusion expertise to organisations.",
}

export default function Page() {
  return <FounderPage />
}
