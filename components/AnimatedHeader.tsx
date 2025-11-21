"use client";

import { motion } from "framer-motion";
import { Locale } from "@/lib/i18n";
import { ReactNode } from "react";

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
  locale: Locale;
  headingLevel?: 1 | 3;
  showBadge?: boolean;
  badgeText?: string;
}

export function AnimatedHeader({
  title,
  subtitle,
  locale,
  headingLevel = 1,
  showBadge = false,
  badgeText,
}: AnimatedHeaderProps) {
  const HeadingTag = headingLevel === 1 ? motion.h3 : motion.h3;

  return (
    <motion.div
      className="text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <HeadingTag
        className="text-4xl md:text-5xl font-bold text-gray-900 font-deluxe mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}

      {showBadge && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-800/10 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <svg
            className="w-5 h-5 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span className="text-sm font-semibold text-amber-900">
            {badgeText ||
              (locale === "cs"
                ? "Plánujte svatbu snadno"
                : "Plan Your Wedding Easily")}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
