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
    <div
      className="bg-white p-5 rounded shadow min-h-auto md:min-h-[600px] "
      id="product-card"
    >
      <div className="h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="">
            <div className="group">
              <TranslatedLink href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.names[locale as keyof typeof product.names]}
                  width={112}
                  height={112}
                  className="rounded-md object-cover w-full object-center h-48 "
                  priority={false}
                />{" "}
              </TranslatedLink>
              <div className="pt-5">
                {product.id === "premium" ? (
                  <div className="inline-block mb-2 border border-yellow-300 px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded font-medium uppercase">
                    premium
                  </div>
                ) : (
                  <div className="inline-block mb-2 border border-gray-300 px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded font-medium uppercase">
                    základní
                  </div>
                )}
                <TranslatedLink href={`/products/${product.id}`}>
                  <h3 className="text-xl font-semibold group-hover:underline">
                    {product.names[locale as keyof typeof product.names]}
                  </h3>
                </TranslatedLink>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              {
                product.descriptions[
                  locale as keyof typeof product.descriptions
                ]
              }
            </p>

            <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
              {(
                product.highlights?.[
                  locale as keyof typeof product.highlights
                ] || []
              )
                .slice(0, 3)
                .map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
            </ul>

            <p className="text-xl font-bold mb-4">
              {locale === "cs"
                ? `${(product.priceCZK / 100).toFixed(2)} Kč`
                : `$${(product.priceCZK / 100).toFixed(2)}`}
            </p>
          </div>{" "}
        </div>{" "}
        <div className="mt-auto flex gap-2">
          <TranslatedLink
            href={`/products/${product.id}`}
            className="btn btn-secondary"
          >
            {locale === "cs" ? "Zobrazit Detaily" : "View Details"}
          </TranslatedLink>
          <BuyButton
            productId={product.id}
            locale={locale}
            variant="primary"
            className="px-6 py-3"
          />
        </div>
      </div>
    </div>
  );
}
