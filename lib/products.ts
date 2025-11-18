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

  // Frontend assets
  image: string;
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
    stripePriceId: "price_1ST6XmEZ9QJo6JyeKEHn4qSm",

    names: {
      cs: "Svatební Deník – Základní",
      en: "Wedding Diary – Basic",
    },
    descriptions: {
      cs: "Praktický deník pro moderní páry — checklisty, rozpočtové šablony a místo pro vaše nejhezčí vzpomínky.",
      en: "A practical wedding diary for modern couples — checklists, budget templates and space for your favorite memories.",
    },

    priceCZK: 20500,
    image: "/assets/cover.png",
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
    stripePriceId: "price_1ST6lJEZ9QJo6Jyey7YROR26",

    names: {
      cs: "Svatební Deník – Prémiový",
      en: "Wedding Diary – Premium",
    },
    descriptions: {
      cs: "Prémiové vydání s rozšířenými kapitolami, tiskově připravenými návrhy a bonusovými stránkami pro plánování.",
      en: "Premium edition with extended chapters, print-ready layouts and bonus pages for advanced planning.",
    },

    priceCZK: 1490,
    image: "/assets/cover.png",
    highlights: {
      cs: [
        "Větší rozsah kapitol & bonusové návody",
        "Prémiová tisková kvalita a extra stránky",
        "Stylové návrhy svatebního harmonogramu",
      ],
      en: [
        "Extended chapters & bonus guides",
        "Premium print-ready layouts & extra pages",
        "Stylish timeline and planning templates",
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
