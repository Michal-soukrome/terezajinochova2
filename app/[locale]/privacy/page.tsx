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

  const title =
    locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/privacy`;
  return {
    title,
    description:
      locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy",
    openGraph: {
      title,
      description:
        locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy",
      url,
      siteName: "My App",
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4">
        {locale === "cs" ? "Soukromí" : "Privacy"}
      </h1>
      <p className="text-gray-600 mb-6">
        {locale === "cs"
          ? "Toto jsou podmínky ochrany osobních údajů..."
          : "This privacy policy explains how we handle personal data..."}
      </p>

      <div>
        <TranslatedLink
          href="/"
          className="text-sm text-gray-700 hover:underline"
        >
          {locale === "cs" ? "Zpět na domovskou stránku" : "Back to Home"}
        </TranslatedLink>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
