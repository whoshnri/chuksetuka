import type { MetadataRoute } from "next"
import { getArticles, getCategories } from "@/lib/server/content"

const BASE = "https://www.chuksetukaconsulting.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/founder`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/masterclass`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/insights`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/pulse-check`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book-a-call`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/testimonials`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/gallery`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/faqs`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = []
  const articlePages: MetadataRoute.Sitemap = []

  try {
    const [articles, categories] = await Promise.all([getArticles(), getCategories()])

    if (categories) {
      for (const cat of categories) {
        categoryPages.push({
          url: `${BASE}/insights/category/${cat.slug}`,
          changeFrequency: "weekly",
          priority: 0.6,
        })
      }
    }

    if (articles) {
      for (const article of articles) {
        articlePages.push({
          url: `${BASE}/insights/${article.slug}`,
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }
    }
  } catch {}

  return [...staticPages, ...categoryPages, ...articlePages]
}
