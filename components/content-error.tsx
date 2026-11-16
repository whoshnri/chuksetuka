import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function ContentError({
  title = "Something went wrong",
  message = "We couldn't load this content right now. Please try again in a moment.",
  returnHref = "/",
  returnLabel = "Return home",
}: {
  title?: string
  message?: string
  returnHref?: string
  returnLabel?: string
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-5 px-6 py-20 text-center">
      <h1 className="m-0 font-[var(--font-heading)] text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="m-0 max-w-md text-base leading-7 text-[#4a4542]">
        {message}
      </p>
      <Link
        href={returnHref}
        className="inline-flex items-center gap-2 font-semibold text-[#0f6e73] no-underline hover:underline"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {returnLabel}
      </Link>
    </div>
  )
}
