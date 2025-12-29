import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate every 24 hours
export const revalidate = 86400;

const ContactContent = dynamic(
  () => import("@/components/sections/ContactContent")
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
    "Kontakt",
    "Kontakt | Tereza Jinochová",
    "Contact | Tereza Jinochová",
    "Kontaktujte mě pro pomoc s plánováním vaší svatby",
    "Contact me for help planning your wedding"
  );
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <ContactContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
