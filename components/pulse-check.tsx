"use client"

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { PageCta, PageIntro } from "./site-ui"

const questions = [
  {
    category: "Leadership & accountability",
    question: "How clearly do leaders own the organisation’s inclusion commitments?",
    options: ["There is no shared ownership yet.", "A few people champion the work, but it is not consistent.", "Leaders have clear responsibilities and review progress.", "Inclusion is built into decisions, governance and accountability."],
  },
  {
    category: "Recruitment & progression",
    question: "How do you check whether recruitment and progression are fair?",
    options: ["We do not review these processes for barriers.", "We respond when a concern is raised.", "We review key stages and make changes when gaps appear.", "We regularly examine outcomes, involve people affected and act on what we learn."],
  },
  {
    category: "Recruitment & progression",
    question: "When recruiting, how much consideration is given to accessibility and inclusion?",
    options: ["We use the same process for everyone and assume it is fair.", "We make adjustments when candidates request them.", "We review the process to remove barriers and communicate access options.", "Accessibility is designed in from the role brief through onboarding, and outcomes are reviewed."],
  },
  {
    category: "Accessibility & accommodations",
    question: "How accessible are your everyday meetings, materials and services?",
    options: ["Access needs are considered only when a problem comes up.", "We make reasonable changes when someone asks.", "We use shared guidance and plan for access needs in advance.", "Accessibility is part of service design, procurement and everyday practice."],
  },
  {
    category: "Accessibility & accommodations",
    question: "How do you respond when someone asks for an adjustment?",
    options: ["There is no clear process or named contact.", "We handle requests individually, when they arise.", "People know how to request support and responses are tracked.", "We learn from requests and proactively remove recurring barriers."],
  },
  {
    category: "Culture & belonging",
    question: "How safe do people feel raising concerns about exclusion or bias?",
    options: ["People rarely raise concerns, and we do not know why.", "There is a formal route, but people may not trust it.", "People know where to go and leaders respond consistently.", "People can speak up early, see follow-through and help shape improvements."],
  },
  {
    category: "Culture & belonging",
    question: "How do you know whether people feel they belong at work?",
    options: ["We rely on general impressions.", "We ask occasionally, but do not always act on feedback.", "We gather feedback safely and discuss what it means.", "We combine feedback and evidence, then share actions and progress."],
  },
  {
    category: "Leadership & accountability",
    question: "How often are your policies and everyday processes reviewed for inequity?",
    options: ["They are reviewed only when something goes wrong.", "We review them on a schedule, but inclusion is not always part of it.", "We consider equality and access impacts when making changes.", "People affected help shape reviews, decisions and follow-up."],
  },
  {
    category: "Measurement & learning",
    question: "How do you measure progress on inclusion?",
    options: ["We do not have agreed measures yet.", "We track activity, such as training delivered.", "We review actions and relevant workforce or service data.", "We combine outcomes, lived experience and regular review to adjust our approach."],
  },
  {
    category: "Measurement & learning",
    question: "What happens after inclusion training or a strategy launch?",
    options: ["There is no planned follow-up.", "Participants receive resources, but next steps are informal.", "Actions have owners and are reviewed after the activity.", "Learning is built into ongoing practice, leadership and accountability."],
  },
]

const scoreBands = [
  { min: 10, max: 19, name: "Building foundations", message: "You have a place to start. Focus on listening, clear ownership and a small number of practical changes." },
  { min: 20, max: 27, name: "Progressing", message: "You have useful foundations, but the work may not be consistent yet. Strengthen ownership and close the loop on feedback." },
  { min: 28, max: 34, name: "Embedding inclusion", message: "Inclusion is becoming part of how you work. Keep reviewing outcomes and make accountability visible across teams." },
  { min: 35, max: 40, name: "Leading with inclusion", message: "You have strong practice to build on. Keep learning from lived experience and guard against treating progress as finished." },
]

function getScoreBand(score: number) {
  return scoreBands.find((band) => score >= band.min && score <= band.max) ?? scoreBands[0]
}

