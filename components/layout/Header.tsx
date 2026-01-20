"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { overlayVariants, menuItemVariants } from "@/lib/animations";
import Button from "../ui/Button";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { FullscreenMenu } from "./FullscreenMenu";
import { HEADER_CONTENT } from "@/lib/headerData";
import { BookOpen, Mail } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerBgOpacity, setHeaderBgOpacity] = useState(0.05); // Start with very light background
  const [scrollUpDistance, setScrollUpDistance] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = lastScrollY - currentScrollY;

      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY) {
        // Accumulate scroll up distance
        const newScrollUpDistance = scrollUpDistance + Math.abs(scrollDelta);
        setScrollUpDistance(newScrollUpDistance);
        setIsScrollingUp(true); // Actively scrolling up

        // Only show header after scrolling up by 80px or more
        if (newScrollUpDistance >= 80 || currentScrollY < 100) {
          setIsVisible(true);
        }
      }
      // Hide header when scrolling down (but not at the very top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setScrollUpDistance(0); // Reset scroll up distance when scrolling down
        setIsScrollingUp(false); // No longer scrolling up
      }

      // Calculate background opacity based on scroll position
      // At top: very light (0.05), when scrolled: more opaque (0.15)
      const newOpacity = currentScrollY < 50 ? 0.05 : 0.15;
      setHeaderBgOpacity(newOpacity);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, scrollUpDistance]);

  useEffect(() => {
    if (open) {
      // Save current scroll position and lock body scroll while open
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Store scroll position for restoration
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restore scroll position after a brief delay to ensure animation completes
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);

      // First restore body styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Then restore scroll position with a small delay
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close overlay on Escape + trap Tab focus when overlay is open
  useEffect(() => {
    if (!open) return;

    // Focus on the close button when menu opens (without scrolling)
    if (closeButtonRef.current) {
      closeButtonRef.current.focus({ preventScroll: true });
    }

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
            "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])",
          ),
        ).filter((f) => f.offsetParent !== null);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          first.focus({ preventScroll: true });
          e.preventDefault();
        }
        if (e.shiftKey && document.activeElement === first) {
          last.focus({ preventScroll: true });
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
    <motion.header
      initial={false}
      animate={{
        y: isVisible ? 0 : -80, // slide up/down
        backgroundColor: open
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        // open state uses the soft cream accent; closed uses translucent white
        backdropFilter: isScrollingUp ? "blur(3px)" : "blur(0px)", // apply backdrop blur when scrolling up
      }}
      transition={{
        y: { duration: 0.3, ease: "easeInOut" },
        backgroundColor: { duration: 0.5, ease: "easeInOut" },
        backdropFilter: { duration: 0.3, ease: "easeInOut" }, // smooth backdrop blur transition
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-16 md:h-20 safe-area-top border-b border-accent-1-50"
      suppressHydrationWarning
    >
      <span className="hidden absolute bottom-0 left-0 w-full h-px bg-linear-to-l from-accent-1 via-accent-1 to-transparent"></span>

      <div
        className="h-full flex justify-between items-center px-4 sm:px-6 lg:px-8"
        id="top-nav"
      >
        <Link
          href={`/${locale}`}
          className="text-base md:text-xl text-black font-bold bg-white mt-12 md:mt-18 h-20 md:h-30 w-20 md:w-30 flex items-center justify-center  rounded-full border border-accent-1-50 shadow relative z-10 group"
          onClick={() => setOpen(false)}
          title={
            locale === "cs" ? "Přejít na domovskou stránku" : "Go to homepage"
          }
        >
          <Image
            src="/assets/logo/01-2026/logo1.webp"
            width={200}
            height={200}
            className="aspect-square rounded-full object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
            alt="Logo"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex h-full items-center gap-4">
          <DesktopNav locale={locale} onClose={() => setOpen(false)} />
          <LanguageSwitcher
            mode="dropdown"
            onLanguageChange={() => setOpen(false)}
          />
        </div>
        {/* Hamburger visible on all screen sizes */}
        <button
          ref={closeButtonRef}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex md:hidden p-3 rounded cursor-pointer focus:outline-none focus:ring-0"
        >
          <motion.svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            animate={
              open
                ? {
                    scale: 1.05,
                    rotate: 90,
                    stroke: "var(--accent-1-contrast)",
                  }
                : { scale: 1, rotate: 0, stroke: "var(--accent-1-contrast)" }
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
      <AnimatePresence>
        {open && (
          <div id="opened-menu">
            {/* fullscreen menu */}
            <MotionDiv
              ref={overlayRef}
              className="fixed w-full flex items-start justify-between bg-accent-1"
              id="fullscreen-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent scroll on overlay click
            >
              {/* desktop menu */}
              <div className="w-full hidden md:block h-full" id="desktop-menu">
                <div className="h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
                  {/* Main content area */}
                  <div className="pt-20 pb-8">
                    <div className="grid grid-cols-2 gap-12 max-w-4xl">
                      {/* Navigation Links */}
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-accent-4 mb-6 uppercase">
                          {HEADER_CONTENT[locale].navigation}
                        </h3>
                        <FullscreenMenu
                          locale={locale}
                          onClose={() => setOpen(false)}
                        />
                      </div>

                      {/* Interactive Content */}
                      <div>
                        <h3 className="text-2xl font-heading font-bold text-accent-4 mb-6 uppercase">
                          {HEADER_CONTENT[locale].dreamWedding}
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-linear-to-br from-amber-50 to-amber-800/20 p-6 rounded-xl border border-amber-800/10">
                            <h3 className="font-heading font-semibold text-accent-4 mb-2">
                              {HEADER_CONTENT[locale].startPlanning.title}
                            </h3>
                            <p className="text-accent-1-contrast text-sm mb-4">
                              {HEADER_CONTENT[locale].startPlanning.description}
                            </p>
                            <TranslatedLink
                              href="/products"
                              className="btn btn-primary text-xs"
                              onClick={() => setOpen(false)}
                              title={
                                locale === "cs"
                                  ? "Prozkoumat produkty"
                                  : "Explore products"
                              }
                            >
                              <BookOpen className="hidden w-4 h-4 mr-2" />
                              {HEADER_CONTENT[locale].startPlanning.button}
                            </TranslatedLink>
                          </div>

                          <div className="bg-linear-to-br from-amber-800/10 to-amber-50 p-6 rounded-xl border border-amber-800/10">
                            <h3 className="font-heading font-semibold text-accent-4 mb-2">
                              {HEADER_CONTENT[locale].needHelp.title}
                            </h3>
                            <p className="text-accent-1-contrast text-sm mb-4">
                              {HEADER_CONTENT[locale].needHelp.description}
                            </p>
                            <TranslatedLink
                              href="/contact"
                              className="btn btn-secondary text-xs"
                              onClick={() => setOpen(false)}
                              title={
                                locale === "cs"
                                  ? "Kontaktovat nás"
                                  : "Contact us"
                              }
                            >
                              <Mail className="hidden w-4 h-4 mr-2" />
                              {HEADER_CONTENT[locale].needHelp.button}
                            </TranslatedLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section with contact and language switcher - always at bottom */}
                  <div>
                    <div className="flex items-center justify-between py-5">
                      <div className="flex items-center gap-4">
                        <div className="text-accent-1-contrast">
                          <div className="text-xs text-accent-1-contrast">
                            tereza.jinochova@gmail.com
                          </div>
                        </div>
                      </div>
                      <LanguageSwitcher
                        onLanguageChange={() => setOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* mobile menu */}
              <div
                className="w-full h-full md:hidden bg-white overflow-y-auto border-t border-accent-1"
                id="mobile-menu"
              >
                <div
                  className="w-full flex flex-col justify-between items-start p-0"
                  id="mobile-menu-subwrap"
                >
                  <MobileNav locale={locale} onClose={() => setOpen(false)} />

                  <div className="w-full flex items-center justify-end p-4">
                    <LanguageSwitcher onLanguageChange={() => setOpen(false)} />
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
