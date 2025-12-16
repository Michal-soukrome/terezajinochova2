"use client";

import { motion } from "framer-motion";
import TranslatedLink from "@/components/TranslatedLink";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { Locale } from "@/lib/i18n";

interface PrivacyContentProps {
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

export default function PrivacyContent({ locale }: PrivacyContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-16 md:pt-24"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="max-w-7xl mx-auto">
        <AnimatedHeader
          title={
            locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy"
          }
          subtitle={
            locale === "cs"
              ? "Vaše soukromí je pro nás důležité"
              : "Your privacy is important to us"
          }
          locale={locale}
        />
      </motion.div>

      {/* Last Updated */}
      <motion.div
        variants={itemVariants}
        className="bg-accent-1 border border-accent-1 rounded-xl p-4 mb-8 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-accent-1-contrast font-medium">
            {locale === "cs"
              ? "Naposledy aktualizováno: 19. listopadu 2025"
              : "Last updated: November 19, 2025"}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants} className="prose max-w-none">
        {/* Introduction */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {locale === "cs" ? "Úvod" : "Introduction"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {locale === "cs"
                ? "Tato zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme a chráníme vaše osobní údaje při používání našich služeb pro plánování svateb."
                : "This privacy policy explains how we collect, use, and protect your personal information when using our wedding planning services."}
            </p>
          </div>
        </section>

        {/* Data Collection */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {locale === "cs" ? "Shromažďování údajů" : "Data Collection"}
            </h2>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === "cs"
                  ? "Jaké údaje shromažďujeme:"
                  : "What data we collect:"}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-accent-1-contrast mt-1">•</span>
                  {locale === "cs"
                    ? "Kontaktní údaje (jméno, email) pro komunikaci"
                    : "Contact information (name, email) for communication"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-1-contrast mt-1">•</span>
                  {locale === "cs"
                    ? "Platební údaje zpracované přes Stripe (nezachováváme)"
                    : "Payment information processed through Stripe (not stored)"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-1-contrast mt-1">•</span>
                  {locale === "cs"
                    ? "Údaje o používání aplikace pro zlepšení služeb"
                    : "App usage data to improve our services"}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Usage */}
        <section className="bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {locale === "cs" ? "Použití údajů" : "Data Usage"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {locale === "cs"
                ? "Vaše údaje používáme pouze pro následující účely:"
                : "We use your data only for the following purposes:"}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent-1 rounded-lg p-4 border border-accent-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === "cs" ? "Poskytování služeb" : "Service Delivery"}
                </h4>
                <p className="text-sm text-gray-700">
                  {locale === "cs"
                    ? "Zpracování objednávek a poskytování přístupu k plánovači"
                    : "Processing orders and providing access to the planner"}
                </p>
              </div>
              <div className="bg-accent-1 rounded-lg p-4 border border-accent-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === "cs" ? "Komunikace" : "Communication"}
                </h4>
                <p className="text-sm text-gray-700">
                  {locale === "cs"
                    ? "Odpovídání na vaše dotazy a poskytování podpory"
                    : "Responding to your inquiries and providing support"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {locale === "cs" ? "Ochrana údajů" : "Data Protection"}
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "cs" ? "SSL šifrování" : "SSL Encryption"}
                  </h4>
                  <p className="text-green-800 text-sm">
                    {locale === "cs"
                      ? "Všechna data jsou přenášena přes zabezpečené HTTPS připojení"
                      : "All data is transmitted through secure HTTPS connections"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              {locale === "cs"
                ? "Vaše osobní údaje jsou uloženy na zabezpečených serverech a nikdy nejsou sdíleny s třetími stranami bez vašeho souhlasu."
                : "Your personal information is stored on secure servers and is never shared with third parties without your consent."}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4 flex items-center gap-3">
              <svg
                className="w-6 h-6 text-accent-1-contrast"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {locale === "cs" ? "Kontaktujte nás" : "Contact Us"}
            </h2>
            <p className="text-gray-700 mb-6">
              {locale === "cs"
                ? "Máte otázky ohledně ochrany osobních údajů? Kontaktujte mě na:"
                : "Have questions about privacy? Contact me at:"}
            </p>
            <a
              href="mailto:privacy@svatebnidenik.cz"
              className="btn-deluxe inline-block"
            >
              privacy@svatebnidenik.cz
            </a>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}
