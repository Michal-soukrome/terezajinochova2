"use client";

import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { SocialMediaIcons } from "../common/SocialMediaIcons";
import { Heart } from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="w-full bg-white border-t border-amber-800/25">
      {/* Footer Top Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            id="footer-links"
          >
            {/* Info Column */}
            <div>
              <h6 className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Info" : "Info"}
              </h6>

              <div className="space-y-3">
                <div className="text-gray-700 text-sm">
                  {locale === "cs"
                    ? "Praha, Česká republika"
                    : "Prague, Czech Republic"}
                </div>

                <div className="text-gray-700 text-sm">
                  <a
                    href="mailto:tereza.jinochova@gmail.com"
                    className="!lowercase hover:text-accent-1-contrast transition-colors duration-200"
                  >
                    tereza.jinochova@gmail.com
                  </a>
                </div>

                <div className="text-gray-700 text-sm">
                  <a
                    href="tel:+420123456789"
                    className="hover:text-accent-1-contrast transition-colors duration-200"
                  >
                    +420 123 456 789
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <SocialMediaIcons />
              </div>
            </div>

            {/* Products Column */}
            <div>
              <h6 className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Produkty" : "Products"}
              </h6>

              <nav className="space-y-3">
                <TranslatedLink
                  href="/products/zakladni"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs"
                    ? "Svatební Deník – Základní"
                    : "Wedding Diary – Basic"}
                </TranslatedLink>
                <TranslatedLink
                  href="/products/premium"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs"
                    ? "Svatební Deník – Prémiový"
                    : "Wedding Diary – Premium"}
                </TranslatedLink>
                <TranslatedLink
                  href="/products"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "Všechny produkty" : "All Products"}
                </TranslatedLink>
              </nav>
            </div>

            {/* Navigation Column */}
            <div>
              <h6 className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Navigace" : "Navigation"}
              </h6>

              <nav className="space-y-3">
                <TranslatedLink
                  href="/"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "Domů" : "Home"}
                </TranslatedLink>
                <TranslatedLink
                  href="/about"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "O deníku" : "About"}
                </TranslatedLink>
                <TranslatedLink
                  href="/contact"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "Kontakt" : "Contact"}
                </TranslatedLink>
                <TranslatedLink
                  href="/privacy"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "Soukromí" : "Privacy"}
                </TranslatedLink>
              </nav>
            </div>

            {/* Language Column */}
            <div>
              <h6 className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Jazyk" : "Language"}
              </h6>

              <LanguageSwitcher mode="text" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-600">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-heading">
                  {locale === "cs" ? "Svatební deník" : "Wedding Todoist"}
                </span>
                <span className="mx-2">|</span>
                <span className="italic">Tereza Jinochová</span>
              </div>

              <div className="text-xs text-gray-500">
                {locale === "cs" ? (
                  <>
                    <span className="flex gap-1">
                      Vytvořeno s{" "}
                      <Heart
                        strokeWidth={0.5}
                        className="w-3 h-3 fill-accent-1-contrast text-accent-1 "
                      />{" "}
                      pro nezapomenutelné momenty
                    </span>
                  </>
                ) : (
                  <span className="flex gap-1">
                    Made with{" "}
                    <Heart
                      strokeWidth={0.5}
                      className="w-3 h-3 fill-accent-1-contrast text-accent-1 "
                    />{" "}
                    for unforgettable moments
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
