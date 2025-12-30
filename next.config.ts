import type { NextConfig } from "next";
import { routes } from "./lib/routes";
import { locales } from "./lib/i18n";
import { PRODUCTS } from "./lib/products";
import { WEDDING_LIST } from "./lib/weddings";

const nextConfig: NextConfig = {
  // We're using file-system localized routes (`app/[locale]`); don't set
  // nextConfig i18n when using App Router — this avoids export path mismatch.

  // Rewrites so client-side navigation can use translated URLs directly
  async rewrites() {
    const rules: Array<{
      source: string;
      destination: string;
      locale?: false;
    }> = [];

    for (const locale of locales) {
      // top-level route translations (products, success, cancel...)
      for (const key of Object.keys(routes)) {
        const r = routes[key as keyof typeof routes];
        const localized = r[locale as keyof typeof r];
        const canonical = r.en;

        // Skip when localized equals canonical (no rewrite needed)
        if (localized === canonical) continue;

        // Allow paths with optional trailing segments (e.g., /cs/produkty/:slug*)
        rules.push({
          source: `/${locale}/${localized}/:path*`,
          destination: `/${locale}/${canonical}/:path*`,
          locale: false,
        });

        // Also cover the no-segment root like /cs/produkty → /cs/products
        rules.push({
          source: `/${locale}/${localized}`,
          destination: `/${locale}/${canonical}`,
          locale: false,
        });
      }

      // Rewrites for localized product slugs -> canonical product page under english folder
      for (const product of Object.values(PRODUCTS)) {
        const localizedSlug =
          product.slugs[locale as keyof typeof product.slugs];
        const canonical = product.slugs.en;

        // Only rewrite if different
        if (localizedSlug === canonical) continue;

        rules.push({
          source: `/${locale}/${routes.products[locale]}/${localizedSlug}`,
          // preserve localized product slug but map top portion to canonical `products`
          destination: `/${locale}/${routes.products.en}/${localizedSlug}`,
          locale: false,
        });
      }

      // Rewrites for localized wedding slugs -> canonical gallery page
      for (const wedding of WEDDING_LIST) {
        const localizedSlug =
          wedding.slugs[locale as keyof typeof wedding.slugs];
        const canonical = wedding.slugs.en;

        // Only rewrite if different
        if (localizedSlug === canonical) continue;

        rules.push({
          source: `/${locale}/${routes.gallery[locale]}/${localizedSlug}`,
          // preserve localized wedding slug but map top portion to canonical `gallery`
          destination: `/${locale}/${routes.gallery.en}/${localizedSlug}`,
          locale: false,
        });
      }
    }

    return rules;
  },
};

export default nextConfig;
