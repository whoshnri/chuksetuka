'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { Menu } from 'lucide-react'

type MobileHeaderProps = {
  logoSrc: string
  children: ReactNode
}

export function MobileHeader({ logoSrc, children }: MobileHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null)

  // Close only when a link is followed. Taps on the expandable group buttons
  // ("Our Impact", "Services") must leave the menu open so their sub-links are reachable.
  function closeMenu(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (menuRef.current && target.closest('a')) {
      menuRef.current.open = false
    }
  }

  return (
    <header className="mobile-header">
      <Link aria-label="Chuks Etuka Consulting home" className="mobile-brand" href="/">
        <Image alt="Chuks Etuka Consulting" height={56} src={logoSrc} width={112} />
      </Link>
      <details className="mobile-menu" ref={menuRef}>
        <summary aria-controls="mobile-navigation" className="mobile-menu__trigger">
          <span>Menu</span>
          <Menu aria-hidden="true" size={18} strokeWidth={1.8} />
        </summary>
        <div className="mobile-menu__panel" id="mobile-navigation" onClick={closeMenu} data-lenis-prevent>
          {children}
        </div>
      </details>
    </header>
  )
}
