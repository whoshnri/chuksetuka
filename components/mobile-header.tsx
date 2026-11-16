'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { List, X } from './phosphor-icons'

type MobileHeaderProps = {
  logoSrc: string
  children: ReactNode
}

export function MobileHeader({ logoSrc, children }: MobileHeaderProps) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      return
    }
    const timeout = window.setTimeout(() => setVisible(false), 520)
    return () => window.clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [visible])

  function handleNavClick(event: MouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('a')) setOpen(false)
  }

  return (
    <header className="mobile-header">
      <Link aria-label="Chuks Etuka Consulting home" className="mobile-brand" href="/">
        <Image alt="Chuks Etuka Consulting" height={56} src={logoSrc} width={112} />
      </Link>
      <button
        type="button"
        className="mobile-menu__trigger"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <List size={22} />}
      </button>
      {visible && (
        <div
          className={`mobile-menu__panel${open ? ' mobile-menu__panel--open' : ' mobile-menu__panel--closing'}`}
          onClick={handleNavClick}
          data-lenis-prevent
        >
          <div className="mobile-menu__inner">
            {children}
          </div>
        </div>
      )}
    </header>
  )
}
