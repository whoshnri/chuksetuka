import type { Metadata } from "next"
import { GalleryPage } from "@/components/resources-pages"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from recent workshops and events with organisations across the UK.",
}

export default function Page() {
  return <GalleryPage />
}
