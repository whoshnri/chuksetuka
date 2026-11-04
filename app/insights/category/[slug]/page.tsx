import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InsightCategoryPage } from "@/components/insights-pages"
import { insightCategories } from "@/components/insights-data"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return insightCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = insightCategories.find((item) => item.slug === slug)
  if (!category) return { title: "Topic not found" }
  return { title: `${category.label} insights`, description: `Articles and resources on ${category.label.toLowerCase()} from Chuks Etuka.` }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const category = insightCategories.find((item) => item.slug === slug)
  if (!category) notFound()
  return <InsightCategoryPage category={category} />
}
