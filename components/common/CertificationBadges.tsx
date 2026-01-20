"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";

interface CertificationBadgesProps {
  locale: Locale;
}

export function CertificationBadges({ locale }: CertificationBadgesProps) {
  return (
    <motion.div
      className="flex justify-center items-center gap-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <a
        href="https://www.academy-fields.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src="/assets/ikonky/absolvent.png"
          alt="Absolvent Academy Fields"
          className="h-24 w-auto"
        />
      </a>
      <a
        href="https://www.academy-fields.com"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          src="/assets/ikonky/koordinator.png"
          alt="Koordinátor svateb Academy Fields"
          className="h-24 w-auto"
        />
      </a>
    </motion.div>
  );
}
