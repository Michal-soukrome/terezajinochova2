"use client";

import { motion } from "framer-motion";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCT_LIST } from "@/lib/products";
import Image from "next/image";
import { ProductCard } from "../ui/ProductCard";
import { Star, Check, Lock } from "lucide-react";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import { Locale } from "@/lib/i18n";
import CONTENT from "@/lib/content";
import BenefitsSection from "../common/BenefitsSection";
import ProductGridSection from "../common/ProductGridSection";

interface ProductsContentProps {
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

export default function ProductsContent({ locale }: ProductsContentProps) {
  const t = {
    title: locale === "cs" ? "Moje svatební deníky" : "Our Wedding Planners",
    subtitle:
      locale === "cs"
        ? "Deník, který vám pomůže plánovat každý krok svatby\n\nod rozpočtu po seznam hostů."
        : "A planner that guides you through every step of your wedding\n\nfrom budget to guest list.",
    featuresTitle:
      locale === "cs" ? "Proč si vybrat náš deník?" : "Why choose our planner?",
    chooseTitle:
      locale === "cs" ? "Vyberte si svůj deník" : "Choose Your Planner",
    chooseSubtitle:
      locale === "cs"
        ? "Vyberte si verzi, která nejlépe vyhovuje vašim potřebám a začněte plánovat svůj velký den ještě dnes."
        : "Choose the version that best fits your needs and start planning your big day today.",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="products-page-wrap"
    >
      {/* Products Grid */}
      <motion.div variants={itemVariants}>
        <ProductGridSection
          locale={locale}
          title={t.title}
          subtitle={t.subtitle}
          products={PRODUCT_LIST}
          background="white"
        />
      </motion.div>

      {/* Features Section */}
      <BenefitsSection locale={locale} background="themed" />

      {/* 'Co ve Svatebním deníku naleznete' - populated from internal content */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              {locale === "cs"
                ? "Co ve Svatebním deníku naleznete:"
                : "What's inside"}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {locale === "cs" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                {CONTENT.cs.why.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="text-accent-1-contrast font-bold">•</div>
                    <div>{b}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                A practical planner with checklists, budgets, seating charts and
                more to guide you through your wedding preparation.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className=" px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            {locale === "cs"
              ? "Začněte plánovat svatbu snů ještě dnes"
              : "Start Planning Your Dream Wedding Today"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Přidejte se k tisícům spokojených párů,"
              : "Join thousands of happy couples"}
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "cs"
              ? "které si s naším deníkem zjednodušily plánování svatby."
              : "who simplified their wedding planning with our planner."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center my-10">
            <div>
              <div className="text-4xl font-bold text-accent-1-contrast mb-2 font-heading">
                {locale === "cs" ? "100%" : "100%"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Digitální produkt" : "Digital Product"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-1-contrast mb-2 font-heading">
                {locale === "cs" ? "24/7" : "24/7"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Okamžitý přístup" : "Instant Access"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-1-contrast mb-2 font-heading">
                {locale === "cs" ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Hodnocení zákazníků" : "Customer Rating"}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-gradient-1 shadow text-accent-1-contrast rounded-full text-xs font-semibold uppercase tracking-wide ">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-accent-1 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-accent-2 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-accent-3 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium">
                {locale === "cs"
                  ? "500+ spokojených zákazníků"
                  : "500+ happy customers"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
