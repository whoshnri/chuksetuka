import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { ArrowRight, Play, Scales, Target, UsersThree } from "./phosphor-icons"
import { ScrollQuote } from "./scroll-quote"
import { MasterclassFeature } from "./masterclass-feature"
import { SiteShell } from "./site-shell"
import { Shape } from "./shape"
import { AboutImageCarousel } from "./about-image-carousel"
import { MasterclassFaq } from "./masterclass-faq"
import { AnimatedCount } from "./animated-count"
import { ActionLink, PageCta, PageIntro, PartnerSection, SectionHeading, paperAssets } from "./site-ui"

const homeServices = [
  { label: "Training", title: "Lived experience training & facilitation", copy: "I don’t just talk inclusion; I live it, and I help you embed it in ways that stick." },
  { label: "Strategy", title: "DEI&B strategy development", copy: "No off-the-shelf solutions. Strategies co-created to reflect your culture, your people and your goals." },
  { label: "Leadership", title: "Leadership & culture change", copy: "Inclusion has to start at the top. I help leaders build teams where people feel seen, safe and able to thrive." },
]

const challenges = [
  { title: "Staff feel unseen or unheard", copy: "Especially those with intersectional identities, which damages morale, performance and retention." },
  { title: "Leaders aren’t sure what to do next", copy: "They want to do better but feel overwhelmed and risk-averse." },
  { title: "Missteps are already happening", copy: "Microaggressions and exclusionary behaviours happen beneath the surface, and leaders know something needs to change." },
  { title: "Keeping talent is harder than hiring it", copy: "Recruiting diverse talent is one thing. People don’t just want roles, they want belonging." },
]

const aboutImages = [
  { src: paperAssets.aboutPortrait, alt: "Chuks Etuka at a community training event" },
  { src: paperAssets.galleryOne, alt: "Chuks Etuka with participants after an inclusive practice training" },
  { src: paperAssets.galleryThree, alt: "Chuks Etuka checking in with a breakout group" },
  { src: paperAssets.galleryFour, alt: "Chuks Etuka facilitating a staff training session" },
]

const serviceRows = [
  {
    id: "training",
    image: paperAssets.serviceTraining,
    alt: "Chuks facilitating an inclusive practice training session",
    title: "Lived experience training & facilitation",
    copy: "Workshops rooted in lived experience and trauma-informed practice that help teams build empathy, challenge bias and move from awareness to action.",
    listTitle: "Most requested sessions",
    items: ["Race, disability & mental health", "Allyship & inclusive leadership", "Anti-racism in practice", "Psychological safety at work", "Intersectionality in action"],
    action: "Explore the Inclusive Practice Masterclass",
    href: "/masterclass",
  },
  {
    id: "strategy",
    image: paperAssets.serviceStrategy,
    alt: "Inclusive strategy workshop notes on a table",
    title: "DEI&B strategy development",
    copy: "Good intentions won’t dismantle structural inequity on their own. I help you move from talking about change to making it, in a way that is practical and measurable.",
    listTitle: "What I can help with",
    items: ["DEI&B audits and discovery", "Policy and process reviews", "Vision and values alignment", "Strategic planning with KPIs and governance", "Comms and change management support"],
  },
  {
    id: "leadership",
    image: paperAssets.serviceLeadership,
    alt: "Inclusive leadership workshop participants in discussion",
    title: "Leadership & culture change",
    copy: "Culture change starts with leadership. I work with boards, exec teams and people managers to lead with empathy and make psychological safety the norm.",
    listTitle: "My support includes",
    items: ["Inclusive leadership development", "1:1 coaching and team sessions", "Culture diagnostics and behavioural frameworks", "Board and senior team facilitation", "Support through organisational transitions"],
  },
  {
    id: "keynotes",
    image: paperAssets.serviceKeynote,
    alt: "Chuks speaking to a conference audience",
    title: "Keynotes, advisory & bespoke solutions",
    copy: "Big stage, small room or Zoom. A keynote that makes people think, a custom workshop, or a trusted strategic partner, tailored to your context.",
    listTitle: "I offer",
    items: ["Keynote talks and panel participation", "Bespoke workshops and away days", "Strategic advisory and thought partnership", "Comms and campaign support"],
  },
]

