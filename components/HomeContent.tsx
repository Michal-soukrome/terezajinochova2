"use client";

import { motion } from "framer-motion";
import TranslatedLink from "@/components/TranslatedLink";
import { CountUp } from "@/components/CountUp";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCT_LIST } from "@/lib/products";
import { HeroSection } from "@/components/HeroSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Locale } from "@/lib/i18n";

interface HomeContentProps {
  locale: Locale;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomeContent({ locale }: HomeContentProps) {
  const title =
    locale === "cs" ? "VÁŠ SVATEBNÍ PLÁNOVAČ" : "YOUR WEDDING PLANNER";
  const description =
    locale === "cs"
      ? "Naplánujte si svůj svatební den s lehkostí a radostí"
      : "Plan your wedding day with ease and joy";

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroSection title={title} description={description} locale={locale} />

      {/* about diaries, benefits, stats */}
      <motion.section
        variants={itemVariants}
        className="bg-amber-800/5 px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="benefits"
      >
        <div className="max-w-7xl mx-auto" id="benefits-inner">
          {/* Services Section */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Gift for Guests */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42.618"
                      height="42.524"
                      viewBox="0 0 42.618 42.524"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <g transform="translate(340.103 -651.623)">
                        <path
                          data-name="Rectangle 684"
                          d="M0,0H33.967a0,0,0,0,1,0,0V18.627a2.825,2.825,0,0,1-2.825,2.825H2.825A2.825,2.825,0,0,1,0,18.627V0A0,0,0,0,1,0,0Z"
                          transform="translate(-335.778 671.945)"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Rectangle 685"
                          d="M2.825,0H38.293a2.825,2.825,0,0,1,2.825,2.825V7.151a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V2.825A2.825,2.825,0,0,1,2.825,0Z"
                          transform="translate(-339.353 664.794)"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24783"
                          d="M-316.727,655.277l2.484,8.695-8.087-4.044a3.968,3.968,0,0,1-1.03-6.355l.013-.012A3.968,3.968,0,0,1-316.727,655.277Z"
                          transform="translate(-5.446 0)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24784"
                          d="M-305.088,655.277l-2.482,8.695,8.085-4.044a3.967,3.967,0,0,0,1.031-6.355l-.013-.012A3.969,3.969,0,0,0-305.088,655.277Z"
                          transform="translate(-11.671 0)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <line
                          data-name="Line 177"
                          y2="27.709"
                          transform="translate(-319.688 665.688)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Dárky pro hosty" : "Gift for Guests"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>

              {/* Organisation */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47.189"
                      height="42.526"
                      viewBox="0 0 47.189 42.526"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <path
                        data-name="Path 24785"
                        d="M-328.874,549.586a11.416,11.416,0,0,0-8.787,8.656,11.293,11.293,0,0,0,2.048,9.369h-.046l18.808,21.944a2.282,2.282,0,0,0,3.465,0l18.809-21.944h-.046a11.3,11.3,0,0,0,2.047-9.369,11.417,11.417,0,0,0-8.787-8.656,11.428,11.428,0,0,0-13.755,11.177A11.428,11.428,0,0,0-328.874,549.586Z"
                        transform="translate(338.712 -548.576)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Organizace" : "Organisation"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>

              {/* Design & Video */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47.5"
                      height="37.79"
                      viewBox="0 0 47.5 37.79"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <g transform="translate(-1631.75 -866.078)">
                        <rect
                          data-name="Rectangle 686"
                          width="46"
                          height="30"
                          rx="1"
                          transform="translate(1632.5 866.828)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24797"
                          d="M1651.307,878.384,1641.5,872.5v11.768Z"
                          transform="translate(8.652 4.831)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24798"
                          d="M1665.92,888.384,1662,882.5h-21.575l-3.923,5.884"
                          transform="translate(3.845 14.444)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Design & Video" : "Design & Video"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>

              {/* Decoration */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40.942"
                      height="46.798"
                      viewBox="0 0 40.942 46.798"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <g transform="translate(317.701 -436.542)">
                        <path
                          data-name="Path 24786"
                          d="M-277.717,437.5s-27.325,9.759-39.035,44.891"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24787"
                          d="M-306.864,467.753c20.493-2.928,29.562-15.046,32.2-30.253"
                          transform="translate(-3.057)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24788"
                          d="M-268.52,453.578a8.551,8.551,0,0,0-5.856-1.952"
                          transform="translate(-13.1 -4.367)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24789"
                          d="M-280.695,467.459s-1.952-3.9-7.807-1.952"
                          transform="translate(-8.733 -8.489)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Dekorace" : "Decoration"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>

              {/* Tracking System */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="38.759"
                      height="44.347"
                      viewBox="0 0 38.759 44.347"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <g transform="translate(268.751 -916.583)">
                        <path
                          data-name="Path 24790"
                          d="M-252.549,921.059c0,2.06-3.726,7.452-3.726,7.452S-260,923.119-260,921.059a3.727,3.727,0,0,1,3.726-3.726A3.726,3.726,0,0,1-252.549,921.059Z"
                          transform="translate(6.903)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24791"
                          d="M-261.275,922.333c2.059,0,7.452,3.726,7.452,3.726s-5.393,3.726-7.452,3.726A3.725,3.725,0,0,1-265,926.059,3.727,3.727,0,0,1-261.275,922.333Z"
                          transform="translate(2.589 4.315)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24792"
                          d="M-260,932.785c0-2.057,3.726-7.452,3.726-7.452s3.726,5.4,3.726,7.452a3.724,3.724,0,0,1-3.726,3.726A3.725,3.725,0,0,1-260,932.785Z"
                          transform="translate(6.903 6.903)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24793"
                          d="M-249.549,929.785c-2.057,0-7.452-3.726-7.452-3.726s5.4-3.726,7.452-3.726a3.726,3.726,0,0,1,3.726,3.726A3.724,3.724,0,0,1-249.549,929.785Z"
                          transform="translate(9.492 4.315)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24794"
                          d="M-258,948.962c3.726-13.041,7.452-18.629,18.629-18.629C-246.823,941.511-246.823,948.962-258,948.962Z"
                          transform="translate(8.629 11.218)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                        <path
                          data-name="Path 24795"
                          d="M-249.372,948.962c-3.726-13.041-7.452-18.629-18.629-18.629C-260.549,941.511-260.549,948.962-249.372,948.962Z"
                          transform="translate(0 11.218)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Sledovací systém" : "Tracking System"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>

              {/* Photography */}
              <div className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="41.045"
                      height="35.887"
                      viewBox="0 0 41.045 35.887"
                      className="w-full h-full text-amber-700 group-hover:text-amber-800 transition-colors duration-300"
                    >
                      <g transform="translate(-1535.75 -817.75)">
                        <path
                          data-name="Path 24796"
                          d="M1567.171,825.714l-1.166-5.83a1.719,1.719,0,0,0-1.685-1.384h-16.095a1.72,1.72,0,0,0-1.687,1.384l-1.166,5.83a1.719,1.719,0,0,1-1.685,1.382h-3.75a3.439,3.439,0,0,0-3.439,3.439v18.913a3.439,3.439,0,0,0,3.439,3.439h32.667a3.439,3.439,0,0,0,3.439-3.439V830.535a3.439,3.439,0,0,0-3.439-3.439h-3.748A1.72,1.72,0,0,1,1567.171,825.714Z"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <circle
                          data-name="Ellipse 96"
                          cx="9.5"
                          cy="9.5"
                          r="9.5"
                          transform="translate(1546.5 828.887)"
                          fill="none"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-deluxe mb-3">
                  {locale === "cs" ? "Fotografie" : "Photography"}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {locale === "cs"
                    ? "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."
                    : "Lorem ipsum dolor sit amet, adipis elit. Aenean commodo ligula lorem sipum."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* product list, just duplicating products page */}
      <motion.section
        variants={itemVariants}
        className=" px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="products"
      >
        <div className="max-w-7xl mx-auto" id="products-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            {PRODUCT_LIST.map((product, idx) => (
              <div
                key={product.id}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard product={product} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={itemVariants}
        className=" px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="stats"
      >
        <div className="max-w-7xl mx-auto" id="stats-inner">
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
      </motion.section>

      {/* reviews, offset carousel with horizontal scroll */}
      <motion.section
        variants={itemVariants}
        className="bg-amber-800/5 px-0 py-16 md:py-24"
        id="reviews"
      >
        <div className="w-full" id="reviews-inner">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-deluxe mb-4">
              {locale === "cs"
                ? "Recenze spokojených svatebčanů"
                : "What Our Clients Say"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {locale === "cs"
                ? "Přečtěte si zkušenosti párů, které už využily naše služby"
                : "Read the experiences of couples who have already used our services"}
            </p>
          </div>

          <ReviewsCarousel locale={locale} />
        </div>
      </motion.section>

      {/* about the author */}
      <motion.section
        variants={itemVariants}
        className="px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="about"
      >
        <div className="max-w-7xl mx-auto" id="about-inner">
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
            </div>

            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-amber-100 to-amber-800/10 rounded-2xl shadow-lg overflow-hidden">
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
            </div>
          </div>
        </div>
      </motion.section>

      {/* contact */}
      <motion.section
        variants={itemVariants}
        className="bg-amber-800/5 px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        id="contact"
      >
        <div className="max-w-7xl mx-auto" id="contact-inner">
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
              <p className="text-gray-700">tereza.jinochova@gmail.com</p>
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
      </motion.section>
    </motion.main>
  );
}
