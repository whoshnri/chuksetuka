'use client'

import 'lenis/dist/lenis.css'
import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

function ScrollToTopOnRouteChange() {
  const lenis = useLenis()
  const pathname = usePathname()
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])
  return null
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  if (reduced) return <>{children}</>

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
      <ScrollToTopOnRouteChange />
      {children}
    </ReactLenis>
  )
}
