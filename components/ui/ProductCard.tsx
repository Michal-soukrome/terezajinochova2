import TranslatedLink from "../navigation/TranslatedLink";
import { Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";
import Image from "next/image";
import { Badge } from "./Badge";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const isPremium = product.id === "premium";

  return (
    <div
      className={`bg-white rounded overflow-hidden border transition-all duration-300  ${
        isPremium ? "border-accent-1" : "border-gray-200"
      }`}
      style={{ cornerShape: "bevel" } as any}
      id="product-card"
    >
      <div className="h-full flex flex-col">
        {/* Image Section */}
        <div className="h-70">
          <TranslatedLink href={`/products/${product.id}`}>
            <div className="relative overflow-hidden rounded-t h-full">
              <Image
                src={product.image}
                alt={product.names[locale as keyof typeof product.names]}
                fill
                className="object-cover"
                priority={false}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </TranslatedLink>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Badge */}
          <div className="flex justify-start">
            <Badge
              variant={isPremium ? "premium" : "basic"}
              locale={locale as "cs" | "en"}
            />
          </div>

          {/* Title */}
          <div>
            <TranslatedLink href={`/products/${product.id}`}>
              <h3 className="text-xl font-bold text-gray-900 font-heading leading-tight hover:underline transition-colors">
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
                    className="w-4 h-4 text-accent-1-contrast mt-0.5 shrink-0"
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
            <p className="text-4xl font-bold text-gray-900 font-heading">
              {(product.priceCZK / 100).toFixed(0)} Kč
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 p-6">
        <TranslatedLink
          href={`/products/${product.id}`}
          className="btn btn-secondary w-fit "
        >
          {locale === "cs" ? "Zobrazit Detaily" : "View Details"}
        </TranslatedLink>
        <BuyButton
          productId={product.id}
          locale={locale}
          variant="primary"
          className="w-full flex-1"
        />
      </div>
    </div>
  );
}
