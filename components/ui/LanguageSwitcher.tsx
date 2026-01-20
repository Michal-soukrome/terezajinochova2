"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { locales, Locale } from "@/lib/i18n";
import { setCookie } from "@/lib/cookies";
import { routes } from "@/lib/routes";
import { PRODUCT_LIST } from "@/lib/products";
import { WEDDING_LIST } from "@/lib/weddings";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher({
  onLanguageChange,
  mode = "flag" as "flag" | "text" | "dropdown",
}: {
  onLanguageChange?: () => void;
  mode?: "flag" | "text" | "dropdown";
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale =
    (pathname?.split("/").filter(Boolean)[0] as Locale) || locales[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    if (mode !== "dropdown") return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, mode]);

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
        (p) => p.slugs[currentLocale] === maybeProductSlug,
      );
      if (product) {
        return `/${newLocale}/${routes.products[newLocale]}/${product.slugs[newLocale]}`;
      }
      // No product slug found — fall back to top-level products page
      return `/${newLocale}/${routes.products[newLocale]}`;
    }

    // If we are on a wedding gallery page (/en/gallery/:slug), handle it
    if (slug === routes.gallery[currentLocale]) {
      const wedding = WEDDING_LIST.find(
        (w) => w.slugs[currentLocale] === maybeProductSlug,
      );
      if (wedding) {
        return `/${newLocale}/${routes.gallery[newLocale]}/${wedding.slugs[newLocale]}`;
      }
      // No wedding slug found — fall back to top-level gallery page
      return `/${newLocale}/${routes.gallery[newLocale]}`;
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

  // Dropdown mode
  if (mode === "dropdown") {
    const otherLocales = locales.filter((l) => l !== currentLocale);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer h-full flex items-center gap-2 px-4 hover:bg-amber-700/10 transition-all duration-300 ease-in-out"
          title={currentLocale === "cs" ? "Změnit jazyk" : "Change language"}
        >
          <ReactCountryFlag
            countryCode={currentLocale === "cs" ? "CZ" : "GB"}
            svg
            style={{ width: "1.5em", height: "1.5em" }}
          />
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 py-1  z-50">
            {otherLocales.map((locale) => (
              <Link
                key={locale}
                href={getLocalizedPath(locale)}
                onClick={() => {
                  setLocaleCookie(locale);
                  setIsOpen(false);
                  onLanguageChange?.();
                }}
                className="w-[150px] flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                title={
                  locale === "cs" ? "Přepnout na češtinu" : "Switch to English"
                }
              >
                <ReactCountryFlag
                  countryCode={locale === "cs" ? "CZ" : "GB"}
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {locale === "cs" ? "Čeština" : "English"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

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
              : "btn btn-outline"
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
