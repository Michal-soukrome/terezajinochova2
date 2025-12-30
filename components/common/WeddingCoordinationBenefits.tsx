"use client";

import { motion } from "framer-motion";
import { Heart, Star, Users, Calendar } from "lucide-react";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Locale } from "@/lib/i18n";

interface WeddingCoordinationBenefitsProps {
  locale: Locale;
  background?: "white" | "themed";
}

export default function WeddingCoordinationBenefits({
  locale,
  background = "white",
}: WeddingCoordinationBenefitsProps) {
  const sectionClass =
    background === "themed"
      ? "bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24 "
      : "px-4 sm:px-6 lg:px-8 py-16 md:py-24";

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
            {locale === "cs"
              ? "Ta nejlepší organizace pro vaši svatbu"
              : "Your wedding deserves the best organization."}
          </h3>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-20">
          {/* Benefit 1: Personalized Service */}
          <div className="text-center group flex-1">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Heart
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast"
                />
              </div>
            </div>
            <motion.h4
              className="text-lg font-bold text-gray-900 font-heading mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {locale === "cs" ? "Osobní přístup" : "Personal Touch"}
            </motion.h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Každá svatba je jedinečná. Vytvořím plán šitý na míru vašim představám a potřebám."
                : "Every wedding is unique. I'll create a plan tailored to your vision and needs."}
            </p>
          </div>

          {/* Benefit 2: Experience */}
          <div className="text-center group flex-1">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Star
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast"
                />
              </div>
            </div>
            <motion.h4
              className="text-lg font-bold text-gray-900 font-heading mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {locale === "cs" ? "Zkušenosti" : "Experience"}
            </motion.h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "S více než 10 úspěšnými svatbami mám zkušenosti s různými styly a rozpočty."
                : "With over 10 successful weddings, I have experience with various styles and budgets."}
            </p>
          </div>

          {/* Benefit 3: Stress-Free Planning */}
          <div className="text-center group flex-1">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Users
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast"
                />
              </div>
            </div>
            <motion.h4
              className="text-lg font-bold text-gray-900 font-heading mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {locale === "cs" ? "Bez stresu" : "Stress-Free"}
            </motion.h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Postarám se o všechny detaily, abyste si mohli užít svůj velký den bez starostí."
                : "I'll handle all the details so you can enjoy your special day without worries."}
            </p>
          </div>

          {/* Benefit 4: Full Support */}
          <div className="text-center group flex-1">
            <div className="mb-6 flex justify-center">
              <div className="w-12 md:w-14 h-12 md:h-14 flex items-center justify-center">
                <Calendar
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast"
                />
              </div>
            </div>
            <motion.h4
              className="text-lg font-bold text-gray-900 font-heading mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {locale === "cs" ? "Plná podpora" : "Full Support"}
            </motion.h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "cs"
                ? "Od plánování až po samotný den svatby - jsem tu pro vás každý krok cesty."
                : "From planning to the wedding day itself - I'm here for you every step of the way."}
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center relative">
          <Link
            href={`/${locale}/${routes.contact[locale]}`}
            className="btn btn-primary"
          >
            {locale === "cs" ? "Kontaktujte mě" : "Contact Me"}
          </Link>
        </div>
      </div>
    </section>
  );
}
