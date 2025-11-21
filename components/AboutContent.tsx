"use client";

import { motion } from "framer-motion";
import TranslatedLink from "@/components/TranslatedLink";
import { AnimatedHeader } from "@/components/AnimatedHeader";

interface AboutContentProps {
  locale: string;
}

export default function AboutContent({ locale }: AboutContentProps) {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="about-page-wrap"
    >
      {/* Header */}
      <motion.div variants={itemVariants} id="about-page-inner">
        <div
          className="px-4 sm:px-6 lg:px-8 pt-16 md:pt-24"
          id="about-page-cover"
        >
          <div className="max-w-7xl mx-auto">
            <AnimatedHeader
              title={locale === "cs" ? "O deníku" : "About the Planner"}
              subtitle={
                locale === "cs"
                  ? "Vaše cesta k dokonale zorganizované svatbě začíná zde"
                  : "Your journey to a perfectly organized wedding starts here"
              }
              locale={locale as "en" | "cs"}
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <section
          className="px-4 sm:px-6 lg:px-8 py-16 md:py-24"
          id="about-page-main"
        >
          <div className="max-w-7xl mx-auto" id="about-page-inner">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
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
          </div>
        </section>
      </motion.div>

      <motion.div variants={itemVariants}>
        <section
          className="bg-amber-800/5 px-4 sm:px-6 lg:px-8 py-16 md:py-24"
          id="about"
        >
          <div className="max-w-7xl mx-auto" id="about-page-inner">
            <div className="bg-linear-to-br from-amber-50 to-white rounded-2xl shadow-lg border border-amber-800/10 p-8 md:p-12">
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
            {/* CTA Section */}
            <div className="text-center mt-12">
              <TranslatedLink href="/products" className="btn btn-primary">
                {locale === "cs" ? "Vybrat deník" : "Choose Your Planner"}
              </TranslatedLink>
            </div>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}
