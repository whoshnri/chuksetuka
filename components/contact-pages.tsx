import Link from "next/link"
import { ArrowRight, CalendarBlank as CalendarDays, ChatCircleText, EnvelopeSimple as Mail } from "./phosphor-icons"
import { ContactForm } from "./contact-form"
import { SiteShell } from "./site-shell"

export function BookCallPage() {
  return (
    <SiteShell activePage="book" className="booking-page bk-page">
      <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <h1 className="m-0 font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-[-.04em] sm:text-5xl lg:text-6xl">Let’s start with a conversation.</h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-[#555d5c] sm:text-lg">Book a free 30-minute call to talk through your organisation’s needs and explore the right support.</p>
      </header>
      <section className="mx-auto flex min-h-[420px] w-full max-w-4xl items-center justify-center rounded-lg border border-dashed border-[#cbd5d3] bg-[#f6f8f7] p-8 text-center sm:min-h-[520px]" aria-label="Booking widget placeholder">
        <div className="flex max-w-sm flex-col items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-lg border border-[#d8dfde] bg-white text-[#17686c]"><CalendarDays size={26} aria-hidden="true" /></span>
          <h2 className="m-0 font-[var(--font-heading)] text-xl font-semibold tracking-[-.02em] text-[#171514]">Booking widget placeholder</h2>
        </div>
      </section>
    </SiteShell>
  )
}

export function ContactPage() {
  return (
    <SiteShell activePage="contact" className="contact-page cx-page">
      <header className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
        <h1 className="m-0 max-w-[18ch] font-[var(--font-heading)] text-4xl font-bold leading-[1.05] tracking-[-.04em] sm:text-5xl lg:text-6xl">Tell me what you’re working on.</h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-[#555d5c] sm:text-lg">Share a little about your organisation and the change you want to make. I’ll be in touch to talk through the next step.</p>
      </header>

      <nav className="mx-auto flex max-w-full flex-wrap justify-center gap-0" aria-label="Contact options">
        <Link href="#contact-form" aria-current="location" className="inline-flex min-h-10 items-center rounded-l-md border border-r-0 border-[#17686c] bg-[#17686c] px-4 font-sans text-sm font-semibold text-white no-underline">Message</Link>
        <Link href="/book-a-call" className="inline-flex min-h-10 items-center border border-r-0 border-[#d8dfde] px-4 font-sans text-sm text-[#3a3f40] no-underline transition hover:bg-[#e8f5f6]">Book a call</Link>
        <a href="mailto:info@chuksetukaconsulting.com" className="inline-flex min-h-10 items-center border border-r-0 border-[#d8dfde] px-4 font-sans text-sm text-[#3a3f40] no-underline transition hover:bg-[#e8f5f6]">Email</a>
        <Link href="/faqs" className="inline-flex min-h-10 items-center rounded-r-md border border-[#d8dfde] px-4 font-sans text-sm text-[#3a3f40] no-underline transition hover:bg-[#e8f5f6]">FAQs</Link>
      </nav>

      <section id="contact-options" className="mx-auto w-full max-w-3xl border-y border-[#e0e4e3]" aria-label="Ways to get in touch">
        <a href="#contact-form" className="group flex items-center gap-4 border-b border-[#e0e4e3] py-4 text-inherit no-underline transition-colors hover:bg-[#f7f9f8] sm:gap-5 sm:px-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#d8dfde] bg-white text-[#17686c]"><Mail size={20} aria-hidden="true" /></span>
          <span className="flex min-w-0 flex-1 flex-col gap-1"><strong className="font-sans text-[15px] font-semibold text-[#171514]">Send a message</strong><span className="text-sm leading-5 text-[#5b6264]">Tell me about your organisation and what you’re hoping to change.</span></span>
          <ArrowRight className="shrink-0 text-[#17686c] transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
        </a>
        <Link href="/book-a-call" className="group flex items-center gap-4 border-b border-[#e0e4e3] py-4 text-inherit no-underline transition-colors hover:bg-[#f7f9f8] sm:gap-5 sm:px-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#d8dfde] bg-white text-[#17686c]"><CalendarDays size={20} aria-hidden="true" /></span>
          <span className="flex min-w-0 flex-1 flex-col gap-1"><strong className="font-sans text-[15px] font-semibold text-[#171514]">Book a free discovery call</strong><span className="text-sm leading-5 text-[#5b6264]">A focused 30-minute conversation about your needs and next steps.</span></span>
          <ArrowRight className="shrink-0 text-[#17686c] transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
        </Link>
        <a href="mailto:info@chuksetukaconsulting.com" className="group flex items-center gap-4 py-4 text-inherit no-underline transition-colors hover:bg-[#f7f9f8] sm:gap-5 sm:px-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#d8dfde] bg-white text-[#17686c]"><ChatCircleText size={20} aria-hidden="true" /></span>
          <span className="flex min-w-0 flex-1 flex-col gap-1"><strong className="font-sans text-[15px] font-semibold text-[#171514]">Email me directly</strong><span className="break-all text-sm leading-5 text-[#5b6264]">info@chuksetukaconsulting.com</span></span>
          <ArrowRight className="shrink-0 text-[#17686c] transition-transform group-hover:translate-x-1" size={18} aria-hidden="true" />
        </a>
      </section>

      <section id="contact-form" className="mx-auto w-full max-w-3xl scroll-mt-24" aria-labelledby="contact-form-title">
        <div className="mb-6 flex flex-col gap-2"><h2 id="contact-form-title" className="m-0 font-[var(--font-heading)] text-2xl font-semibold tracking-[-.025em] sm:text-3xl">Send me a message</h2><p className="m-0 text-[15px] leading-6 text-[#5b6264]">I’ll get back to you to talk through a useful next step.</p></div>
        <div className="cx-form-panel !rounded-lg !border-[#d8dfde] !p-5 sm:!p-8"><ContactForm /></div>
      </section>
    </SiteShell>
  )
}
