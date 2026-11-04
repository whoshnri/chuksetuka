'use client'

import { useId, useState } from 'react'
import { Minus, Plus } from './phosphor-icons'

type MasterclassFaqProps = {
  faqs: [string, string][]
}

export function MasterclassFaq({ faqs }: MasterclassFaqProps) {
  const id = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="faq-list masterclass-faq__list">
      {faqs.map(([question, answer], index) => {
        const open = openIndex === index
        const panelId = `${id}-answer-${index}`

        return (
          <article className={`faq-item masterclass-faq__item${open ? ' is-open' : ''}`} key={question}>
            <button
              type="button"
              className="masterclass-faq__trigger !font-sans"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{question}</span>
              <span className="masterclass-faq__icon" aria-hidden="true">
                <Plus className="masterclass-faq__plus" size={22} />
                <Minus className="masterclass-faq__minus" size={22} />
              </span>
            </button>
            <div className="masterclass-faq__panel" id={panelId} aria-hidden={!open}>
              <div className="masterclass-faq__answer"><p>{answer}</p></div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
