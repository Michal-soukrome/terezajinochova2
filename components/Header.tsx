"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TranslatedLink from "./TranslatedLink";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { overlayVariants, menuItemVariants } from "@/lib/animations";
import Button from "./Button";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open) {
      // lock body scroll while open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close overlay on Escape + trap Tab focus when overlay is open
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        const el = overlayRef.current;
        if (!el) return;
        const focusable = Array.from(
          el.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])"
          )
        ).filter((f) => f.offsetParent !== null);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  // MotionDiv typed as any to avoid framer-motion JSX typing issues in some environments
  // Allow any here due to framer-motion typings variance across versions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionDiv: any = (motion as any).div;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  return (
    <header className="w-full bg-white border-b border-gray-300 px-4 sm:px-6 lg:px-8 sticky z-50 top-0 left-0">
      <div className="flex justify-between items-center h-20" id="top-nav">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-gray-900 capitalize relative z-10 transition-colors duration-300 ease-in-out group"
        >
          svatební deník
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-500 transition-[width] duration-500 ease-in-out group-hover:w-full"></span>
        </Link>

        {/* Desktop nav */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-5">
            <span className="relative z-10 transition-colors duration-300 ease-in-out group">
              {/* TODO: homepage link isnt higlighting probably because of i18n internationalization */}
              <TranslatedLink
                href="/"
                className="text-gray-700 hover:text-gray-900 p-2 "
                activeClassName="font-bold"
              >
                {locale === "cs" ? "úvod" : "Home"}
              </TranslatedLink>{" "}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-500 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
            <span className="text-gray-300">|</span>
            <span className="relative z-10 transition-colors duration-300 ease-in-out group">
              <TranslatedLink
                href={`/products`}
                className="text-gray-700 hover:text-gray-900 p-2 "
                activeClassName="font-bold"
              >
                {locale === "cs" ? "Produkty" : "Products"}
              </TranslatedLink>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-500 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
            <span className="text-gray-300">|</span>
          </nav>
          {/* Hamburger visible on all screen sizes */}
          <Button
            variant="icon"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-gray-500 hover:bg-gray-100"
          >
            {/* TODO: change icon by animating based on open state from hamburger into cross */}
            {/* TODO: prohibit background scroll when both mobile and desktop menu is opened */}

            {open ? (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
              <div />
              <div className="flex items-center gap-3">
                <Button
                  ref={closeButtonRef}
                  variant="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </div>
            </div>

            {/* fullscreen menu */}
            <div
              className="fixed w-svw flex items-start justify-between bg-white border-t border-gray-300"
              id="fullscreen-menu"
            >
              {/* TODO: make fullscreen menu slide in from the right on both desktop and mobile */}

              {/* desktop menu */}
              <div className="w-full hidden md:block" id="desktop-menu">
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                  desktop
                </div>
              </div>

              {/* mobile menu */}
              <div className="w-full h-full md:hidden " id="mobile-menu">
                <div className="w-full h-full flex flex-col justify-between items-start p-0">
                  {/* TODO: close menu on nav link click, probably can be implemented straight into TranslatedLink component */}

                  <ul
                    role="navigation"
                    className="w-full divide-y divide-gray-400 flex flex-col"
                    id="mobile-navigation-links"
                  >
                    <TranslatedLink
                      href="/"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-gray-100 font-semibold"
                      exact
                    >
                      {locale === "cs" ? "úvod" : "Home"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/products"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-gray-100 font-semibold"
                    >
                      {locale === "cs" ? "Produkty" : "Products"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/privacy"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-gray-100 font-semibold"
                    >
                      {locale === "cs" ? "Soukromí" : "Privacy"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/contact"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-gray-100 font-semibold"
                    >
                      {locale === "cs" ? "Kontakt" : "Contact"}
                    </TranslatedLink>
                  </ul>
                  <div className="w-full flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">email</div>
                    <div>
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
