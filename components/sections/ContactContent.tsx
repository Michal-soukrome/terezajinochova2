"use client";

import { FullHeightSection } from "../common/FullHeightSection";
import BenefitsSection from "../common/BenefitsSection";
import { Locale } from "@/lib/i18n";

interface ContactContentProps {
  locale: Locale;
}

export default function ContactContent({ locale }: ContactContentProps) {
  return (
    <div id="contact-page-wrap">
      {/* Header Section */}
      <FullHeightSection
        title={locale === "cs" ? "Kontaktujte mě" : "Get in Touch"}
        description={
          locale === "cs"
            ? "Máte otázky nebo potřebujete pomoc? Rád vám pomohu s plánováním vaší svatby."
            : "Have questions or need help? I'm here to assist you with planning your wedding."
        }
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Contact Methods Section */}
      <FullHeightSection
        title={locale === "cs" ? "Způsoby kontaktu" : "Contact Methods"}
        description={
          locale === "cs"
            ? "Můžete mě kontaktovat prostřednictvím emailu nebo sociálních sítí. Odpovím co nejdříve."
            : "You can reach me through email or social media. I'll respond as soon as possible."
        }
        backgroundColor="bg-accent-1"
        textColor="text-gray-900"
      />

      {/* FAQ Section */}
      <FullHeightSection
        title={
          locale === "cs"
            ? "Často kladené otázky"
            : "Frequently Asked Questions"
        }
        description={
          locale === "cs"
            ? "Zde najdete odpovědi na nejčastější otázky týkající se našich služeb."
            : "Here you'll find answers to the most common questions about our services."
        }
        backgroundColor="bg-white"
        textColor="text-gray-900"
      />

      {/* Benefits Section */}
      <BenefitsSection
        locale={locale}
        title={
          locale === "cs"
            ? "Proč si vybrat naše služby?"
            : "Why Choose Our Services?"
        }
        background="themed"
      />
    </div>
  );
}
