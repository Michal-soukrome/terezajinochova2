"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { SocialMediaIcons } from "../common/SocialMediaIcons";

interface ContactContentProps {
  locale: Locale;
}

export default function ContactContent({ locale }: ContactContentProps) {
  return (
    <main className="min-h-screen pt-20 overflow-x-hidden">
      <div className="container mx-auto text-center mb-16">
        <motion.h3
          className="heading font-medium text-5xl md:text-6xl text-accent-1-contrast leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {locale === "cs" ? "Kontakt" : "Contact"}
        </motion.h3>

        <motion.p
          className="text-lg md:text-xl text-accent-1-contrast font-light uppercase tracking-wide max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {locale === "cs"
            ? "Máte otázky? Ráda vám pomohu s plánováním vaší svatby."
            : "Have questions? I'm here to help you plan your wedding."}
        </motion.p>
      </div>

      {/* Single-line contact row */}
      <section className="bg-accent-1 py-16 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Email */}
          <a
            href="mailto:svatebnipribehy@gmail.com"
            className="flex items-center gap-3 text-gray-900 hover:text-accent-1-contrast transition-colors duration-200 text-xl font-medium hover:underline"
          >
            <Mail
              className="w-7 h-7 text-accent-1-contrast"
              strokeWidth={1.5}
            />
            svatebnipribehy@gmail.com
          </a>

          {/* Divider (optional) */}
          <div className="hidden md:block w-px h-8 bg-gray-300" />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <SocialMediaIcons iconClassName="hover:opacity-70 transition-opacity duration-200" />
          </div>
        </motion.div>
      </section>
    </main>
  );
}
