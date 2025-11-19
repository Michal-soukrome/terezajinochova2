"use client";

import { LanguageSwitcher } from "./LanguageSwitcher";
import TranslatedLink from "./TranslatedLink";
import { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full bg-amber-800/5 border-t border-amber-200">
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-deluxe font-bold text-amber-900 uppercase mb-2">
                  {locale === "cs" ? "Svatební deník" : "Wedding Todoist"}
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed max-w-md">
                  {locale === "cs"
                    ? "Váš spolehlivý průvodce plánováním svatebního dne. Pomáháme párům vytvořit nezapomenutelné vzpomínky."
                    : "Your reliable guide to wedding day planning. We help couples create unforgettable memories."}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-amber-800 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@svatebnidenik.cz
                </div>
                <div className="flex items-center text-amber-800 text-sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {locale === "cs"
                    ? "Praha, Česká republika"
                    : "Prague, Czech Republic"}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-deluxe font-semibold text-amber-900 uppercase text-sm mb-4">
                {locale === "cs" ? "Rychlé odkazy" : "Quick Links"}
              </h4>
              <nav className="space-y-3">
                <TranslatedLink
                  href="/"
                  className="block text-amber-800 hover:text-amber-900 text-sm transition-colors duration-200"
                  activeClassName="text-amber-900 font-medium"
                  exact
                >
                  {locale === "cs" ? "Úvod" : "Home"}
                </TranslatedLink>
                <TranslatedLink
                  href="/about"
                  className="block text-amber-800 hover:text-amber-900 text-sm transition-colors duration-200"
                  activeClassName="text-amber-900 font-medium"
                >
                  {locale === "cs" ? "O deníku" : "About"}
                </TranslatedLink>
                <TranslatedLink
                  href="/products"
                  className="block text-amber-800 hover:text-amber-900 text-sm transition-colors duration-200"
                  activeClassName="text-amber-900 font-medium"
                >
                  {locale === "cs" ? "Objednat" : "Order"}
                </TranslatedLink>
                <TranslatedLink
                  href="/contact"
                  className="block text-amber-800 hover:text-amber-900 text-sm transition-colors duration-200"
                  activeClassName="text-amber-900 font-medium"
                >
                  {locale === "cs" ? "Kontakt" : "Contact"}
                </TranslatedLink>
              </nav>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="font-deluxe font-semibold text-amber-900 uppercase text-sm mb-4">
                {locale === "cs" ? "Podpora" : "Support"}
              </h4>
              <nav className="space-y-3">
                <TranslatedLink
                  href="/privacy"
                  className="block text-amber-800 hover:text-amber-900 text-sm transition-colors duration-200"
                  activeClassName="text-amber-900 font-medium"
                >
                  {locale === "cs" ? "Soukromí" : "Privacy"}
                </TranslatedLink>
                <div className="pt-2">
                  <div className="text-amber-800 text-sm font-medium mb-2">
                    {locale === "cs" ? "Jazyk" : "Language"}
                  </div>
                  <LanguageSwitcher />
                </div>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-amber-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-amber-700">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-deluxe">
                  {locale === "cs" ? "Svatební deník" : "Wedding Todoist"}
                </span>
                <span className="mx-2">|</span>
                <span className="italic">Tereza Jinochová</span>
              </div>

              <div className="text-xs text-amber-600">
                {locale === "cs"
                  ? "Vytvořeno s ❤️ pro nezapomenutelné svatby"
                  : "Made with ❤️ for unforgettable weddings"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
