"use client";

import { Wedding } from "@/lib/weddings";
import { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface WeddingGalleryGridProps {
  weddings: Wedding[];
  locale: Locale;
}

export default function WeddingGalleryGrid({
  weddings,
  locale,
}: WeddingGalleryGridProps) {
  if (weddings.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">
          {locale === "cs"
            ? "Brzy přidáme první svatby do galerie."
            : "We'll be adding wedding photos soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {weddings.map((wedding, index) => (
        <motion.div
          key={wedding.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/${locale}/${routes.gallery[locale]}/${wedding.slugs[locale]}`}
            className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={wedding.thumbnailImage}
                alt={`${wedding.coupleNames[locale]} - ${wedding.location[locale]}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white p-6">
              <h3 className="text-xl font-semibold font-heading text-amber-800 mb-2 leading-tight text-center">
                {wedding.coupleNames[locale]}
              </h3>
              <p className="text-gray-700 font-light text-center">
                {wedding.location[locale]}
              </p>
              {wedding.date && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {wedding.date}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
