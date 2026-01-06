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
    <section id="cover" className="w-full flex flex-col justify-start">
      {/* IMAGE SECTION */}
      <div className="relative w-full h-full min-h-[45vh] md:min-h-[60vh]  overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/assets/diary/DSC05217.jpg"
            alt="Wedding planning background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
        <motion.div
          className="absolute inset-0 bg-accent-1/10 z-[11]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>

      {/* TEXT SECTION */}
      <div className="relative z-10 px-0 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="w-full max-w-auto md:max-w-6xl mx-auto">
          {/* Glass-morphism Content Container */}
          <div className="inline-block w-full max-w-full md:max-w-4xl py-5 md:py-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {" "}
              <div className="p-5">
                <motion.h1
                  className="heading text-gray-900 font-medium text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 color-new-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {title}
                </motion.h1>

                <motion.h2
                  className="color-new-text text-lg md:text-xl lg:text-2xl font-light uppercase tracking-wide mb-4 max-w-4xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {description}
                </motion.h2>
              </div>
              <motion.div
                className="flex gap-2 flex-wrap justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#diary"
                  className="btn btn-secondary"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {locale === "cs" ? "Chci vědět více" : "More information"}
                </motion.a>

                <TranslatedLink href="/products" className="btn btn-primary">
                  {locale === "cs" ? "To potřebuji!" : "I need this!"}
                </TranslatedLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
