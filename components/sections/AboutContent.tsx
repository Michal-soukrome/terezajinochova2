"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import { NotebookPen } from "lucide-react";
import { FullHeightSection } from "../common/FullHeightSection";
import { ReviewsCarousel } from "../ui/ReviewsCarousel";
import { CountUp } from "../common/CountUp";
import BenefitsSection from "../common/BenefitsSection";
import Image from "next/image";
import { motion } from "framer-motion";

import { Locale } from "@/lib/i18n";
import ProductGridSection from "../common/ProductGridSection";
import { PRODUCT_LIST } from "@/lib/products";

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

const WHY_INTRO_CS = {
  title: "Příběh svatebního deníku",
  challenge:
    "Plánování svatby je jedním z nejkrásnějších období v životě. Aby se však nezměnilo v chaos plný stresu a zapomenutých detailů, je tu Svatební deník – praktický a zároveň stylový pomocník, který vás provede každým krokem na cestě ke dni D.",
};

const WHY_INTRO_EN = {
  title: "Wedding Diary or From Engagement to the Altar",
  challenge:
    "Wedding planning is one of the most beautiful periods in life. However, to prevent it from turning into chaos full of stress and forgotten details, there's the Wedding Diary – a practical yet stylish helper that guides you through every step towards your big day.",
};

const STORY_CS = `Svatební deník vznikl z mé lásky k organizaci, detailům a především k samotným příběhům snoubenců.

Po letech práce se svatebními páry jsem si uvědomila, že mnoho nevěst touží mít všechny důležité informace, poznámky a inspiraci přehledně na jednom místě – v krásné a praktické podobě, která je bude provázet celým obdobím příprav.

Deník je navržen tak, aby se stal nejen průvodcem a rádcem, ale také vzpomínkou. Pomůže naplánovat každý krok s lehkostí, přehledem a elegancí.`;

const STORY_EN = `The Story of the Wedding Diary

The Wedding Diary was born from my love for organization, details, and above all, the stories of engaged couples.

After years of working with wedding couples, I realized that many brides long to have all important information, notes, and inspiration clearly in one place – in a beautiful and practical form that will accompany them throughout the preparation period.

The diary is designed to become not only a guide and advisor, but also a memory. It will help plan every step with ease, overview, and elegance.`;

const ABOUT_CS = {
  background: `Po studiu vysoké školy jsem byla přesvědčená, že mě práce s dětmi bude naplňovat. Osud a má povaha se mnou měly ale jiné plány.`,
  dance: `Do světa svateb jsem se dostala díky své dlouholeté vášni ke společenskému tanci. Standardním a latinsko - americkým tancům jsem se na profesionální úrovni věnovala více než 15 let. Postupem času jsem přešla od výuky společenského tance k tvorbě svatebních choreografií.`,
  coordination: `S každou další svatbou jsem chtěla být součástí nejen tanečního příběhu, ale celého svatebního dne. Proto jsem se rozhodla absolvovat kurzy svatební koordinace pod záštitou Wedding & Academy Fields a začala se věnovat organizaci a koordinaci svateb.`,
  personality: `Jsem pozitivní, energická a miluji pohyb, tanec i cestování. Díky práci v oblasti privátního létání, kde působím jako letuška, jsem se naučila preciznosti, empatii i schopnosti zachovat klid v každé situaci. Právě tyto zkušenosti nyní zúročuji i při přípravě svateb, kde je stejně jako v letadle důležitý každý detail.`,
};

const ABOUT_EN = {
  background: `After university studies, I was convinced that working with children would fulfill me. However, fate and my personality had other plans.`,
  dance: `I entered the world of weddings thanks to my long-term passion for ballroom dancing. I dedicated myself to standard and Latin-American dances at a professional level for more than 15 years. Over time, I transitioned from teaching ballroom dancing to creating wedding choreographies.`,
  coordination: `With each subsequent wedding, I wanted to be part of not only the dance story, but the entire wedding day. That's why I decided to complete wedding coordination courses under the auspices of Wedding & Academy Fields and began dedicating myself to the organization and coordination of weddings.`,
  personality: `I am positive, energetic, and love movement, dance, and travel. Thanks to my work in private aviation, where I work as a flight attendant, I learned precision, empathy, and the ability to stay calm in every situation. I now utilize these experiences in wedding preparations, where every detail is as important as it is in an airplane.`,
};

const CONTENT = {
  cs: {
    why: {
      intro: WHY_INTRO_CS,
    },
    story: STORY_CS,
    about: ABOUT_CS,
  },
  en: {
    why: {
      intro: WHY_INTRO_EN,
    },
    story: STORY_EN,
    about: ABOUT_EN,
  },
};

interface AboutContentProps {
  locale: Locale;
}

export default function AboutContent({ locale }: AboutContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-x-hidden"
    >
      {/* Title Section */}
      <FullHeightSection
        title={CONTENT[locale].why.intro.title}
        imageUrl="/assets/image3.webp"
        description={CONTENT[locale].story}
      />

      <ProductGridSection
        locale={locale}
        title={locale === "cs" ? "Produkty" : "Products"}
        subtitle=""
        products={PRODUCT_LIST}
        background="themed"
      />

      {/* Pattern Background Container */}
      <div className="relative">
        {/* Layered Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent-4/20 via-transparent to-accent-1/20" />
        </div>
      </div>
    </motion.div>
  );
}
