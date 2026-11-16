'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArrowRight as PhosphorArrowRight, Clock } from './phosphor-icons'
import type { InsightArticle } from './insights-data'

const PAGE_SIZE = 10

function InsightArticleCard({ article }: { article: InsightArticle }) {
  return (
    <article className="insight-fancy-card group flex h-full min-w-0 flex-col overflow-hidden bg-white text-[#0a0a0a] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/insights/${article.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden"
        aria-label={`Read ${article.title}`}
      >
        <Image
          className="object-cover transition duration-500 group-hover:scale-105"
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, 320px"
        />
      </Link>
      <div className="flex flex-1 flex-col items-start gap-2.5 bg-[#17686c] p-5 text-white sm:p-[22px]">
        <h2 className="m-0 font-[var(--font-heading)] text-[21px] font-bold leading-[1.3] tracking-[-.01em]">
          <Link
            className="text-white no-underline transition hover:text-white/80"
            href={`/insights/${article.slug}`}
          >
            {article.title}
          </Link>
        </h2>
        <p className="insight-excerpt m-0 text-[15px] leading-6 text-white">
          {article.excerpt}
        </p>
        <p className="m-0 flex flex-wrap items-center gap-1.5 text-[13px] text-white">
          <span>{article.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            {article.minutes} min read
          </span>
        </p>
        <Link
          href={`/insights/${article.slug}`}
          className="text-link mt-auto inline-flex items-center gap-2 pt-1.5 font-semibold no-underline"
        >
          Read article <PhosphorArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

export function InsightsGrid({ articles }: { articles: InsightArticle[] }) {
  const [page, setPage] = useState(1)
  const visible = articles.slice(0, page * PAGE_SIZE)
  const totalPages = Math.ceil(articles.length / PAGE_SIZE)
  const hasMore = page < totalPages

  return (
    <section className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <h2 className="m-0 font-[var(--font-heading)] text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl">
          Ideas for the work ahead.
        </h2>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((article) => (
          <InsightArticleCard article={article} key={article.slug} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-3 text-[#5c5c5c]"
          aria-label="Pagination"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`inline-flex size-9 items-center justify-center rounded-sm border-0 text-sm cursor-pointer ${p === page ? 'bg-[#e8f5f6] font-semibold text-[#0a0a0a]' : 'bg-transparent text-inherit hover:text-[#0f6e73]'}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          {hasMore && (
            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 border-0 bg-transparent pl-2 text-inherit cursor-pointer hover:text-[#0f6e73]"
            >
              Next <ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </nav>
      )}
    </section>
  )
}
