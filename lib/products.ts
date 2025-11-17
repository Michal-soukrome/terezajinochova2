// lib/products.ts

export interface Product {
  id: string;

  // Each language has svůj unikátní slug
  slugs: {
    cs: string;
    en: string;
  };

  // Stripe – jediný relevantní údaj
  stripePriceId: string;

  // Lokalizované názvy & popisy
  names: {
    cs: string;
    en: string;
  };
  descriptions: {
    cs: string;
    en: string;
  };

  // Cena pro zobrazení (Stripe řeší reálnou cenu)
  priceCZK: number;

  // Frontend assets
  image: string;
}

export const PRODUCTS: Record<string, Product> = {
  basic: {
    id: "basic",
    slugs: {
      cs: "zakladni",
      en: "basic",
    },
    stripePriceId: "price_1ST6XmEZ9QJo6JyeKEHn4qSm",

    names: {
      cs: "Svatební Deník – Základní",
      en: "Wedding Diary – Basic",
    },
    descriptions: {
      cs: "Kompletní průvodce plánováním svatby.",
      en: "Complete guide to planning your wedding.",
    },

    priceCZK: 990,
    image: "/assets/thumbnail_IMG_5264.png",
  },

  premium: {
    id: "premium",
    slugs: {
      cs: "premium",
      en: "premium",
    },
    stripePriceId: "price_1ST6lJEZ9QJo6Jyey7YROR26",

    names: {
      cs: "Svatební Deník – Prémiový",
      en: "Wedding Diary – Premium",
    },
    descriptions: {
      cs: "Luxusní verze s bonusovým obsahem.",
      en: "Luxury version with bonus content.",
    },

    priceCZK: 1490,
    image: "/assets/thumbnail_IMG_5264.png",
  },
};

export type ProductId = keyof typeof PRODUCTS;
export const PRODUCT_LIST = Object.values(PRODUCTS);

// Najde produkt podle lokalizovaného slugu (např. "zakladni" v češtině)
import { Locale } from "@/lib/i18n";

export function getProductByLocalizedSlug(
  locale: Locale,
  slug: string
): Product | undefined {
  return Object.values(PRODUCTS).find((p) => p.slugs[locale] === slug);
}
