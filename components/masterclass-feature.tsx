'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ActionLink, paperAssets } from './site-ui'
import { Clock, Monitor } from './phosphor-icons'

export function MasterclassFeature() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    if (!section || !image) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      image.style.transform = 'none'
      image.style.opacity = '1'
      return
    }

    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const distance = window.innerHeight
        const progress = Math.min(Math.max((distance - rect.top) / distance, 0), 1)
        const scale = 1.12 - progress * 0.12
        const lift = (1 - progress) * 52
        image.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`
        image.style.opacity = `${0.62 + progress * 0.38}`
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="masterclass-feature masterclass-feature--immersive" id="masterclass" ref={sectionRef}>
      <div className="masterclass-feature__image" ref={imageRef}>
        <Image src={paperAssets.homeSpeaker} alt="Chuks Etuka speaking at an event" fill sizes="100vw" />
      </div>
      <div className="masterclass-feature__shade" aria-hidden="true" />
        <div className="masterclass-feature__content shape shape-pear-tl">
        <div className="masterclass-feature__copy">
          <h2>Stop panicking about saying the wrong thing.</h2>
          <p>A practical workshop for SME leaders, local authorities, education institutions and teams who want to start doing inclusion properly.</p>
          <ActionLink href="/masterclass" variant="orange">View the masterclass</ActionLink>
        </div>
        <dl className="masterclass-feature__facts">
          <div><dt><Clock size={20} />Duration</dt><dd>3.5 hours to 1 full day</dd></div>
          <div><dt><Monitor size={20} />Format</dt><dd>Virtual or in-person</dd></div>
        </dl>
      </div>
    </section>
  )
}
