"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

const photos = [
  { src: "/assets/marquee-speaking.jpg", alt: "Chuks speaking at a community event" },
  { src: "/assets/marquee-workshop.jpg", alt: "Participants taking part in a workshop" },
  { src: "/assets/home-training.jpg", alt: "Chuks smiling at an event" },
  { src: "/assets/founder-audience.jpg", alt: "An audience listening to a presentation" },
]

export function FounderPhotoMarquee() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="w-full overflow-hidden" aria-label="Photos from workshops and events">
      <motion.div
        className="flex w-max"
        animate={reducedMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={reducedMotion ? { duration: 0 } : { duration: 36, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <div className="flex flex-none" aria-hidden={copy === 1} key={copy}>
            {photos.map((photo, index) => (
              <figure className="relative m-0 h-[220px] w-[72vw] flex-none overflow-hidden sm:h-[280px] sm:w-[42vw] lg:h-[340px] lg:w-[25vw]" key={`${copy}-${photo.src}`}>
                <Image
                  src={photo.src}
                  alt={copy === 0 ? photo.alt : ""}
                  fill
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 42vw, 25vw"
                  className="object-cover"
                  priority={index < 2 && copy === 0}
                />
              </figure>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
