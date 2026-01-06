"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { FullHeightSection } from "../common/FullHeightSection";

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

const PERSONAL_STORY_CS = `Mé jméno je Tereza Jinochová a svatební plánování je mou vášní už více než 10 let.

Všechno začalo mou láskou k tanci. Standardním a latinsko-americkým tancům jsem se věnovala profesionálně více než 15 let. Během této doby jsem přešla od výuky tance k tvorbě svatebních choreografií, což mě přivedlo blíže ke svatebnímu světu.

Postupem času jsem si uvědomila, že chci být součástí nejen tanečního příběhu, ale celého svatebního dne. Proto jsem absolvovala kurzy svatební koordinace pod záštitou Wedding & Academy Fields a začala se věnovat organizaci a koordinaci svateb.

Jsem pozitivní, energická a miluji pohyb, tanec i cestování. Díky práci v oblasti privátního létání, kde působím jako letuška, jsem se naučila preciznosti, empatii i schopnosti zachovat klid v každé situaci. Právě tyto zkušenosti nyní zúročuji při přípravě svateb.

Věřím, že každý detail má svůj význam a že dokonalá svatba je výsledkem pečlivého plánování a lásky k detailům. Pomohla jsem stovkám párům vytvořit svatební den jejich snů - od intimních obřadů po velkolepé oslavy.`;

const PERSONAL_STORY_EN = `My name is Tereza Jinochová and wedding planning has been my passion for more than 10 years.

It all started with my love for dance. I dedicated myself to standard and Latin-American dances professionally for more than 15 years. During this time, I transitioned from teaching dance to creating wedding choreographies, which brought me closer to the wedding world.

Over time, I realized that I wanted to be part of not just the dance story, but the entire wedding day. That's why I completed wedding coordination courses under the auspices of Wedding & Academy Fields and began dedicating myself to the organization and coordination of weddings.

I am positive, energetic, and love movement, dance, and travel. Thanks to my work in private aviation, where I work as a flight attendant, I learned precision, empathy, and the ability to stay calm in every situation. I now utilize these experiences in wedding preparations.

I believe that every detail matters and that a perfect wedding is the result of careful planning and love for details. I've helped hundreds of couples create their dream wedding day - from intimate ceremonies to grand celebrations.`;

const VALUES_CS = [
  {
    title: "Detailní přístup",
    description:
      "Věřím, že každý detail má svůj význam a přispívá k dokonalosti celého dne.",
    icon: "Search",
  },
  {
    title: "Empatie a pochopení",
    description:
      "Každý pár je jedinečný a zaslouží si individuální přístup šitý na míru.",
    icon: "Heart",
  },
  {
    title: "Profesionalita",
    description:
      "Přináším zkušenosti z let práce ve svatebním průmyslu i z dalších oborů.",
    icon: "Award",
  },
  {
    title: "Kreativita",
    description:
      "Miluji najít kreativní řešení pro každou výzvu a udělat každý den nezapomenutelným.",
    icon: "Sparkles",
  },
];

const VALUES_EN = [
  {
    title: "Detailed Approach",
    description:
      "I believe that every detail matters and contributes to the perfection of the entire day.",
    icon: "Search",
  },
  {
    title: "Empathy and Understanding",
    description:
      "Every couple is unique and deserves an individual approach tailored to them.",
    icon: "Heart",
  },
  {
    title: "Professionalism",
    description:
      "I bring experience from years of work in the wedding industry and other fields.",
    icon: "Award",
  },
  {
    title: "Creativity",
    description:
      "I love finding creative solutions for every challenge and making every day unforgettable.",
    icon: "Sparkles",
  },
];

interface AboutMeContentProps {
  locale: Locale;
}

export default function AboutMeContent({ locale }: AboutMeContentProps) {
  const values = locale === "cs" ? VALUES_CS : VALUES_EN;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-x-hidden"
    >
      {/* Personal Story Section */}
      <FullHeightSection
        title={locale === "cs" ? "O mně" : "About Me"}
        imageUrl="/assets/image1.webp"
        description={locale === "cs" ? PERSONAL_STORY_CS : PERSONAL_STORY_EN}
      />
    </motion.div>
  );
}
