import TranslatedLink from "./TranslatedLink";
import { Product } from "@/lib/products";
import { BuyButton } from "./BuyButton";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={product.image}
          alt={product.names[locale as keyof typeof product.names]}
          width={112}
          height={112}
          className="rounded-md object-cover"
          priority={false}
        />
        <div>
          <h3 className="text-xl font-semibold">
            {product.names[locale as keyof typeof product.names]}
          </h3>
          {product.id === "premium" && (
            <div className="inline-block ml-2 px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-md font-medium">
              PREMIUM
            </div>
          )}
          <p className="text-sm text-gray-500">
            {product.descriptions[locale as keyof typeof product.descriptions]}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
          {(
            product.highlights?.[locale as keyof typeof product.highlights] ||
            []
          )
            .slice(0, 3)
            .map((h, i) => (
              <li key={i}>{h}</li>
            ))}
        </ul>
      </div>
      <p className="text-xl font-bold mb-4">
        {locale === "cs"
          ? `${(product.priceCZK / 100).toFixed(2)} Kč`
          : `$${(product.priceCZK / 100).toFixed(2)}`}
      </p>
      <div className="flex space-x-4">
        <TranslatedLink
          href={`/products/${product.id}`}
          className="btn btn-secondary px-4 py-2"
        >
          {locale === "cs" ? "Zobrazit Detaily" : "View Details"}
        </TranslatedLink>
        <BuyButton
          productId={product.id}
          locale={locale}
          variant="primary"
          className="px-4 py-2"
        />
      </div>
    </div>
  );
}
