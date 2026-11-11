"use client";

import { useEffect, useState } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { COOKIE_CONSENT_EVENT, readCookieConsent } from "@/lib/browser-preferences";

function allowAnalyticsEvent(event: BeforeSendEvent) {
  // This filter remains registered even after the Analytics component has
  // injected its script, so revoking consent stops later events immediately.
  return readCookieConsent()?.analytics === true ? event : null;
}

export function ConsentAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(readCookieConsent()?.analytics === true);
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (process.env.NODE_ENV !== "production" || !allowed) return null;
  return <Analytics beforeSend={allowAnalyticsEvent} />;
}
