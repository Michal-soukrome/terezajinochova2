import TranslatedLink from "./TranslatedLink";
import { Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">
        {product.names[locale as keyof typeof product.names]}
      </h2>
      <p className="text-gray-600 mb-4">
        {product.descriptions[locale as keyof typeof product.descriptions]}
      </p>
      <p className="text-xl font-bold mb-4">
        {locale === "cs"
          ? `${(product.priceCZK / 100).toFixed(2)} Kč`
          : `$${(product.priceCZK / 100).toFixed(2)}`}
      </p>
      <div className="flex space-x-4">
        <TranslatedLink
          href={`/products/${product.id}`}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          {locale === "cs" ? "Zobrazit Detaily" : "View Details"}
        </TranslatedLink>
        <BuyButton productId={product.id} locale={locale} />
      </div>
    </div>
  );
}
