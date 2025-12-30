import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, isValidLocale } from "@/lib/i18n";
import { getWeddingBySlug, getAllWeddingSlugs } from "@/lib/weddings";
import WeddingDetail from "@/components/sections/WeddingDetail";

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = getAllWeddingSlugs();
  const locales = ["cs", "en"];

  return slugs.flatMap((slug) =>
    locales.map((locale) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const wedding = getWeddingBySlug(slug);

  if (!wedding) {
    notFound();
  }

  const title = `${wedding.coupleNames[locale as Locale]} - ${
    wedding.location[locale as Locale]
  }`;
  const description =
    locale === "cs"
      ? `Svatební fotografie ${wedding.coupleNames.cs}`
      : `Wedding photos of ${wedding.coupleNames.en}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [wedding.thumbnailImage],
    },
  };
}

export default async function WeddingPage({ params }: Props) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const wedding = getWeddingBySlug(slug);

  if (!wedding) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-20">
      <WeddingDetail wedding={wedding} locale={locale as Locale} />
    </main>
  );
}
