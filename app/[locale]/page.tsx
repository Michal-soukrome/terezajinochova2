import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  if (!isValidLocale(locale)) {
    return {};
  }

  const title = locale === "cs" ? "Domů" : "Home";
  return {
    title,
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-700 mb-8">{description}</p>
      <div className="text-center">
        <Link
          href={`/${locale}/products`}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
        >
          {locale === "cs" ? "Zobrazit Produkty" : "View Products"}
        </Link>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