const masterclassModules = {
  core: ["Inclusive leadership in practice", "Psychological safety and power dynamics", "Embedding equity into everyday decisions", "Accountability without blame"],
  deep: ["Race, disability and intersectionality", "Calling in vs calling out", "Applying inclusive leadership to real scenarios"],
  included: ["Pre-session diagnostic questionnaire", "Practical toolkit and reflection framework", "Post-session action summary for senior leaders", "Optional follow-up accountability session"],
}

const bookingSteps = [
  { mark: "A", title: "Scoping call", copy: "A short conversation to understand your team’s challenges and make sure the workshop is the right fit." },
  { mark: "B", title: "Tailored proposal", copy: "A clear outline of core and deeper dive modules, with a transparent breakdown of your investment." },
  { mark: "C", title: "Practical setup", copy: "You handle the invites and the room, physical or virtual. I provide short briefing notes for your team." },
  { mark: "D", title: "The workshop", copy: "A high-impact, practical session that moves your culture from polite silence to confident, inclusive leadership." },
  { mark: "E", title: "Impact check-in (optional)", copy: "A follow-up to see how the Monday morning changes are landing and where further support helps." },
]

export function HomePage() {
  return (
    <SiteShell activePage="home" className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__top">
          <div className="home-hero__copy">
            <h1 id="home-title">Decode DEI.<br />Build trust.<br />Boost impact.</h1>
            <p>DEI&amp;B can’t be solved with a policy alone. Ticking boxes doesn’t fix culture or power imbalances. I help organisations turn good intentions into tangible action.</p>
            <div className="action-row">
              <ActionLink href="/book-a-call">Book a call</ActionLink>
              <ActionLink href="/services" variant="text">Explore services</ActionLink>
            </div>
          </div>
          <figure className="home-hero__photo media-frame">
            <Image src={paperAssets.homeHero} alt="Chuks Etuka speaking with workshop participants" fill priority sizes="(max-width: 980px) 100vw, 480px" />
          </figure>
        </div>
      </section>
      <section className="home-lived split-section" id="about-chuks">
        <div className="split-section__copy">
          <h2>Lived experience, turned into structural change.</h2>
          <p>Hi, I’m Chuks Etuka, you can call me Chuks. It is the short form for Chukwunweike. It is not spelt ‘Chucks’, Chuck’, ‘Chiks’, ‘Tuks’, Chooooks…. It is simply Chuks…I am a DEI&amp;B leader, speaker, and strategist with a solid 20+ years under my belt working across social justice, charity, public, and private sectors.</p>
          <p>Basically, I’ve been around the block (and probably redesigned a few ramps while I was at it). As a proud Black man living with a disability, I don’t get to “opt out” of conversations about race, inclusion or accessibility. My very existence is the conversation.</p>
          <Link href="/founder" className="text-link">More about Chuks <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <figure className="split-section__photo media-frame">
          <Image src={paperAssets.homeTraining} alt="Chuks Etuka facilitating an inclusive practice training session" fill sizes="(max-width: 980px) 100vw, 480px" />
        </figure>
      </section>

      <section className="home-services" id="services">
        <div className="section-heading-row">
          <SectionHeading title="Practical support for lasting change." />
          <Link href="/services" className="text-link">All services <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="service-card-grid">
          {homeServices.map((service) => (
            <article className="service-card home-service-card" key={service.label}>
              <p className="eyebrow">{service.label}</p>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <Link href="/services" className="text-link service-card__link">Explore {service.label.toLowerCase()} <ArrowRight className="service-card__arrow" size={20} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="impact-panel shape shape-pear-br">
        <div className="impact-panel__intro">
          <p className="eyebrow">How I work</p>
          <h2>I turn good intentions into tangible action.</h2>
          <ActionLink href="/book-a-call" variant="orange">Let&apos;s talk about what can change</ActionLink>
        </div>
        <div className="impact-grid">
          <article className="impact-card"><span>01</span><h3>I decode DEI&amp;B</h3><p>A translator for all things equity and inclusion. No corporate jargon, no academic waffle, just clear insight.</p></article>
          <article className="impact-card"><span>02</span><h3>I build trust</h3><p>Through lived experience and honest conversation, I create spaces where people feel safe enough to be real.</p></article>
          <article className="impact-card"><span>03</span><h3>I boost impact</h3><p>From shifting strategy to shaping culture, I help you move from “we should do something” to change that sticks.</p></article>
        </div>
      </section>

      <ScrollQuote />

      <MasterclassFeature />

      <div className="home-duo">
        <section className="pulse-promo">
          <div><h2>Is your culture inclusive… or just well-branded?</h2><p>Take the 5-minute Inclusion Pulse Check · 10 questions · instant result</p></div>
          <ActionLink href="/pulse-check">Start the pulse check</ActionLink>
        </section>
        <PartnerSection showEyebrow={false} />
      </div>
    </SiteShell>
  )
}

export function AboutPage() {
  return (
    <SiteShell activePage="about" className="about-page">
      <PageIntro eyebrow="About us" title="Making DEI&amp;B make sense, so you can make a real difference." description="I help organisations move beyond the tick boxes and towards workplaces where people feel seen, heard and like they belong.">
        <div className="action-row"><ActionLink href="/book-a-call">Book a call</ActionLink><ActionLink href="/founder" variant="text">Meet Chuks</ActionLink></div>
      </PageIntro>

      <section className="challenge-section">
        <SectionHeading title="What many organisations are realising right now." description="DEI&amp;B can’t be solved with a policy alone. That’s why clients come to Chuks Etuka Consulting." />
        <div className="challenge-grid">
          {challenges.map((challenge, index) => <article className="challenge-card" key={challenge.title}><h3>{challenge.title}</h3><p>{challenge.copy}</p></article>)}
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__copy">
          <h2><AnimatedCount value={20} label="20 plus" /><span>years across social justice, charity, public and private sectors</span></h2>
          <ActionLink href="/founder" variant="teal">More about me</ActionLink>
        </div>
        <AboutImageCarousel images={aboutImages} />
      </section>

      <section className="about-services">
        <SectionHeading title="Four ways to work together" />
        <div className="service-card-grid service-card-grid--four">
          <article className="service-card service-card--video">
            <figure className="about-service-video">
              <Image src={paperAssets.homeSpeaker} alt="Chuks Etuka speaking during a training session" fill sizes="(max-width: 760px) 100vw, 58vw" />
              <span className="about-service-video__shade" aria-hidden="true" />
              <figcaption><Play size={16} />Video placeholder</figcaption>
            </figure>
            <div className="about-service-video__copy">
              <h3>Lived experience training &amp; facilitation</h3>
              <p>Workshops rooted in lived experience, not just theory, designed for honest conversation, reflection and inclusive action.</p>
            </div>
          </article>
          <article className="service-card"><h3>DEI&amp;B strategy development</h3><p>Frameworks that are practical, measurable and grounded in real-world impact, co-created with your organisation.</p></article>
          <article className="service-card"><h3>Leadership &amp; culture change</h3><p>Support for leadership teams to lead with empathy and model inclusive behaviours at every level.</p></article>
          <article className="service-card"><h3>Advisory, keynotes &amp; bespoke solutions</h3><p>Thought leadership and advisory support that is both strategic and heartfelt, on stage or alongside your team.</p></article>
        </div>
      </section>

      <div className="about-page__closing-cards">
        <PartnerSection className="partner-section--featured" />
        <PageCta className="page-cta--home-card" title="Let’s make belonging real, not just a line in the mission statement." description="Book a call to talk through where you are and where you want to be." />
      </div>
    </SiteShell>
  )
}

export function ServicesPage() {
  return (
    <SiteShell activePage="services" className="services-page">
      <PageIntro eyebrow="Services" title="DEI&amp;B training, strategy and leadership support." description="I don’t do off-the-shelf solutions. Everything is tailored to your context, your people and your goals.">
        <div className="action-row"><ActionLink href="/book-a-call">Book a call</ActionLink><ActionLink href="/contact" variant="text">Send me a message</ActionLink></div>
      </PageIntro>

      <div className="service-detail-list !gap-16 lg:!gap-20">
        {serviceRows.map((service, index) => (
          <section className={`service-detail !min-h-0 !gap-8 lg:!gap-14${index % 2 ? " service-detail--reverse" : ""}`} id={service.id} key={service.id}>
            <figure className="service-detail__photo media-frame"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 980px) 100vw, 480px" /></figure>
            <div className="service-detail__copy !gap-5"><h2 className="!font-[var(--font-heading)] !leading-[1.1]">{service.title}</h2><p>{service.copy}</p><h3 className="!font-sans !font-semibold">{service.listTitle}</h3><ul className="!gap-3">{service.items.map((item) => <li className="!text-[15px] !leading-6" key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>{service.href && <Link href={service.href} className="text-link !text-[#e9611b]">{service.action} <ArrowRight size={16} aria-hidden="true" /></Link>}</div>
          </section>
        ))}
      </div>
      <PageCta className="page-cta--fancy-teal" title="Not sure where to start?" description="A short call is the quickest way to find the right format for your organisation." />
    </SiteShell>
  )
}

export function MasterclassPage() {
  const faqs: [string, string][] = [
    ["Is the session confrontational?", "It is direct, but not hostile. The aim of the session is growth, not guilt."],
    ["Will our leaders feel attacked?", "No. They’ll feel stretched, in a way that builds capability, not defensiveness."],
    ["We’ve already done DEI training. Is this different?", "Yes. This is about behaviour and decision-making, not definitions you forget by Tuesday."],
    ["Is it suitable for senior executives?", "Especially for senior executives. Culture shifts from the top."],
    ["Can it be tailored to our organisation?", "Absolutely. Your culture has its own quirks. We’ll work with those."]
  ]

  return (
    <SiteShell activePage="masterclass" className="masterclass-page">
      <section className="masterclass-hero">
        <div className="masterclass-hero__copy"><h1>Stop panicking about saying the wrong thing. Start building an inclusive culture.</h1><p>A workshop for SME leaders, local authorities, education institutions and teams who are tired of “doing DEI” and want to start doing inclusion properly.</p><ActionLink href="/book-a-call">Book a scoping call</ActionLink></div>
        <figure className="masterclass-hero__photo shape shape-pear-tr"><Image src={paperAssets.homeSpeaker} alt="Chuks Etuka speaking at an event" fill priority sizes="(max-width: 980px) 100vw, 44vw" /></figure>
      </section>

      <section className="masterclass-problem"><SectionHeading eyebrow="The challenge" title="Good intentions, but the daily reality is awkward silence." /><div className="problem-list"><p className="!flex !items-start !gap-3 !border-0 !bg-transparent !px-0 !py-4"><ArrowRight className="mt-1 shrink-0 text-[#e9611b]" size={18} aria-hidden="true" /><span>Managers are worried about getting it wrong internally.</span></p><p className="!flex !items-start !gap-3 !border-0 !bg-transparent !px-0 !py-4"><ArrowRight className="mt-1 shrink-0 text-[#e9611b]" size={18} aria-hidden="true" /><span>Someone says something awkward in a meeting, and everyone looks at their laptop.</span></p><p className="!flex !items-start !gap-3 !border-0 !bg-transparent !px-0 !py-4"><ArrowRight className="mt-1 shrink-0 text-[#e9611b]" size={18} aria-hidden="true" /><span>Policies sound inclusive, but culture still runs on good intentions.</span></p><p className="!flex !items-start !gap-3 !border-0 !bg-transparent !px-0 !py-4"><ArrowRight className="mt-1 shrink-0 text-[#e9611b]" size={18} aria-hidden="true" /><span>ERG leads carry unpaid emotional labour.</span></p><p className="!flex !items-start !gap-3 !border-0 !bg-transparent !px-0 !py-4"><ArrowRight className="mt-1 shrink-0 text-[#e9611b]" size={18} aria-hidden="true" /><span>The board wants measurable impact, quickly and without disruption.</span></p><strong>You don’t need another PowerPoint about unconscious bias. You need people who know what to do on Monday morning.</strong></div></section>

      <section className="masterclass-toolkit"><SectionHeading eyebrow="The practical toolkit" title="A practical toolkit for an inclusive culture." description="This is not a tick-box DEI workshop. It is a practical, honest experience that helps you and your team:"/><div className="toolkit-grid !flex !flex-col !items-start !gap-0">
        <article className="toolkit-card !sticky !top-[120px] !z-[1] !mt-0 !w-[calc(100%_-_32px)] !grid !grid-cols-[56px_minmax(0,1fr)] !items-start !gap-5 !border-0 !rounded-lg !p-[38px_10%_66px_8%] !bg-[var(--brand-teal-ink)] !text-white max-[640px]:!top-[88px] max-[640px]:!w-full max-[640px]:!min-h-0 max-[640px]:!p-[30px_12%_56px_8%] max-[640px]:!grid-cols-[48px_minmax(0,1fr)]"><UsersThree className="!bg-transparent !p-0 !text-white" size={56} aria-hidden="true" /><div className="!grid !grid-cols-[minmax(0,.82fr)_minmax(0,1.35fr)] !gap-x-8 !gap-y-3 max-[640px]:!grid-cols-1"><p className="eyebrow !m-0 !text-xs !font-bold !uppercase !tracking-[.08em] !text-white/75">Meetings &amp; recruitment</p><h3 className="!m-0 !max-w-[23ch] !text-[clamp(22px,2.1vw,29px)] !font-semibold !leading-[1.18] !text-white">See inclusive practice in real situations</h3><p className="!m-0 !max-w-[54ch] !text-base !leading-[1.6] !text-white/90">How to run meetings where quieter voices are heard, and structure recruitment panels so “culture fit” doesn’t become code for “people like us”.</p></div></article>
        <article className="toolkit-card !sticky !top-[132px] !z-[2] !-mt-6 !ml-2 !w-[calc(100%_-_32px)] !grid !grid-cols-[56px_minmax(0,1fr)] !items-start !gap-5 !border-0 !rounded-lg !p-[38px_10%_66px_8%] !bg-[var(--brand-coral-ink)] !text-white max-[640px]:!ml-0 max-[640px]:!top-[100px] max-[640px]:!w-full max-[640px]:!min-h-0 max-[640px]:!-mt-4 max-[640px]:!p-[30px_12%_56px_8%] max-[640px]:!grid-cols-[48px_minmax(0,1fr)]"><Scales className="!bg-transparent !p-0 !text-white" size={56} aria-hidden="true" /><div className="!grid !grid-cols-[minmax(0,.82fr)_minmax(0,1.35fr)] !gap-x-8 !gap-y-3 max-[640px]:!grid-cols-1"><p className="eyebrow !m-0 !text-xs !font-bold !uppercase !tracking-[.08em] !text-white/75">Everyday bias</p><h3 className="!m-0 !max-w-[23ch] !text-[clamp(22px,2.1vw,29px)] !font-semibold !leading-[1.18] !text-white">Spot where bias sneaks in</h3><p className="!m-0 !max-w-[54ch] !text-base !leading-[1.6] !text-white/90">In meetings, recruitment, promotion and performance reviews.</p></div></article>
        <article className="toolkit-card !sticky !top-[144px] !z-[3] !-mt-6 !ml-4 !w-[calc(100%_-_32px)] !grid !grid-cols-[56px_minmax(0,1fr)] !items-start !gap-5 !border-0 !rounded-lg !p-[38px_10%_66px_8%] !bg-[var(--brand-wine-ink)] !text-white max-[640px]:!ml-0 max-[640px]:!top-[112px] max-[640px]:!w-full max-[640px]:!min-h-0 max-[640px]:!-mt-4 max-[640px]:!p-[30px_12%_56px_8%] max-[640px]:!grid-cols-[48px_minmax(0,1fr)]"><Target className="!bg-transparent !p-0 !text-white" size={56} aria-hidden="true" /><div className="!grid !grid-cols-[minmax(0,.82fr)_minmax(0,1.35fr)] !gap-x-8 !gap-y-3 max-[640px]:!grid-cols-1"><p className="eyebrow !m-0 !text-xs !font-bold !uppercase !tracking-[.08em] !text-white/75">Decision-making</p><h3 className="!m-0 !max-w-[23ch] !text-[clamp(22px,2.1vw,29px)] !font-semibold !leading-[1.18] !text-white">Make decisions differently</h3><p className="!m-0 !max-w-[54ch] !text-base !leading-[1.6] !text-white/90">Move from “we value diversity” to “here’s how we make decisions differently”.</p></div></article>
        <article className="toolkit-card !sticky !top-[156px] !z-[4] !-mt-6 !ml-2 !w-[calc(100%_-_32px)] !grid !grid-cols-[56px_minmax(0,1fr)] !items-start !gap-5 !border-0 !rounded-lg !p-[38px_10%_66px_8%] !bg-[var(--brand-green-ink)] !text-white max-[640px]:!ml-0 max-[640px]:!top-[124px] max-[640px]:!w-full max-[640px]:!min-h-0 max-[640px]:!-mt-4 max-[640px]:!p-[30px_12%_56px_8%] max-[640px]:!grid-cols-[48px_minmax(0,1fr)]"><UsersThree className="!bg-transparent !p-0 !text-white" size={56} aria-hidden="true" /><div className="!grid !grid-cols-[minmax(0,.82fr)_minmax(0,1.35fr)] !gap-x-8 !gap-y-3 max-[640px]:!grid-cols-1"><p className="eyebrow !m-0 !text-xs !font-bold !uppercase !tracking-[.08em] !text-white/75">Shared accountability</p><h3 className="!m-0 !max-w-[23ch] !text-[clamp(22px,2.1vw,29px)] !font-semibold !leading-[1.18] !text-white">Build accountability without fear</h3><p className="!m-0 !max-w-[54ch] !text-base !leading-[1.6] !text-white/90">Responsibility for inclusive behaviour, without public shaming.</p></div></article>
        <article className="toolkit-card !sticky !top-[204px] !z-[5] !-mt-6 !w-[calc(100%_-_32px)] !grid !grid-cols-[56px_minmax(0,1fr)] !items-start !gap-5 !border-0 !rounded-lg !p-[38px_10%_66px_8%] !bg-[var(--brand-teal-ink)] !text-white max-[640px]:!top-[172px] max-[640px]:!w-full max-[640px]:!min-h-0 max-[640px]:!-mt-4 max-[640px]:!p-[30px_12%_56px_8%] max-[640px]:!grid-cols-[48px_minmax(0,1fr)]"><Target className="!bg-transparent !p-0 !text-white" size={56} aria-hidden="true" /><div className="!grid !grid-cols-[minmax(0,.82fr)_minmax(0,1.35fr)] !gap-x-8 !gap-y-3 max-[640px]:!grid-cols-1"><p className="eyebrow !m-0 !text-xs !font-bold !uppercase !tracking-[.08em] !text-white/75">Action</p><h3 className="!m-0 !max-w-[23ch] !text-[clamp(22px,2.1vw,29px)] !font-semibold !leading-[1.18] !text-white">Move from policy to behaviour</h3><p className="!m-0 !max-w-[54ch] !text-base !leading-[1.6] !text-white/90">Leave with actions your team can apply immediately.</p></div></article>
      </div></section>

      <section className="masterclass-modules"><SectionHeading title="Modules and materials"/><div className="module-grid"><article><p className="eyebrow">Core modules</p><ul>{masterclassModules.core.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></article><article><p className="eyebrow">Deeper dive modules</p><ul>{masterclassModules.deep.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></article><article className="module-grid__included"><h3>You will also receive</h3><ul>{masterclassModules.included.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></article></div></section>

      <section className="booking-steps"><SectionHeading title="A simple, low-friction booking process."/><ol>{bookingSteps.map((step) => <li key={step.mark}><span>{step.mark}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol></section>

      <section className="investment-card"><div><span className="investment-card__coin" aria-hidden="true">🪙</span><h2>From £1,800</h2><p>Depending on group size, delivery format and whether it is a half or full day session.</p><p>Significantly cheaper than a discrimination claim, or losing brilliant staff.</p><ActionLink href="/book-a-call" variant="orange">Book a call</ActionLink></div><dl><div><dt>You’ll get</dt><dd>Honesty, clarity and practical tools</dd></div><div><dt>Facilitator</dt><dd>Culture change consultant, speaker and facilitator with lived experience</dd></div><div><dt>Follow-up</dt><dd>Optional impact check-in</dd></div></dl></section>

      <section className="masterclass-feedback"><SectionHeading eyebrow="Feedback from the room" title="The work stays with you after the session."/><div className="quote-grid"><blockquote>“Chuks created a space that was challenging but safe. We left with real actions, not just awareness.”</blockquote><blockquote>“The most practical inclusion session I have ever been part of. It shifted my way of thinking.”</blockquote><blockquote>“Honest, funny and deeply strategic. Exactly what our senior team needed.”</blockquote></div><Link href="/testimonials" className="text-link">Read more testimonials <ArrowRight size={16} aria-hidden="true" /></Link></section>

      <section className="masterclass-faq"><SectionHeading title="Questions leaders ask."/><MasterclassFaq faqs={faqs} /></section>
      <PageCta className="page-cta--fancy-teal masterclass-page__cta" title="Ready to stop tiptoeing around inclusion?" description="Start leading with confidence, clarity and competence." />
    </SiteShell>
  )
}
