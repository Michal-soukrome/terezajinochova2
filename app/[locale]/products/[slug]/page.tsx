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

  const isPremium = product.id === "premium";
  const t = {
    premium: locale === "cs" ? "Premium" : "Premium",
    basic: locale === "cs" ? "Základní" : "Basic",
    whatYouGet: locale === "cs" ? "Co získáte" : "What you get",
    testimonials: locale === "cs" ? "Recenze" : "Testimonials",
    testimonialText:
      locale === "cs"
        ? "Skvělý pomocník při plánování - vše na jednom místě a přehledné."
        : "An amazing planner — everything in one place, simple and elegant.",
    features: locale === "cs" ? "Funkce" : "Features",
    perfectFor: locale === "cs" ? "Ideální pro" : "Perfect for",
    perfectForText:
      locale === "cs"
        ? "Páry, které chtějí mít svatbu organizovanou a nezapomenout na žádný detail."
        : "Couples who want their wedding organized without missing any detail.",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left - Image */}
        <div className="relative">
          <div className="sticky top-8">
            <div className="relative rounded overflow-hidden shadow">
              <Image
                src={product.image}
                alt={product.names[locale as keyof typeof product.names]}
                width={720}
                height={820}
                className="w-full h-auto object-cover"
                priority
              />
              {isPremium && (
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-deluxe font-semibold shadow-lg">
                  ⭐ {t.premium}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              {isPremium ? (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wide">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {t.premium}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {t.basic}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-deluxe leading-tight">
              {product.names[locale as keyof typeof product.names]}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {
                product.descriptions[
                  locale as keyof typeof product.descriptions
                ]
              }
            </p>
          </div>

          {/* Price & CTA */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gray-900 font-deluxe">
                {locale === "cs"
                  ? `${(product.priceCZK / 100).toFixed(0)}`
                  : `$${(product.priceCZK / 100).toFixed(2)}`}
              </span>
              <span className="text-2xl text-gray-600">
                {locale === "cs" ? "Kč" : ""}
              </span>
            </div>

            <BuyButton
              productId={product.id}
              locale={locale}
              variant="primary"
              className="w-full btn btn-primary text-lg py-4"
            />

            <p className="text-sm text-gray-500 text-center">
              {locale === "cs"
                ? "🔒 Bezpečná platba • Okamžitý přístup"
                : "🔒 Secure payment • Instant access"}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 font-deluxe text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {t.whatYouGet}
            </h3>
            <ul className="space-y-3">
              {(
                product.highlights?.[
                  locale as keyof typeof product.highlights
                ] || []
              ).map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 font-deluxe text-gray-900">
              {t.testimonials}
            </h3>
            <blockquote className="relative">
              <svg
                className="absolute -top-2 -left-2 w-8 h-8 text-amber-200"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="italic text-gray-700 pl-6 text-lg leading-relaxed">
                {t.testimonialText}
              </p>
              <div className="flex items-center gap-1 mt-3 pl-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </blockquote>
          </div>

          {/* Perfect For */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3 font-deluxe text-gray-900">
              {t.perfectFor}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t.perfectForText}</p>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 border-t border-gray-200 pt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-deluxe text-gray-900 text-center">
            {locale === "cs" ? "Další informace" : "Additional Information"}
          </h2>
          <div className="prose prose-amber max-w-none text-gray-700 leading-relaxed">
            <p>
              {locale === "cs"
                ? "Svatební deník je navržen tak, aby vám pomohl organizovat každý aspekt vašeho velkého dne. Od rozpočtu přes seznam hostů až po časový harmonogram - vše najdete na jednom místě. Moje šablony jsou profesionálně navržené a snadno přizpůsobitelné vašim potřebám."
                : "The wedding planner is designed to help you organize every aspect of your big day. From budget to guest list to timeline - everything in one place. Our templates are professionally designed and easily customizable to your needs."}
            </p>
            <p className="mt-4">
              {locale === "cs"
                ? "S naším plánovačem už nezapomenete na žádný detail a budete mít vždy přehled o tom, co je potřeba udělat. Ušetříte čas, nervy a užijete si přípravu svatby naplno."
                : "With our planner, you won't forget any details and you'll always have an overview of what needs to be done. Save time, stress less, and enjoy the wedding planning process."}
            </p>
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
