"use client";

import { useEffect, useState } from "react";
import { readCookieConsent, saveCookieConsent } from "@/lib/browser-preferences";

export function CookiePreferences() {
  const [analytics, setAnalytics] = useState<boolean | null>(null);

  useEffect(() => {
    setAnalytics(readCookieConsent()?.analytics ?? null);
  }, []);

  function choose(value: boolean) {
    saveCookieConsent(value);
    setAnalytics(value);
  }

  return (
    <section className="mt-8 rounded-lg bg-[#e8f5f6] p-6 sm:p-8" aria-labelledby="cookie-settings-title">
      <h2 id="cookie-settings-title" className="m-0 font-sans text-xl font-semibold text-[#163f42]">Your cookie settings</h2>
      <p className="mb-5 mt-2 text-sm leading-6 text-[#36595a]">
        {analytics === null ? "No choice has been saved yet." : analytics ? "Optional analytics are currently enabled." : "Only essential storage is currently enabled."}
      </p>
      <div className="flex flex-wrap gap-3">
        {analytics !== true && <button type="button" onClick={() => choose(true)} className="rounded-lg bg-[#163f42] px-5 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#23595c]">Allow analytics</button>}
        {analytics === null && <button type="button" onClick={() => choose(false)} className="rounded-lg bg-white px-5 py-3 font-sans text-sm font-semibold text-[#163f42] transition hover:bg-white/70">Only essential</button>}
        {analytics === true && <button type="button" onClick={() => choose(false)} className="rounded-lg bg-white px-5 py-3 font-sans text-sm font-semibold text-[#163f42] transition hover:bg-white/70">Disable analytics</button>}
      </div>
      {analytics !== null && <p role="status" className="mb-0 mt-4 text-sm text-[#36595a]">Your choice has been saved for 12 months.</p>}
    </section>
  );
}
