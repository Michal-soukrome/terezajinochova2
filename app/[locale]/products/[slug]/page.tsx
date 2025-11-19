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
      siteName: "svatební deník",
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
    <div id="product-detail-wrap">
      <div className="md:flex md:gap-20" id="product-detail-content">
        <div className="md:w-1/2" id="product-detail-left">
          <Image
            src={product.image}
            alt={product.names[locale as keyof typeof product.names]}
            width={720}
            height={820}
            className="w-full h-auto rounded-md object-cover shadow"
            priority
          />
        </div>
        <div
          className="md:w-1/2 px-4 sm:px-6 lg:px-8 py-4 md:py-0"
          id="product-detail-right"
        >
          {product.id === "premium" ? (
            <div className="inline-block mb-2 border border-yellow-300 px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded font-medium uppercase">
              premium
            </div>
          ) : (
            <div className="inline-block mb-2 border border-gray-300 px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded font-medium uppercase">
              základní
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-deluxe">
            {product.names[locale as keyof typeof product.names]}
          </h1>
          <p className="text-gray-600 mb-4">
            {product.descriptions[locale as keyof typeof product.descriptions]}
          </p>

          <div className="px-4 sm:px-6 lg:px-8 mb-6">
            <h3 className="text-base font-semibold mb-2">
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

          <div className="px-4 sm:px-6 lg:px-8 mb-6">
            <h3 className="text-lg font-semibold mb-2 font-deluxe text-gray-800">
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
      <div className="mt-10 border-t py-5 px-4 sm:px-6 lg:px-8 text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptate et
        beatae expedita quisquam, sint dolore provident quod accusamus totam
        consequuntur ipsum ad quas amet laudantium nisi aperiam. Voluptatum
        laborum hic veniam fugiat ullam aliquam ratione sed totam molestiae
        repellendus beatae natus sequi tenetur quisquam mollitia molestias,
        voluptate cupiditate? Facere!
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
