/* Typed analytics helpers — no-ops if scripts aren't loaded */

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", name, params);
  }
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", name, params);
  }
}

export function trackEmailCapture(source: string) {
  trackEvent("email_capture", { source });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { content_name: source });
  }
}

export function trackQuizComplete(archetypeId: string) {
  trackEvent("quiz_complete", { archetype_id: archetypeId });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration", { content_name: archetypeId });
  }
}

export function trackBlueprintInterest() {
  trackEvent("blueprint_interest");
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Subscribe");
  }
}
