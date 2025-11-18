"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";
import TranslatedLink from "./TranslatedLink";
import { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-gray-300 px-4 sm:px-6 lg:px-8 ">
      <div className="py-6">
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="text-xs text-gray-500 ">
            &copy; {new Date().getFullYear()}{" "}
            <span className="lowercase">
              {locale === "cs" ? "svatební deník" : "wedding todoist"}
            </span>
            <span className="mx-2">|</span>
            <span className="capitalize italic">tereza jinochová</span>
          </div>

          <div className="flex items-center gap-10">
            <nav className="hidden md:flex items-center gap-5">
              <TranslatedLink
                href="/privacy"
                className="hidden sm:inline text-sm text-gray-700 hover:text-gray-900"
                activeClassName="text-blue-600 font-semibold"
              >
                {locale === "cs" ? "Soukromí" : "Privacy"}
              </TranslatedLink>
              <span className="text-gray-300">|</span>
              <TranslatedLink
                href="/contact"
                className="hidden sm:inline text-sm text-gray-700 hover:text-gray-900"
                activeClassName="text-blue-600 font-semibold"
              >
                {locale === "cs" ? "Kontakt" : "Contact"}
              </TranslatedLink>
            </nav>
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
