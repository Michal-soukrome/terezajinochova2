import { Metadata } from "next";
import { notFound } from "next/navigation";
import TranslatedLink from "@/components/TranslatedLink";
import { locales, isValidLocale } from "@/lib/i18n";
import { AnimatedHeader } from "@/components/AnimatedHeader";

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

  const title =
    locale === "cs"
      ? "Zásady ochrany osobních údajů | Tereza Jinochová"
      : "Privacy Policy | Tereza Jinochová";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/privacy`;
  return {
    title,
    description:
      locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy",
    openGraph: {
      title,
      description:
        locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy",
      url,
      siteName: "svatební deník",
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <AnimatedHeader
        title={
          locale === "cs" ? "Zásady ochrany osobních údajů" : "Privacy Policy"
        }
        subtitle={
          locale === "cs"
            ? "Vaše soukromí je pro nás důležité"
            : "Your privacy is important to us"
        }
        locale={locale}
      />

      {/* Last Updated */}
      <div className="bg-amber-50 border border-amber-800/10 rounded-xl p-4 mb-8 text-center">
        <p className="text-amber-800 font-medium">
          {locale === "cs"
            ? "Naposledy aktualizováno: 19. listopadu 2025"
            : "Last updated: November 19, 2025"}
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-amber max-w-none">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-4 flex items-center gap-3">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {locale === "cs" ? "Úvod" : "Introduction"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {locale === "cs"
                ? "Tato zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme a chráníme vaše osobní údaje při používání našich služeb pro plánování svateb."
                : "This privacy policy explains how we collect, use, and protect your personal information when using our wedding planning services."}
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-4 flex items-center gap-3">
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
              {locale === "cs" ? "Shromažďování údajů" : "Data Collection"}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                {locale === "cs"
                  ? "Jaké údaje shromažďujeme:"
                  : "What data we collect:"}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  {locale === "cs"
                    ? "Kontaktní údaje (jméno, email) pro komunikaci"
                    : "Contact information (name, email) for communication"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  {locale === "cs"
                    ? "Platební údaje zpracované přes Stripe (nezachováváme)"
                    : "Payment information processed through Stripe (not stored)"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  {locale === "cs"
                    ? "Údaje o používání aplikace pro zlepšení služeb"
                    : "App usage data to improve our services"}
                </li>
              </ul>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-4 flex items-center gap-3">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {locale === "cs" ? "Použití údajů" : "Data Usage"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {locale === "cs"
                ? "Vaše údaje používáme pouze pro následující účely:"
                : "We use your data only for the following purposes:"}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === "cs" ? "Poskytování služeb" : "Service Delivery"}
                </h4>
                <p className="text-sm text-gray-700">
                  {locale === "cs"
                    ? "Zpracování objednávek a poskytování přístupu k plánovači"
                    : "Processing orders and providing access to the planner"}
                </p>
              </div>
              <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {locale === "cs" ? "Komunikace" : "Communication"}
                </h4>
                <p className="text-sm text-gray-700">
                  {locale === "cs"
                    ? "Odpovídání na vaše dotazy a poskytování podpory"
                    : "Responding to your inquiries and providing support"}
                </p>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-4 flex items-center gap-3">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              {locale === "cs" ? "Ochrana údajů" : "Data Protection"}
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "cs" ? "SSL šifrování" : "SSL Encryption"}
                  </h4>
                  <p className="text-green-800 text-sm">
                    {locale === "cs"
                      ? "Všechna data jsou přenášena přes zabezpečené HTTPS připojení"
                      : "All data is transmitted through secure HTTPS connections"}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              {locale === "cs"
                ? "Vaše osobní údaje jsou uloženy na zabezpečených serverech a nikdy nejsou sdíleny s třetími stranami bez vašeho souhlasu."
                : "Your personal information is stored on secure servers and is never shared with third parties without your consent."}
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-amber-50 to-white border border-amber-800/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 font-deluxe mb-4 flex items-center gap-3">
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
              {locale === "cs" ? "Kontaktujte nás" : "Contact Us"}
            </h2>
            <p className="text-gray-700 mb-6">
              {locale === "cs"
                ? "Máte otázky ohledně ochrany osobních údajů? Kontaktujte mě na:"
                : "Have questions about privacy? Contact me at:"}
            </p>
            <a
              href="mailto:privacy@svatebnidenik.cz"
              className="btn-deluxe inline-block"
            >
              privacy@svatebnidenik.cz
            </a>
          </section>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center mt-12">
        <TranslatedLink href="/" className="btn btn-secondary">
          {locale === "cs" ? "Zpět na úvodní stránku" : "Back to Home"}
        </TranslatedLink>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
