import Link from "next/link";
import { PageIntro } from "./site-ui";
import { SiteShell } from "./site-shell";
import { CookiePreferences } from "./cookie-preferences";
import { PrivacyPolicyDownload } from "./privacy-policy-download";
import {
  cookiePolicySections,
  privacyPolicySections,
  privacyPolicyUpdated,
} from "@/lib/privacy-content";

function LegalDocument({
  sections,
}: {
  sections: ReadonlyArray<{ title: string; paragraphs: ReadonlyArray<string> }>;
}) {
  return (
    <div className="mt-10 max-w-3xl space-y-8">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="m-0 font-sans text-xl font-semibold text-[#173f42] sm:text-2xl">{section.title}</h2>
          <div className="mt-3 space-y-3 text-base leading-7 text-[#3f4848]">
            {section.paragraphs.map((paragraph) => <p className="m-0" key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <SiteShell activePage="legal">
      <article className="mx-auto w-full max-w-5xl px-5 pb-16 pt-10 sm:px-10 sm:pt-16 lg:px-14">
        <PageIntro eyebrow="Legal" title="Privacy policy" description="How Chuks Etuka Consulting handles information when you use this website." />
        <p className="mt-5 font-sans text-sm text-[#697271]">Last updated {privacyPolicyUpdated}</p>
        <PrivacyPolicyDownload />
        <LegalDocument sections={privacyPolicySections} />
        <p className="mt-10 border-t border-[#dce3e1] pt-6 text-sm leading-6 text-[#596362]">
          Related: <Link className="font-semibold text-[#bb4e19] underline-offset-4 hover:underline" href="/cookies">Cookie policy and settings</Link>.
        </p>
      </article>
    </SiteShell>
  );
}

export function CookiePolicyPage() {
  return (
    <SiteShell activePage="legal">
      <article className="mx-auto w-full max-w-5xl px-5 pb-16 pt-10 sm:px-10 sm:pt-16 lg:px-14">
        <PageIntro eyebrow="Legal" title="Cookie policy" description="The browser storage this site uses and how to change your choices." />
        <p className="mt-5 font-sans text-sm text-[#697271]">Last updated {privacyPolicyUpdated}</p>
        <LegalDocument sections={cookiePolicySections} />
        <CookiePreferences />
        <p className="mt-8 border-t border-[#dce3e1] pt-6 text-sm leading-6 text-[#596362]">
          Read our <Link className="font-semibold text-[#bb4e19] underline-offset-4 hover:underline" href="/privacy">Privacy policy</Link> for information about personal data.
        </p>
      </article>
    </SiteShell>
  );
}
