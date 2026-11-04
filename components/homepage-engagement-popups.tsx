"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, X } from "./phosphor-icons"

export function HomepageEngagementPopups() {
  const [cookieOpen, setCookieOpen] = useState(false)
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const triggered = useRef(false)
  const shown = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setCookieOpen(true), 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const revealNewsletter = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const reachedHalfway = scrollable > 0 && window.scrollY / scrollable >= 0.5
      if (reachedHalfway) triggered.current = true
      if (triggered.current && !cookieOpen && !shown.current) {
        shown.current = true
        setNewsletterOpen(true)
      }
    }

    window.addEventListener("scroll", revealNewsletter, { passive: true })
    revealNewsletter()

    const footer = document.querySelector(".site-footer")
    const observer = footer && "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            triggered.current = true
            if (!cookieOpen && !shown.current) {
              shown.current = true
              setNewsletterOpen(true)
            }
          }
        }, { threshold: 0.12 })
      : null
    if (footer && observer) observer.observe(footer)

    return () => {
      window.removeEventListener("scroll", revealNewsletter)
      observer?.disconnect()
    }
  }, [cookieOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <AnimatePresence>
        {cookieOpen && (
          <motion.aside
            role="dialog"
            aria-labelledby="cookie-consent-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="homepage-popup-fancy-shape fixed bottom-4 left-4 z-[90] w-[min(31rem,calc(100vw-2rem))] bg-white px-6 pb-10 pr-8 pt-7 text-[var(--brand-teal-ink)] shadow-[0_20px_64px_rgba(14,38,39,.2)] sm:bottom-6 sm:left-6 sm:px-8 sm:pb-12 sm:pt-8"
          >
            <button type="button" onClick={() => setCookieOpen(false)} className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[var(--brand-teal-ink)] transition-colors hover:bg-black/5" aria-label="Close cookie consent">
              <X size={19} aria-hidden="true" />
            </button>
            <h2 id="cookie-consent-title" className="mb-2 mt-0 max-w-[18ch] pr-8 font-sans text-xl font-semibold leading-tight sm:text-2xl">A few cookies help this site work well.</h2>
            <p className="mb-5 max-w-[48ch] text-sm leading-relaxed text-[var(--brand-teal-ink)]/80">We use cookies to understand how people use the site and make your visit smoother. Choose what you’re comfortable with.</p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setCookieOpen(false)} className="rounded-full bg-[var(--brand-teal-ink)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-teal-ink)]/90">Accept cookies</button>
              <button type="button" onClick={() => setCookieOpen(false)} className="rounded-full px-3 py-2.5 text-sm font-semibold text-[var(--brand-teal-ink)] transition-colors hover:bg-black/5">Only essential</button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newsletterOpen && (
          <motion.div
            className="fixed inset-0 z-[89] grid place-items-center bg-black/40 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setNewsletterOpen(false)
            }}
          >
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="homepage-newsletter-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="homepage-popup-fancy-shape relative w-full max-w-xl bg-[var(--brand-teal-ink)] px-7 pb-14 pt-12 text-white shadow-[0_24px_80px_rgba(0,0,0,.3)] sm:px-12 sm:pb-20 sm:pt-16"
            >
              <button type="button" onClick={() => setNewsletterOpen(false)} className="absolute right-5 top-5 grid size-10 place-items-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white" aria-label="Close newsletter signup">
                <X size={19} aria-hidden="true" />
              </button>
              {submitted ? (
                <div role="status" className="pr-8">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[.12em] text-white/65">You’re on the list</p>
                  <h2 id="homepage-newsletter-title" className="m-0 font-sans text-2xl font-semibold leading-tight sm:text-3xl">Thanks for signing up.</h2>
                  <p className="mb-0 mt-3 max-w-[44ch] text-sm leading-relaxed text-white/80">Look out for a note from Chuks.</p>
                </div>
              ) : (
                <>
                  <h2 id="homepage-newsletter-title" className="mb-3 mt-0 max-w-[18ch] font-sans text-2xl font-semibold leading-tight sm:text-3xl">Ideas for making belonging real.</h2>
                  <p className="mb-7 max-w-[46ch] text-sm leading-relaxed text-white/80">Occasional thoughts and practical ways to build more inclusive workplaces.</p>
                  <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-white/55 pb-2 focus-within:border-white">
                    <label className="sr-only" htmlFor="homepage-newsletter-email">Email address</label>
                    <input id="homepage-newsletter-email" name="email" type="email" autoComplete="email" placeholder="Your email address" required className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/60 focus:ring-0" />
                    <button type="submit" className="grid size-11 shrink-0 place-items-center rounded-full text-white transition-colors hover:bg-white/10" aria-label="Sign up for the newsletter">
                      <ArrowRight size={22} aria-hidden="true" />
                    </button>
                  </form>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
