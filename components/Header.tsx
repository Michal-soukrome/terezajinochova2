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
      // focus the close button for accessibility
      closeButtonRef.current?.focus();
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
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center py-4">
        <Link href={`/${locale}`} className="text-xl font-bold text-gray-900">
          My App
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <TranslatedLink
            href={`/products`}
            className="text-gray-700 hover:text-gray-900"
            activeClassName="text-blue-600 font-semibold"
          >
            {locale === "cs" ? "Produkty" : "Products"}
          </TranslatedLink>
          <TranslatedLink
            href="/"
            className="text-gray-700 hover:text-gray-900"
            activeClassName="text-blue-600 font-semibold"
            exact
          >
            {locale === "cs" ? "Domov" : "Home"}
          </TranslatedLink>
          {/* Social icons in header (desktop) */}
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="GitHub"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.405 7.872 10.927.576.106.786-.25.786-.556 0-.274-.01-1.002-.015-1.968-3.2.694-3.874-1.542-3.874-1.542-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.08-.699.08-.699 1.154.081 1.76 1.185 1.76 1.185 1.026 1.754 2.695 1.248 3.352.954.105-.742.401-1.248.729-1.536-2.554-.29-5.243-1.277-5.243-5.683 0-1.256.45-2.282 1.184-3.087-.119-.29-.513-1.459.113-3.042 0 0 .967-.31 3.166 1.183.918-.255 1.903-.383 2.882-.388.978.005 1.964.133 2.882.388C19.4 5.199 20.366 5.51 20.366 5.51c.626 1.583.232 2.751.114 3.042.737.805 1.183 1.83 1.183 3.087 0 4.415-2.694 5.389-5.256 5.671.412.354.779 1.05.779 2.117 0 1.528-.014 2.759-.014 3.133 0 .309.207.668.792.554A10.503 10.503 0 0023.5 12C23.5 5.648 18.352.5 12 .5z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Twitter"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.46 6.003c-.77.342-1.6.572-2.47.676a4.323 4.323 0 001.89-2.385 8.62 8.62 0 01-2.737 1.047 4.306 4.306 0 00-7.337 3.925A12.2 12.2 0 013.14 4.67a4.296 4.296 0 001.333 5.744 4.26 4.26 0 01-1.95-.54v.054a4.306 4.306 0 003.456 4.221c-.466.128-.957.197-1.463.197-.358 0-.705-.035-1.042-.102.705 2.2 2.75 3.803 5.173 3.847A8.633 8.633 0 012 19.54a12.163 12.163 0 006.588 1.927c7.905 0 12.23-6.548 12.23-12.23 0-.186-.004-.372-.012-.557a8.74 8.74 0 002.116-2.232l.004-.01z" />
              </svg>
            </a>
          </div>
          <LanguageSwitcher />
        </nav>

        {/* Hamburger visible on all screen sizes */}
        <div>
          <Button
            variant="icon"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="text-gray-700 hover:bg-gray-100"
          >
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
          <MotionDiv
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href={`/${locale}`} className="text-xl font-semibold">
                My App
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  ref={closeButtonRef}
                  variant="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  ×
                </Button>
              </div>
            </div>

            <div className="px-6 py-6 flex-1 flex flex-col items-center justify-center gap-6">
              <motion.div
                custom={1}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <TranslatedLink
                  href="/products"
                  className="text-2xl font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                  activeClassName="text-blue-600"
                >
                  {locale === "cs" ? "Produkty" : "Products"}
                </TranslatedLink>
              </motion.div>

              <motion.div
                custom={2}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <TranslatedLink
                  href="/privacy"
                  className="text-lg text-gray-600"
                  onClick={() => setOpen(false)}
                  activeClassName="text-blue-600"
                >
                  {locale === "cs" ? "Soukromí" : "Privacy"}
                </TranslatedLink>
              </motion.div>

              <motion.div
                custom={3}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
              >
                <LanguageSwitcher />
              </motion.div>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.405 7.872 10.927.576.106.786-.25.786-.556 0-.274-.01-1.002-.015-1.968-3.2.694-3.874-1.542-3.874-1.542-.523-1.33-1.277-1.684-1.277-1.684-1.043-.713.08-.699.08-.699 1.154.081 1.76 1.185 1.76 1.185 1.026 1.754 2.695 1.248 3.352.954.105-.742.401-1.248.729-1.536-2.554-.29-5.243-1.277-5.243-5.683 0-1.256.45-2.282 1.184-3.087-.119-.29-.513-1.459.113-3.042 0 0 .967-.31 3.166 1.183.918-.255 1.903-.383 2.882-.388.978.005 1.964.133 2.882.388C19.4 5.199 20.366 5.51 20.366 5.51c.626 1.583.232 2.751.114 3.042.737.805 1.183 1.83 1.183 3.087 0 4.415-2.694 5.389-5.256 5.671.412.354.779 1.05.779 2.117 0 1.528-.014 2.759-.014 3.133 0 .309.207.668.792.554A10.503 10.503 0 0023.5 12C23.5 5.648 18.352.5 12 .5z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22.46 6.003c-.77.342-1.6.572-2.47.676a4.323 4.323 0 001.89-2.385 8.62 8.62 0 01-2.737 1.047 4.306 4.306 0 00-7.337 3.925A12.2 12.2 0 013.14 4.67a4.296 4.296 0 001.333 5.744 4.26 4.26 0 01-1.95-.54v.054a4.306 4.306 0 003.456 4.221c-.466.128-.957.197-1.463.197-.358 0-.705-.035-1.042-.102.705 2.2 2.75 3.803 5.173 3.847A8.633 8.633 0 012 19.54a12.163 12.163 0 006.588 1.927c7.905 0 12.23-6.548 12.23-12.23 0-.186-.004-.372-.012-.557a8.74 8.74 0 002.116-2.232l.004-.01z" />
                  </svg>
                </a>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
}
