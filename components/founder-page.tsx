import Image from 'next/image'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MobileHeader } from './mobile-header'
import { SiteFooter } from './site-ui'

const assets = {
  logo: 'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/2CV4K76R1DX83S80CEKDM3AWGF.png',
  gallery: [
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/34NNN8PR2SMSVPSDEJYEMA3BJZ.jpg',
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/7C24BA6M35H93X8ECY9DW6VCKF.jpg',
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/3F89ER0RY6G5A7E2G5X15WWA8W.jpg',
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/1CBNK4YJ1SJBDQ9HCE6YRE2YM3.jpg',
  ],
  portrait:
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/5ZGATY1JVY85Y2FAHXX29MDAA4.jpg',
  speaking:
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/1CBNK4YJ1SJBDQ9HCE6YRE2YM3.jpg',
}

const livedExperienceCopy = `Hi, I’m Chuks Etuka, you can call me Chuks. It is the short form for Chukwunweike. It is not spelt ‘Chucks’, Chuck’, ‘Chiks’, ‘Tuks’, Chooooks…. It is simply Chuks…I am a DEI&B leader, speaker, and strategist with a solid 20+ years under my belt working across social justice, charity, public, and private sectors. Basically, I’ve been around the block (and probably redesigned a few ramps while I was at it). As a proud Black man living with a disability, I don’t get to “opt out” of conversations about race, inclusion, or accessibility, my very existence is the conversation. I’ve walked into rooms where I’ve been underestimated before I even spoke. I’ve had to navigate systems that weren’t built for bodies like mine and question whether I was being excluded because of my skin colour, my disability or both.`

const navigation = [
  { label: 'Home', href: '#top' },
  { label: 'About Us', href: '/about', current: true, nested: true },
  { label: 'Testimonials', href: '/testimonials', nested: true },
  { label: 'Gallery', href: '/gallery', nested: true },
  { label: 'Services', href: '/services', expandable: true },
  { label: 'Contact', href: '/contact', expandable: true },
]

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label="Primary" className={cn('site-navigation', mobile && 'site-navigation--mobile')}>
      <a className="nav-link" href="/">
        Home
      </a>
      <a className="nav-link nav-link--group nav-link--active-group" href="/about">
        <span>Our Impact</span>
        <ChevronDown aria-hidden="true" size={16} strokeWidth={1.8} />
      </a>
      <div className="nav-sublist">
        {navigation
          .filter((item) => item.nested)
          .map((item) => (
            <a
              aria-current={item.current ? 'page' : undefined}
              className={cn('nav-link nav-link--sub', item.current && 'nav-link--selected')}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
      </div>
      {navigation
        .filter((item) => item.expandable)
        .map((item) => (
          <a className="nav-link nav-link--group" href={item.href} key={item.label}>
            <span>{item.label}</span>
            <ChevronRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
        ))}
    </nav>
  )
}

function SocialLinks() {
  return (
    <nav aria-label="Social media" className="social-links">
      <a aria-label="X" className="social-link" href="https://x.com/" rel="noreferrer" target="_blank">
        <Image alt="" aria-hidden="true" height={16} src="https://thesvg.org/icons/x/mono.svg" width={16} />
      </a>
      <a
        aria-label="Instagram"
        className="social-link"
        href="https://www.instagram.com/"
        rel="noreferrer"
        target="_blank"
      >
        <Image alt="" aria-hidden="true" height={16} src="https://thesvg.org/icons/instagram/mono.svg" width={16} />
      </a>
      <a
        aria-label="LinkedIn"
        className="social-link"
        href="https://www.linkedin.com/"
        rel="noreferrer"
        target="_blank"
      >
        <Image alt="" aria-hidden="true" height={16} src="https://thesvg.org/icons/linkedin/default.svg" width={16} />
      </a>
    </nav>
  )
}

function BookCallLink({ className }: { className?: string }) {
  return (
    <a
      className={cn('action-link action-link--teal', className)}
      href="/book-a-call"
    >
      <span>Book a call</span>
      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
    </a>
  )
}

function DesktopSidebar() {
  return (
    <aside aria-label="Site navigation" className="founder-sidebar">
      <div className="sidebar-top">
        <a aria-label="Chuks Etuka Consulting home" className="brand-link" href="/">
          <Image alt="Chuks Etuka Consulting" height={74} src={assets.logo} width={148} />
        </a>
        <NavigationLinks />
      </div>
      <div className="sidebar-contact">
        <BookCallLink className="sidebar-book-link" />
        <a className="sidebar-email" href="mailto:info@chuksetukaconsulting.com">
          info@chuksetukaconsulting.com
        </a>
        <SocialLinks />
      </div>
    </aside>
  )
}

function IntroSection() {
  return (
    <section aria-labelledby="page-title" className="intro-section" id="about">
      <div className="hero-heading-row">
        <h1 className="hero-title" id="page-title">
          Chuks Etuka
        </h1>
        <p className="hero-tagline">Decode DEI: Build Trust. Boost Impact.</p>
      </div>
      <p className="intro-copy">
        Hi, I’m Chuks and I am here to make Diversity, Equity, Inclusion &amp; Belonging (DEI&amp;B) make sense…so you can make a real difference (and not just a really long policy document no one reads).<br />
        Let’s be honest, Diversity, Equity, Inclusion &amp; Belonging can sometimes feel like a minefield of buzzwords, uncomfortable truths, or a never-ending to-do list. I get it. That’s why I am here to meet you where you are (yes, even if that’s somewhere between “we had a DEI&amp;B lunch-and-learn once” and “we’re rewriting the whole handbook”). I am building a values-driven consultancy that helps organisations move beyond the tick boxes and towards building workplaces where actual humans feel seen, heard, and like they belong. That’s the sweet spot.
      </p>
    </section>
  )
}

function PhotoStrip() {
  const descriptions = [
    'Chuks speaking at a community event',
    'Participants taking part in a workshop',
    'Chuks smiling at an event',
    'An audience listening to a presentation',
  ]

  return (
    <section aria-label="Photos from workshops and events" className="photo-strip" id="gallery">
      {assets.gallery.map((src, index) => (
        <div className={cn('strip-photo', `strip-photo--${index + 1}`)} key={src}>
          <Image
            alt={descriptions[index]}
            className="strip-photo__image"
            fill
            loading="eager"
            sizes="(max-width: 640px) 48vw, 290px"
            src={src}
          />
        </div>
      ))}
    </section>
  )
}

function AboutCopy() {
  return (
    <div className="about-copy">
      <p>
        Backed by lived experience and led with strategic know-how, I’m not just here to challenge bias, I am here to reshape the systems that let it thrive in the first place. Together, we can build the confidence, culture, and community that makes equity more than just a nice word on the wall.
      </p>
      <p>
        Whether you’re a startup dipping your toe into the DEI&amp;B waters or a seasoned changemaker looking to go deeper, let me walk with you with curiosity, compassion, and the occasional well-timed “have you really thought about that?”
      </p>
      <p>
        Because at the end of the day, inclusion isn’t about perfection, it’s about progress (and a little humour never hurts either).
      </p>
    </div>
  )
}

function LivedExperience() {
  return (
    <section aria-labelledby="lived-experience-title" className="lived-experience">
      <div className="lived-experience__top">
        <div className="lived-experience__intro">
          <h2 className="lived-experience__title" id="lived-experience-title">
            My Lived Experience
          </h2>
          <p>{livedExperienceCopy}</p>
        </div>
        <figure className="lived-experience__portrait">
          <Image
            alt="Portrait of Chuks Etuka"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 980px) 90vw, 556px"
            src={assets.portrait}
          />
        </figure>
      </div>
      <p className="lived-experience__full-copy">{livedExperienceCopy}</p>
    </section>
  )
}

