import { getCloudflareContext } from '@opennextjs/cloudflare'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { InsightArticle } from '@/components/insights-data'

type PayloadDoc = {
  slug: string; title: string; category: string | { id: string; label: string; slug: string }; categorySlug: string; publishedAt?: string;
  minutes?: number; excerpt: string; image?: string; imageAlt?: string;
  coverImage?: { url?: string; alt?: string } | string | null;
  body?: SerializedEditorState | null
  content?: { paragraph: string }[]
}

async function getApiResponse(path: string) {
  try {
    const { env } = getCloudflareContext()
    return await env.API.fetch(new Request(`https://api.internal${path}`, { headers: { accept: 'application/json' } }))
  } catch {
    const origin = process.env.HONO_API_URL || 'http://127.0.0.1:8787'
    try { return await fetch(new URL(path, origin), { next: { revalidate: 60 } }) } catch { return null }
  }
}

function toArticle(doc: PayloadDoc): InsightArticle {
  const categoryName = typeof doc.category === 'string' ? doc.category : doc.category?.label || ''
  const categorySlug = typeof doc.category === 'string' ? doc.categorySlug : doc.category?.slug || doc.categorySlug
  const coverImage = typeof doc.coverImage === 'object' && doc.coverImage ? doc.coverImage : null
  const image = coverImage?.url || doc.image || '/images/insight-placeholder.jpg'
  const cmsURL = process.env.CMS_PUBLIC_URL
  const assetsURL = process.env.ASSETS_PUBLIC_URL
  const imageHost = image.startsWith('/api/') ? cmsURL : assetsURL || cmsURL
  const resolvedImage = image.startsWith('/') && imageHost ? new URL(image, imageHost).toString() : image
  return {
    slug: doc.slug, title: doc.title, category: categoryName, categorySlug,
    date: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '',
    minutes: doc.minutes || 5, excerpt: doc.excerpt, image: resolvedImage,
    imageAlt: coverImage?.alt || doc.imageAlt || '', body: doc.body,
    paragraphs: Array.isArray(doc.content) ? doc.content.map((item) => item.paragraph).filter(Boolean) : [],
  }
}

export async function getArticles(): Promise<InsightArticle[] | null> {
  const response = await getApiResponse('/content/articles')
  if (!response?.ok) return null
  const payload = await response.json() as { docs?: PayloadDoc[] }
  return payload.docs?.length ? payload.docs.map(toArticle) : []
}

export async function getArticle(slug: string): Promise<{ article: InsightArticle | undefined; error: boolean }> {
  const response = await getApiResponse(`/content/articles/${encodeURIComponent(slug)}`)
  if (!response?.ok) return { article: undefined, error: true }
  const payload = await response.json() as { docs?: PayloadDoc[] }
  return { article: payload.docs?.[0] ? toArticle(payload.docs[0]) : undefined, error: false }
}

export async function getCategories(): Promise<{ label: string; slug: string }[] | null> {
  const response = await getApiResponse('/content/categories')
  if (!response?.ok) return null
  const payload = await response.json() as { docs?: { label: string; slug: string }[] }
  return payload.docs?.length ? payload.docs : []
}
