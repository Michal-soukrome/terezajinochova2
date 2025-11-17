// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, getPreferredLocale } from "@/lib/i18n";
import { routes } from "@/lib/routes";

/**
 * Proxy handler pro i18n + canonical slug verificaton.
 * Nahrazuje deprecated middleware konvenci.
 */
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Pokud jde o assety / API / _next, nech průchod nezměněný
  const isPublicFile =
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.[^\/]+$/.test(pathname); // simple file check

  if (isPublicFile) {
    return NextResponse.next();
  }

  // Zkontroluj, jestli URL již obsahuje locale prefix
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    // Máme prefix, ověř slugy
    const parts = pathname.split("/").filter(Boolean); // ["cs", "zakladni", ...]
    const locale = parts[0];
    const slug = parts[1];

    if (slug) {
      const routeKey = Object.keys(routes).find((key) => {
        const r = routes[key as keyof typeof routes];
        return r[locale as keyof typeof r] === slug;
      });

      if (!routeKey) {
        // pokud slug neodpovídá žádné lokalizované routě, přesměruj na locale root
        const redirectUrl = new URL(`/${locale}`, request.url);
        // nastav cookie NEXT_LOCALE pro konzistenci budoucích návštěv
        const res = NextResponse.redirect(redirectUrl);
        res.cookies.set("NEXT_LOCALE", locale);
        return res;
      }

      // Pokud je slug lokalizovaný, přesměruj na kanonickou anglickou verzi
      const canonicalSlug = routes[routeKey as keyof typeof routes].en;
      if (slug !== canonicalSlug) {
        // Přepiš na kanonickou verzi pro interní routing a zachovej zbytek cesty
        const rest = parts.slice(2).join("/");
        const canonicalPath = `/${locale}/${canonicalSlug}${
          rest ? `/${rest}` : ""
        }`;
        const rewriteUrl = new URL(canonicalPath, request.url);
        return NextResponse.rewrite(rewriteUrl);
      }
    }

    // všechno OK, nezasahujeme
    return NextResponse.next();
  }

  // Nemá locale prefix — rozhodni se na základě cookie / Accept-Language
  const preferred = getPreferredLocale(request) || defaultLocale;

  // redirect na /{preferred}{pathname}
  const redirectTo = new URL(`/${preferred}${pathname}`, request.url);
  const res = NextResponse.redirect(redirectTo);

  // uložíme cookie pro budoucí návštěvy
  res.cookies.set("NEXT_LOCALE", preferred, { path: "/", httpOnly: false });

  return res;
}

/**
 * Matcher: stejný princip jako u middleware. Nezasahuj api a _next
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
