import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "./phosphor-icons"
import type { ReactNode } from "react"

const paperFile = "https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N"

export const paperAssets = {
  logo: `${paperFile}/2CV4K76R1DX83S80CEKDM3AWGF.png`,
  homeHero: `${paperFile}/6KJV6Q0HSTW7J8PKQ5S3FN4PFW.jpg`,
  homeTraining: `${paperFile}/3F89ER0RY6G5A7E2G5X15WWA8W.jpg`,
  homeSpeaker: `${paperFile}/1PGYM7KPKBZHPMXFR0E49E6X05.jpg`,
  homeEvent: `${paperFile}/367E272MGQY2YXWCSW5554YA6N.jpg`,
  homeWorkshop: `${paperFile}/0Y1FE23ANQ50ENCGSMQ7H2YR6N.jpg`,
  reedLearning: `${paperFile}/08Z7S06B2D2TVG0WCAFEJ2B3QF.png`,
  aboutPortrait: `${paperFile}/1QHRJXSJSJF4RDY5GDCH9VNRER.jpg`,
  aboutWorkshop: `${paperFile}/6DG1KGMTBW2FB9AJ6FJB8P8PSY.jpg`,
  serviceTraining: `${paperFile}/1PGYM7KPKBZHPMXFR0E49E6X05.jpg`,
  serviceStrategy: `${paperFile}/6QHVTT8AR2Q5MAZSHDBJHSMMF0.jpg`,
  serviceLeadership: `${paperFile}/5R273EYF7NH8SH1JCYGWT2V0KB.jpg`,
  serviceKeynote: `${paperFile}/2WMM9C6M496V3W9K8T9EC927HF.jpg`,
  testimonial: `${paperFile}/3F8BJYH4T6K6EDFAJDJ1DMX8E4.jpg`,
  galleryOne: `${paperFile}/7KG8MV1QYYWQE7PTHH72KTCKA4.jpg`,
  galleryTwo: `${paperFile}/2847V8Z96XW8DY06EERWY3A6HK.jpg`,
  galleryThree: `${paperFile}/1ECCM7TTGFRK4VCAWGCMSDFV4H.jpg`,
  galleryFour: `${paperFile}/3JZXYA2DHK232PNDYMB77APA1X.jpg`,
  insightOne: `${paperFile}/2JGY4DBQP3YHRXNBWGBN38QQ2S.jpg`,
  insightTwo: `${paperFile}/5510NHXMEMTWD1T813YV4WSBRJ.jpg`,
  insightThree: `${paperFile}/39317VCFCWRDN93R2QZS2P8TWJ.jpg`,
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
  variant?: "teal" | "orange" | "outline" | "text"
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
