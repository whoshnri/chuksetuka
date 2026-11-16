import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "./phosphor-icons"
import type { ReactNode } from "react"

export const paperAssets = {
  logo: "/assets/logo.png",
  homeHero: "/assets/home-hero.jpg",
  homeTraining: "/assets/home-training.jpg",
  homeSpeaker: "/assets/home-speaker.jpg",
  homeEvent: "/assets/home-event.jpg",
  homeWorkshop: "/assets/home-workshop.jpg",
  reedLearning: "/assets/reed-learning.png",
  aboutPortrait: "/assets/about-portrait.jpg",
  aboutWorkshop: "/assets/about-workshop.jpg",
  serviceTraining: "/assets/service-training.jpg",
  serviceStrategy: "/assets/service-strategy.jpg",
  serviceLeadership: "/assets/service-leadership.jpg",
  serviceKeynote: "/assets/service-keynote.jpg",
  testimonial: "/assets/testimonial.jpg",
  galleryOne: "/assets/gallery-one.jpg",
  galleryTwo: "/assets/gallery-two.jpg",
  galleryThree: "/assets/gallery-three.jpg",
  galleryFour: "/assets/gallery-four.jpg",
  insightOne: "/assets/insight-one.jpg",
  insightTwo: "/assets/insight-two.jpg",
  insightThree: "/assets/insight-three.jpg",
}

type PageIntroProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageIntro({ eyebrow, title, description, children, className }: PageIntroProps) {
  return (
    <header className={`page-intro${className ? ` ${className}` : ""}`}>
      <h1>{title}</h1>
      {description && <p className="page-intro__description">{description}</p>}
      {children}
    </header>
  )
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export function ActionLink({
  href,
  children,
  variant = "teal",
  className = "",
}: {
  href: string
  children: ReactNode
  variant?: "teal" | "orange" | "outline" | "text" | "text-white"
  className?: string
}) {
  return (
    <Link href={href} className={`action-link action-link--${variant}${className ? ` ${className}` : ""}`}>
      <span>{children}</span>
      <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  )
}

export function PageCta({
  title,
  description,
  primaryLabel = "Book a call",
  primaryHref = "/book-a-call",
  className = "",
}: {
  title: string
  description: string
  primaryLabel?: string
  primaryHref?: string
  className?: string
}) {
  return (
    <section className={`page-cta${className ? ` ${className}` : ""}`} aria-label="Next steps">
      <div className="page-cta__copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="page-cta__actions">
        <ActionLink href={primaryHref} variant="orange">{primaryLabel}</ActionLink>
        <ActionLink href="/contact" variant="outline">Send me a message</ActionLink>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <nav aria-label="Explore">
          <span className="site-footer__label">Explore</span>
          <Link href="/about">About Chuks</Link>
          <Link href="/services">Services</Link>
          <Link href="/insights">Insights</Link>
        </nav>
        <Link href="/" className="site-footer__brand" aria-label="Chuks Etuka Consulting home">
          <Image src={paperAssets.logo} alt="Chuks Etuka Consulting" width={190} height={90} />
        </Link>
        <nav aria-label="Connect">
          <span className="site-footer__label">Connect</span>
          <Link href="/book-a-call">Book a call</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faqs">FAQs</Link>
        </nav>
      </div>
      <div className="site-footer__bottom">
        <p>© 2026 Chuks Etuka Consulting</p>
        <nav aria-label="Legal information"><span>Accessibility statement</span><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link></nav>
      </div>
    </footer>
  )
}

export function PartnerSection({ showEyebrow = true, className = "" }: { showEyebrow?: boolean; className?: string } = {}) {
  return (
    <section className={`partner-section${className ? ` ${className}` : ""}`}>

      <div className="partner-section__content">
        <Image src={paperAssets.reedLearning} alt="" width={180} height={90} className="partner-section__logo" />
        <div>
          <h2>Reed Learning</h2>
          <p>Reed Learning is dedicated to delivering high-quality training and professional development for your business or organisation. They make employee learning simple and effective with curated learning packages, a breadth of digital and in-person learning products, and tailored advice to help you find the right solution for your business.</p>
          <a href="https://www.reedlearning.com/" target="_blank" rel="noreferrer" className="action-link action-link--teal">
            <span>Explore Reed Learning</span> <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
