export const COOKIE_CONSENT_KEY = "cec-cookie-consent";
export const NEWSLETTER_DISMISSAL_KEY = "cec-newsletter-dismissed-until";
export const NEWSLETTER_SUBSCRIBED_COOKIE = "cec-newsletter-subscribed";
export const COOKIE_CONSENT_EVENT = "cec-cookie-consent-change";

export function hasNewsletterSubscriptionCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${NEWSLETTER_SUBSCRIBED_COOKIE}=`));
}

export function storeNewsletterSubscriptionCookie() {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${NEWSLETTER_SUBSCRIBED_COOKIE}=1; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
}

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  expiresAt: number;
};

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof value.analytics !== "boolean" || typeof value.expiresAt !== "number") return null;
    if (value.expiresAt <= Date.now()) {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      return null;
    }
    return { necessary: true, analytics: value.analytics, expiresAt: value.expiresAt };
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean) {
  if (typeof window === "undefined") return;
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
