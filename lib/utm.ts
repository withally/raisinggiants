const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "kin_utm_params";

export type UTMParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Capture UTM params from the current URL and persist to sessionStorage. */
export function captureUTMParams() {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params: UTMParams = {};
  let found = false;

  for (const key of UTM_KEYS) {
    const val = url.searchParams.get(key);
    if (val) {
      params[key] = val;
      found = true;
    }
  }

  // Only overwrite if the current URL actually has UTM params
  if (found) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }
}

/** Retrieve stored UTM params (returns empty object if none). */
export function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UTMParams) : {};
  } catch {
    return {};
  }
}
