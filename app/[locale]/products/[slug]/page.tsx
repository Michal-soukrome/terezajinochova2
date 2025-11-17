import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCTS, getProductByLocalizedSlug } from "@/lib/products";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { BuyButton } from "@/components/BuyButton";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    return {};
  }

  const product = getProductByLocalizedSlug(locale as Locale, slug);
  if (!product) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/${
    routes.products[locale as keyof typeof routes.products]
  }/${slug}`;
  const titleLocalized = product.names[locale as keyof typeof product.names];
  const descLocalized =
    product.descriptions[locale as keyof typeof product.descriptions];
  const image = product.image || "/favicon.ico";

  return {
    title: titleLocalized,
    description: descLocalized,
    openGraph: {
      title: titleLocalized,
      description: descLocalized,
      url,
      siteName: "My App",
      images: [
        {
          url: `${siteUrl}${image}`,
          alt: titleLocalized,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleLocalized,
      description: descLocalized,
      images: [`${siteUrl}${image}`],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const product = getProductByLocalizedSlug(locale as Locale, slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="">
      <div className="bg-white p-8 rounded-lg shadow-lg md:flex md:gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.names[locale as keyof typeof product.names]}
            width={720}
            height={820}
            className="w-full h-auto rounded-md object-cover"
            priority
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {product.names[locale as keyof typeof product.names]}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.descriptions[locale as keyof typeof product.descriptions]}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {locale === "cs" ? "Co získáte" : "What you get"}
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              {(
                product.highlights?.[
                  locale as keyof typeof product.highlights
                ] || []
              ).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {locale === "cs" ? "Recenze" : "Testimonials"}
            </h3>
            <blockquote className="italic text-gray-700">
              “
              {locale === "cs"
                ? "Skvělý pomocník při plánování - vše na jednom místě a přehledné."
                : "An amazing planner — everything in one place, simple and elegant."}
            </blockquote>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              {locale === "cs"
                ? `${(product.priceCZK / 100).toFixed(2)} Kč`
                : `$${(product.priceCZK / 100).toFixed(2)}`}
            </p>
            <BuyButton
              productId={product.id}
              locale={locale}
              variant="primary"
              className="px-6 py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const product of Object.values(PRODUCTS)) {
      params.push({
        locale,
        slug: product.slugs[locale as keyof typeof product.slugs],
      });
    }
  }

  return params;
}
