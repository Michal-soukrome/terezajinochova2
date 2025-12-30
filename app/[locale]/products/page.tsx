import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { locales, isValidLocale } from "@/lib/i18n";
import { generatePageMetadata } from "@/lib/metadata";

// Revalidate every 24 hours
export const revalidate = 86400;

const ProductsContent = dynamic(
  () => import("@/components/sections/ProductsContent")
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
    "Produkty",
    "Produkty | Tereza Jinochová",
    "Products | Tereza Jinochová",
    "Objevte Moje svatební deníky a plánovače - vaše dokonalé svatby začíná zde",
    "Discover my wedding planning services - your perfect wedding starts here"
  );
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return <ProductsContent locale={locale} />;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
