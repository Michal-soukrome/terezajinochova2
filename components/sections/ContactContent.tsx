"use client";

import { motion } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import { Locale } from "@/lib/i18n";

interface ContactContentProps {
  locale: Locale;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function ContactContent({ locale }: ContactContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-16 md:pt-24"
      id="contact-page-wrap"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="max-w-7xl mx-auto"
        id="contact-page-inner"
      >
        <AnimatedHeader
          title={locale === "cs" ? "Kontaktujte mě" : "Get in Touch"}
          subtitle={
            locale === "cs"
              ? "Máte otázky nebo potřebujete pomoc? Rád vám pomohu s plánováním vaší svatby."
              : "Have questions or need help? I'm here to assist you with planning your wedding."
          }
          locale={locale}
        />

        {/* Contact Options */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Email Contact */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">
              {locale === "cs" ? "Email" : "Email"}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === "cs"
                ? "Odpovím do 24 hodin"
                : "I'll respond within 24 hours"}
            </p>
            <a
              href="mailto:tereza.jinochova@gmail.com"
              className="!lowercase text-accent-1-contrast transition-colors duration-200"
            >
              tereza.jinochova@gmail.com
            </a>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">
              {locale === "cs" ? "Sociální sítě" : "Social Media"}
            </h3>
            <p className="text-gray-600 mb-4">
              {locale === "cs"
                ? "Sledujte mě pro tipy a inspiraci"
                : "Follow me for tips and inspiration"}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-accent-1 rounded-full flex items-center justify-center hover:bg-accent-1 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-accent-1-contrast"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-accent-1 rounded-full flex items-center justify-center hover:bg-accent-1 transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-accent-1-contrast"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FAQ Section */}
      <motion.section
        variants={itemVariants}
        className="bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="contact-page"
      >
        <div className="max-w-7xl mx-auto" id="contact-page-inner">
          <h2 className="text-2xl font-bold text-gray-900 font-heading mb-8 text-center">
            {locale === "cs"
              ? "Často kladené otázky"
              : "Frequently Asked Questions"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "cs"
                  ? "Jak dlouho trvá dodání plánovače?"
                  : "How long does delivery take?"}
              </h3>
              <p className="text-gray-600">
                {locale === "cs"
                  ? "Okamžitý přístup - obdržíte odkaz ihned po dokončení platby."
                  : "Instant access - you'll receive the link immediately after payment completion."}
              </p>
            </div>

            <div className="bg-white border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "cs"
                  ? "Je plánovač dostupný v češtině?"
                  : "Is the planner available in Czech?"}
              </h3>
              <p className="text-gray-600">
                {locale === "cs"
                  ? "Ano, plánovač je kompletně v češtině a angličtině."
                  : "Yes, the planner is fully available in Czech and English."}
              </p>
            </div>

            <div className="bg-white border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "cs"
                  ? "Mohu plánovač upravit podle svých potřeb?"
                  : "Can I customize the planner to my needs?"}
              </h3>
              <p className="text-gray-600">
                {locale === "cs"
                  ? "Ano, všechny šablony jsou plně přizpůsobitelné vašim požadavkům."
                  : "Yes, all templates are fully customizable to your requirements."}
              </p>
            </div>

            <div className="bg-white border-b border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "cs"
                  ? "Poskytujete podporu po zakoupení?"
                  : "Do you provide support after purchase?"}
              </h3>
              <p className="text-gray-600">
                {locale === "cs"
                  ? "Ano, můžete mě kdykoliv kontaktovat s dotazy nebo žádostí o pomoc."
                  : "Yes, you can contact me anytime with questions or requests for help."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <TranslatedLink href="/" className="btn btn-secondary">
            {locale === "cs" ? "Zpět na úvodní stránku" : "Back to Home"}
          </TranslatedLink>
        </div>
      </motion.section>
    </motion.div>
  );
}
