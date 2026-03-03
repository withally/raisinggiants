/* Global type declarations for GA4 and Meta Pixel */

interface GtagParams {
  [key: string]: string | number | boolean | undefined;
}

type GtagCommand = "config" | "event" | "set" | "consent" | "js";

interface Window {
  gtag?: (...args: [GtagCommand, ...unknown[]]) => void;
  dataLayer?: unknown[];
  fbq?: (...args: unknown[]) => void;
  _fbq?: unknown;
}
