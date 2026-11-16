import type { Metadata } from "next"
import { InsightsPage } from "@/components/insights-pages"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Insights — Articles on DEI, Inclusion & Leadership",
  description: "Articles, talks and resources on diversity, inclusion, leadership and workplace culture from Chuks Etuka Consulting.",
  alternates: { canonical: "/insights" },
}

export default async function Page() {
  return <InsightsPage />
}
