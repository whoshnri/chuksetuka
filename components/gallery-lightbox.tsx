'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

type LightboxImage = { src: string; alt: string }

export function GalleryExpandButton({ images, title }: { images: LightboxImage[]; title: string }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const count = images.length

  const close = useCallback(() => setOpen(false), [])
  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, next, prev])

  return (
    <>
      <button
        type="button"
        className="gallery-expand-btn"
        aria-label={`View ${title} fullscreen`}
        onClick={() => { setCurrent(0); setOpen(true) }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 7V2h5M16 7V2h-5M2 11v5h5M16 11v5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={title}>
          <div className="gallery-lightbox__backdrop" onClick={close} />
          <div className="gallery-lightbox__content">
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              sizes="100vw"
              className="gallery-lightbox__img"
            />
          </div>
          <p className="gallery-lightbox__caption">{title}</p>
          <button type="button" className="gallery-lightbox__close" onClick={close} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {count > 1 && (
            <>
              <button type="button" className="gallery-lightbox__nav gallery-lightbox__nav--prev" onClick={prev} aria-label="Previous image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={next} aria-label="Next image">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="gallery-lightbox__counter">{current + 1} / {count}</div>
            </>
          )}
        </div>
      )}
    </>
  )
}
