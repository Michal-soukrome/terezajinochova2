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
    locale === "cs"
      ? "Objevte Moje svatební deníky a plánovače - vaše dokonalé svatby začíná zde"
      : "Discover our wedding planners - your perfect wedding starts here";
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

  const t = {
    title: locale === "cs" ? "Moje svatební deníky" : "Our Wedding Planners",
    subtitle:
      locale === "cs"
        ? "Deník, který vám pomůže plánovat každý krok svatby — od rozpočtu po seznam hostů."
        : "A planner that guides you through every step of your wedding — from budget to guest list.",
    featuresTitle:
      locale === "cs" ? "Proč si vybrat náš deník?" : "Why choose our planner?",
    features:
      locale === "cs"
        ? [
            {
              icon: "✓",
              title: "Přehledné plánování",
              desc: "Vše na jednom místě",
            },
            {
              icon: "💰",
              title: "Kontrola rozpočtu",
              desc: "Sledujte každou korunu",
            },
            {
              icon: "📋",
              title: "Checklist úkolů",
              desc: "Nezapomeňte na žádný detail",
            },
            {
              icon: "👥",
              title: "Seznam hostů",
              desc: "Organizujte pozvánky snadno",
            },
          ]
        : [
            {
              icon: "✓",
              title: "Clear Planning",
              desc: "Everything in one place",
            },
            { icon: "💰", title: "Budget Control", desc: "Track every penny" },
            {
              icon: "📋",
              title: "Task Checklist",
              desc: "Don't miss any detail",
            },
            {
              icon: "👥",
              title: "Guest List",
              desc: "Organize invitations easily",
            },
          ],
    chooseTitle:
      locale === "cs" ? "Vyberte si svůj deník" : "Choose Your Planner",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50/50 border-b border-amber-100">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-200 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-amber-900">
                {locale === "cs"
                  ? "Plánujte svatbu snadno"
                  : "Plan Your Wedding Easily"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-deluxe leading-tight">
              {t.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {t.subtitle}
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
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
                <span>
                  {locale === "cs" ? "Okamžitý přístup" : "Instant access"}
                </span>
              </div>
              <div className="flex items-center gap-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>
                  {locale === "cs" ? "Bezpečná platba" : "Secure payment"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
            {t.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-deluxe">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
            {t.chooseTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Vyberte si verzi, která nejlépe vyhovuje vašim potřebám a začněte plánovat svůj velký den ještě dnes."
              : "Choose the version that best fits your needs and start planning your big day today."}
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          id="products-grid"
        >
          {PRODUCT_LIST.map((product, idx) => (
            <div
              key={product.id}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ProductCard product={product} locale={locale} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border-t border-amber-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-deluxe">
            {locale === "cs"
              ? "Začněte plánovat svatbu snů ještě dnes"
              : "Start Planning Your Dream Wedding Today"}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Přidejte se k tisícům spokojených párů, které si s naším deníkem zjednodušily plánování svatby."
              : "Join thousands of happy couples who simplified their wedding planning with our planner."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-amber-300 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium">
                {locale === "cs"
                  ? "500+ spokojených zákazníků"
                  : "500+ happy customers"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "100%" : "100%"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Digitální produkt" : "Digital Product"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "24/7" : "24/7"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Okamžitý přístup" : "Instant Access"}
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2 font-deluxe">
                {locale === "cs" ? "⭐⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐"}
              </div>
              <div className="text-gray-600">
                {locale === "cs" ? "Hodnocení zákazníků" : "Customer Rating"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