export function PulseCheck() {
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const flowHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    flowHeadingRef.current?.focus({ preventScroll: true })
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    window.scrollTo({ top: 0, behavior })
  }, [step])

  const totalScore = useMemo(() => Object.values(answers).reduce((total, answer) => total + answer + 1, 0), [answers])
  const band = getScoreBand(totalScore)
  const categoryScores = useMemo(() => {
    const scores = new Map<string, { score: number; total: number }>()
    questions.forEach((question, index) => {
      const answer = answers[index]
      if (answer === undefined) return
      const current = scores.get(question.category) ?? { score: 0, total: 0 }
      current.score += answer + 1
      current.total += 4
      scores.set(question.category, current)
    })
    return [...scores.entries()].map(([category, result]) => ({ category, ...result }))
  }, [answers])

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (answers[step] === undefined) return
    setStep((current) => current + 1)
  }

  function handlePrevious() {
    if (step <= 0) {
      setStep(-1)
      return
    }
    setStep((current) => current - 1)
  }

  function restart() {
    setAnswers({})
    setStep(-1)
  }

  if (step === -1) {
    return (
      <div className="pulse-intro">
        <PageIntro title="Is your culture inclusive… or just well-branded?" description="A quick, honest look at what inclusion feels like day to day in your organisation." />
        <ul className="pulse-chips !gap-0" aria-label="At a glance"><li className="!rounded-none !border !border-r-0 !border-[#17686c] !bg-[#17686c] !text-white first:!rounded-l-md">5 minutes</li><li className="!rounded-none !border !border-r-0 !border-[#17686c] !bg-[#e8f5f6] !text-[#17686c]">10 questions</li><li className="!rounded-none !border !border-[#17686c] !bg-[#e8f5f6] !text-[#17686c] last:!rounded-r-md">Instant result</li></ul>
        <section className="pulse-intro__card !gap-8 !p-[36px_7%_72px] max-sm:!p-[28px_9%_56px]">
          <div className="!gap-5"><h2 className="!font-[var(--font-heading)]">Ten questions. A clearer next step.</h2><p className="!text-white/90">Answer honestly. There are no perfect scores and no judgement. You’ll get an instant snapshot across leadership, recruitment, accessibility, culture and measurement.</p><Button className="!rounded-md" size="lg" onClick={() => setStep(0)}>Start the pulse check <ArrowRight data-icon="inline-end" /></Button></div>
          <ul className="!gap-3"><li className="!rounded-md !bg-white/15 !px-4 !py-3">Leadership &amp; accountability</li><li className="!rounded-md !bg-white/15 !px-4 !py-3">Recruitment &amp; progression</li><li className="!rounded-md !bg-white/15 !px-4 !py-3">Accessibility &amp; accommodations</li><li className="!rounded-md !bg-white/15 !px-4 !py-3">Culture &amp; belonging</li><li className="!rounded-md !bg-white/15 !px-4 !py-3">Measurement &amp; learning</li></ul>
        </section>
        <p className="pulse-privacy-note !max-w-xl">Your answers stay in this browser session and are not submitted or stored.</p>
      </div>
    )
  }

  if (step < questions.length) {
    const currentQuestion = questions[step]
    const currentAnswer = answers[step] ?? null
    const progress = ((step + 1) / questions.length) * 100

    return (
      <section className="pulse-question" aria-live="polite">
        <Link href="/" className="text-link"><ArrowLeft size={16} aria-hidden="true" />Back to home</Link>
        <div className="pulse-progress"><div className="pulse-progress__label"><span>Question {step + 1} of {questions.length} <span className="pulse-chip">{currentQuestion.category}</span></span><span>{Math.round(progress)}%</span></div><div className="pulse-progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={step + 1}><span style={{ width: `${progress}%` }} /></div></div>
        
        <h1 ref={flowHeadingRef} tabIndex={-1}>{currentQuestion.question}</h1>
        <form onSubmit={handleNext}>
          <FieldSet className="pulse-answers !gap-3">
            <FieldLegend className="sr-only">Choose the answer that best describes your organisation</FieldLegend>
            {currentQuestion.options.map((option, index) => (
              <FieldLabel htmlFor={`pulse-answer-${index}`} className={`pulse-answer !rounded-lg${currentAnswer === index ? " pulse-answer--selected" : ""}`} key={option}>
                <input id={`pulse-answer-${index}`} type="radio" name={`pulse-answer-${step}`} value={index} checked={currentAnswer === index} onChange={() => setAnswers((current) => ({ ...current, [step]: index }))} />
                <span className="pulse-answer__letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </FieldLabel>
            ))}
          </FieldSet>
          <div className="pulse-controls">
            <Button variant="outline" type="button" onClick={handlePrevious}>Back</Button>
            <Button type="submit" size="lg" disabled={currentAnswer === null}> {step === questions.length - 1 ? "See my result" : "Continue"} <ArrowRight data-icon="inline-end" /></Button>
          </div>
        </form>
        <p className="pulse-keyboard-note">Use the arrow keys to move between answers, Space to select and Enter to continue.</p>
      </section>
    )
  }

  return (
    <div className="pulse-result">
      <Link href="/" className="text-link"><ArrowLeft size={16} aria-hidden="true" />Back to home</Link>
      <div className="pulse-result__summary"><h1 ref={flowHeadingRef} tabIndex={-1}>{band.name}</h1><p>{band.message}</p><div className="pulse-score"><strong>{totalScore}</strong><span>/ 40</span></div></div>
      <section className="pulse-result__areas"><div className="section-heading"><h2>Areas to build on.</h2><p>Each area is a conversation starter, not a verdict.</p></div><div className="pulse-score-list">{categoryScores.map((result) => <div className="pulse-score-row" key={result.category}><div><strong>{result.category}</strong><span>{result.score} / {result.total}</span></div><div className="pulse-score-row__track"><span style={{ width: `${(result.score / result.total) * 100}%` }} /></div></div>)}</div></section>
      <section className="pulse-result__actions"><div><h2>Turn this snapshot into a conversation.</h2><p>Choose one area to discuss with your team, then agree who will own the next action and when you’ll review it.</p></div><div className="action-row"><Link href="/book-a-call" className="action-link action-link--teal">Book a call <ArrowRight size={16} aria-hidden="true" /></Link><Button variant="outline" onClick={restart}><RotateCcw data-icon="inline-start" />Retake the pulse check</Button></div></section>
      <PageCta className="page-cta--fancy-teal" title="Ready to move from intention to action?" description="Chuks can help you shape the next step around your organisation." />
    </div>
  )
}
