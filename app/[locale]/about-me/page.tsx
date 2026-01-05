import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate every 24 hours
export const revalidate = 86400;

const AboutMeContent = dynamic(
  () => import("@/components/sections/AboutMeContent")
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
    "O mně",
    "O mně | Tereza Jinochová",
    "About Me | Tereza Jinochová",
    "Přečtěte si o mně a mé cestě",
    "Read about me and my journey"
  );
}

export default async function AboutMePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <AboutMeContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
