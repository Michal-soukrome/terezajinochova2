import TranslatedLink from "./TranslatedLink";
import { Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const isPremium = product.id === "premium";

  return (
    <div
      className={`bg-white rounded border shadow overflow-hidden transition-all duration-300  ${
        isPremium
          ? "border-amber-200 shadow-amber-100/50"
          : "border-gray-200 shadow-gray-100/50"
      }`}
      id="product-card"
    >
      <div className="h-full flex flex-col">
        {/* Image Section */}
        <div className="relative group">
          <TranslatedLink href={`/products/${product.id}`}>
            <div className="relative overflow-hidden rounded-t-2xl">
              <Image
                src={product.image}
                alt={product.names[locale as keyof typeof product.names]}
                width={112}
                height={112}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </TranslatedLink>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 space-y-4">
          {/* Badge */}
          <div className="flex justify-start">
            {isPremium ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wide">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {locale === "cs" ? "Premium" : "Premium"}
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-full text-xs font-semibold uppercase tracking-wide">
                {locale === "cs" ? "Základní" : "Basic"}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <TranslatedLink href={`/products/${product.id}`}>
              <h3 className="text-xl font-bold text-gray-900 font-deluxe leading-tight group-hover:underline transition-colors">
                {product.names[locale as keyof typeof product.names]}
              </h3>
            </TranslatedLink>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {product.descriptions[locale as keyof typeof product.descriptions]}
          </p>

          {/* Highlights */}
          <ul className="space-y-2">
            {(
              product.highlights?.[locale as keyof typeof product.highlights] ||
              []
            )
              .slice(0, 3)
              .map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="leading-tight">{h}</span>
                </li>
              ))}
          </ul>

          {/* Price */}
          <div className="pt-2">
            <p className="text-2xl font-bold text-gray-900 font-deluxe">
              {locale === "cs"
                ? `${(product.priceCZK / 100).toFixed(0)} Kč`
                : `$${(product.priceCZK / 100).toFixed(2)}`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            <TranslatedLink
              href={`/products/${product.id}`}
              className="flex-1 btn btn-secondary text-center py-3 text-sm font-medium"
            >
              {locale === "cs" ? "Zobrazit Detaily" : "View Details"}
            </TranslatedLink>
            <BuyButton
              productId={product.id}
              locale={locale}
              variant="primary"
              className="flex-1 btn-luxe text-sm py-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
