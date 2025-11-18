import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCT_LIST } from "@/lib/products";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return {};
  }

  const title = locale === "cs" ? "Produkty" : "Products";
  const description =
    locale === "cs" ? "Seznam našich produktů" : "List of our products";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/${title.toLowerCase()}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "svatební deník",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
        {locale === "cs" ? "Moje produkty" : "My products"}
      </h3>
      <p className="text-sm md:text-lg text-gray-700 mb-6">
        {locale === "cs"
          ? "Deník, který vám pomůže plánovat každý krok svatby — od rozpočtu po seznam hostů."
          : "A planner that guides you through every step of your wedding — from budget to vows."}
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 "
        id="products-grid"
      >
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
