import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { faqGroups } from "./faq-data"
import { MasterclassFaq } from "./masterclass-faq"
import { SiteShell } from "./site-shell"
import { ActionLink, PageCta, PageIntro, SectionHeading, paperAssets } from "./site-ui"

const clientQuotes = [
  {
    quote: "Working with Chuks Etuka was an absolute game-changer. He doesn’t just talk about inclusion; he embodies it.",
    copy: "Chuks has this rare ability to make complex issues feel human and relatable. He invites reflection without shame and helps people understand what psychological safety and belonging mean day to day. We collaborated on a webinar together, and it ended up being one of our most popular sessions. It was only 50 minutes, but the impact was huge.",
    name: "Runa Udin",
    role: "Director, Training and Consultancy",
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
  { src: paperAssets.galleryOne, alt: "Chuks Etuka and participants from Wandsworth Carers’ Centre after an Unconscious Bias & Inclusive Practice training." },
  { src: paperAssets.galleryTwo, alt: "Cover slide for the Disability Awareness training delivered at the Old Vic Theatre." },
  { src: paperAssets.galleryThree, alt: "Chuks checking in with a breakout group during the training." },
  { src: paperAssets.galleryFour, alt: "Chuks facilitating a session with staff of the Old Vic Theatre." },
]

export function TestimonialsPage() {
  return (
    <SiteShell activePage="testimonials" className="testimonials-page">
      <PageIntro eyebrow="Testimonials" title="What clients say about working with me." description="Feedback from training partners, practitioners and senior teams." />
      <div className="testimonials-bento">
        {clientQuotes.map((item, index) => (
          <article className={`testimonial-card testimonial-card--named testimonial-card--named-${index + 1}`} key={item.name}>
            <div className="testimonial-card__copy">
              <blockquote>“{item.quote}”</blockquote>
              <p>{item.copy}</p>
              <p className="testimonial-card__byline"><strong>{item.name}</strong><span>{item.role}</span></p>
            </div>
          </article>
        ))}
        {roomQuotes.map((quote, index) => (
          <article className={`testimonial-card testimonial-card--room testimonial-card--room-${index + 1}`} key={quote}>
            <blockquote>“{quote}”</blockquote>
          </article>
        ))}
      </div>
      <PageCta className="page-cta--fancy-teal" title="Want to bring this energy to your team?" description="Training, strategy and leadership support, shaped around your people." />
    </SiteShell>
  )
}

export function GalleryPage() {
  return (
    <SiteShell activePage="gallery" className="gallery-page">
      <PageIntro eyebrow="Gallery" title="Training and events." description="Moments from recent sessions with organisations across the UK." />
      <section className="gallery-section" aria-label="Training and event gallery">
        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <figure className={`gallery-card gallery-card--${index + 1}`} key={item.src}>
              <div className="gallery-card__image media-frame"><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 500px" /></div>
              <figcaption>{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <PageCta className="page-cta--fancy-teal" title="Want to bring this energy to your team?" description="Let’s make the next session work for your people and your goals." />
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
      <PageCta className="page-cta--fancy-teal" title="Still have a question?" description="Get in touch and we’ll work out the right next step together." />
    </SiteShell>
  )
}
