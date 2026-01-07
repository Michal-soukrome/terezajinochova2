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
  // zobrazuje se cena v centech/halířích (?)
  priceCZK: number;

  // Whether this product requires shipping
  requiresShipping?: boolean;

  // Frontend assets
  image: string;
  // Gallery images for product showcase
  gallery?: string[];
  // Additional thumbnail images for product detail page
  additionalImages?: string[];
  // Short bullet points to highlight benefits
  highlights?: {
    cs: string[];
    en: string[];
  };
}

export const PRODUCTS: Record<string, Product> = {
  basic: {
    id: "basic",
    slugs: {
      cs: "zakladni",
      en: "basic",
    },
    stripePriceId: process.env.STRIPE_PRICE_BASIC!,
    names: {
      cs: "Svatební Deník – Základní",
      en: "Wedding Diary – Basic",
    },
    descriptions: {
      cs: "Praktický deník pro moderní páry — checklisty, rozpočtové šablony a místo pro vaše nejhezčí vzpomínky.",
      en: "A practical wedding diary for modern couples — checklists, budget templates and space for your favorite memories.",
    },

    priceCZK: 84900,
    requiresShipping: true,
    image: "/assets/cover.png",
    gallery: [
      "/assets/cover.png",
      "/assets/cover-1.JPG",
      "/assets/cover-2.jpg",
    ],
    additionalImages: [
      "/assets/cover-1.JPG",
      "/assets/cover-2.jpg",
      "/assets/diary/DSC05217.jpg",
      "/assets/diary/DSC05284.jpg",
      "/assets/diary/DSC05324.jpg",
      "/assets/diary/DSC05339.jpg",
    ],
    highlights: {
      cs: [
        "Praktické checklisty pro každý den",
        "Šablony rozpočtu a seznam dodavatelů",
        "Místa pro poznámky a vzpomínky",
      ],
      en: [
        "Practical daily checklists",
        "Budget templates & vendor lists",
        "Dedicated space for memories and notes",
      ],
    },
  },

  premium: {
    id: "premium",
    slugs: {
      cs: "premium",
      en: "premium",
    },
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM!,
    names: {
      cs: "Svatební Deník – Prémiový",
      en: "Wedding Diary – Premium",
    },
    descriptions: {
      cs: "Prémiové vydání v dárkovém balení — stejný obsah jako základní verze, zabalený v elegantní krabici se stuhou.",
      en: "Premium edition in gift packaging — same content as the basic version, wrapped in an elegant box with a ribbon.",
    },

    priceCZK: 94900,
    requiresShipping: true,
    image: "/assets/cover.png",
    gallery: [
      "/assets/cover.png",
      "/assets/cover-1.JPG",
      "/assets/cover-2.jpg",
    ],
    additionalImages: [
      "/assets/cover-1.JPG",
      "/assets/cover-2.jpg",
      "/assets/diary/DSC05217.jpg",
      "/assets/diary/DSC05284.jpg",
      "/assets/diary/DSC05324.jpg",
      "/assets/diary/DSC05339.jpg",
      "/assets/diary/premium1.png",
      "/assets/diary/premium2.png",
    ],
    highlights: {
      cs: [
        "Stejný obsah jako základní verze",
        "Elegantní dárkové balení v krabici se stuhou",
        "Perfektní pro darování nebo speciální příležitost",
      ],
      en: [
        "Same content as the basic version",
        "Elegant gift packaging in a box with ribbon",
        "Perfect for gifting or special occasions",
      ],
    },
  },

  test: {
    id: "test",
    slugs: {
      cs: "test",
      en: "test",
    },
    stripePriceId: process.env.STRIPE_PRICE_TEST!,
    names: {
      cs: "Test Product",
      en: "Test Product",
    },
    descriptions: {
      cs: "Testovací produkt pro ověření platební brány.",
      en: "Test product for payment gateway verification.",
    },

    priceCZK: 1500, // 100 CZK for testing
    requiresShipping: false, // No shipping for test product
    image: "/assets/cover.png",
    gallery: ["/assets/cover.png"],
    additionalImages: [],
    highlights: {
      cs: [
        "Pouze pro testování",
        "Bez dopravy",
        "Nízká cena pro testovací účely",
      ],
      en: [
        "Testing purposes only",
        "No shipping required",
        "Low price for testing",
      ],
    },
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
