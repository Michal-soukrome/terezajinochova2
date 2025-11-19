import { Metadata } from "next";
import { notFound } from "next/navigation";
import TranslatedLink from "@/components/TranslatedLink";
import { locales, isValidLocale } from "@/lib/i18n";

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

  const title = locale === "cs" ? "O deníku" : "About";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/about`;
  return {
    title,
    description: locale === "cs" ? "O deníku" : "About",
    openGraph: {
      title,
      description: locale === "cs" ? "O deníku" : "About",
      url,
      siteName: "svatební deník",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        {locale === "cs" ? "O deníku" : "About"}
      </h3>
      <p className="text-gray-600 mb-6">
        {locale === "cs"
          ? "Toto je stránka o deníku..."
          : "This is the about page..."}
      </p>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
