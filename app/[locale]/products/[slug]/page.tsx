import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCTS, getProductByLocalizedSlug } from "@/lib/products";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Image from "next/image";
import { BuyButton } from "@/components/ui";
import { Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { AnimatedHeader } from "@/components/layout";
import CONTENT from "@/lib/content";
import BenefitsSection from "@/components/common/BenefitsSection";

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
    title: `${titleLocalized} | Tereza Jinochová`,
    description: descLocalized,
    openGraph: {
      title: `${titleLocalized} | Tereza Jinochová`,
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
      title: `${titleLocalized} | Tereza Jinochová`,
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
    <div className="py-10 md:py-24">
      {/* Main Content */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16">
        {/* Left - Image */}
        <div className="relative">
          <div className="sticky top-8">
            <div className="relative overflow-hidden pb-20">
              <Image
                src={product.image}
                alt={product.names[locale as keyof typeof product.names]}
                width={720}
                height={820}
                className="w-full h-auto object-cover border"
                priority
              />
              <div
                className="px-5 md:px-0 flex gap-3"
                id="additional-images-grid"
              >
                <div
                  className="grow aspect-square border relative"
                  id="product-additional-image"
                >
                  <Image
                    src="/assets/logo.webp"
                    fill
                    className="object-cover object-center"
                    alt=""
                  />
                </div>
                <div
                  className="grow aspect-square border relative"
                  id="product-additional-image"
                >
                  <Image
                    src="/assets/logo.webp"
                    fill
                    className="object-cover object-center"
                    alt=""
                  />
                </div>
                <div
                  className="grow aspect-square border relative"
                  id="product-additional-image"
                >
                  <Image
                    src="/assets/logo.webp"
                    fill
                    className="object-cover object-center"
                    alt=""
                  />
                </div>
                <div
                  className="grow aspect-square border relative"
                  id="product-additional-image"
                >
                  <Image
                    src="/assets/logo.webp"
                    fill
                    className="object-cover object-center"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Details */}
        <div className="px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div>
            <div className="!hidden inline-flex items-center gap-2 mb-4">
              <Badge
                variant={isPremium ? "premium" : "basic"}
                locale={locale as "cs" | "en"}
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading leading-tight">
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
          <div
            className="bg-accent-1 border border-accent-1 rounded-2xl p-6 space-y-4"
            style={{ cornerShape: "bevel" } as any}
          >
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gray-900 font-heading">
                {locale === "cs"
                  ? `${(product.priceCZK / 100).toFixed(0)}`
                  : `${(product.priceCZK / 100).toFixed(0)}`}
              </span>
              <span className="text-2xl text-gray-600">
                {locale === "cs" ? "Kč" : "Kč"}
                {/* obě teď ukazují Kč, ale jde upravit na dolary nebo eura protože i v nich lze přijímat platba */}
              </span>
            </div>

            <BuyButton
              productId={product.id}
              locale={locale}
              variant="primary"
              className="w-full btn btn-primary text-lg py-4"
            />

            <p className="text-sm text-gray-500 text-center">
              {locale === "cs" ? "🔒 Bezpečná platba" : "🔒 Secure payment"}
            </p>
          </div>

          {/* Features */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6"
            style={{ cornerShape: "bevel" } as any}
          >
            <h3 className="text-xl font-bold mb-4 font-heading text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent-1-contrast"
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
                    className="w-5 h-5 text-accent-1-contrast mt-0.5 shrink-0"
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

          {/* Perfect For */}
          <div
            className="bg-white border border-gray-200 rounded-2xl p-6"
            style={{ cornerShape: "bevel" } as any}
          >
            <h3 className="text-xl font-bold mb-3 font-heading text-gray-900">
              {t.perfectFor}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t.perfectForText}</p>
          </div>
        </div>
      </section>

      {/* Interactive Preview Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-heading">
            {locale === "cs" ? "Interaktivní náhled" : "Interactive Preview"}
          </h2>
          <div
            id="flipbook-container"
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4"
            style={{ minHeight: "600px" }}
          >
            {/* Placeholder for FlipHTML5 or PDF flipbook embed */}
            <p className="text-gray-500">
              {locale === "cs"
                ? "Zde bude interaktivní náhled svatebního deníku. Přidejte URL nebo embed kód FlipHTML5."
                : "Interactive preview of the wedding planner will be here. Add FlipHTML5 URL or embed code."}
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24 mt-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 font-heading text-gray-900 text-center">
              {locale === "cs" ? "Ukázky z deníku" : "Diary Preview"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
              {product.gallery.map((galleryImage, index) => {
                // Bento grid layout patterns
                const getGridClasses = (index: number) => {
                  const patterns = [
                    // Pattern for 4+ images
                    "md:col-span-2 md:row-span-2", // Large feature image
                    "md:col-span-1 md:row-span-1", // Small square
                    "md:col-span-1 md:row-span-1", // Small square
                    "md:col-span-2 md:row-span-1", // Wide rectangle
                    "md:col-span-1 md:row-span-1", // Small square
                    "md:col-span-1 md:row-span-1", // Small square
                    "md:col-span-2 md:row-span-1", // Wide rectangle
                    "md:col-span-2 md:row-span-1", // Wide rectangle
                  ];

                  return (
                    patterns[index % patterns.length] ||
                    "md:col-span-1 md:row-span-1"
                  );
                };

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${getGridClasses(
                      index
                    )}`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={galleryImage}
                        alt={`${
                          product.names[locale as keyof typeof product.names]
                        } - ${locale === "cs" ? "Ukázka" : "Preview"} ${
                          index + 1
                        }`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* Optional overlay with number */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Additional Info Section */}
      {/* Contents list from internal file */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-heading text-gray-900 text-center">
            {locale === "cs"
              ? "Co ve Svatebním deníku naleznete"
              : "What's inside the Wedding Diary"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto text-gray-700">
            {CONTENT[locale].why.list.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="text-accent-1-contrast font-semibold">
                  {i + 1}.
                </div>
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection
        locale={locale}
        title={
          locale === "cs"
            ? "Proč si vybrat svatební deník?"
            : "Why Choose Wedding Planner?"
        }
        background="themed"
      />

      <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-heading text-gray-900 text-center">
            {locale === "cs" ? "Další informace" : "Additional Information"}
          </h2>
          <div className="prose prose-amber max-w-none text-gray-700 leading-relaxed">
            <p>
              {locale === "cs"
                ? "Svatební deník je navržen tak, aby vám pomohl organizovat každý aspekt vašeho velkého dne."
                : "The wedding planner is designed to help you organize every aspect of your big day."}
            </p>
            <p>
              {locale === "cs"
                ? "Od rozpočtu přes seznam hostů až po časový harmonogram - vše najdete na jednom místě."
                : "From budget to guest list to timeline - everything in one place."}
            </p>
            <p>
              {locale === "cs"
                ? "Moje šablony jsou profesionálně navržené a snadno přizpůsobitelné vašim potřebám."
                : "Our templates are professionally designed and easily customizable to your needs."}
            </p>
            <p className="mt-4">
              {locale === "cs"
                ? "S naším plánovačem už nezapomenete na žádný detail a budete mít vždy přehled o tom, co je potřeba udělat."
                : "With our planner, you won't forget any details and you'll always have an overview of what needs to be done."}
            </p>
            <p>
              {locale === "cs"
                ? "Ušetříte čas, nervy a užijete si přípravu svatby naplno."
                : "Save time, stress less, and enjoy the wedding planning process."}
            </p>
          </div>
        </div>
      </section>
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