function ProfessionalExperience() {
  return (
    <section aria-labelledby="experience-title" className="professional-experience" id="professional-experience">
      <h2 className="section-title" id="experience-title">
        Professional experience
      </h2>
      <p className="professional-experience__copy">
        For over 20 years, I’ve been deep in the trenches (and occasionally the boardroom), working across the social justice, charity, public, and private sectors. I’ve led, listened, learned and let’s be honest, occasionally rolled my eyes at well-meaning “diversity days” with zero follow-through. From my early days in frontline work to navigating the wild world of leadership, I’ve coached teams, guided strategic shake-ups, built inclusive frameworks, and designed DEI&amp;B strategies that are less buzzword, more blueprint. I’ve co-created mentoring schemes, built peer-led support networks, challenged inequity wherever it shows up (yes, even in the office kitchen), and hosted the kind of honest, sometimes awkward conversations that spark actual change. These days, I partner with organisations who are ready to retire the tick-box approach and actually do the work. Whether it’s through lived experience-led workshops, keynote talks, strategy sessions or leadership coaching. I bring both head and heart (plus a few bad jokes) to the table. Because real inclusion isn’t a poster in the breakroom or a one-off training. It’s a daily practice and a culture shift. So, if you’re ready to stop saying “we should do something” and start doing something, I’m all in.
      </p>
      <figure className="speaking-photo">
        <Image
          alt="Chuks speaking to an audience at a workshop"
          fill
          sizes="(max-width: 980px) 100vw, 1016px"
          src={assets.speaking}
        />
      </figure>
    </section>
  )
}

function PulseCard() {
  return (
    <section aria-labelledby="pulse-title" className="pulse-card">
      <div className="pulse-card__copy">
        <h2 id="pulse-title">Is your culture inclusive… or just well-branded?</h2>
        <p>Take the 5-minute Inclusion Pulse Check · 10 questions · instant result</p>
      </div>
      <a
        className="action-link action-link--teal pulse-card__link"
        href="/pulse-check"
      >
        <span>Start the pulse check</span>
        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </a>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="closing-section" id="contact">
      <div className="contact-card">
        <h2>Impressed? Want to work with me?</h2>
        <p>Tell me where your organisation is today, and we’ll work out the next step together.</p>
        <div className="contact-card__actions">
          <a className="action-link action-link--orange" href="/book-a-call">
            <span>Book a call</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
          <a className="action-link action-link--outline" href="/contact">
            <span>Send me a message</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function FounderPage() {
  return (
    <div className="founder-site" id="top">
      <DesktopSidebar />
      <MobileHeader logoSrc={assets.logo}>
        <NavigationLinks mobile />
        <div className="mobile-menu__contact">
          <BookCallLink className="sidebar-book-link" />
          <a className="mobile-email" href="mailto:info@chuksetukaconsulting.com">
            info@chuksetukaconsulting.com
          </a>
        </div>
      </MobileHeader>
      <main className="founder-main">
        <div className="founder-content">
          <IntroSection />
          <PhotoStrip />
          <AboutCopy />
          <LivedExperience />
          <ProfessionalExperience />
          <PulseCard />
          <ContactSection />
          <SiteFooter />
        </div>
      </main>
    </div>
  )
}
