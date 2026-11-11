import type { Metadata } from "next"
import { InsightsPage } from "@/components/insights-pages"
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles, talks and resources on inclusion, leadership and culture from Chuks Etuka.",
}

export default async function Page() {
  return <InsightsPage />
}
