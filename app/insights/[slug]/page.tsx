import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InsightArticlePage } from "@/components/insights-pages"
import { getArticle, getArticles } from "@/lib/server/content"
import { SiteShell } from "@/components/site-shell"
import { ContentError } from "@/components/content-error"
export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { article } = await getArticle(slug)
  if (!article) return { title: "Insight not found" }
  return { title: article.title, description: article.excerpt }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [{ article, error }, allArticles] = await Promise.all([getArticle(slug), getArticles()])

  if (error) {
    return (
      <SiteShell activePage="insights">
        <ContentError
          title="Article unavailable"
          message="We couldn't load this article right now. Please try again in a moment."
          returnHref="/insights"
          returnLabel="Back to insights"
        />
      </SiteShell>
    )
  }

  if (!article) notFound()
  return <InsightArticlePage article={article} relatedArticles={allArticles || []} />
}
