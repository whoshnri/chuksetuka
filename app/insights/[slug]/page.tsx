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
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article", images: article.image ? [{ url: article.image, alt: article.imageAlt || article.title }] : undefined },
  }
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: { "@type": "Person", name: "Chuks Etuka", url: "https://www.chuksetukaconsulting.com/founder" },
    publisher: { "@type": "Organization", name: "Chuks Etuka Consulting", url: "https://www.chuksetukaconsulting.com" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.chuksetukaconsulting.com/insights/${slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <InsightArticlePage article={article} relatedArticles={allArticles || []} />
    </>
  )
}
