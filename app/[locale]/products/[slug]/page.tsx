import { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale } from "@/lib/i18n";
import { PRODUCTS, getProductByLocalizedSlug } from "@/lib/products";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";

// Revalidate every 24 hours
export const revalidate = 86400;
import Image from "next/image";
import { BuyButton, Divider } from "@/components/ui";
import { Badge } from "@/components/ui";
import { AnimatedHeader } from "@/components/layout";
import BenefitsSection from "@/components/common/BenefitsSection";
import { ProductImageGallery, PDFFlipBook } from "@/components/common";
import { Check, ChessKing, Star, Heart } from "lucide-react";

const WHY_LIST_CS = [
  "Jsme zasnoubení a co teď?",
  "Rozpočet",
  "Svatební koordinátor/ka",
  "Kdo další nám pomůže svatbu zorganizovat?",
  "Výběr svatebního místa",
  "Seznam hostů",
  "Obřad",
  "Svědci",
  "Družičky a mládenci",
  "Svatební šaty",
  "Svatební oblek",
  "Zasedací pořádek",
  "Uspořádání stolů na hostině",
  "Svatební harmonogram",
  "Seznam dodavatelů",
  "Snubní prsteny",
  "Tiskoviny",
  "Floristka",
  "Fotograf",
  "Svatební menu",
  "Nápojové menu",
  "Svatební dort",
  "Sladký bar",
  "Hudba",
  "Zábava na svatbě",
  "Děti na svatbě",
  "Rozlučka se svobodou",
  "Kontrolní seznam",
  "Kalendář",
];

const WHY_LIST_EN = [
  "We're engaged, what now?",
  "Budget",
  "Wedding coordinator",
  "Who else will help us organize the wedding?",
  "Venue selection",
  "Guest list",
  "Ceremony",
  "Witnesses",
  "Bridesmaids and groomsmen",
  "Wedding dress",
  "Wedding suit",
  "Seating arrangement",
  "Table arrangement at the reception",
  "Wedding schedule",
  "Vendor list",
  "Engagement rings",
  "Print materials",
  "Florist",
  "Photographer",
  "Wedding menu",
  "Beverage menu",
  "Wedding cake",
  "Sweet bar",
  "Music",
  "Entertainment at the wedding",
  "Children at the wedding",
  "Bachelorette party",
  "Checklist",
  "Calendar",
];

