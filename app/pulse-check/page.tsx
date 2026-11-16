import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { PulseCheck } from "@/components/pulse-check"

export const metadata: Metadata = {
  title: "Free Inclusion Pulse Check — 10 Questions, Instant Result",
  description: "Take a five-minute inclusion pulse check. 10 questions, instant result with practical next steps for your organisation's DEI&B journey.",
  alternates: { canonical: "/pulse-check" },
}

export default function Page() {
  return <SiteShell activePage="pulse"><PulseCheck /></SiteShell>
}
