"use client";

import TranslatedLink from "../navigation/TranslatedLink";
import { AnimatedHeader } from "../layout/AnimatedHeader";
import CONTENT from "@/lib/content";
import { NotebookPen } from "lucide-react";
import { FullHeightSection } from "../common/FullHeightSection";
import { ReviewsCarousel } from "../ui/ReviewsCarousel";
import { CountUp } from "../common/CountUp";
import BenefitsSection from "../common/BenefitsSection";

interface AboutContentProps {
  locale: string;
}

export default function AboutContent({ locale }: AboutContentProps) {
  return (
    <div id="about-page-wrap">
      {/* Vision Section */}
      <FullHeightSection
        title={locale === "cs" ? "Moje vize" : "Our Vision"}
        imageUrl="/assets/image3.webp"
        description={
          locale === "cs"
            ? CONTENT.cs.why.intro
            : "The wedding planner is a tool created with love for couples who want their big day perfectly organized. Our application combines elegance with functionality to help you focus on what's most important - mutual love and the joy of shared life."
        }
        content={
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div
              className="bg-accent-1 rounded-xl p-6 border border-accent-1"
              style={{ cornerShape: "bevel" } as any}
            >
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent-1-contrast"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {locale === "cs" ? "Rychlost" : "Speed"}
              </h3>
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Okamžitý přístup k vašemu plánovači ihned po zakoupení"
                  : "Instant access to your planner immediately after purchase"}
              </p>
            </div>

            <div
              className="bg-accent-1 rounded-xl p-6 border border-accent-1"
              style={{ cornerShape: "bevel" } as any}
            >
              <h3 className="text-xl font-bold text-gray-900 font-heading mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent-1-contrast"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {locale === "cs" ? "Elegance" : "Elegance"}
              </h3>
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Krásně navržené šablony, které odrážejí eleganci vašeho dne"
                  : "Beautifully designed templates that reflect the elegance of your day"}
              </p>
            </div>
          </div>
        }
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Benefits Section */}
      <BenefitsSection locale={locale} background="themed" />

      {/* Story Section */}
      <FullHeightSection
        title={locale === "cs" ? "Příběh Svatebního deníku" : "Our Story"}
        description={
          locale === "cs"
            ? CONTENT.cs.story
            : "The wedding diary was born out of a love for organization and the stories of engaged couples."
        }
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* About Me Section */}
      <FullHeightSection
        title={locale === "cs" ? "O mně" : "About Me"}
        description={
          locale === "cs"
            ? CONTENT.cs.about
            : "Biography and professional background with a passion for weddings and choreography."
        }
        backgroundColor="bg-accent-1"
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
        backgroundColor="bg-accent-gradient-1"
        textColor="text-gray-900"
      />
    </div>
  );
}
