import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate every 24 hours
export const revalidate = 86400;

const HomeContent = dynamic(() => import("@/components/sections/HomeContent"));

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
    "",
    "Váš svatební plánovač | Tereza Jinochová",
    "Your Wedding Planner | Tereza Jinochová",
    "Naplánujte si svůj svatební den s lehkostí a radostí",
    "Plan your wedding day with ease and joy"
  );
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <HomeContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
