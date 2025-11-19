import { Metadata } from "next";
import { notFound } from "next/navigation";
import TranslatedLink from "@/components/TranslatedLink";
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
  if (!isValidLocale(locale)) return {};

  const title = locale === "cs" ? "O deníku" : "About";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/about`;
  return {
    title,
    description: locale === "cs" ? "O deníku" : "About",
    openGraph: {
      title,
      description: locale === "cs" ? "O deníku" : "About",
      url,
      siteName: "svatební deník",
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-deluxe mb-4">
          {locale === "cs" ? "O deníku" : "About the Planner"}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {locale === "cs"
            ? "Vaše cesta k dokonale zorganizované svatbě začíná zde"
            : "Your journey to a perfectly organized wedding starts here"}
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-amber max-w-none">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-6 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {locale === "cs" ? "Moje vize" : "Our Vision"}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {locale === "cs"
              ? "Svatební plánovač je nástroj vytvořený s láskou pro páry, které chtějí mít svůj velký den dokonale zorganizovaný. Moje aplikace kombinuje eleganci s funkčností, aby vám pomohla soustředit se na to nejdůležitější - na vzájemnou lásku a radost ze společného života."
              : "The wedding planner is a tool created with love for couples who want their big day perfectly organized. Our application combines elegance with functionality to help you focus on what's most important - mutual love and the joy of shared life."}
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3 flex items-center gap-2">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {locale === "cs" ? "Rychlost" : "Speed"}
              </h3>
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Okamžitý přístup k vašemu plánovači ihned po zakoupení"
                  : "Instant access to your planner immediately after purchase"}
              </p>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3 flex items-center gap-2">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {locale === "cs" ? "Elegance" : "Elegance"}
              </h3>
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Krásně navržené šablony, které odrážejí eleganci vašeho dne"
                  : "Beautifully designed templates that reflect the elegance of your day"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-6 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {locale === "cs" ? "Pro koho je to určeno" : "Who it's for"}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {locale === "cs"
              ? "Náš svatební plánovač je ideální pro páry, které chtějí mít všechny aspekty svatby pod kontrolou, ale zároveň si chtějí užít přípravný proces bez zbytečného stresu."
              : "Our wedding planner is ideal for couples who want to have all aspects of the wedding under control, but also want to enjoy the preparation process without unnecessary stress."}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Komunikace" : "Communication"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Snadná komunikace se všemi dodavateli"
                  : "Easy communication with all vendors"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Organizace" : "Organization"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Všechny informace na jednom místě"
                  : "All information in one place"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "cs" ? "Klid" : "Peace"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "cs"
                  ? "Méně stresu, více radosti"
                  : "Less stress, more joy"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <TranslatedLink href="/products" className="btn-luxe">
          {locale === "cs" ? "Vybrat plánovač" : "Choose Your Planner"}
        </TranslatedLink>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
