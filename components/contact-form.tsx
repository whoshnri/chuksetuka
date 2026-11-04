"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const organisation = String(formData.get("organisation") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()
    const subject = encodeURIComponent(`Website enquiry from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nOrganisation: ${organisation || "Not provided"}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
    )

    setSubmitted(true)
    window.location.href = `mailto:info@chuksetukaconsulting.com?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form !gap-6" onSubmit={handleSubmit}>
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
      <Button type="submit" size="lg" className="contact-form__submit !rounded-md !bg-[#e9611b] !text-white hover:!bg-[#ca4d10]">Send message</Button>
      <p className="contact-form__note">Required fields are marked with *. Your email app will open with your message ready to send; this form does not store submissions.</p>
      {submitted && <p className="sr-only" role="status">Your email app should open with the enquiry details.</p>}
    </form>
  )
}
