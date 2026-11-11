import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InsightArticlePage } from "@/components/insights-pages"
import { insightArticles } from "@/components/insights-data"
import { getArticle } from "@/lib/server/content"
export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: "Insight not found" }
  return { title: article.title, description: article.excerpt }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()
  return <InsightArticlePage article={article} />
}
