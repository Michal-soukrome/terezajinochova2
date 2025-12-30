"use client";

import { motion } from "framer-motion";
import TranslatedLink from "../navigation/TranslatedLink";
import { CountUp } from "../common/CountUp";
import { ProductCard } from "../ui/ProductCard";
import { PRODUCT_LIST } from "@/lib/products";
import { HeroSection } from "./HeroSection";
import { ReviewsCarousel } from "../ui/ReviewsCarousel";
import { FullHeightSection } from "../common/FullHeightSection";
import { Locale } from "@/lib/i18n";
import Image from "next/image";
import {
  Gift,
  HeartPulse,
  NotebookPen,
  Film,
  Palette,
  MapPin,
  Camera,
  Mail,
  LocationEdit,
} from "lucide-react";
import BenefitsSection from "../common/BenefitsSection";

interface HomeContentProps {
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

export default function HomeContent({ locale }: HomeContentProps) {
  const title =
    locale === "cs" ? "Váš svatební plánovač" : "Your wedding planner";
  const description =
    locale === "cs"
      ? "Naplánujte si svůj svatební den s lehkostí a radostí"
      : "Plan your wedding day with ease and joy";

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-x-hidden"
    >
      <HeroSection title={title} description={description} locale={locale} />

      {/* Full Height Sections */}
      <FullHeightSection
        title={locale === "cs" ? "Proč svatební deník?" : "Why Wedding Diary?"}
        description={
          locale === "cs"
            ? "Organizace svatby je fascinující, ale náročná cesta. Svatební deník vám pomůže zvládat všechny detaily s lehkostí."
            : "Organizing a wedding is a fascinating but challenging journey. A wedding diary helps you manage all the details with ease."
        }
        imageUrl="/assets/image3.webp"
        imageAlt="Wedding planning"
        imageSide="right"
        backgroundColor="bg-accent-1"
        textColor="text-gray-900"
        cta={{
          text: locale === "cs" ? "Zjistit více" : "Learn More",
          href: `/products`,
        }}
        sectionId="diary"
      />

      <FullHeightSection
        title={locale === "cs" ? "Váš příběh" : "Your Story"}
        description={
          locale === "cs"
            ? "Každá svatba je jedinečná. Můj deník se přizpůsobí vaší představě a stane se součástí vašeho nezapomenutelného dne."
            : "Every wedding is unique. My diary adapts to your vision and becomes part of your unforgettable day."
        }
        imageUrl="/assets/image2.webp"
        imageAlt="Wedding story"
        imageSide="left"
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      <BenefitsSection locale={locale} background="themed" />

      {/* product list, just duplicating products page */}
      <section className=" px-4 sm:px-6 lg:px-8 py-16 md:py-24" id="products">
        <div className="max-w-7xl mx-auto" id="products-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            {PRODUCT_LIST.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard product={product} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* reviews, offset carousel with horizontal scroll */}
      <section className="bg-accent-1 px-0 py-16 md:py-24" id="reviews">
        <div className="w-full" id="reviews-inner">
          <div className="text-center ">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              {locale === "cs"
                ? "Recenze spokojených svatebčanů"
                : "What My Clients Say"}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === "cs"
                ? "Přečtěte si zkušenosti párů, které už využily naše služby"
                : "Read the experiences of couples who have already used my services"}
            </p>
          </div>

          <div className="max-w-7xl mx-auto mt-5 mb-10" id="stats-inner">
            <div className="">
              <div className="text-center">
                <CountUp end={500} suffix="+" />
                <div className="text-gray-700 font-medium">
                  {locale === "cs" ? "Spokojených párů" : "Happy Couples"}
                </div>
              </div>
            </div>
          </div>

          <ReviewsCarousel locale={locale} />
        </div>
      </section>

      {/* about the author */}
      {/* 
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24" id="about">
        <div className="max-w-7xl mx-auto" id="about-inner">
          <div className="flex flex-col items-center justify-center text-center gap-5 md:gap-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-6">
                {locale === "cs" ? "O mně" : "About Me"}
              </h3>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  {locale === "cs"
                    ? "Jsem Tereza, vášnivá plánovačka svateb s více než 10 lety zkušeností v organizaci nezapomenutelných okamžiků."
                    : "I'm Tereza, a passionate wedding planner with more than 10 years of experience in organizing unforgettable moments."}
                </p>
                <p>
                  {locale === "cs"
                    ? "Věřím, že každý detail má svůj význam a že dokonalá svatba je výsledkem pečlivého plánování a lásky k detailům."
                    : "I believe that every detail matters and that a perfect wedding is the result of careful planning and love for details."}
                </p>
                <p>
                  {locale === "cs"
                    ? "Pomohla jsem stovkám párům vytvořit svatební den jejich snů - od intimních obřadů po velkolepé oslavy."
                    : "I've helped hundreds of couples create their dream wedding day - from intimate ceremonies to grand celebrations."}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="max-w-72 aspect-square overflow-hidden">
                <div className="w-full h-full flex items-center rounded-full justify-center relative">
                  <Image
                    src="/assets/image1.webp"
                    fill
                    className="object-cover object-bottom rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* contact */}
      <section
        className="bg-white px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="contact"
      >
        <div className="max-w-7xl mx-auto" id="contact-inner">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
              {locale === "cs"
                ? "Začněte plánovat svou svatbu"
                : "Start Planning Your Wedding"}
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === "cs"
                ? "Kontaktujte mě ještě dnes a začněme společně plánovat váš speciální den"
                : "Contact me today and let's start planning your special day together"}
            </p>
          </div>

          <div className="text-center">
            <TranslatedLink href="/contact" className="btn btn-primary">
              {locale === "cs" ? "Kontaktujte mě" : "Contact Me"}
            </TranslatedLink>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
