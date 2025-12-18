"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { setCookie } from "@/lib/cookies";
import { routes } from "@/lib/routes";
import { PRODUCT_LIST } from "@/lib/products";
import ReactCountryFlag from "react-country-flag";

export function LanguageSwitcher({
  onLanguageChange,
  mode = "flag",
}: {
  onLanguageChange?: () => void;
  mode?: "flag" | "text";
}) {
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: Locale): string => {
    if (!pathname) return `/${newLocale}`;

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0] as Locale;
    const slug = segments[1];
    const maybeProductSlug = segments[2];

    if (!slug) {
      // Homepage
      return `/${newLocale}`;
    }

    // If we are on a product details page (/en/products/:slug), handle it first
    if (slug === routes.products[currentLocale]) {
      const product = PRODUCT_LIST.find(
        (p) => p.slugs[currentLocale] === maybeProductSlug
      );
      if (product) {
        return `/${newLocale}/${routes.products[newLocale]}/${product.slugs[newLocale]}`;
      }
      // No product slug found — fall back to top-level products page
      return `/${newLocale}/${routes.products[newLocale]}`;
    }

    // Find the route key for current slug
    const routeKey = Object.keys(routes).find((key) => {
      const route = routes[key as keyof typeof routes];
      return route[currentLocale] === slug;
    });

    if (routeKey) {
      // Get the slug for new locale
      const newSlug = routes[routeKey as keyof typeof routes][newLocale];
      return `/${newLocale}/${newSlug}`;
    }

    // Fallback to homepage
    return `/${newLocale}`;
  };

  const setLocaleCookie = (locale: Locale) => {
    try {
      setCookie("NEXT_LOCALE", locale, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    } catch {
      // ignore in non-browser environments
    }
  };

  return (
    <div className={mode === "text" ? "flex flex-col gap-2" : "flex gap-2"}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          onClick={() => {
            setLocaleCookie(locale);
            onLanguageChange?.();
          }}
          className={
            mode === "text"
              ? "w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200 "
              : "btn btn-ghost"
          }
          title={locale === "cs" ? "Přepnout na češtinu" : "Switch to English"}
          // když nepoužiju vlajky tak můžu odkomentovat
          // className={locale === "cs" ? "btn-ghost" : "btn-secondary"}
        >
          {mode === "text" ? (
            locale === "cs" ? (
              "Čeština"
            ) : (
              "English"
            )
          ) : locale === "cs" ? (
            <ReactCountryFlag
              countryCode="CZ"
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
          ) : (
            <ReactCountryFlag
              countryCode="GB"
              svg
              style={{ width: "1.5em", height: "1.5em" }}
            />
          )}
        </Link>
      ))}
    </div>
  );
}
