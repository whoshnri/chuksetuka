import type { Metadata } from "next"
import { AboutPage } from "@/components/brand-pages"

export const metadata: Metadata = {
  title: "About me",
  description: "Learn how Chuks Etuka Consulting helps organisations build workplaces where people feel seen, heard and like they belong.",
}

export default function Page() {
  return <AboutPage />
}
