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

  const title = locale === "cs" ? "Kontakt" : "Contact";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/contact`;
  return {
    title,
    description: locale === "cs" ? "Kontakt" : "Contact",
    openGraph: {
      title,
      description: locale === "cs" ? "Kontakt" : "Contact",
      url,
      siteName: "svatební deník",
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        {locale === "cs" ? "Napište mi" : "Let`s get in touch"}
      </h3>
      <p className="text-gray-600 mb-6">
        {locale === "cs" ? "Nějaké texty" : "Some texts here"}
      </p>

      <div>
        <TranslatedLink href="/" className="btn btn-secondary">
          {locale === "cs" ? "Zpět na úvodní stránku" : "Back to Home"}
        </TranslatedLink>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
