import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, isValidLocale } from "@/lib/i18n";
import { WEDDINGS } from "@/lib/weddings";
import WeddingGalleryGrid from "@/components/sections/WeddingGalleryGrid";
import { GalleryHeader } from "@/components/common/GalleryHeader";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const title =
    locale === "cs"
      ? "Svatební příběhy | Tereza Jinochová"
      : "Wedding Stories | Tereza Jinochová";
  const description =
    locale === "cs"
      ? "Nahlédněte do krásných svatebních příběhů a inspirujte se pro váš speciální den."
      : "Take a look at beautiful wedding stories and get inspired for your special day.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <GalleryHeader locale={locale as Locale} />

        <WeddingGalleryGrid weddings={WEDDINGS} locale={locale as Locale} />
      </div>
    </main>
  );
}
