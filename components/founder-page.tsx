import Image from 'next/image'
import { ArrowRight } from './phosphor-icons'
import { PageCta } from './site-ui'
import { SiteShell } from './site-shell'
import { FounderPhotoMarquee } from './founder-photo-marquee'

const assets = {
  portrait:
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/5ZGATY1JVY85Y2FAHXX29MDAA4.jpg',
  speaking:
    'https://app.paper.design/file-assets/01M649F2ZY5MK8CYFX2Q256K2N/1CBNK4YJ1SJBDQ9HCE6YRE2YM3.jpg',
}

const livedExperienceCopy = `Hi, I’m Chuks Etuka, you can call me Chuks. It is the short form for Chukwunweike. It is not spelt ‘Chucks’, Chuck’, ‘Chiks’, ‘Tuks’, Chooooks…. It is simply Chuks…I am a DEI&B leader, speaker, and strategist with a solid 20+ years under my belt working across social justice, charity, public, and private sectors. Basically, I’ve been around the block (and probably redesigned a few ramps while I was at it). As a proud Black man living with a disability, I don’t get to “opt out” of conversations about race, inclusion, or accessibility, my very existence is the conversation. I’ve walked into rooms where I’ve been underestimated before I even spoke. I’ve had to navigate systems that weren’t built for bodies like mine and question whether I was being excluded because of my skin colour, my disability or both.`

function IntroSection() {
  return (
    <section aria-labelledby="page-title" className="intro-section !items-center !text-center" id="about">
      <div className="hero-heading-row !grid !grid-cols-1 !justify-items-center !gap-3 !text-center">
        <h1 className="hero-title !w-auto !text-[clamp(52px,7vw,84px)] !leading-[.98]" id="page-title">
          Chuks Etuka
        </h1>
      </div>
      <p className="intro-copy !mx-auto !max-w-4xl !text-base !leading-8 sm:!text-lg">
        Hi, I’m Chuks and I am here to make Diversity, Equity, Inclusion &amp; Belonging (DEI&amp;B) make sense…so you can make a real difference (and not just a really long policy document no one reads).<br />
        Let’s be honest, Diversity, Equity, Inclusion &amp; Belonging can sometimes feel like a minefield of buzzwords, uncomfortable truths, or a never-ending to-do list. I get it. That’s why I am here to meet you where you are (yes, even if that’s somewhere between “we had a DEI&amp;B lunch-and-learn once” and “we’re rewriting the whole handbook”). I am building a values-driven consultancy that helps organisations move beyond the tick boxes and towards building workplaces where actual humans feel seen, heard, and like they belong. That’s the sweet spot.
      </p>
    </section>
  )
}

function AboutCopy() {
  return (
    <div className="about-copy !mx-auto !max-w-4xl">
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
    <section aria-labelledby="lived-experience-title" className="lived-experience !gap-6 !rounded-lg !p-5 sm:!p-8 lg:!p-10">
      <div className="lived-experience__top">
        <div className="lived-experience__intro">
          <h2 className="lived-experience__title !font-light !text-white/90" id="lived-experience-title">
            My Lived Experience
          </h2>
          <p>{livedExperienceCopy}</p>
        </div>
          <figure className="lived-experience__portrait !h-[340px] !rounded-lg sm:!h-[420px] lg:!h-[480px]">
          <Image
            alt="Portrait of Chuks Etuka"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 980px) 90vw, 556px"
            src={assets.portrait}
          />
        </figure>
      </div>
    </section>
  )
}

function ProfessionalExperience() {
  return (
    <section aria-labelledby="experience-title" className="professional-experience !gap-6" id="professional-experience">
      <h2 className="section-title" id="experience-title">
        Professional experience
      </h2>
      <p className="professional-experience__copy">
        For over 20 years, I’ve been deep in the trenches (and occasionally the boardroom), working across the social justice, charity, public, and private sectors. I’ve led, listened, learned and let’s be honest, occasionally rolled my eyes at well-meaning “diversity days” with zero follow-through. From my early days in frontline work to navigating the wild world of leadership, I’ve coached teams, guided strategic shake-ups, built inclusive frameworks, and designed DEI&amp;B strategies that are less buzzword, more blueprint. I’ve co-created mentoring schemes, built peer-led support networks, challenged inequity wherever it shows up (yes, even in the office kitchen), and hosted the kind of honest, sometimes awkward conversations that spark actual change. These days, I partner with organisations who are ready to retire the tick-box approach and actually do the work. Whether it’s through lived experience-led workshops, keynote talks, strategy sessions or leadership coaching. I bring both head and heart (plus a few bad jokes) to the table. Because real inclusion isn’t a poster in the breakroom or a one-off training. It’s a daily practice and a culture shift. So, if you’re ready to stop saying “we should do something” and start doing something, I’m all in.
      </p>
      <figure className="speaking-photo !rounded-lg">
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

export default function FounderPage() {
  return (
    <SiteShell activePage="founder" className="founder-page">
      <div className="founder-content !mx-auto !w-full !max-w-[1016px] !gap-16 lg:!gap-20">
        <IntroSection />
        <FounderPhotoMarquee />
        <AboutCopy />
        <LivedExperience />
        <ProfessionalExperience />
        <PulseCard />
        <PageCta className="page-cta--fancy-teal" title="Impressed? Want to work with me?" description="Tell me where your organisation is today, and we’ll work out the next step together." primaryLabel="Book a call" primaryHref="/book-a-call" />
      </div>
    </SiteShell>
  )
}
