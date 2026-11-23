import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { ContentError } from "@/components/content-error"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <SiteShell activePage="home">
      <ContentError
        title="Page not found"
        message="Sorry, we couldn't find the page you're looking for. It may have been moved or removed."
        returnHref="/"
        returnLabel="Return home"
      />
    </SiteShell>
  )
}
