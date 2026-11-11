"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const organisation = String(formData.get("organisation") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    setSending(true)
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, organisation, email, phone, message, website: String(formData.get("website") ?? "") }),
      })
      const result = await response.json().catch(() => ({})) as { error?: string }
      if (!response.ok) throw new Error(result.error || "Your message could not be sent. Please try again.")
      setSubmitted(true)
      form.reset()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your message could not be sent. Please try again.")
    } finally { setSending(false) }
  }

  return (
    <form className="contact-form !gap-6" onSubmit={handleSubmit}>
      <input className="hidden" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <FieldGroup className="!grid !grid-cols-1 !gap-x-5 !gap-y-5 sm:!grid-cols-2">
        <Field>
          <FieldLabel className="!font-sans !text-sm !font-semibold" htmlFor="contact-name">Full name <span aria-hidden="true">*</span></FieldLabel>
          <Input className="!h-12 !rounded-md !border-[#cfd6d5] !bg-white !px-4 focus-visible:!border-[#17686c] focus-visible:!ring-[#17686c]/25" id="contact-name" name="name" autoComplete="name" maxLength={100} required />
        </Field>
        <Field>
          <FieldLabel className="!font-sans !text-sm !font-semibold" htmlFor="contact-organisation">Organisation</FieldLabel>
          <Input className="!h-12 !rounded-md !border-[#cfd6d5] !bg-white !px-4 focus-visible:!border-[#17686c] focus-visible:!ring-[#17686c]/25" id="contact-organisation" name="organisation" autoComplete="organization" maxLength={160} />
        </Field>
        <Field>
          <FieldLabel className="!font-sans !text-sm !font-semibold" htmlFor="contact-email">Email address <span aria-hidden="true">*</span></FieldLabel>
          <Input className="!h-12 !rounded-md !border-[#cfd6d5] !bg-white !px-4 focus-visible:!border-[#17686c] focus-visible:!ring-[#17686c]/25" id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </Field>
        <Field>
          <FieldLabel className="!font-sans !text-sm !font-semibold" htmlFor="contact-phone">Phone number <span className="field-optional">(optional)</span></FieldLabel>
          <Input className="!h-12 !rounded-md !border-[#cfd6d5] !bg-white !px-4 focus-visible:!border-[#17686c] focus-visible:!ring-[#17686c]/25" id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </Field>
        <Field className="sm:!col-span-2">
          <FieldLabel className="!font-sans !text-sm !font-semibold" htmlFor="contact-message">How can I help? <span aria-hidden="true">*</span></FieldLabel>
          <Textarea className="!min-h-36 !rounded-md !border-[#cfd6d5] !bg-white !px-4 !py-3 focus-visible:!border-[#17686c] focus-visible:!ring-[#17686c]/25" id="contact-message" name="message" rows={5} maxLength={5000} required />
          <FieldDescription>Share a little about what you’re looking for and any helpful context.</FieldDescription>
        </Field>
      </FieldGroup>
      <Button type="submit" size="lg" disabled={sending || submitted} className="contact-form__submit !rounded-md !bg-[#e9611b] !text-white hover:!bg-[#ca4d10]">{sending ? "Sending…" : submitted ? "Message sent" : "Send message"}</Button>
      {submitted && <p className="m-0 text-sm text-brand-teal-ink" role="status">Thanks for getting in touch. Your message has been received.</p>}
      {error && <p className="m-0 text-sm text-red-700" role="alert">{error}</p>}
    </form>
  )
}
