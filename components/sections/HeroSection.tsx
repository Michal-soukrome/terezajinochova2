"use client";

import { motion } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  description: string;
  locale: Locale;
}

export function HeroSection({ title, description, locale }: HeroSectionProps) {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      id="cover"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src="/assets/diary/DSC05217.jpg"
          alt="Wedding planning background"
          fill
          className="object-cover object-center w-full h-full"
          priority
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.h1
            className="text-white heading  font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-white/90 text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TranslatedLink
              href="/products"
              className="btn btn-primary text-lg px-8 py-4"
            >
              {locale === "cs" ? "To potřebuji!" : "I need this!"}
            </TranslatedLink>

            <motion.a
              href="#diary"
              className="btn btn-secondary text-lg px-8 py-4"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {locale === "cs" ? "Chci vědět více" : "Learn More"}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
}
