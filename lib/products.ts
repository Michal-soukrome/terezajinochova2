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

  // Package weight in kg (for Packeta API)
  weight?: number;

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
      cs: "Svatební deník – základní",
      en: "Wedding diary – basic",
    },
    descriptions: {
      cs: "Praktický deník pro moderní páry — checklisty, rozpočtové šablony a místo pro vaše nejhezčí vzpomínky.",
      en: "A practical wedding diary for modern couples — checklists, budget templates and space for your favorite memories.",
    },

    priceCZK: 84900,
    requiresShipping: true,
    weight: 0.8, // 800g wedding diary
    image: "/assets/diary/basic0.jpg",

    gallery: [],
    additionalImages: [
      "/assets/diary/basic0.jpg",
      "/assets/diary/basic1.jpg",
      "/assets/diary/basic2.jpg",
      "/assets/diary/basic3.jpg",
      "/assets/diary/basic4.jpg",
      "/assets/diary/basic5.jpg",
      "/assets/diary/basic6.jpg",
      "/assets/diary/basic7.jpg",
      "/assets/diary/basic8.jpg",
    ],
    highlights: {
      cs: [
        "elegantní a přehledné rozvržení stránek",
        "prostor pro vlastní poznámky, checklisty i fotografie",
        "jemný a moderní design, který potěší oko",
        "ideální dárek pro sebe nebo kamarádku, která se právě zasnoubila",
        "kvalitní zpracování, které vydrží časté listování",
      ],
      en: [
        "elegant and clear page layout",
        "space for personal notes, checklists and photos",
        "delicate and modern design that pleases the eye",
        "ideal gift for yourself or a friend who just got engaged",
        "quality processing that will withstand frequent flipping",
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
      cs: "Svatební deník – prémiový",
      en: "Wedding diary – premium",
    },
    descriptions: {
      cs: "Prémiová volba pro ty, kteří chtějí darovat nejen deník, ale i výjimečný okamžik – krásnou památku, která potěší už při rozbalování a provede nevěstu celým obdobím svatebních příprav.",
      en: "Premium choice for those who want to give not only the diary, but also a special moment – a beautiful memory that delights from the moment of unwrapping and guides the bride through the entire period of wedding preparations.",
    },

    priceCZK: 94900,
    requiresShipping: true,
    weight: 1.2, // 1.2kg with gift box
    image: "/assets/diary/premium.jpg",
    gallery: [],
    additionalImages: [
      "/assets/diary/premium1.png",
      "/assets/diary/premium2.png",
    ],
    highlights: {
      cs: [
        "totožný obsah jako v základní verzi",
        "osobní věnování",
        "elegantní dárková krabička s jemným hedvábným papírem",
        "Cenné rady pro uspořádání vašeho svatebního dne",
        "Praktické checklisty a přehledné kontrolní seznamy",
        "Šablony rozpočtu a seznam dodavatelů",
        "Prostor pro poznámky a vzpomínky na celý život",
        "195 stran promyšleného plánování a inspirace",
      ],
      en: [
        "identical content as in the basic version",
        "personal dedication",
        "elegant gift box with delicate tissue paper",
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
  slug: string,
): Product | undefined {
  return Object.values(PRODUCTS).find((p) => p.slugs[locale] === slug);
}
