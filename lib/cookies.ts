// small cookie helper used by the app
export function setCookie(
  name: string,
  value: string,
  opts?: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: "Lax" | "Strict" | "None";
  }
) {
  const {
    maxAge = 60 * 60 * 24 * 365,
    path = "/",
    secure,
    sameSite = "Lax",
  } = opts || {};
  // If not explicitly provided, enable secure cookie over https in production
  const secureFlagEnabled =
    typeof secure === "boolean"
      ? secure
      : typeof window !== "undefined" && window.location.protocol === "https:";
  // Basic, small-cookie setter; we keep it minimal to avoid adding libs
  const secureFlag = secureFlagEnabled ? "; Secure" : "";
  const sameSiteFlag = sameSite ? `; SameSite=${sameSite}` : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; path=${path}; max-age=${maxAge}${secureFlag}${sameSiteFlag}`;
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  if (!m) return undefined;
  return decodeURIComponent(m[1]);
}
