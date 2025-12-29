import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate every 24 hours
export const revalidate = 86400;

const AboutContent = dynamic(
  () => import("@/components/sections/AboutContent")
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
    "about",
    "O deníku | Tereza Jinochová",
    "About | Tereza Jinochová",
    "O deníku",
    "About"
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <AboutContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
