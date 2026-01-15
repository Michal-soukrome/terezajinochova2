"use client";

import { Product } from "@/lib/products";
import { ProductCard } from "../ui/ProductCard";
import { motion } from "framer-motion";

interface ProductGridSectionProps {
  locale: string;
  title: string;
  subtitle: string;
  products: Product[];
  background?: "themed" | "white";
}

export default function ProductGridSection({
  locale,
  title,
  subtitle,
  products,
  background = "themed",
}: ProductGridSectionProps) {
  const sectionClass =
    background === "themed"
      ? "bg-accent-1 px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      : "px-4 sm:px-6 lg:px-8 py-16 md:py-24";

  return (
    <section className={sectionClass}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <motion.h3
            className="heading font-medium text-center text-5xl md:text-6xl text-accent-1-contrast leading-tight mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.h4
            className="text-center text-lg md:text-xl text-accent-1-contrast font-light uppercase tracking-wide mb-6 md:mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.h4>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        id="products-grid"
      >
        {products.map((product, idx) => (
          <div key={product.id} style={{ animationDelay: `${idx * 100}ms` }}>
            <ProductCard product={product} locale={locale} />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-700">
          {locale === "cs"
            ? "📍 Kliknutím na nákupní tlačítko otevřete mapu Zásilkovny pro výběr místa"
            : "📍 Click the buy button to open Packeta map and select pickup location"}
        </p>
      </div>
    </section>
  );
}
