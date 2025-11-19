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
        backgroundColor: open ? "#ffffff" : "rgba(120,53,15,0.05)", // fade color
        backdropFilter: isScrollingUp ? "blur(3px)" : "blur(0px)", // apply backdrop blur when scrolling up
      }}
      transition={{
        y: { duration: 0.3, ease: "easeInOut" },
        backgroundColor: { duration: 0.5, ease: "easeInOut" },
        backdropFilter: { duration: 0.3, ease: "easeInOut" }, // smooth backdrop blur transition
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 safe-area-top"
    >
      <span className="absolute bottom-0 left-0 w-full h-px bg-linear-to-l from-amber-800/30 via-amber-800/30 to-transparent"></span>
      <div
        className="h-full flex justify-between items-center px-4 sm:px-6 lg:px-8"
        id="top-nav"
      >
        <Link
          href={`/${locale}`}
          className="text-base md:text-xl text-black font-bold bg-white mt-12 md:mt-18 h-20 md:h-30 w-20 md:w-30 flex items-center justify-center  rounded-full border border-amber-800/10 shadow relative z-10"
          onClick={() => setOpen(false)}
          title={
            locale === "cs" ? "Přejít na domovskou stránku" : "Go to homepage"
          }
        >
          <span className="uppercase font-deluxe text-amber-800">logo</span>
        </Link>

        {/* Desktop nav */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-5 ">
            <span className="relative z-10 transition-colors duration-300 ease-in-out group">
              <TranslatedLink
                href="/"
                className="font-deluxe text-amber-800 hover:text-amber-900 font-medium p-2"
                activeClassName="font-semibold"
                exact
                onClick={() => setOpen(false)}
                title={
                  locale === "cs"
                    ? "Přejít na domovskou stránku"
                    : "Go to homepage"
                }
              >
                <span className="uppercase">
                  {locale === "cs" ? "úvod" : "Home"}
                </span>
              </TranslatedLink>{" "}
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-amber-800 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
            <span className="text-amber-700">|</span>
            <span className="relative z-10 transition-colors duration-300 ease-in-out group ">
              <TranslatedLink
                href={`/about`}
                className="font-deluxe text-amber-800 hover:text-amber-900 font-medium p-2 "
                activeClassName="font-semibold"
                onClick={() => setOpen(false)}
                title={
                  locale === "cs"
                    ? "Přejít na stránku o deníku"
                    : "Go to about page"
                }
              >
                <span className="uppercase">
                  {locale === "cs" ? "O deníku" : "About"}
                </span>
              </TranslatedLink>
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-amber-800 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>

            <span className="text-amber-700">|</span>
            <span className="relative z-10 transition-colors duration-300 ease-in-out group ">
              <TranslatedLink
                href={`/products`}
                className="font-deluxe text-amber-800 hover:text-amber-900 font-medium p-2 "
                activeClassName="font-semibold"
                onClick={() => setOpen(false)}
                title={
                  locale === "cs"
                    ? "Přejít na stránku produktů"
                    : "Go to products page"
                }
              >
                <span className="uppercase">
                  {locale === "cs" ? "Objednat" : "Order"}
                </span>
              </TranslatedLink>
              <span className="absolute left-0 -bottom-1 w-0 h-px bg-amber-800 transition-[width] duration-200 ease-in-out group-hover:w-full"></span>
            </span>
          </nav>
          {/* Hamburger visible on all screen sizes */}
          <button
            ref={closeButtonRef}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-3 rounded border cursor-pointer border-amber-800/10 hover:bg-amber-800/10 transition-colors duration-200 "
          >
            <motion.svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              animate={
                open
                  ? { scale: 1.05, rotate: 90, stroke: "#78350f" }
                  : { scale: 1, rotate: 0, stroke: "#92400e" }
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
                        <h3 className="text-2xl font-deluxe font-bold text-amber-900 mb-6 uppercase">
                          {locale === "cs" ? "Navigace" : "Navigation"}
                        </h3>
                        <nav className="space-y-4">
                          <TranslatedLink
                            href="/"
                            className="block text-lg text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200 group"
                            activeClassName="text-amber-900 font-semibold"
                            exact
                            onClick={() => setOpen(false)}
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "Úvod" : "Home"}
                            </span>
                          </TranslatedLink>
                          <TranslatedLink
                            href="/about"
                            className="block text-lg text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200 group"
                            activeClassName="text-amber-900 font-semibold"
                            onClick={() => setOpen(false)}
                            title={
                              locale === "cs"
                                ? "Přejít na stránku o deníku"
                                : "Go to about page"
                            }
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "O deníku" : "About"}
                            </span>
                          </TranslatedLink>
                          <TranslatedLink
                            href="/products"
                            className="block text-lg text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200 group"
                            activeClassName="text-amber-900 font-semibold"
                            onClick={() => setOpen(false)}
                            title={
                              locale === "cs"
                                ? "Přejít na stránku produktů"
                                : "Go to products page"
                            }
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "Objednat" : "Order"}
                            </span>
                          </TranslatedLink>
                          <TranslatedLink
                            href="/contact"
                            className="block text-lg text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200 group"
                            activeClassName="text-amber-900 font-semibold"
                            onClick={() => setOpen(false)}
                            title={
                              locale === "cs"
                                ? "Přejít na kontaktní stránku"
                                : "Go to contact page"
                            }
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "Kontakt" : "Contact"}
                            </span>
                          </TranslatedLink>
                          <TranslatedLink
                            href="/privacy"
                            className="block text-lg text-amber-800 hover:text-amber-900 font-medium transition-colors duration-200 group"
                            activeClassName="text-amber-900 font-semibold"
                            onClick={() => setOpen(false)}
                            title={
                              locale === "cs"
                                ? "Přejít na stránku soukromí"
                                : "Go to privacy page"
                            }
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "Soukromí" : "Privacy"}
                            </span>
                          </TranslatedLink>
                        </nav>
                      </div>

                      {/* Interactive Content */}
                      <div>
                        <h3 className="text-2xl font-deluxe font-bold text-amber-900 mb-6 uppercase">
                          {locale === "cs" ? "Svatba snů" : "Dream Wedding"}
                        </h3>
                        <div className="space-y-3">
                          <div className="grow flex-1 bg-linear-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                            <h4 className="font-deluxe font-semibold text-amber-900 mb-2">
                              {locale === "cs"
                                ? "Začněte plánovat"
                                : "Start Planning"}
                            </h4>
                            <p className="text-amber-800 text-sm mb-4">
                              {locale === "cs"
                                ? "Objevte naše nástroje pro dokonalou svatbu"
                                : "Discover our tools for the perfect wedding"}
                            </p>
                            <TranslatedLink
                              href="/products"
                              className="inline-flex items-center px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors duration-200 font-medium text-sm"
                              onClick={() => setOpen(false)}
                              title={
                                locale === "cs"
                                  ? "Prozkoumat produkty"
                                  : "Explore products"
                              }
                            >
                              {locale === "cs" ? "Prozkoumat" : "Explore"}
                              <svg
                                className="ml-2 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </TranslatedLink>
                          </div>

                          <div className="grow flex-1 bg-linear-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                            <h4 className="font-deluxe font-semibold text-amber-900 mb-2">
                              {locale === "cs"
                                ? "Potřebujete pomoc?"
                                : "Need Help?"}
                            </h4>
                            <p className="text-amber-800 text-sm mb-4">
                              {locale === "cs"
                                ? "Kontaktujte nás pro osobní konzultaci"
                                : "Contact us for personal consultation"}
                            </p>
                            <TranslatedLink
                              href="/contact"
                              className="inline-flex items-center px-4 py-2 border border-amber-800 text-amber-800 rounded-lg hover:bg-amber-800 hover:text-white transition-colors duration-200 font-medium text-sm"
                              onClick={() => setOpen(false)}
                              title={
                                locale === "cs"
                                  ? "Kontaktovat nás"
                                  : "Contact us"
                              }
                            >
                              {locale === "cs" ? "Napište mi" : "Let me know"}
                              <svg
                                className="ml-2 w-4 h-4"
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
                            </TranslatedLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section with contact and language switcher - always at bottom */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-amber-800">
                          <div className="text-xs text-amber-800">
                            info@svatebnidenik.cz
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <LanguageSwitcher
                          onLanguageChange={() => setOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                      title={
                        locale === "cs"
                          ? "Přejít na domovskou stránku"
                          : "Go to homepage"
                      }
                    >
                      {locale === "cs" ? "Úvod" : "Home"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/about"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku o deníku"
                          : "Go to about page"
                      }
                    >
                      {locale === "cs" ? "O deníku" : "About"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/products"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku produktů"
                          : "Go to products page"
                      }
                    >
                      {locale === "cs" ? "Objednat" : "Order"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/privacy"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku soukromí"
                          : "Go to privacy page"
                      }
                    >
                      {locale === "cs" ? "Soukromí" : "Privacy"}
                    </TranslatedLink>
                    <TranslatedLink
                      href="/contact"
                      className="px-4 py-6 mobile-navigation-link"
                      activeClassName="bg-amber-800/5 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na kontaktní stránku"
                          : "Go to contact page"
                      }
                    >
                      {locale === "cs" ? "Kontakt" : "Contact"}
                    </TranslatedLink>
                  </ul>
                  <div className="w-full flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">email</div>
                    <div>
                      <LanguageSwitcher
                        onLanguageChange={() => setOpen(false)}
                      />
                    </div>
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
