"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { PRODUCT_LIST } from "@/lib/products";

export function LanguageSwitcher() {
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
      // Set cookie for 1 year so future visits default to chosen locale
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${maxAge}`;
    } catch {
      // ignore in non-browser environments
    }
  };

  return (
    <div className="flex space-x-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          onClick={() => setLocaleCookie(locale)}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
