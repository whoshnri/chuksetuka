'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

type NavGroupProps = {
  label: string
  active: boolean
  children: ReactNode
}

/** Expandable nav section: a real toggle button (no dead link), keyboard + Escape + click-outside aware. */
export function NavGroup({ label, active, children }: NavGroupProps) {
  const [open, setOpen] = useState(active)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open || active) return
    // Listen on click, not pointerdown: collapsing on pointerdown shifts the menu
    // under the finger mid-tap, so the tap lands on whatever slid into that spot.
    function onPointer(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('click', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, active])

  return (
    <div className="nav-group" ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        className={`nav-link nav-link--group${active ? ' nav-link--active-group' : ''}`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <div className="nav-sublist" id={listId} hidden={!open}>
        {children}
      </div>
    </div>
  )
}
