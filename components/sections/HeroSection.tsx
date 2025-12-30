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
      className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden"
      id="cover"
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/assets/weddings/lenka-libor/6.jpg"
          alt="Wedding planning background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Gradient Overlays for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated accent overlay - subtle color wash */}
      <motion.div
        className="absolute inset-0 bg-accent-1/10 z-[3]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="heading font-medium text-center text-5xl md:text-7xl text-white leading-tight mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          <motion.h2
            className="text-center text-lg md:text-xl text-white font-light uppercase tracking-wide mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
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
            <motion.a
              href="#diary"
              className="btn btn-secondary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {locale === "cs" ? "Chci vědět více" : "More information"}
            </motion.a>
            <TranslatedLink
              href="/products"
              className="btn btn-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {locale === "cs" ? "To potřebuji!" : "I need this!"}
            </TranslatedLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-[5%] w-32 h-32 bg-accent-1/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[5%] w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
}
