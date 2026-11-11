'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { Menu } from 'lucide-react'

type MobileHeaderProps = {
  logoSrc: string
  children: ReactNode
}

export function MobileHeader({ logoSrc, children }: MobileHeaderProps) {
  const menuRef = useRef<HTMLDetailsElement>(null)

  function closeMenu() {
    if (menuRef.current) {
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
