'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './phosphor-icons'

const quoteText = '“He doesn’t just talk about inclusion; he embodies it, and that presence gets people thinking differently.”'

export function ScrollQuote() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current
        if (!section) return
        const rect = section.getBoundingClientRect()
        const scrollDistance = section.offsetHeight - window.innerHeight
        const travelled = Math.min(Math.max(-rect.top, 0), scrollDistance)
        setProgress(scrollDistance > 0 ? travelled / scrollDistance : 1)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="scroll-quote" ref={sectionRef} aria-label="A note from a partner">
      <div className="scroll-quote__sticky">
        <figure className="scroll-quote__figure">
          <blockquote aria-label={quoteText}>
            <span className="scroll-quote__visual" aria-hidden="true">
              {Array.from(quoteText).map((character, index) => (
                <span className={progress >= (index + 1) / quoteText.length ? 'scroll-quote__character scroll-quote__character--filled' : 'scroll-quote__character'} key={`${index}-${character}`}>
                  {character}
                </span>
              ))}
            </span>
          </blockquote>
          <figcaption className="scroll-quote__byline"><strong>Runa Udin</strong><span>Director, Training and Consultancy</span></figcaption>
          <Link href="/testimonials" className="scroll-quote__link">Read testimonials <ArrowRight size={18} /></Link>
        </figure>
      </div>
    </section>
  )
}
