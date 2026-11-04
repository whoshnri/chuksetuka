import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react"
import { SiteShell } from "./site-shell"
import { PageCta, PageIntro } from "./site-ui"
import { BounceSidebar } from "./bounce-sidebar"
import { featuredInsight, insightArticles, insightCategories, mostReadInsights, type InsightArticle } from "./insights-data"

function InsightArticleCard({ article, featured = false }: { article: InsightArticle; featured?: boolean }) {
  return (
    <article className={`insight-fancy-card group flex h-full min-w-0 flex-col overflow-hidden bg-white text-[#0a0a0a] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${featured ? "lg:grid lg:grid-cols-[1.1fr_1fr]" : ""}`}>
      <Link href={`/insights/${article.slug}`} className={`relative block aspect-[16/10] w-full overflow-hidden ${featured ? "lg:aspect-auto lg:min-h-[360px] lg:rounded-l-md lg:rounded-tr-none" : ""}`} aria-label={`Read ${article.title}`}>
        <Image className="object-cover transition duration-500 group-hover:scale-105" src={article.image} alt={article.imageAlt} fill sizes={featured ? "(max-width: 980px) 100vw, 520px" : "(max-width: 700px) 100vw, 320px"} />
      </Link>
      <div className={`flex flex-1 flex-col items-start gap-2.5 bg-[#17686c] p-5 text-white sm:p-[22px] ${featured ? "lg:justify-center lg:p-8" : ""}`}>
        <h2 className={`m-0 font-[var(--font-heading)] text-[21px] font-bold leading-[1.3] tracking-[-.01em] ${featured ? "lg:text-[28px] lg:leading-[1.2]" : ""}`}><Link className="text-[#e9611b] no-underline transition hover:text-[#ff8a4c]" href={`/insights/${article.slug}`}>{article.title}</Link></h2>
        <p className="insight-excerpt m-0 text-[15px] leading-6 text-white">{article.excerpt}</p>
        <p className="m-0 flex flex-wrap items-center gap-1.5 text-[13px] text-white"><span>{article.date}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-1"><Clock3 size={14} aria-hidden="true" />{article.minutes} min read</span></p>
        <Link href={`/insights/${article.slug}`} className="mt-auto inline-flex items-center gap-2 pt-1.5 font-semibold text-[#e9611b] no-underline">Read article <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </article>
  )
}

function InsightsHeader({ activeCategory = "All" }: { activeCategory?: string }) {
  return (
    <PageIntro title="Notes on inclusion, leadership and culture." description="Articles, talks and resources from Chuks.">
      <nav className="flex flex-wrap gap-0" aria-label="Filter articles by category">
        <Link href="/insights" className={`inline-flex min-h-9 items-center rounded-l-md border border-r-0 px-3.5 text-[13px] no-underline transition ${activeCategory === "All" ? "border-[#17686c] bg-[#17686c] font-semibold text-white" : "border-[#d8dfde] text-[#3a3f40] hover:bg-[#e8f5f6]"}`}>All</Link>
        {insightCategories.map((category, index) => <Link href={`/insights/category/${category.slug}`} className={`inline-flex min-h-9 items-center border border-r-0 px-3.5 text-[13px] no-underline transition ${index === insightCategories.length - 1 ? "rounded-r-md border-r" : "rounded-none"} ${activeCategory === category.label ? "border-[#17686c] bg-[#17686c] font-semibold text-white" : "border-[#d8dfde] text-[#3a3f40] hover:bg-[#e8f5f6]"}`} key={category.slug}>{category.label}</Link>)}
      </nav>
    </PageIntro>
  )
}

