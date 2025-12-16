import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

const PrivacyContent = dynamic(
  () => import("@/components/sections/PrivacyContent")
);

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  return generatePageMetadata(
    locale,
    "Zásady ochrany osobních údajů",
    "Zásady ochrany osobních údajů | Tereza Jinochová",
    "Privacy Policy | Tereza Jinochová",
    "Vaše soukromí je pro nás důležité",
    "Your privacy is important to us"
  );
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <PrivacyContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
