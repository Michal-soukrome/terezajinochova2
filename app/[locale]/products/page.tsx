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
      siteName: "My App",
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

  const title = locale === "cs" ? "Naše Produkty" : "Our Products";

  return (
    <>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-700 mb-6">
        {locale === "cs"
          ? "Deník, který vám pomůže plánovat každý krok svatby — od rozpočtu po seznam hostů."
          : "A planner that guides you through every step of your wedding — from budget to vows."}
      </p>

      <div className="mb-8 rounded-lg border px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <Image
            src="/assets/cover.png"
            alt="cover"
            width={144}
            height={144}
            className="object-cover rounded-md"
            priority
          />
          <div>
            <h3 className="text-xl font-semibold">
              {locale === "cs" ? "Co je uvnitř" : "What’s inside"}
            </h3>
            <p className="text-sm text-gray-600">
              {locale === "cs"
                ? "Checklisty, šablony, tipy a prostor pro vzpomínky."
                : "Checklists, templates, tips and space for memories."}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRODUCT_LIST.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-3">
          {locale === "cs"
            ? "Proč si vybrat tento deník"
            : "Why choose this diary"}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-gray-700">
          <li className="p-4 border rounded-md">
            {locale === "cs"
              ? "Snadné plánování krok za krokem"
              : "Easy step-by-step planning"}
          </li>
          <li className="p-4 border rounded-md">
            {locale === "cs"
              ? "Přehledný rozpočet a seznamy"
              : "Clear budgets & checklists"}
          </li>
          <li className="p-4 border rounded-md">
            {locale === "cs"
              ? "Místo na vzpomínky & fotky"
              : "Room for memories & photos"}
          </li>
        </ul>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
