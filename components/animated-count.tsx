"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedCount({ value, label }: { value: number; label: string }) {
  const countRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = countRef.current
    if (!element || typeof IntersectionObserver === "undefined") {
      setCount(value)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated.current) return

      hasAnimated.current = true
      observer.disconnect()

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(value)
        return
      }

      const startedAt = performance.now()
      const duration = 1400
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(value * eased))
        if (progress < 1) frame = window.requestAnimationFrame(tick)
      }

      frame = window.requestAnimationFrame(tick)
    }, { threshold: 0.45 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <strong ref={countRef} aria-label={label} aria-live="off">
      <span aria-hidden="true">{count}+</span>
    </strong>
  )
}
