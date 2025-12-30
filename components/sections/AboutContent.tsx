"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import CONTENT from "@/lib/content";
import { NotebookPen } from "lucide-react";
import { FullHeightSection } from "../common/FullHeightSection";
import { ReviewsCarousel } from "../ui/ReviewsCarousel";
import { CountUp } from "../common/CountUp";
import BenefitsSection from "../common/BenefitsSection";
import Image from "next/image";

import { Locale } from "@/lib/i18n";
import ProductGridSection from "../common/ProductGridSection";
import { PRODUCT_LIST } from "@/lib/products";

interface AboutContentProps {
  locale: Locale;
}

export default function AboutContent({ locale }: AboutContentProps) {
  return (
    <div id="about-page-wrap" className="overflow-x-hidden">
      {/* Title Section */}
      <FullHeightSection
        title={CONTENT[locale].why.intro.title}
        imageUrl="/assets/image3.webp"
        description={CONTENT[locale].why.intro.challenge}
      />

      <ProductGridSection
        locale={locale}
        title={locale === "cs" ? "Produkty" : "Products"}
        subtitle=""
        products={PRODUCT_LIST}
        background="themed"
      />

      {/* Story Section - Image Right */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                {locale === "cs" ? "Příběh Svatebního deníku" : "Our Story"}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {CONTENT[locale].story}
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/image1.webp"
                alt="Wedding story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Background Section - Image Left */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/assets/image2.webp"
                alt="My background"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                {locale === "cs" ? "Mé začátky" : "My Background"}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {CONTENT[locale].about.background}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {locale === "cs" ? "Cesta přes tanec" : "Dance Journey"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {CONTENT[locale].about.dance}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coordination & Personality Section - Image Right */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                {locale === "cs"
                  ? "Svatební koordinace"
                  : "Wedding Coordination"}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {CONTENT[locale].about.coordination}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                {locale === "cs" ? "Mé vlastnosti" : "My Personality"}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {CONTENT[locale].about.personality}
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/assets/image3.webp"
                alt="Wedding coordination"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent-1">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
            {locale === "cs"
              ? "Připraveni začít plánovat?"
              : "Ready to Start Planning?"}
          </h3>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Vyberte si svatební deník, který vám pomůže s organizací vašeho velkého dne."
              : "Choose a wedding diary that will help you organize your big day."}
          </p>
          <TranslatedLink href="/products" className="btn btn-primary">
            {locale === "cs" ? "Zobrazit produkty" : "View Products"}
          </TranslatedLink>
        </div>
      </section>
    </div>
  );
}
