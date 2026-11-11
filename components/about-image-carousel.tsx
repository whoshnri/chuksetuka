"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight } from "./phosphor-icons"

type AboutImage = {
  src: string
  alt: string
}

export function AboutImageCarousel({ images }: { images: AboutImage[] }) {
  const [activeIndex, setActiveIndex] = useState(1)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const loopedImages = images.length > 1
    ? [images[images.length - 1], ...images, images[0]]
    : images
  const countIndex = images.length > 1
    ? (activeIndex === 0 ? images.length : activeIndex === images.length + 1 ? 1 : activeIndex)
    : 1
  const visualIndex = images.length > 1 ? activeIndex : 0

  useEffect(() => {
    if (paused || images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const interval = window.setInterval(() => {
      setActiveIndex((index) => index + 1)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [images.length, paused])

  const move = (direction: -1 | 1) => {
    setAnimate(true)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex((index) => ((index - 1 + direction + images.length) % images.length) + 1)
      return
    }
    setActiveIndex((index) => index + direction)
  }

  const resetLoopPosition = () => {
    if (images.length < 2 || (activeIndex !== 0 && activeIndex !== images.length + 1)) return

    setAnimate(false)
    setActiveIndex(activeIndex === 0 ? images.length : 1)
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setAnimate(true)))
  }

  return (
    <div
      className="about-carousel"
      aria-label="Photos of Chuks at work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
      }}
    >
      <div className="about-carousel__frame">
        <div
          className="about-carousel__track"
          style={{ transform: `translateX(-${visualIndex * 100}%)`, transition: animate ? undefined : "none" }}
          onTransitionEnd={resetLoopPosition}
        >
          {loopedImages.map((image, index) => (
            <figure className="about-carousel__slide" key={`${image.src}-${index}`} aria-hidden={index !== visualIndex}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 58vw" priority={index === (images.length > 1 ? 1 : 0)} />
            </figure>
          ))}
        </div>
      </div>
      <div className="about-carousel__controls">
        <span className="about-carousel__count" aria-live="polite">
          {String(countIndex).padStart(2, "0")} <span>/</span> {String(images.length).padStart(2, "0")}
        </span>
        <div className="about-carousel__buttons">
          <button type="button" aria-label="Previous photo" onClick={() => move(-1)}>
            <ArrowRight className="about-carousel__previous" size={18} />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => move(1)}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
