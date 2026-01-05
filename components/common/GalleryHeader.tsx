"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";

interface GalleryHeaderProps {
  locale: Locale;
}

export function GalleryHeader({ locale }: GalleryHeaderProps) {
  return (
    <div className="text-center mb-12">
      <motion.h3
        className="heading font-medium text-center text-5xl md:text-6xl text-accent-1-contrast leading-tight mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {locale === "cs" ? "Svatební příběhy" : "Wedding Stories"}
      </motion.h3>
      <motion.p
        className="text-center text-lg md:text-xl text-accent-1-contrast font-light uppercase tracking-wide mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {locale === "cs"
          ? "Nahlédněte do svateb, které jsem měla tu čest koordinovat"
          : "Take a look at weddings I had the honor to coordinate"}
      </motion.p>
    </div>
  );
}
