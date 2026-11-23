'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

type GalleryCarouselProps = {
  images: { src: string; alt: string }[]
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null)
  const count = images.length

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count)
    }, 4000)
  }, [count])

  useEffect(() => {
    if (count <= 1) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return
    startAutoplay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [count, startAutoplay])

  if (count === 1) {
    return (
      <Image
        src={images[0].src}
        alt={images[0].alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 500px"
        className="object-cover"
      />
    )
  }

  return (
    <div className="gallery-carousel">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`gallery-carousel__slide${i === current ? ' gallery-carousel__slide--active' : ''}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 500px"
            className="object-cover"
          />
        </div>
      ))}
      <div className="gallery-carousel__dots" role="tablist" aria-label="Gallery slides">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`gallery-carousel__dot${i === current ? ' gallery-carousel__dot--active' : ''}`}
            onClick={() => { setCurrent(i); startAutoplay() }}
          />
        ))}
      </div>
    </div>
  )
}
