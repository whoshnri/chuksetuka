"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ActionLink } from "./site-ui"

const images = [
  { src: "/images/1770041018921.jpeg", alt: "Chuks portrait in black and white" },
  { src: "/images/1771853186642.jpeg", alt: "Chuks in traditional Igbo attire" },
  { src: "/images/group.jpeg", alt: "Chuks with a diverse group of workshop participants" },
  { src: "/images/1765980051873.jpeg", alt: "Chuks in a formal garden setting" },
  { src: "/images/1768920137845.jpeg", alt: "Chuks smiling on a boat" },
  { src: "/images/1775496917673.jpeg", alt: "Chuks laughing in the park" },
  { src: "/images/1779802181910.jpeg", alt: "Chuks on a street in Nigeria" },
  { src: "/images/1790022052206.jpeg", alt: "Chuks holding Talk Like TED book" },
  { src: "/images/1781544422444.jpeg", alt: "Chuks at Wembley Stadium" },
  { src: "/images/1762874376567.jpeg", alt: "Chuks on a cobbled street in Canterbury" },
  { src: "/images/1776718150081.jpeg", alt: "Chuks relaxing on a pedalo" },
  { src: "/images/1783947396938.jpeg", alt: "Chuks standing in an archway" },
]

export function HeroImageReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
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
        const scrollable = section.offsetHeight - window.innerHeight
        const travelled = Math.min(Math.max(-rect.top, 0), scrollable)
        setProgress(scrollable > 0 ? travelled / scrollable : 1)
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  // Phase 1: 0–0.4 = single image zooms out to reveal grid
  // Phase 2: 0.4–0.7 = grid settles, more images fade in
  // Phase 3: 0.7–1.0 = text overlay pops in
  const zoomPhase = Math.min(progress / 0.4, 1)
  const gridPhase = Math.min(Math.max((progress - 0.3) / 0.35, 0), 1)
  const textPhase = Math.min(Math.max((progress - 0.65) / 0.3, 0), 1)

  // Hero image starts fullscreen, scales down to grid cell
  const heroScale = 1 + (1 - zoomPhase) * 2.5
  const heroRadius = zoomPhase * 12

  // Gap grows from 0 to 8px
  const gap = zoomPhase * 8

  // Grid container scale: starts slightly larger, settles to 1
  const containerScale = 1 + (1 - zoomPhase) * 0.05

  return (
    <section
      ref={sectionRef}
      className="hero-image-reveal"
      aria-label="Visual introduction"
    >
      <div className="hero-image-reveal__sticky">
        {/* Image grid */}
        <div
          className="hero-image-reveal__grid"
          style={{
            gap: `${gap}px`,
            transform: `scale(${containerScale})`,
            padding: `${zoomPhase * 16}px`,
          }}
        >
          {images.map((img, i) => {
            const isHero = i === 0
            const delay = i * 0.06
            const cellOpacity = isHero ? 1 : Math.min(Math.max((gridPhase - delay) * 3, 0), 1)
            const cellScale = isHero
              ? heroScale
              : 0.7 + cellOpacity * 0.3

            return (
              <figure
                key={img.src}
                className={`hero-image-reveal__cell${isHero ? " hero-image-reveal__cell--hero" : ""}`}
                style={{
                  opacity: cellOpacity,
                  transform: `scale(${cellScale})`,
                  borderRadius: `${isHero ? heroRadius : 12 * cellOpacity}px`,
                  zIndex: isHero ? 10 : 1,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={isHero ? "100vw" : "(max-width: 640px) 50vw, 25vw"}
                  className="object-cover"
                  priority={isHero}
                />
              </figure>
            )
          })}
        </div>

        {/* Dark overlay for text */}
        <div
          className="hero-image-reveal__overlay"
          style={{ opacity: textPhase * 0.88 }}
          aria-hidden="true"
        />

        {/* Text pop-in */}
        <div
          className="hero-image-reveal__text"
          style={{
            opacity: textPhase,
            transform: `translateY(${(1 - textPhase) * 40}px)`,
          }}
        >
          <h2>Stop panicking about saying the wrong thing.</h2>
          <h3 className="hero-image-reveal__subtitle">
            Start building an inclusive culture.
          </h3>
          <p>
            A practical masterclass for leaders who want to move from good
            intentions to tangible action.
          </p>
          <div className="hero-image-reveal__actions">
            <ActionLink href="/masterclass" variant="orange">
              View the masterclass
            </ActionLink>
            <ActionLink href="/book-a-call" variant="text-white">
              Book a call
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
