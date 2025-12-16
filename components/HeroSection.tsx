"use client";

import { motion } from "framer-motion";
import TranslatedLink from "@/components/TranslatedLink";
import { Locale } from "@/lib/i18n";

interface HeroSectionProps {
  title: string;
  description: string;
  locale: Locale;
}

export function HeroSection({ title, description, locale }: HeroSectionProps) {
  return (
    <section
      className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-amber-50/30"
      id="cover"
    >
      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-10 right-5 w-6 h-6 text-amber-300/60"
        animate={{
          x: [-30, 30, -30],
          y: [-15, 15, -15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-5 w-8 h-8 text-amber-400/40"
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-10 w-5 h-5 text-amber-500/50"
        animate={{
          x: [-40, 40, -40],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20 w-7 h-7 text-amber-300/70"
        animate={{
          x: [25, -25, 25],
          y: [-20, 20, -20],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.36.78-4.5 2.05C10.86 3.78 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative line above title */}
          <motion.div
            className="hidden md:block w-24 h-1 bg-linear-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>

          <motion.h1
            className="font-deluxe font-medium text-center text-6xl text-amber-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.h2
            className="text-center text-xl text-amber-800 font-light uppercase tracking-wide mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {" "}
            <a href="#benefits" className="btn btn-secondary">
              {locale === "cs" ? "Chci vědět více" : "More information"}
            </a>
            <TranslatedLink href="/products" className="btn btn-primary">
              {locale === "cs" ? "To potřebuji!" : "I need this!"}
            </TranslatedLink>
          </motion.div>

          {/* Decorative line below buttons */}
          <motion.div
            className="w-16 h-0.5 bg-linear-to-r from-amber-500 to-amber-700 mx-auto mt-12 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.8 }}
          ></motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent"></div>
    </section>
  );
}
