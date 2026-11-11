'use client'

import { List, X } from './phosphor-icons'
import { useEffect, useState, type ReactNode } from 'react'

type DesktopMenuProps = {
  children: ReactNode
}

export function DesktopMenu({ children }: DesktopMenuProps) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setVisible(true)
      return
    }

    const timeout = window.setTimeout(() => setVisible(false), 720)
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

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  return (
    <div className="desktop-menu">
      <button
        type="button"
        className="desktop-menu__trigger"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={25} /> : <List size={25} />}
      </button>
      {visible && (
        <div className={`desktop-menu__panel${open ? ' desktop-menu__panel--open' : ' desktop-menu__panel--closing'}`}>
          <div className="desktop-menu__inner" onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) setOpen(false)
          }}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
