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

      {/* Pattern Background Container */}
      <div className="relative">
        {/* Layered Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3" />
          <div className="absolute inset-0 bg-gradient-to-tl from-accent-4/20 via-transparent to-accent-1/20" />
        </div>

        {/* Values Section */}
        <motion.section
          variants={itemVariants}
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent-1/30 relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading flex items-center justify-center gap-3">
                <svg
                  className="w-7 h-7 text-accent-1-contrast"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                {locale === "cs" ? "Mé hodnoty" : "My Values"}
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                {locale === "cs"
                  ? "To, v čem věřím a co přináším do každého projektu"
                  : "What I believe in and bring to every project"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-accent-1/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-accent-1-contrast"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {value.icon === "Search" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      )}
                      {value.icon === "Heart" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      )}
                      {value.icon === "Award" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {value.icon === "Sparkles" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          variants={itemVariants}
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10"
        >
          <div className="max-w-7xl mx-auto">
            <div className="backdrop-blur-sm bg-white/60 border border-white/30 rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 font-heading flex items-center justify-center gap-3">
                  <svg
                    className="w-7 h-7 text-accent-1-contrast"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {locale === "cs" ? "Mé zkušenosti" : "My Experience"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-1-contrast mb-2">
                    500+
                  </div>
                  <div className="text-gray-700">
                    {locale === "cs" ? "Spokojených párů" : "Happy Couples"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-1-contrast mb-2">
                    10+
                  </div>
                  <div className="text-gray-700">
                    {locale === "cs" ? "Let zkušeností" : "Years of Experience"}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent-1-contrast mb-2">
                    15+
                  </div>
                  <div className="text-gray-700">
                    {locale === "cs" ? "Let tance" : "Years of Dance"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          variants={itemVariants}
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent-1/30 relative z-10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-sm bg-white/70 border border-white/40 rounded-3xl p-8 md:p-12 shadow-lg text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading flex items-center justify-center gap-3">
                <svg
                  className="w-7 h-7 text-accent-1-contrast"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {locale === "cs" ? "Pojďme si promluvit" : "Let's Talk"}
              </h2>
              <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {locale === "cs"
                  ? "Máte otázky nebo potřebujete poradit s plánováním svatby? Ráda vám pomohu."
                  : "Have questions or need advice on wedding planning? I'd love to help you."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <TranslatedLink href="/contact" className="btn btn-primary">
                  {locale === "cs" ? "Kontaktujte mě" : "Contact Me"}
                </TranslatedLink>
                <TranslatedLink href="/gallery" className="btn btn-secondary">
                  {locale === "cs" ? "Zobrazit příběhy" : "View Stories"}
                </TranslatedLink>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