const CONTENT = {
  cs: {
    why: {
      list: WHY_LIST_CS,
    },
  },
  en: {
    why: {
      list: WHY_LIST_EN,
    },
  },
};

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

  // Generate alternate language links for the product
  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    const localizedSlug = product.slugs[loc];
    const localizedRoute = routes.products[loc as keyof typeof routes.products];
    alternates[loc] = `${siteUrl}/${loc}/${localizedRoute}/${localizedSlug}`;
  });

  return {
    title: `${titleLocalized} | Tereza Jinochová`,
    description: descLocalized,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title: `${titleLocalized} | Tereza Jinochová`,
      description: descLocalized,
      url,
      siteName: "svatební deník",
      locale: locale === "cs" ? "cs_CZ" : "en_US",
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

  // Generate structured data for Product
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.names[locale as keyof typeof product.names],
    description:
      product.descriptions[locale as keyof typeof product.descriptions],
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://svatebnipribehy.com"}${product.image}`,
    category: "Wedding Planning Tools",
    brand: {
      "@type": "Organization",
      name: "Svatební příběhy",
    },
    offers: {
      "@type": "Offer",
      price: (product.priceCZK / 100).toFixed(2),
      priceCurrency: "CZK",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Svatební příběhy",
      },
    },
  };

  const isPremium = product.id === "premium";
  const additionalImages = product.additionalImages || [];
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
    perfectFor: locale === "cs" ? "Pro koho je deník určen" : "Perfect for",
    perfectForText:
      locale === "cs"
        ? "Svatební deník je ideální pro páry, které chtějí mít svatbu zorganizovanou a nezapomenout na žádný detail."
        : "The Wedding Diary is perfect for couples who want to have their wedding organized and not miss any details.",
  };

  return (
    <>
      {/* Structured Data for Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <div className="py-10 md:py-24 !pb-0">
        {/* Main Content */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16">
          {/* Left - Image */}
          <ProductImageGallery
            mainImage={product.image}
            additionalImages={additionalImages}
            alt={product.names[locale as keyof typeof product.names]}
            locale={locale}
          />

          {/* Right - Details */}
          <div className="px-4 sm:px-6 lg:px-8 space-y-8 pb-10">
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

              {/* English version notice */}
              {locale === "en" && product.englishNotice && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-amber-800 font-medium">
                      {product.englishNotice.en}
                    </p>
                  </div>
                </div>
              )}
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
              <p className="text-sm text-gray-500 text-center">
                {locale === "cs"
                  ? "📍 Kliknutím otevřete mapu Zásilkovny pro výběr místa"
                  : "📍 Click to open Packeta map and select pickup location"}
              </p>
            </div>

            {/* Features */}
            <div className="p-5" id="detail-what-you-get">
              <h3 className="text-xl font-bold mb-4 font-heading text-gray-900 flex items-center gap-2">
                {t.whatYouGet}
              </h3>
              <ul className="lowercase space-y-3">
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
            <div className="p-5" id="detail-perfect-for">
              <h3 className="text-xl font-bold mb-3 font-heading text-gray-900">
                {t.perfectFor}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.perfectForText}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Preview Section */}
        <section
          className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden bg-accent-1"
          id="interactive"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-1/50 via-white to-accent-1/40 -z-10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-1/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-1/60 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-4">
              <h3 className="text-3xl md:text-5xl font-thin mb-6 text-accent-1-contrast heading">
                {" "}
                {locale === "cs"
                  ? "Interaktivní náhled"
                  : "Interactive Preview"}
              </h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                {locale === "cs"
                  ? "K pohybu mezi stránkami využijte navigační tlačítka níže nebo tažení stránek."
                  : "Use the navigation buttons below or drag the pages to move between them."}
              </p>
            </div>

            {/* Flipbook Container with enhanced styling */}
            <div className="relative">
              {/* Main container with shadow and border */}
              <div className="relative rounded-2xl overflow-hidden w-full max-w-4xl mx-auto">
                {/* Decorative corner elements */}
                <div className="hidden md:absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-accent-1 rounded-tl-2xl opacity-50" />
                <div className="hidden md:absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-accent-1 rounded-tr-2xl opacity-50" />
                <div className="hidden md:absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-accent-1 rounded-bl-2xl opacity-50" />
                <div className="hidden md:absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-accent-1 rounded-br-2xl opacity-50" />

                {/* PDF Flip Book */}
                <div
                  id="flipbook-container"
                  className="flex justify-center items-center w-full px-5 py-5"
                >
                  <PDFFlipBook
                    locale={locale}
                    pdfUrl="/assets/merged.pdf"
                    width={600}
                    height={800}
                    className="w-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {/* 
      {product.gallery && product.gallery.length > 0 && (
        <section className="hidden bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-thin mb-6 font-heading text-gray-900 heading">
              {locale === "cs" ? "Ukázky z deníku" : "Diary Preview"}
            </h3>
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
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </sec
        </section>
      )}
      */}

        {/* Additional Info Section */}
        {/* Contents list from internal file */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="heading text-3xl md:text-5xl font-light text-accent-1-contrast mb-4">
                {" "}
                {locale === "cs"
                  ? "Co ve Svatebním deníku naleznete"
                  : "What's inside the Wedding Diary"}
              </h3>

              <Divider icon={Heart} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 ">
              {CONTENT[locale].why.list.map((item, i) => (
                <div key={i} className="p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <Check className="w-4 h-4 text-accent-1-contrast" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  </div>
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
      </div>
    </>
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
