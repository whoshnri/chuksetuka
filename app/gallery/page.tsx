import type { Metadata } from "next"
import { GalleryPage } from "@/components/resources-pages"
import { getGallery } from "@/lib/server/content"

export const metadata: Metadata = {
  title: "Training & Events Gallery",
  description: "Photos from recent DEI&B training workshops and events with organisations across the UK.",
  alternates: { canonical: "/gallery" },
}

export default async function Page() {
  const cmsGallery = await getGallery()
  return <GalleryPage cmsGallery={cmsGallery} />
}
