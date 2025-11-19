import { Metadata } from "next";
import { notFound } from "next/navigation";
import TranslatedLink from "@/components/TranslatedLink";
import { locales, isValidLocale } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_LIST } from "@/lib/products";

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

  const title = locale === "cs" ? "úvod" : "Home";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}`;
  const description = locale === "cs" ? "Popis aplikace" : "App description";
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const title = locale === "cs" ? "Vítejte" : "Welcome";
  const description = locale === "cs" ? "Popis aplikace" : "App description";

  return (
    <main>
      <section className="h-[70vh] w-full bg-amber-800/5 pt-8 md:pt-12">
        <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <h1>{title}</h1>
          <h2>{description}</h2>{" "}
          <div className="mt-4">
            <TranslatedLink href={`/products`} className="btn btn-primary">
              {locale === "cs" ? "Zobrazit Produkty" : "View Products"}
            </TranslatedLink>
          </div>
        </div>
      </section>

      {/* about diaries, benefits, stats */}
      <section className="max-w-7xl mx-auto"></section>

      {/* product list, just duplicating products page */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {PRODUCT_LIST.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* reviews, maybe with offset carousel on scroll or just bento grid */}
      <section className="max-w-7xl mx-auto"></section>

      {/* about the author */}
      <section className="max-w-7xl mx-auto"></section>

      {/* contact */}
      <section className="max-w-7xl mx-auto"></section>
    </main>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
