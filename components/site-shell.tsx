import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "./phosphor-icons"
import type { ReactNode } from "react"
import { MobileHeader } from "./mobile-header"
import { NavGroup } from "./nav-group"
import { ActionLink, SiteFooter, paperAssets } from "./site-ui"
import { DesktopMenu } from "./desktop-menu"

export type SitePageKey =
  | "home"
  | "about"
  | "founder"
  | "services"
  | "masterclass"
  | "pulse"
  | "insights"
  | "testimonials"
  | "gallery"
  | "book"
  | "contact"
  | "faq"
  | "legal"

type SiteShellProps = {
  activePage: SitePageKey
  children: ReactNode
  className?: string
}

const impactPages: SitePageKey[] = ["about", "founder", "testimonials", "gallery"]
const servicePages: SitePageKey[] = ["services", "masterclass", "pulse", "insights"]

function NavigationLinks({ activePage, mobile = false }: { activePage: SitePageKey; mobile?: boolean }) {
  const impactIsActive = impactPages.includes(activePage)
  const servicesAreActive = servicePages.includes(activePage)
  const navigationClass = mobile ? "site-navigation site-navigation--mobile" : "site-navigation"

  return (
    <nav aria-label="Primary" className={navigationClass}>
      <Link href="/" className={`nav-link${activePage === "home" ? " nav-link--selected" : ""}`} aria-current={activePage === "home" ? "page" : undefined}>
        <span>Home</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
      </Link>
      <NavGroup label="Our Impact" active={impactIsActive}>
          <Link href="/about" className={`nav-link nav-link--sub${activePage === "about" || activePage === "founder" ? " nav-link--selected" : ""}`} aria-current={activePage === "about" ? "page" : undefined}>
            <span>About me</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
          <Link href="/testimonials" className={`nav-link nav-link--sub${activePage === "testimonials" ? " nav-link--selected" : ""}`} aria-current={activePage === "testimonials" ? "page" : undefined}>
            <span>Testimonials</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
          <Link href="/gallery" className={`nav-link nav-link--sub${activePage === "gallery" ? " nav-link--selected" : ""}`} aria-current={activePage === "gallery" ? "page" : undefined}>
            <span>Gallery</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
        </NavGroup>
      <NavGroup label="Services" active={servicesAreActive}>
          <Link href="/services" className={`nav-link nav-link--sub${activePage === "services" ? " nav-link--selected" : ""}`} aria-current={activePage === "services" ? "page" : undefined}>
            <span>Services overview</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
          <Link href="/masterclass" className={`nav-link nav-link--sub${activePage === "masterclass" ? " nav-link--selected" : ""}`} aria-current={activePage === "masterclass" ? "page" : undefined}>
            <span>Masterclass</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
          <Link href="/pulse-check" className={`nav-link nav-link--sub${activePage === "pulse" ? " nav-link--selected" : ""}`} aria-current={activePage === "pulse" ? "page" : undefined}>
            <span>Pulse Check</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
          <Link href="/insights" className={`nav-link nav-link--sub${activePage === "insights" ? " nav-link--selected" : ""}`} aria-current={activePage === "insights" ? "page" : undefined}>
            <span>Insights</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
          </Link>
        </NavGroup>
      <Link href="/contact" className={`nav-link${activePage === "contact" ? " nav-link--selected" : ""}`} aria-current={activePage === "contact" ? "page" : undefined}>
        <span>Contact</span><span className="menu-link-arrow"><ArrowUpRight size={23} /><ArrowUpRight size={23} /></span>
      </Link>
    </nav>
  )
}

function SocialLinks() {
  return (
    <nav aria-label="Social media" className="social-links">
      <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="YouTube"><Image src="https://thesvg.org/icons/youtube/mono.svg" alt="" width={16} height={16} aria-hidden="true" /></a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn"><Image src="https://thesvg.org/icons/linkedin/default.svg" alt="" width={16} height={16} aria-hidden="true" /></a>
    </nav>
  )
}

function DesktopSidebar({ activePage }: { activePage: SitePageKey }) {
  return (
    <aside className="founder-sidebar" aria-label="Site sidebar" data-lenis-prevent>
      <Link href="/" className="brand-link" aria-label="Chuks Etuka Consulting home">
        <Image src={paperAssets.logo} alt="Chuks Etuka Consulting" width={148} height={74} className="brand-image" />
      </Link>
      <div className="nav-bar-actions">
        <ActionLink href="/book-a-call" variant="orange" className="nav-chat fancy-button">Let&apos;s chat</ActionLink>
        <DesktopMenu>
          <NavigationLinks activePage={activePage} />
          <a href="mailto:info@chuksetukaconsulting.com" className="desktop-menu__email">info@chuksetukaconsulting.com</a>
          <div className="desktop-menu__social"><SocialLinks /></div>
        </DesktopMenu>
      </div>
    </aside>
  )
}

export function SiteShell({ activePage, children, className }: SiteShellProps) {
  return (
    <div className="founder-site site-shell" id="top">
      <DesktopSidebar activePage={activePage} />
      <MobileHeader logoSrc={paperAssets.logo}>
        <NavigationLinks activePage={activePage} mobile />
        <div className="mobile-menu__contact">
          <Link href="/book-a-call" className="action-link action-link--orange sidebar-book-link">
            Book a call
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </Link>
          <a href="mailto:info@chuksetukaconsulting.com" className="mobile-email">info@chuksetukaconsulting.com</a>
        </div>
      </MobileHeader>
      <main className="site-main">
        <div className={`site-page-content${className ? ` ${className}` : ""}`}>
          {children}
          <SiteFooter />
        </div>
      </main>
    </div>
  )
}
