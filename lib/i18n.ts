export const locales = ["en", "cs"] as const;
export type Locale = (typeof locales)[number];

// Default site locale (usecs/cs if you want Czech as the default)
export const defaultLocale: Locale = "cs";

export function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && locales.includes(locale as Locale);
}

/**
 * Získá locale z cookie NEXT_LOCALE nebo Accept-Language headeru.
 * Nepadá při chybách a vždy vrátí validní locale.
 */
export function getPreferredLocale(req: { headers: Headers }): Locale {
  // COOKIE → NEXT_LOCALE
  const cookieHeader = req.headers.get("cookie") || "";
  const m = cookieHeader.match(/NEXT_LOCALE=([a-zA-Z-]+)/);
  const cookieLocale = m?.[1];
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // BROWSER → ACCEPT-LANGUAGE
  const accept = req.headers.get("accept-language") || "";
  if (accept) {
    const langs = accept.split(",").map((entry) => {
      const [lang, q] = entry.split(";q=");
      return {
        lang: lang.trim().split("-")[0], // „en-US“ → „en“
        q: q ? parseFloat(q) : 1,
      };
    });

    langs.sort((a, b) => b.q - a.q);
    for (const l of langs) {
      if (isValidLocale(l.lang)) return l.lang as Locale;
    }
  }

  // fallback
  return defaultLocale;
}

/**
 * Vrátí cestu s locale prefixem
 * Př.: getLocalizedPath("/success", "cs") → "/cs/success"
 */
export function getLocalizedPath(basePath: string, locale: Locale) {
  if (!basePath.startsWith("/")) basePath = "/" + basePath;
  return `/${locale}${basePath}`;
}
