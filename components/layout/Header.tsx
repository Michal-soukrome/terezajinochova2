"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { overlayVariants, menuItemVariants } from "@/lib/animations";
import Button from "../ui/Button";
import {
  BookOpen,
  Home,
  Mail,
  ShoppingCart,
  Shield,
  Asterisk,
  Dot,
} from "lucide-react";
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
        backgroundColor: open ? "var(--accent-1)" : "rgba(255, 255, 255, 0.9)",
        // open state uses the soft cream accent; closed uses translucent white
        backdropFilter: isScrollingUp ? "blur(3px)" : "blur(0px)", // apply backdrop blur when scrolling up
      }}
      transition={{
        y: { duration: 0.3, ease: "easeInOut" },
        backgroundColor: { duration: 0.5, ease: "easeInOut" },
        backdropFilter: { duration: 0.3, ease: "easeInOut" }, // smooth backdrop blur transition
      }}
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 safe-area-top border-b border-accent-1-50"
    >
      <span className="hidden absolute bottom-0 left-0 w-full h-px bg-linear-to-l from-accent-1 via-accent-1 to-transparent"></span>

      <div
        className="h-full flex justify-between items-center px-4 sm:px-6 lg:px-8"
        id="top-nav"
      >
        <Link
          href={`/${locale}`}
          className="text-base md:text-xl text-black font-bold bg-white mt-18 h-20 md:h-30 w-20 md:w-30 flex items-center justify-center  rounded-full border border-accent-1-50 shadow relative z-10 group"
          onClick={() => setOpen(false)}
          title={
            locale === "cs" ? "Přejít na domovskou stránku" : "Go to homepage"
          }
        >
          <Image
            src="/assets/logo.webp"
            width={200}
            height={200}
            className="aspect-square rounded-full object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
            alt="Logo"
          />
        </Link>

        {/* Desktop nav */}
        <div className="h-full flex items-center gap-10">
          <nav className="h-full hidden md:flex items-center ">
            <TranslatedLink
              href="/"
              className="hover:bg-amber-400/5 px-5 relative z-10 transition-colors duration-300 ease-in-out group h-full flex items-center gap-2 font-heading text-accent-1-contrast hover:text-accent-1 p-2"
              activeClassName="font-semibold"
              exact
              onClick={() => setOpen(false)}
              title={
                locale === "cs"
                  ? "Přejít na domovskou stránku"
                  : "Go to homepage"
              }
            >
              <Home className="hidden w-4 h-4" />
              <span className="uppercase">
                {locale === "cs" ? "úvod" : "Home"}
              </span>
            </TranslatedLink>
            <span>
              <Dot
                className="w-5 h-5 text-accent-1-contrast"
                strokeWidth={0.5}
              />
            </span>
            <TranslatedLink
              href={`/about`}
              className="hover:bg-amber-400/5 px-5 relative z-10 transition-colors duration-300 ease-in-out group h-full flex items-center gap-2 font-heading text-accent-1-contrast hover:text-accent-1 p-2"
              activeClassName="font-semibold"
              onClick={() => setOpen(false)}
              title={
                locale === "cs"
                  ? "Přejít na stránku o deníku"
                  : "Go to about page"
              }
            >
              <BookOpen className="hidden w-4 h-4" />
              <span className="uppercase">
                {locale === "cs" ? "O deníku" : "About"}
              </span>
            </TranslatedLink>
            <span>
              <Dot
                className="w-5 h-5 text-accent-1-contrast"
                strokeWidth={0.5}
              />
            </span>
            <TranslatedLink
              href={`/products`}
              className="hover:bg-amber-400/5 px-5 relative z-10 transition-colors duration-300 ease-in-out group h-full flex items-center gap-2 font-heading text-accent-1-contrast hover:text-accent-1 p-2"
              activeClassName="font-semibold"
              onClick={() => setOpen(false)}
              title={
                locale === "cs"
                  ? "Přejít na stránku produktů"
                  : "Go to products page"
              }
            >
              <ShoppingCart className="hidden w-4 h-4" />
              <span className="uppercase">
                {locale === "cs" ? "Objednat" : "Order"}
              </span>
            </TranslatedLink>
            <span>
              <Dot
                className="w-5 h-5 text-accent-1-contrast"
                strokeWidth={0.5}
              />
            </span>
            <TranslatedLink
              href={`/contact`}
              className="hover:bg-amber-400/5 px-5 relative z-10 transition-colors duration-300 ease-in-out group h-full flex items-center gap-2 font-heading text-accent-1-contrast hover:text-accent-1 p-2"
              activeClassName="font-semibold"
              onClick={() => setOpen(false)}
              title={
                locale === "cs"
                  ? "Přejít na stránku kontaktů"
                  : "Go to contact page"
              }
            >
              <ShoppingCart className="hidden w-4 h-4" />
              <span className="uppercase">
                {locale === "cs" ? "Kontakt" : "Contact"}
              </span>
            </TranslatedLink>
          </nav>
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
                          {locale === "cs" ? "Navigace" : "Navigation"}
                        </h3>
                        <nav className="space-y-4">
                          <TranslatedLink
                            href="/"
                            className="block text-lg text-accent-1-contrast hover:text-accent-4  transition-colors duration-200 group"
                            activeClassName="text-accent-4 font-semibold"
                            exact
                            onClick={() => setOpen(false)}
                          >
                            <span className="group-hover:translate-x-2 transition-transform duration-200 inline-block">
                              {locale === "cs" ? "Úvod" : "Home"}
                            </span>
                          </TranslatedLink>
                          <TranslatedLink
                            href="/about"
                            className="block text-lg text-accent-1-contrast hover:text-accent-4  transition-colors duration-200 group"
                            activeClassName="text-accent-4 font-semibold"
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
                            className="block text-lg text-accent-1-contrast hover:text-accent-4  transition-colors duration-200 group"
                            activeClassName="text-accent-4 font-semibold"
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
                            className="block text-lg text-accent-1-contrast hover:text-accent-4  transition-colors duration-200 group"
                            activeClassName="text-accent-4 font-semibold"
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
                            className="block text-lg text-accent-1-contrast hover:text-amber-900  transition-colors duration-200 group"
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
                        <h3 className="text-2xl font-heading font-bold text-accent-4 mb-6 uppercase">
                          {locale === "cs" ? "Svatba snů" : "Dream Wedding"}
                        </h3>
                        <div className="space-y-3">
                          <div className="bg-linear-to-br from-amber-50 to-amber-800/20 p-6 rounded-xl border border-amber-800/10">
                            <h4 className="font-heading font-semibold text-accent-4 mb-2">
                              {locale === "cs"
                                ? "Začněte plánovat"
                                : "Start Planning"}
                            </h4>
                            <p className="text-accent-1-contrast text-sm mb-4">
                              {locale === "cs"
                                ? "Objevte naše nástroje pro dokonalou svatbu"
                                : "Discover our tools for the perfect wedding"}
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
                              {locale === "cs" ? "Prozkoumat" : "Explore"}
                            </TranslatedLink>
                          </div>

                          <div className="bg-linear-to-br from-amber-800/10 to-amber-50 p-6 rounded-xl border border-amber-800/10">
                            <h4 className="font-heading font-semibold text-accent-4 mb-2">
                              {locale === "cs"
                                ? "Potřebujete pomoc?"
                                : "Need Help?"}
                            </h4>
                            <p className="text-accent-1-contrast text-sm mb-4">
                              {locale === "cs"
                                ? "Kontaktujte nás pro osobní konzultaci"
                                : "Contact us for personal consultation"}
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
                              {locale === "cs" ? "Napište mi" : "Let me know"}
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
                  <ul
                    role="navigation"
                    className="w-full flex flex-col pt-5"
                    id="mobile-navigation-links"
                  >
                    <TranslatedLink
                      href="/"
                      className="px-5 py-6 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
                      activeClassName="bg-accent-1 font-semibold"
                      exact
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na domovskou stránku"
                          : "Go to homepage"
                      }
                    >
                      <div className="w-8 h-8 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
                        <Home className="w-5 h-5 text-accent-1-contrast" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-accent-4">
                          {locale === "cs" ? "Úvod" : "Home"}
                        </div>
                        <div className="text-sm text-accent-1-contrast font-light lowercase">
                          {locale === "cs"
                            ? "Vítejte na mém webu"
                            : "Welcome to our page"}
                        </div>
                      </div>
                    </TranslatedLink>
                    <TranslatedLink
                      href="/about"
                      className="px-5 py-6 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
                      activeClassName="bg-accent-1 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku o deníku"
                          : "Go to about page"
                      }
                    >
                      <div className="w-8 h-8 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
                        <BookOpen className="w-5 h-5 text-accent-1-contrast" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-accent-4">
                          {locale === "cs" ? "O deníku" : "About"}
                        </div>
                        <div className="text-sm text-accent-1-contrast font-light lowercase">
                          {locale === "cs"
                            ? "Zjistěte více o svatebním deníku"
                            : "Learn more about wedding diary"}
                        </div>
                      </div>
                    </TranslatedLink>
                    <TranslatedLink
                      href="/products"
                      className="px-5 py-6 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
                      activeClassName="bg-accent-1 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku produktů"
                          : "Go to products page"
                      }
                    >
                      <div className="w-8 h-8 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
                        <ShoppingCart className="w-5 h-5 text-accent-1-contrast" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-accent-4">
                          {locale === "cs" ? "Objednat" : "Order"}
                        </div>
                        <div className="text-sm text-accent-1-contrast font-light lowercase">
                          {locale === "cs"
                            ? "Vyberte si svůj svatební deník"
                            : "Choose your wedding diary"}
                        </div>
                      </div>
                    </TranslatedLink>
                    <TranslatedLink
                      href="/privacy"
                      className="px-5 py-6 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
                      activeClassName="bg-accent-1 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na stránku soukromí"
                          : "Go to privacy page"
                      }
                    >
                      <div className="w-8 h-8 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
                        <Shield className="w-5 h-5 text-accent-1-contrast" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-accent-4">
                          {locale === "cs" ? "Soukromí" : "Privacy"}
                        </div>
                        <div className="text-sm text-accent-1-contrast font-light lowercase">
                          {locale === "cs"
                            ? "Informace o ochraně osobních údajů"
                            : "Personal data protection information"}
                        </div>
                      </div>
                    </TranslatedLink>
                    <TranslatedLink
                      href="/contact"
                      className="px-5 py-6 mobile-navigation-link flex items-center gap-4 border-b border-accent-1-50"
                      activeClassName="bg-accent-1 font-semibold"
                      onClick={() => setOpen(false)}
                      title={
                        locale === "cs"
                          ? "Přejít na kontaktní stránku"
                          : "Go to contact page"
                      }
                    >
                      <div className="w-8 h-8 bg-accent-1 rounded-lg flex items-center justify-center shrink-0 shadow">
                        <Mail className="w-5 h-5 text-accent-1-contrast" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-accent-4">
                          {locale === "cs" ? "Kontakt" : "Contact"}
                        </div>
                        <div className="text-sm text-accent-1-contrast font-light lowercase">
                          {locale === "cs"
                            ? "Spojte se se mnou"
                            : "Get in touch with me"}
                        </div>
                      </div>
                    </TranslatedLink>
                  </ul>

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
