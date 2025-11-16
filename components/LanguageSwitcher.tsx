"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";

export function LanguageSwitcher() {
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: Locale): string => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0] as Locale;
    const slug = segments[1];

    if (!slug) {
      // Homepage
      return `/${newLocale}`;
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

  return (
    <div className="flex space-x-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(locale)}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
