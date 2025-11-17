"use client";

import TranslatedLink from "./TranslatedLink";
import { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} My App
          </div>

          <div className="flex items-center gap-2">
            <TranslatedLink
              href="/"
              className="text-sm text-gray-700 hover:text-gray-900"
              activeClassName="text-blue-600 font-semibold"
              exact
            >
              {locale === "cs" ? "Domů" : "Home"}
            </TranslatedLink>
            <span className="text-gray-400">·</span>
            <TranslatedLink
              href="/products"
              className="text-sm text-gray-700 hover:text-gray-900"
              activeClassName="text-blue-600 font-semibold"
            >
              {locale === "cs" ? "Produkty" : "Products"}
            </TranslatedLink>
            <span className="hidden sm:inline text-gray-400">·</span>
            <TranslatedLink
              href="/privacy"
              className="hidden sm:inline text-sm text-gray-700 hover:text-gray-900"
              activeClassName="text-blue-600 font-semibold"
            >
              {locale === "cs" ? "Soukromí" : "Privacy"}
            </TranslatedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
