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
      className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden "
      id="cover"
    >
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
            className="hidden md:block w-24 h-1 bg-linear-to-r from-accent-1-contrast to-accent-4 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.3 }}
          ></motion.div>

          <motion.h1
            className="font-heading font-medium text-center text-6xl text-accent-1-contrast leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.h2
            className="text-center text-xl text-accent-1-contrast font-light uppercase tracking-wide mb-12 max-w-3xl mx-auto leading-relaxed"
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
            className="w-16 h-0.5 bg-linear-to-r from-accent-1-contrast to-accent-4 mx-auto mt-12 rounded-full"
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
