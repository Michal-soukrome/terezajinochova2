"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import CONTENT from "@/lib/content";
import { NotebookPen } from "lucide-react";
import { FullHeightSection } from "../common/FullHeightSection";
import { ReviewsCarousel } from "../ui/ReviewsCarousel";
import { CountUp } from "../common/CountUp";
import BenefitsSection from "../common/BenefitsSection";

import { Locale } from "@/lib/i18n";

interface AboutContentProps {
  locale: Locale;
}

export default function AboutContent({ locale }: AboutContentProps) {
  return (
    <div id="about-page-wrap">
      {/* Title Section */}
      <FullHeightSection
        title={CONTENT[locale].why.intro.title}
        imageUrl="/assets/image3.webp"
        description={CONTENT[locale].why.intro.challenge}
      />

      {/* Challenge Section */}
      <FullHeightSection
        title={locale === "cs" ? "Výzva plánování" : "The Planning Challenge"}
        description={CONTENT[locale].why.intro.challenge}
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Description Section */}
      <FullHeightSection
        title={
          locale === "cs" ? "Co je Svatební deník" : "What is the Wedding Diary"
        }
        description={CONTENT[locale].why.intro.description}
        backgroundColor="bg-accent-1"
        textColor="text-gray-900"
      />

      {/* Keepsake Section */}
      <FullHeightSection
        title={
          locale === "cs" ? "Více než jen plánovač" : "More Than Just a Planner"
        }
        description={CONTENT[locale].why.intro.keepsake}
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Benefits Section */}
      <BenefitsSection locale={locale} background="themed" />

      {/* Story Section */}
      <FullHeightSection
        title={locale === "cs" ? "Příběh Svatebního deníku" : "Our Story"}
        description={CONTENT[locale].story}
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Background Section */}
      <FullHeightSection
        title={locale === "cs" ? "Mé začátky" : "My Background"}
        description={CONTENT[locale].about.background}
        backgroundColor="bg-accent-1"
        textColor="text-gray-900"
      />

      {/* Dance Journey Section */}
      <FullHeightSection
        title={locale === "cs" ? "Cesta přes tanec" : "Dance Journey"}
        description={CONTENT[locale].about.dance}
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Coordination Section */}
      <FullHeightSection
        title={locale === "cs" ? "Svatební koordinace" : "Wedding Coordination"}
        description={CONTENT[locale].about.coordination}
        backgroundColor="bg-accent-1"
        textColor="text-gray-900"
      />

      {/* Personality Section */}
      <FullHeightSection
        title={locale === "cs" ? "Mé vlastnosti" : "My Personality"}
        description={CONTENT[locale].about.personality}
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Who it's for Section */}
      <FullHeightSection
        title={locale === "cs" ? "Pro koho je to určeno" : "Who it's for"}
        description={
          locale === "cs"
            ? "Náš svatební plánovač je ideální pro páry, které chtějí mít všechny aspekty svatby pod kontrolou, ale zároveň si chtějí užít přípravný proces bez zbytečného stresu."
            : "Our wedding planner is ideal for couples who want to have all aspects of the wedding under control, but also want to enjoy the preparation process without unnecessary stress."
        }
        content={
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-accent-1-contrast"
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
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Komunikace" : "Communication"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Snadná komunikace se všemi dodavateli"
                  : "Easy communication with all vendors"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-accent-1-contrast"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Organizace" : "Organization"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Všechny informace na jednom místě"
                  : "All information in one place"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent-1 rounded-full flex items-center justify-center mx-auto mb-3">
                <NotebookPen
                  strokeWidth={0.5}
                  className="w-full h-full text-accent-1-contrast "
                />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Klid" : "Peace"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Méně stresu, více radosti"
                  : "Less stress, more joy"}
              </p>
            </div>
          </div>
        }
        children={
          <div className="text-center mt-12">
            <TranslatedLink href="/products" className="btn btn-primary">
              {locale === "cs" ? "Vybrat deník" : "Choose Your Planner"}
            </TranslatedLink>
          </div>
        }
        textColor="text-gray-900"
      />
    </div>
  );
}
