import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { faqGroups } from "./faq-data"
import { MasterclassFaq } from "./masterclass-faq"
import { GalleryCarousel } from "./gallery-carousel"
import { SiteShell } from "./site-shell"
import { ActionLink, PageCta, PageIntro, SectionHeading, paperAssets } from "./site-ui"
import type { GalleryItem } from "@/lib/server/content"

const clientQuotes = [
  {
    quote: "Working with Chuks Etuka was an absolute game-changer. He doesn't just talk about inclusion; he embodies it.",
    copy: "Chuks has this rare ability to make complex issues feel human and relatable. He invites reflection without shame and helps people understand what psychological safety and belonging mean day to day. We collaborated on a webinar together, and it ended up being one of our most popular sessions. It was only 50 minutes, but the impact was huge.",
    name: "Runa Udin",
    role: "Director, Training and Consultancy",
    logo: paperAssets.logoRuna,
    logoAlt: "Training and Consultancy with Runa",
  },
  {
    quote: "The EDI training was one of the best that I have attended in all my years as a practitioner.",
    copy: "Chuks has a vast amount of knowledge and was able to deliver this training in a way which made it relevant to the service I work in. The training was thought-provoking and powerful.",
    name: "Nicky Dean",
    role: "Senior Operations Manager, Victim Support",
  },
]

const roomQuotes = [
  "Chuks created a space that was challenging but safe. We left with real actions, not just awareness.",
  "The most practical inclusion session I have ever been part of. It shifted my way of thinking.",
  "Honest, funny and deeply strategic. Exactly what our senior team needed.",
]

const galleryImages = [
  { src: paperAssets.galleryOne, alt: "Chuks Etuka and participants from Wandsworth Carers' Centre after an Unconscious Bias & Inclusive Practice training." },
  { src: paperAssets.galleryTwo, alt: "Cover slide for the Disability Awareness training delivered at the Old Vic Theatre." },
  { src: paperAssets.galleryThree, alt: "Chuks checking in with a breakout group during the training." },
  { src: paperAssets.galleryFour, alt: "Chuks facilitating a session with staff of the Old Vic Theatre." },
  { src: paperAssets.galleryAdvanceUk, alt: "Chuks delivering a session with EDI Champions for Advance UK." },
]

export function TestimonialsPage() {
  return (
    <SiteShell activePage="testimonials" className="testimonials-page">
      <PageIntro eyebrow="Testimonials" title="What clients say about working with me." description="Feedback from training partners, practitioners and senior teams." />
      <div className="testimonials-editorial">
        {clientQuotes.map((item) => (
          <article className="testimonial-editorial" key={item.name}>
            <div className="testimonial-editorial__accent" aria-hidden="true" />
            <div className="testimonial-editorial__body">
              <blockquote className="testimonial-editorial__quote">&ldquo;{item.quote}&rdquo;</blockquote>
              <p className="testimonial-editorial__detail">{item.copy}</p>
              <footer className="testimonial-editorial__footer">
                <div className="testimonial-editorial__attribution">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
                {item.logo && (
                  <Image src={item.logo} alt={item.logoAlt || ""} width={120} height={48} className="testimonial-editorial__logo" />
                )}
              </footer>
            </div>
          </article>
        ))}
      </div>
      <section className="testimonials-room-section">
        <h2 className="testimonials-room-heading">From the room</h2>
        <div className="testimonials-room-grid">
          {roomQuotes.map((quote) => (
            <article className="testimonial-room-card" key={quote}>
              <blockquote>&ldquo;{quote}&rdquo;</blockquote>
            </article>
          ))}
        </div>
      </section>
      <PageCta className="page-cta--fancy-teal" title="Want to bring this energy to your team?" description="Training, strategy and leadership support, shaped around your people." />
    </SiteShell>
  )
}

export function GalleryPage({ cmsGallery }: { cmsGallery?: GalleryItem[] | null }) {
  const items = cmsGallery ?? []

  return (
    <SiteShell activePage="gallery" className="gallery-page">
      <PageIntro eyebrow="Gallery" title="Training and events." description="Moments from recent sessions with organisations across the UK." />
      {items.length > 0 ? (
        <section className="gallery-section" aria-label="Training and event gallery">
          <div className="gallery-grid">
            {items.map((item, index) => (
              <figure className={`gallery-card gallery-card--${(index % 5) + 1}`} key={`${item.title}-${index}`}>
                <div className="gallery-card__image media-frame">
                  {item.images.length > 1 ? (
                    <GalleryCarousel images={item.images} />
                  ) : (
                    <Image src={item.images[0].src} alt={item.images[0].alt} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 500px" />
                  )}
                </div>
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <section className="gallery-section" aria-label="Gallery empty state">
          <p style={{ textAlign: 'center', color: '#888', padding: '4rem 1rem' }}>Gallery items are managed in the CMS. No items published yet.</p>
        </section>
      )}
      <PageCta className="page-cta--fancy-teal" title="Want to bring this energy to your team?" description="Let's make the next session work for your people and your goals." />
    </SiteShell>
  )
}

export function FAQPage() {
  return (
    <SiteShell activePage="faq" className="faq-page">
      <PageIntro eyebrow="Frequently asked questions" title="Clear answers. Practical next steps." description="A few common questions about DEI&B training, consultancy, accessibility and working together." />
      <div className="faq-groups">
        {faqGroups.map((group) => (
          <section className="faq-category" key={group.title}>
            <h2 className="font-sans">{group.title}</h2>
            <MasterclassFaq faqs={group.items.map((item) => [item.question, item.answer] as [string, string])} />
          </section>
        ))}
      </div>
      <PageCta className="page-cta--fancy-teal" title="Still have a question?" description="Get in touch and we'll work out the right next step together." />
    </SiteShell>
  )
}
