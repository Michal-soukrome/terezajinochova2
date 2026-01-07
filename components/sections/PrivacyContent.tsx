"use client";

import { motion } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { Locale } from "@/lib/i18n";
import { Mail } from "lucide-react";
import { SocialMediaIcons } from "../common";

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
    <main className="min-h-screen pt-20 overflow-x-hidden">
      <div className="container mx-auto text-center mb-16">
        <motion.h3
          className="heading font-medium text-5xl md:text-6xl text-accent-1-contrast leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy"}
        </motion.h3>

        <motion.p
          className="text-lg md:text-xl text-accent-1-contrast font-light uppercase tracking-wide max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {locale === "cs"
            ? "Vaše soukromí je pro nás důležité"
            : "Your privacy is important to us"}
        </motion.p>
      </div>

      {/* Last Updated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-accent-1 border-y border-accent-1 p-4 my-2 text-center"
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="prose max-w-none"
      >
        <motion.section
          variants={itemVariants}
          className="px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-10">
            {/* Heading */}
            <h3 className="text-3xl font-bold text-gray-900 font-heading">
              {locale === "cs"
                ? "Jaké údaje shromažďujeme"
                : "Information We Collect"}
            </h3>

            {/* Intro */}
            <p>
              {locale === "cs"
                ? "Tato zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme a chráníme vaše osobní údaje při používání našich služeb pro plánování svateb."
                : "This privacy policy explains how we collect, use, and protect your personal information when using my wedding planning services."}
            </p>

            {/* List */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">
                {locale === "cs"
                  ? "Shromažďujeme následující typy údajů:"
                  : "We collect the following types of information:"}
              </h4>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {locale === "cs"
                    ? "Kontaktní údaje (jméno, email) pro komunikaci a poskytování služeb"
                    : "Contact information (name, email) for communication and service delivery"}
                </li>
                <li>
                  {locale === "cs"
                    ? "Platební údaje zpracované bezpečně přes Stripe (nezachováváme žádné platební údaje)"
                    : "Payment information processed securely through Stripe (we don't store any payment details)"}
                </li>
                <li>
                  {locale === "cs"
                    ? "Údaje o používání aplikace pro zlepšení našich služeb a uživatelské zkušenosti"
                    : "App usage data to improve our services and user experience"}
                </li>
              </ul>
            </div>

            {/* Usage */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 font-heading mb-4">
                {locale === "cs"
                  ? "Jak používáme a chráníme vaše údaje"
                  : "How We Use and Protect Your Data"}
              </h3>

              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                {locale === "cs" ? "Použití údajů" : "Data Usage"}
              </h4>

              <p>
                {locale === "cs"
                  ? "Vaše údaje používáme pouze pro následující účely:"
                  : "We use your data only for the following purposes:"}
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  {locale === "cs"
                    ? "Zpracování objednávek a poskytování přístupu k plánovači svateb"
                    : "Processing orders and providing access to the wedding planner"}
                </li>
                <li>
                  {locale === "cs"
                    ? "Odpovídání na vaše dotazy a poskytování podpory"
                    : "Responding to your inquiries and providing support"}
                </li>
              </ul>
            </div>

            {/* Protection */}
            <div>
              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                {locale === "cs" ? "Ochrana údajů" : "Data Protection"}
              </h4>

              <p>
                {locale === "cs"
                  ? "Vaše osobní údaje jsou uloženy na zabezpečených serverech s SSL šifrováním a nikdy nejsou sdíleny s třetími stranami bez vašeho souhlasu. Všechna data jsou přenášena přes zabezpečené HTTPS připojení."
                  : "Your personal information is stored on secure servers with SSL encryption and is never shared with third parties without your consent. All data is transmitted through secure HTTPS connections."}
              </p>
            </div>

            {/* Analytics */}
            <div>
              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                {locale === "cs" ? "Analytika" : "Analytics"}
              </h4>

              <p>
                {locale === "cs"
                  ? "Používáme Google Analytics prostřednictvím Google Tag Manager pro sledování návštěvnosti webu a chování uživatelů, abychom mohli zlepšit naše služby a uživatelskou zkušenost."
                  : "We use Google Analytics through Google Tag Manager to track website traffic and user behavior to improve our services and user experience."}
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
