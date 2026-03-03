"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, setConsent } from "@/lib/consent";
import { ff } from "@/lib/landing/palette";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  function handleAccept() {
    setConsent("granted");
    setVisible(false);
  }

  function handleDecline() {
    setConsent("denied");
    setVisible(false);
  }

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6"
      style={{ fontFamily: ff }}
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-xl rounded-2xl border border-[#E8E4DF] bg-white shadow-lg px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-[#555] leading-relaxed flex-1">
          We use cookies for analytics to improve your experience. No data is
          shared or sold.{" "}
          <a href="/privacy" className="underline text-[#002833] hover:text-[#003d4d]">
            Privacy Policy
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-full border border-[#E8E4DF] px-5 py-2 text-sm font-medium text-[#555] hover:bg-[#F5F4F2] transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-[#002833] px-5 py-2 text-sm font-medium text-[#F0EDE8] hover:bg-[#003d4d] transition-colors cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
