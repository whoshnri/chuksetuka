"use client"

import { motion, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"

export type BounceSidebarItem = {
  id: string
  label: string
}

export function BounceSidebar({ items, ariaLabel = "On this page" }: { items: BounceSidebarItem[]; ariaLabel?: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "")
  const [indicatorY, setIndicatorY] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>())
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const updateActiveItem = () => {
      const threshold = window.innerHeight * 0.3
      let currentId = items[0]?.id ?? ""

      for (const item of items) {
        const section = document.getElementById(item.id)
        if (section && section.getBoundingClientRect().top <= threshold) currentId = item.id
        else break
      }

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        currentId = items[items.length - 1]?.id ?? currentId
      }
      setActiveId(currentId)
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveItem)
    }

    updateActiveItem()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [items])

  useEffect(() => {
    const list = listRef.current
    const activeItem = itemRefs.current.get(activeId)
    if (!list || !activeItem) return
    const listTop = list.getBoundingClientRect().top
    const itemTop = activeItem.getBoundingClientRect().top
    setIndicatorY(itemTop - listTop + list.offsetTop + activeItem.offsetHeight / 2 - 4)
  }, [activeId, items])

  const handleItemClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    setActiveId(id)
    window.history.replaceState(null, "", `#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" })
  }

  return (
    <nav className="article-toc !top-28" aria-label={ariaLabel}>
      <p className="article-toc__title">On this page</p>
      <div className="article-toc__list-shell">
        <motion.span
          className="article-toc__indicator"
          aria-hidden="true"
          animate={reducedMotion ? { y: indicatorY, x: 0 } : { y: indicatorY, x: [0, 10, -7, 0] }}
          transition={reducedMotion
            ? { duration: 0.12 }
            : {
                y: { type: "spring", stiffness: 300, damping: 19, mass: 0.7 },
                x: { type: "tween", duration: 0.55, ease: [0.22, 1, 0.36, 1] },
              }}
        />
        <ul className="article-toc__list" ref={listRef}>
          {items.map((item) => (
            <li key={item.id}>
              <a
                ref={(node) => {
                  if (node) itemRefs.current.set(item.id, node)
                  else itemRefs.current.delete(item.id)
                }}
                className="article-toc__link"
                href={`#${item.id}`}
                aria-current={activeId === item.id ? "location" : undefined}
                onClick={(event) => handleItemClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
