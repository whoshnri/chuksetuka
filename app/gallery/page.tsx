import type { Metadata } from "next"
import { GalleryPage } from "@/components/resources-pages"

export const metadata: Metadata = {
  title: "Training & Events Gallery",
  description: "Photos from recent DEI&B training workshops and events with organisations across the UK.",
  alternates: { canonical: "/gallery" },
}

export default function Page() {
  return <GalleryPage />
}
