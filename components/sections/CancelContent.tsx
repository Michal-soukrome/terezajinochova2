"use client";

import { motion } from "framer-motion";
import { useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import TranslatedLink from "../navigation/TranslatedLink";
import { isValidLocale, defaultLocale, Locale } from "@/lib/i18n";
import { Copy, Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CancelContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const pathname = usePathname();
  const localeFromPath = pathname?.split("/").filter(Boolean)[0];
  const locale: Locale = isValidLocale(localeFromPath)
    ? localeFromPath
    : defaultLocale;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (sessionId) {
      await navigator.clipboard.writeText(sessionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-b from-amber-50/30 via-white to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main Content */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        variants={itemVariants}
      >
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-200 rounded-full mb-6"
            variants={itemVariants}
          >
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-sm font-semibold text-red-900">
              {locale === "cs" ? "Platba zrušena" : "Payment Cancelled"}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight"
            variants={itemVariants}
          >
            {locale === "cs" ? "Platba byla zrušena" : "Payment Cancelled"}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto"
            variants={itemVariants}
          >
            {locale === "cs"
              ? "Vaše platba byla zrušena. Pokud jste omylem přerušili platbu, můžete zkusit nákup znovu nebo se vrátit na hlavní stránku."
              : "Your payment was cancelled. If you interrupted the checkout by mistake, you can try buying again or return to the homepage."}
          </motion.p>

          {sessionId && (
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 w-full max-w-full"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-gray-600 flex-1">
                  {locale === "cs" ? "ID relace:" : "Session ID:"} <br />
                  <span className="font-mono font-medium text-gray-900 break-all">
                    {sessionId}
                  </span>
                </p>
                <button
                  onClick={copyToClipboard}
                  className="mt-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors cursor-pointer"
                  title={locale === "cs" ? "Kopírovat ID" : "Copy ID"}
                >
                  {copied ? (
                    <>
                      <span className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          {locale === "cs" ? "Zkopírováno" : "Copied"}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1">
                        <Copy className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">
                          {locale === "cs" ? "Kopírovat ID" : "Copy ID"}
                        </span>
                      </span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <TranslatedLink
              href="/"
              className="btn btn-primary"
              title={
                locale === "cs"
                  ? "Přejít na domovskou stránku"
                  : "Go to homepage"
              }
            >
              {locale === "cs" ? "Zpět na úvodní stránku" : "Back to Homepage"}
            </TranslatedLink>

            <TranslatedLink
              href="/products"
              className="btn btn-secondary"
              title={
                locale === "cs"
                  ? "Přejít na stránku produktů"
                  : "Go to products page"
              }
            >
              {locale === "cs" ? "Zobrazit produkty" : "View Products"}
            </TranslatedLink>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
