"use client";

import { motion } from "framer-motion";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCT_LIST } from "@/lib/products";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { Star, Check, Lock } from "lucide-react";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { Locale } from "@/lib/i18n";

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
        ? "Deník, který vám pomůže plánovat každý krok svatby — od rozpočtu po seznam hostů."
        : "A planner that guides you through every step of your wedding — from budget to guest list.",
    featuresTitle:
      locale === "cs" ? "Proč si vybrat náš deník?" : "Why choose our planner?",
    features:
      locale === "cs"
        ? [
            {
              icon: "✓",
              title: "Přehledné plánování",
              desc: "Vše na jednom místě",
            },
            {
              icon: "💰",
              title: "Kontrola rozpočtu",
              desc: "Sledujte každou korunu",
            },
            {
              icon: "📋",
              title: "Checklist úkolů",
              desc: "Nezapomeňte na žádný detail",
            },
            {
              icon: "👥",
              title: "Seznam hostů",
              desc: "Organizujte pozvánky snadno",
            },
          ]
        : [
            {
              icon: "✓",
              title: "Clear Planning",
              desc: "Everything in one place",
            },
            { icon: "💰", title: "Budget Control", desc: "Track every penny" },
            {
              icon: "📋",
              title: "Task Checklist",
              desc: "Don't miss any detail",
            },
            {
              icon: "👥",
              title: "Guest List",
              desc: "Organize invitations easily",
            },
          ],
    chooseTitle:
      locale === "cs" ? "Vyberte si svůj deník" : "Choose Your Planner",
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="products-page-wrap"
    >
      {/* Header */}
      <motion.div variants={itemVariants} id="products-page-inner">
        <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <AnimatedHeader
              title={t.title}
              subtitle={t.subtitle}
              locale={locale}
              headingLevel={3}
              showBadge={true}
            />
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div variants={itemVariants}>
        <section className="bg-amber-800/5 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
                {t.chooseTitle}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {locale === "cs"
                  ? "Vyberte si verzi, která nejlépe vyhovuje vašim potřebám a začněte plánovat svůj velký den ještě dnes."
                  : "Choose the version that best fits your needs and start planning your big day today."}
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
            id="products-grid"
          >
            {PRODUCT_LIST.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard product={product} locale={locale} />
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
              {t.featuresTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-deluxe">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-800/5 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
            {locale === "cs"
              ? "Začněte plánovat svatbu snů ještě dnes"
              : "Start Planning Your Dream Wedding Today"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Přidejte se k tisícům spokojených párů, které si s naším deníkem zjednodušily plánování svatby."
              : "Join thousands of happy couples who simplified their wedding planning with our planner."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center my-10">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "100%" : "100%"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Digitální produkt" : "Digital Product"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "24/7" : "24/7"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Okamžitý přístup" : "Instant Access"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Hodnocení zákazníků" : "Customer Rating"}
              </div>
            </div>
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 shadow text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wide ">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-amber-800/10 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-amber-300 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white"></div>
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
