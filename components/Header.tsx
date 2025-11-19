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
    <header className="relative w-full bg-amber-800/5 h-20">
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-l from-amber-800/30 via-amber-800/30 to-transparent"></span>
      <div
        className="h-full flex justify-between items-center px-4 sm:px-6 lg:px-8"
        id="top-nav"
      >
        <Link
          href={`/${locale}`}
          className="text-base md:text-xl text-black font-bold bg-white mt-12 md:mt-18 h-20 md:h-30 w-20 md:w-30 flex items-center justify-center  rounded-full border border-amber-800/10 shadow relative z-10"
        >
          <span className="uppercase">logo</span>
        </Link>

        {/* Desktop nav */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-5 ">
            <span className="relative z-10 transition-colors duration-300 ease-in-out group">
              <TranslatedLink
                href="/"
                className="text-gray-700 hover:text-gray-900 p-2"
                activeClassName="font-semibold"
                exact
                onClick={() => setOpen(false)}
              >
                <span className="uppercase">
                  {locale === "cs" ? "úvod" : "Home"}
                </span>
              </TranslatedLink>{" "}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-500 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
            <span className="text-gray-300">|</span>
            <span className="relative z-10 transition-colors duration-300 ease-in-out group ">
              <TranslatedLink
                href={`/products`}
                className="text-gray-700 hover:text-gray-900 p-2 "
                activeClassName="font-semibold"
                onClick={() => setOpen(false)}
              >
                <span className="uppercase">
                  {locale === "cs" ? "Produkty" : "Products"}
                </span>
              </TranslatedLink>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-500 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
            <span className="text-gray-300">|</span>
          </nav>
          {/* Hamburger visible on all screen sizes */}(
          <button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-3 rounded border border-amber-800/10 hover:bg-amber-800/10 transition-colors duration-200 "
          >
            <motion.svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              animate={
                open
                  ? { scale: 1.05, rotate: 90, stroke: "#8c7c7c" }
                  : { scale: 1, rotate: 0, stroke: "#7a6d6d" }
              }
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
            >
              {/* Top line */}
              <motion.path
                animate={open ? "open" : "closed"}
                variants={{
                  closed: { d: "M4 6h16" },
                  open: { d: "M6 6l12 12" },
                }}
                transition={{ duration: 0.25 }}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Middle line */}
              <motion.path
                animate={open ? "open" : "closed"}
                variants={{
                  closed: { opacity: 1, d: "M4 12h16" },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.25, delay: 0.05 }}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Bottom line */}
              <motion.path
                animate={open ? "open" : "closed"}
                variants={{
                  closed: { d: "M4 18h16" },
                  open: { d: "M6 18l12-12" },
                }}
                transition={{ duration: 0.25, delay: 0.1 }}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <div id="opened-menu">
            {/* fullscreen menu */}
            <MotionDiv
              ref={overlayRef}
              className="fixed w-full flex items-start justify-between bg-white "
              id="fullscreen-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* desktop menu */}
              <div className="w-full hidden md:block pt-20" id="desktop-menu">
                <div className="px-4 sm:px-6 lg:px-8">desktop</div>
              </div>

              {/* mobile menu */}
              <div className="w-full h-full md:hidden " id="mobile-menu">
                <div className="w-full h-full flex flex-col justify-between items-start p-0">
                  <ul
                    role="navigation"
                    className="w-full divide-y divide-amber-800/20 flex flex-col mt-6 text-amber-900"
                    id="mobile-navigation-links"
                  >
                    <TranslatedLink
                      href="/"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      exact
                      onClick={() => setOpen(false)}
                    >
                      {locale === "cs" ? "úvod" : "Home"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/products"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      {locale === "cs" ? "Produkty" : "Products"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/privacy"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      {locale === "cs" ? "Soukromí" : "Privacy"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/contact"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
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
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
