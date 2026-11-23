'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight as PhosphorArrowRight, Clock } from './phosphor-icons'
import { insightArticles, type InsightArticle } from './insights-data'
import { SectionHeading } from './site-ui'

function ArticleCard({ article }: { article: InsightArticle }) {
  return (
    <article className="home-article-card group">
      <Link
        href={`/insights/${article.slug}`}
        className="home-article-card__image"
        aria-label={`Read ${article.title}`}
      >
        <Image
          className="object-cover transition duration-500 group-hover:scale-105"
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="300px"
        />
      </Link>
      <div className="home-article-card__body">
        <h3>
          <Link href={`/insights/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="home-article-card__excerpt">{article.excerpt}</p>
        <p className="home-article-card__meta">
          <span>{article.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            {article.minutes} min read
          </span>
        </p>
      </div>
    </article>
  )
}

export function HomeArticles() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const articles = insightArticles.slice(0, 8)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  function scroll(direction: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('.home-article-card')
    const step = card ? card.offsetWidth + 20 : 320
    el.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' })
  }

  return (
    <section className="home-articles" id="insights">
      <div className="home-articles__header">
        <SectionHeading title="Latest insights" />
        <div className="home-articles__nav" aria-label="Scroll articles">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="home-articles__arrow"
            aria-label="Previous articles"
          >
            <PhosphorArrowRight size={20} style={{ transform: 'rotate(180deg)' }} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="home-articles__arrow"
            aria-label="Next articles"
          >
            <PhosphorArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="home-articles__track" ref={trackRef}>
        {articles.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      <div className="home-articles__footer">
        <Link href="/insights" className="text-link">
          View all insights <PhosphorArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
