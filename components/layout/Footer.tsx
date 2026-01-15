"use client";

import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { SocialMediaIcons } from "../common/SocialMediaIcons";
import { Heart } from "lucide-react";
import { NAV } from "@/lib/headerData";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer
      className="w-full bg-white border-t border-accent-1-50"
      suppressHydrationWarning
    >
      {/* Footer Top Area */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            id="footer-links"
          >
            {/* Info Column */}
            <div>
              <h1 className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                Tereza Jinochová
              </h1>

              <div className="space-y-3">
                <div className="text-gray-700 text-sm">
                  <a
                    href="mailto:svatebnipribehy@gmail.com"
                    className="lowercase hover:text-accent-1-contrast transition-colors duration-200"
                  >
                    svatebnipribehy@gmail.com{" "}
                  </a>
                </div>
                <div className="text-gray-700 text-sm">IČO: 17902754</div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <SocialMediaIcons />
              </div>
            </div>

            {/* Products Column */}
            <div>
              <div className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Produkty" : "Products"}
              </div>

              <nav className="space-y-3" id="footer-nav-links">
                <TranslatedLink
                  href="/products/zakladni"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs"
                    ? "Svatební deník – základní"
                    : "Wedding diary – basic"}
                </TranslatedLink>
                <TranslatedLink
                  href="/products/premium"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs"
                    ? "Svatební deník – prémiový"
                    : "Wedding diary – premium"}
                </TranslatedLink>
                <TranslatedLink
                  href="/products"
                  className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200"
                >
                  {locale === "cs" ? "Všechny produkty" : "All products"}
                </TranslatedLink>
              </nav>
            </div>

            {/* Navigation Column */}
            <div>
              <div className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Navigace" : "Navigation"}
              </div>

              <nav className="space-y-3" id="footer-nav-links">
                {Object.values(NAV[locale])
                  .filter((item) => item.href !== "/products")
                  .map((item) => (
                    <TranslatedLink
                      key={item.href}
                      href={item.href}
                      className="w-fit block text-gray-700 hover:text-accent-1-contrast text-sm transition-colors duration-200 "
                    >
                      {item.label}
                    </TranslatedLink>
                  ))}
              </nav>
            </div>

            {/* Language Column */}
            <div>
              <div className="text-sm font-heading font-bold text-gray-900 uppercase mb-6 tracking-wider">
                {locale === "cs" ? "Jazyk" : "Language"}
              </div>

              <LanguageSwitcher mode="text" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-accent-1-50">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-600">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-heading">
                  {locale === "cs" ? "Svatební deník" : "Wedding diary"}
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
