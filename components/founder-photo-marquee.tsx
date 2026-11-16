"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

const photos = [
  { src: "/images/group.jpeg", alt: "Chuks with a diverse group of workshop participants" },
  { src: "/images/1771853186642.jpeg", alt: "Chuks in traditional Igbo attire" },
  { src: "/images/1762874376567.jpeg", alt: "Chuks on a cobbled street in Canterbury" },
  { src: "/images/1768920137845.jpeg", alt: "Chuks smiling on a boat" },
  { src: "/images/1779802181910.jpeg", alt: "Chuks on a street in Nigeria" },
  { src: "/images/1790022052206.jpeg", alt: "Chuks holding Talk Like TED book" },
  { src: "/images/1775496917673.jpeg", alt: "Chuks laughing in the park" },
  { src: "/images/1781544422444.jpeg", alt: "Chuks at Wembley Stadium" },
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