export function InsightsPage() {
  const latest = insightArticles.slice(1)
  return (
    <SiteShell activePage="insights">
      <header className="flex flex-col items-start gap-6">
        <h1 className="m-0 max-w-[14ch] font-[var(--font-heading)] text-5xl font-bold leading-[.99] tracking-[-.045em] sm:text-6xl lg:text-[clamp(48px,6vw,84px)]">Notes on inclusion, leadership and culture.</h1>
        <p className="m-0 max-w-2xl text-lg leading-7 text-[#4a4542]">Articles, talks and resources from Chuks.</p>
        <nav className="flex flex-wrap gap-0" aria-label="Filter articles by category">
          <Link href="/insights" className="inline-flex min-h-9 items-center rounded-l-md border border-r-0 border-[#17686c] bg-[#17686c] px-3.5 text-[13px] font-semibold text-white">All</Link>
          {insightCategories.map((category, index) => <Link href={`/insights/category/${category.slug}`} className={`inline-flex min-h-9 items-center border border-r-0 border-[#d8dfde] px-3.5 text-[13px] text-[#3a3f40] no-underline transition hover:bg-[#e8f5f6] ${index === insightCategories.length - 1 ? "rounded-r-md border-r" : "rounded-none"}`} key={category.slug}>{category.label}</Link>)}
        </nav>
      </header>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,.8fr)]" aria-label="Featured article">
        <InsightArticleCard article={featuredInsight} featured />
        <aside className="flex flex-col gap-5 rounded-bl-[48px] bg-[#17686c] px-7 py-8 text-white sm:px-9 sm:py-10">
          <h2 className="m-0 font-[var(--font-heading)] text-2xl font-semibold">Most read</h2>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {mostReadInsights.map((article) => <li className="border-t border-white/25 py-4 first:border-0 first:pt-0" key={article.slug}><Link className="text-base font-semibold leading-6 text-white no-underline hover:underline" href={`/insights/${article.slug}`}>{article.title}</Link><p className="mb-0 mt-2 text-sm leading-5 text-white/75">{article.category} · {article.minutes} min read</p></li>)}
          </ol>
        </aside>
      </section>
      <section className="flex flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-5"><h2 className="m-0 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl">Ideas for the work ahead.</h2><Link href="/insights/category/dei-b-strategy" className="inline-flex items-center gap-2 font-semibold text-[#0f6e73] no-underline">Browse topics <ArrowRight size={16} aria-hidden="true" /></Link></div>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">{latest.map((article) => <InsightArticleCard article={article} key={article.slug} />)}</div>
        <nav className="flex items-center justify-center gap-3 text-[#5c5c5c]" aria-label="Pagination"><span className="inline-flex size-9 items-center justify-center rounded-sm bg-[#e8f5f6] text-[#0a0a0a]" aria-current="page">1</span><Link className="inline-flex size-9 items-center justify-center text-inherit no-underline hover:text-[#0f6e73]" href="/insights/category/dei-b-strategy">2</Link><span className="inline-flex size-9 items-center justify-center" aria-hidden="true">…</span><Link className="inline-flex size-9 items-center justify-center text-inherit no-underline hover:text-[#0f6e73]" href="/insights/category/accessibility">8</Link><Link className="inline-flex items-center gap-1.5 pl-2 text-inherit no-underline hover:text-[#0f6e73]" href="/insights/category/accessibility">Next <ArrowRight size={16} aria-hidden="true" /></Link></nav>
      </section>
      <section className="flex flex-col items-start justify-between gap-8 rounded-bl-[56px] bg-[#17686c] px-7 py-10 text-white sm:px-12 sm:py-14 lg:flex-row lg:items-center" aria-label="Next steps"><div className="max-w-2xl"><h2 className="m-0 font-[var(--font-heading)] text-3xl font-semibold leading-tight sm:text-4xl">Is your culture inclusive… or just well-branded?</h2><p className="mb-0 mt-4 text-base leading-7 text-white/85">Take the 5-minute Inclusion Pulse Check and discover practical next steps for your organisation.</p></div><div className="flex flex-wrap gap-3"><Link className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-[#e9611b] px-5 font-semibold text-white no-underline hover:bg-[#ca4d10]" href="/pulse-check">Start the pulse check <ArrowRight size={16} aria-hidden="true" /></Link><Link className="inline-flex min-h-12 items-center gap-2 rounded-sm border border-white/60 px-5 font-semibold text-white no-underline hover:bg-white/10" href="/contact">Send me a message <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </SiteShell>
  )
}

