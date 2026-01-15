"use client";

import { motion } from "framer-motion";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCT_LIST } from "@/lib/products";
import Image from "next/image";
import { ProductCard } from "../ui/ProductCard";
import { Star, Check, Lock } from "lucide-react";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import { Locale } from "@/lib/i18n";
import BenefitsSection from "../common/BenefitsSection";
import ProductGridSection from "../common/ProductGridSection";

const WHY_BULLETS_CS = [
  "elegantní a přehledné rozvržení stránek",
  "prostor pro vlastní poznámky, checklisty a fotografie",
  "ideální dárek pro čerstvě zasnoubené",
  "kvalitní zpracování, které vydrží i časté listování",
];

const WHY_BULLETS_EN = [
  "elegant and clear page layout",
  "space for your own notes, checklists, and photos",
  "gentle and modern design that pleases the eye",
  "ideal gift for yourself or a friend who just got engaged",
  "quality processing that withstands frequent flipping",
];

const CONTENT = {
  cs: {
    why: {
      bullets: WHY_BULLETS_CS,
    },
  },
  en: {
    why: {
      bullets: WHY_BULLETS_EN,
    },
  },
};

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
    title: locale === "cs" ? "Mé svatební deníky" : "My Wedding planners",
    subtitle:
      locale === "cs"
        ? "Deník, který vám pomůže plánovat každý krok svatby od prvního rozpočtu až po závěrečné detaily."
        : "A planner that guides you through every step of your wedding\n\nfrom budget to guest list.",
    featuresTitle:
      locale === "cs"
        ? "Proč si vybrat svatební deník?"
        : "Why choose wedding planner?",
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
      className="overflow-x-hidden"
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

      {/* 'Co ve Svatebním deníku naleznete' - redesigned with card components */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              {locale === "cs"
                ? "Co ve Svatebním deníku naleznete"
                : "What's inside"}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === "cs"
                ? "Elegantní design a praktické funkce pro dokonalou organizaci svatby"
                : "Elegant design and practical features for perfect wedding organization"}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CONTENT[locale].why.bullets.map((feature, i) => (
                <div key={i} className="p-5 shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Check className="w-6 h-6 text-accent-1-contrast mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {feature}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
