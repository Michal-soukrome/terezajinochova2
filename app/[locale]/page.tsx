import { Metadata } from "next";
import { notFound } from "next/navigation";
import TranslatedLink from "@/components/TranslatedLink";
import { CountUp } from "@/components/CountUp";
import { locales, isValidLocale } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_LIST } from "@/lib/products";

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

  const title = locale === "cs" ? "úvod" : "Home";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}`;
  const description = locale === "cs" ? "Popis aplikace" : "App description";
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const title =
    locale === "cs" ? "VÁŠ SVATEBNÍ PLÁNOVAČ" : "YOUR WEDDING PLANNER";
  const description =
    locale === "cs"
      ? "Naplánujte si svůj svatební den s lehkostí a radostí"
      : "Plan your wedding day with ease and joy";

  return (
    <main>
      <section className="h-[50vh] md:h-[80vh] w-full bg-amber-800/5 pt-8 md:pt-12">
        <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-deluxe font-medium text-center text-3xl md:text-[90px] text-amber-900 uppercase">
            {title}
          </h1>
          <h2 className="font-deluxe text-center text-lg text-amber-900 font-light uppercase mt-2 mb-4">
            {description}
          </h2>{" "}
          <div className="mt-4">
            <a href="#products" className="btn btn-primary">
              {locale === "cs" ? "Více informací" : "More information"}
            </a>
          </div>
        </div>
      </section>

      {/* about diaries, benefits, stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-deluxe mb-4">
            {locale === "cs"
              ? "Proč zvolit náš plánovač?"
              : "Why Choose Our Planner?"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === "cs"
              ? "Objevte výhody, které vám pomohou zorganizovat svatbu snů bez stresu"
              : "Discover the benefits that will help you organize your dream wedding without stress"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
              {locale === "cs" ? "Časová úspora" : "Time Saving"}
            </h3>
            <p className="text-gray-700">
              {locale === "cs"
                ? "Ušetřete hodiny plánování díky připraveným šablonám a automatizovaným procesům"
                : "Save hours of planning with ready-made templates and automated processes"}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-600"
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
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
              {locale === "cs" ? "Kompletní řešení" : "Complete Solution"}
            </h3>
            <p className="text-gray-700">
              {locale === "cs"
                ? "Všechno, co potřebujete pro organizaci svatby na jednom místě"
                : "Everything you need to organize your wedding in one place"}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-600"
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
            <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
              {locale === "cs" ? "Bez stresu" : "Stress-Free"}
            </h3>
            <p className="text-gray-700">
              {locale === "cs"
                ? "Užijte si přípravu svatby místo trápení s organizací"
                : "Enjoy wedding planning instead of struggling with organization"}
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-linear-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-200 p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 font-deluxe mb-2">
              {locale === "cs"
                ? "Naše čísla mluví za nás"
                : "Our Numbers Speak for Themselves"}
            </h3>
            <p className="text-gray-600">
              {locale === "cs"
                ? "Tisíce spokojených párů už využily naše služby"
                : "Thousands of happy couples have already used our services"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <CountUp end={500} suffix="+" />
              <div className="text-gray-700 font-medium">
                {locale === "cs" ? "Spokojených párů" : "Happy Couples"}
              </div>
            </div>
            <div className="text-center">
              <CountUp end={50} suffix="+" />
              <div className="text-gray-700 font-medium">
                {locale === "cs" ? "Šablon" : "Templates"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 font-deluxe">
                24/7
              </div>
              <div className="text-gray-700 font-medium">
                {locale === "cs" ? "Podpora" : "Support"}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <CountUp end={4} duration={1500} />
                <div className="text-4xl font-bold text-amber-600 font-deluxe ml-1">
                  .9★
                </div>
              </div>
              <div className="text-gray-700 font-medium">
                {locale === "cs" ? "Hodnocení" : "Rating"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* product list, just duplicating products page */}
      <section className="max-w-7xl mx-auto" id="products">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {PRODUCT_LIST.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>

      {/* reviews, maybe with offset carousel on scroll or just bento grid */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-deluxe mb-4">
              {locale === "cs"
                ? "Co říkají naši klienti"
                : "What Our Clients Say"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === "cs"
                ? "Přečtěte si zkušenosti párů, které už využily naše služby"
                : "Read the experiences of couples who have already used our services"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                {locale === "cs"
                  ? '"Plánovač nám ušetřil tolik času a stresu. Všechno bylo připravené a organizované."'
                  : '"The planner saved us so much time and stress. Everything was prepared and organized."'}
              </p>
              <div className="font-semibold text-gray-900">
                {locale === "cs" ? "Marie a Tomáš" : "Marie and Tomáš"}
              </div>
              <div className="text-gray-600 text-sm">
                {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                {locale === "cs"
                  ? '"Skvělé nástroje a podpora. Doporučujeme všem, kteří plánují svatbu!"'
                  : '"Great tools and support. We recommend it to everyone planning a wedding!"'}
              </p>
              <div className="font-semibold text-gray-900">
                {locale === "cs" ? "Anna a Petr" : "Anna and Petr"}
              </div>
              <div className="text-gray-600 text-sm">
                {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                {locale === "cs"
                  ? '"Profesionální přístup a všechno na jednom místě. Perfektní služba!"'
                  : '"Professional approach and everything in one place. Perfect service!"'}
              </p>
              <div className="font-semibold text-gray-900">
                {locale === "cs" ? "Lucie a Michal" : "Lucie and Michal"}
              </div>
              <div className="text-gray-600 text-sm">
                {locale === "cs" ? "Svatba 2024" : "Wedding 2024"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about the author */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-deluxe mb-6">
              {locale === "cs" ? "O mně" : "About Me"}
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                {locale === "cs"
                  ? "Jsem Tereza, vášnivá plánovačka svateb s více než 10 lety zkušeností v organizaci nezapomenutelných okamžiků."
                  : "I'm Tereza, a passionate wedding planner with more than 10 years of experience in organizing unforgettable moments."}
              </p>
              <p>
                {locale === "cs"
                  ? "Věřím, že každý detail má svůj význam a že dokonalá svatba je výsledkem pečlivého plánování a lásky k detailům."
                  : "I believe that every detail matters and that a perfect wedding is the result of careful planning and love for details."}
              </p>
              <p>
                {locale === "cs"
                  ? "Pomohla jsem stovkám párům vytvořit svatební den jejich snů - od intimních obřadů po velkolepé oslavy."
                  : "I've helped hundreds of couples create their dream wedding day - from intimate ceremonies to grand celebrations."}
              </p>
            </div>

            <div className="mt-8">
              <TranslatedLink href="/contact" className="btn btn-primary">
                {locale === "cs" ? "Kontaktujte mě" : "Contact Me"}
              </TranslatedLink>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-linear-to-br from-amber-100 to-amber-200 rounded-2xl shadow-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">
                  {locale === "cs" ? "K dispozici" : "Available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="bg-amber-800/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-deluxe mb-4">
              {locale === "cs"
                ? "Začněte plánovat svou svatbu"
                : "Start Planning Your Wedding"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === "cs"
                ? "Kontaktujte mě ještě dnes a začněme společně plánovat váš speciální den"
                : "Contact me today and let's start planning your special day together"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
                {locale === "cs" ? "Email" : "Email"}
              </h3>
              <p className="text-gray-700">info@svatebnidenik.cz</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
                {locale === "cs" ? "Telefon" : "Phone"}
              </h3>
              <p className="text-gray-700">+420 123 456 789</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-deluxe mb-3">
                {locale === "cs" ? "Lokace" : "Location"}
              </h3>
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Praha, Česká republika"
                  : "Prague, Czech Republic"}
              </p>
            </div>
          </div>

          <div className="text-center">
            <TranslatedLink href="/contact" className="btn btn-primary">
              {locale === "cs" ? "Kontaktujte mě" : "Contact Me"}
            </TranslatedLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
