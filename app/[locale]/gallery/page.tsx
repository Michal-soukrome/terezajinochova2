import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, isValidLocale } from "@/lib/i18n";
import { WEDDINGS } from "@/lib/weddings";
import WeddingGalleryGrid from "@/components/sections/WeddingGalleryGrid";
import WeddingCoordinationBenefits from "@/components/common/WeddingCoordinationBenefits";
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
      ? "Svatební Galerie | Tereza Jinochová"
      : "Wedding Gallery | Tereza Jinochová";
  const description =
    locale === "cs"
      ? "Prohlédněte si svatby, které jsem měla tu čest koordinovat."
      : "Browse through weddings we had the honor to coordinate.";

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
    <main className="min-h-screen pt-20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <GalleryHeader locale={locale as Locale} />

        <WeddingGalleryGrid weddings={WEDDINGS} locale={locale as Locale} />
      </div>
      <div>
        <WeddingCoordinationBenefits locale={locale} background="themed" />
      </div>
    </main>
  );
}