export function InsightCategoryPage({ category }: { category: { label: string; slug: string } }) {
  const articles = insightArticles.filter((article) => article.categorySlug === category.slug)
  return (
    <SiteShell activePage="insights" className="insights-page">
      <InsightsHeader activeCategory={category.label} />
      <section className="category-archive">
        <div className="section-heading-row"><div><h2>{category.label}</h2></div><p>{articles.length} articles</p></div>
        {articles.length ? <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <InsightArticleCard article={article} key={article.slug} />)}</div> : <p className="empty-category">More articles on this topic are being prepared. Browse all insights for the latest resources.</p>}
        <Link href="/insights" className="text-link"><ArrowLeft size={16} aria-hidden="true" />Back to all insights</Link>
      </section>
    </SiteShell>
  )
}

function getArticleSections(paragraphs: string[]) {
  const firstBoundary = Math.ceil(paragraphs.length / 3)
  const secondBoundary = Math.ceil((paragraphs.length * 2) / 3)

  return [
    { title: "The context", paragraphs: paragraphs.slice(0, firstBoundary) },
    { title: "What to consider", paragraphs: paragraphs.slice(firstBoundary, secondBoundary) },
    { title: "A practical next step", paragraphs: paragraphs.slice(secondBoundary) },
  ].filter((section) => section.paragraphs.length > 0)
}

export function InsightArticlePage({ article }: { article: InsightArticle }) {
  const articleSections = getArticleSections(article.paragraphs)
  const sidebarItems = articleSections.map((section, index) => ({ id: `article-section-${index + 1}`, label: section.title }))

  return (
    <SiteShell activePage="insights" className="insight-article-page">
      <div className="article-breadcrumb"><Link href="/insights">Insights</Link><span aria-hidden="true">/</span><Link href={`/insights/category/${article.categorySlug}`}>{article.category}</Link></div>
      <header className="article-header">
        
        <h1>{article.title}</h1>
        <p className="article-header__excerpt">{article.excerpt}</p>
        <p className="article-byline"><span className="article-chip">Chuks Etuka</span><span className="article-chip">{article.date}</span><span className="article-chip">{article.minutes} min read</span><Link className="article-chip article-chip--active" href={`/insights/category/${article.categorySlug}`}>{article.category}</Link></p>
      </header>
      <figure className="article-cover media-frame"><Image src={article.image} alt={article.imageAlt} fill priority sizes="(max-width: 980px) 100vw, 1016px" /></figure>
      <div className="article-layout">
        <BounceSidebar items={sidebarItems} />
        <article className="article-body">
          {articleSections.map((section, index) => <section id={`article-section-${index + 1}`} key={`${article.slug}-${section.title}`}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => article.slug === "psychological-safety-starts-with-how-leaders-respond-to-bad-news" && paragraph.startsWith("People don’t stop speaking up") ? <blockquote key={paragraph}>{paragraph}</blockquote> : <p key={paragraph}>{paragraph}</p>)}</section>)}
          <div className="article-share"><span>Share</span><a href={`mailto:?subject=${encodeURIComponent(article.title)}`}>Email this article</a></div>
        </article>
      </div>
      <section className="related-insights"><div className="section-heading-row"><h2>Related insights</h2><Link href="/insights" className="text-link">All insights <ArrowRight size={16} aria-hidden="true" /></Link></div><div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">{mostReadInsights.filter((item) => item.slug !== article.slug).slice(0, 3).map((item) => <InsightArticleCard article={item} key={item.slug} />)}</div></section>
      <PageCta className="page-cta--fancy-teal" title="Is your culture inclusive… or just well-branded?" description="Take the Inclusion Pulse Check to find practical steps you can take next." primaryLabel="Start the pulse check" primaryHref="/pulse-check" />
    </SiteShell>
  )
}
