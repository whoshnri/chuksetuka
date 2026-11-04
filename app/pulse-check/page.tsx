import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { PulseCheck } from "@/components/pulse-check"

export const metadata: Metadata = {
  title: "Inclusion Pulse Check",
  description: "Take a five-minute inclusion pulse check and find practical next steps for your organisation.",
}

export default function Page() {
  return <SiteShell activePage="pulse" className="pulse-page"><PulseCheck /></SiteShell>
}
