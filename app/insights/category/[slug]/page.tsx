import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InsightCategoryPage } from "@/components/insights-pages"
import { insightCategories } from "@/components/insights-data"
import { getArticles, getCategories } from "@/lib/server/content"
export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return insightCategories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((item) => item.slug === slug)
  if (!category) return { title: "Topic not found" }
  return { title: `${category.label} insights`, description: `Articles and resources on ${category.label.toLowerCase()} from Chuks Etuka.` }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [categories, articles] = await Promise.all([getCategories(), getArticles()])
  const category = categories.find((item) => item.slug === slug)
  if (!category) notFound()
  return <InsightCategoryPage category={category} articles={articles} categories={categories} />
}
