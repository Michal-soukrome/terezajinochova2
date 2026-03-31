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

  // Cena pro zobrazení v CZK (Stripe řeší reálnou cenu přes stripePriceId)
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

  // Special notice for English users about availability
  englishNotice?: {
    cs: string;
    en: string;
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
      cs: "Svatební deník – základní balení",
      en: "Wedding diary – basic",
    },
    descriptions: {
      cs: "Praktický deník pro moderní páry — checklisty, rozpočtové šablony a místo pro vaše nejhezčí vzpomínky.",
      en: "A practical wedding diary for modern couples — checklists, budget templates and space for your favorite memories.",
    },

    priceCZK: 849,
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
        "odpovědi na nejčastější otázky, které během příprav přirozeně přicházejí",
        "jemný a moderní design, který vás bude bavit otevírat znovu a znovu",
        "kvalitní zpracování, které vydrží celé období plánování i uchování vzpomínek",
      ],
      en: [
        "elegant and clear page layout",
        "space for personal notes, checklists and photos",
        "answers to the most common questions that naturally arise during preparations",
        "delicate and modern design that you'll enjoy opening again and again",
        "quality processing that will withstand the entire planning period and preservation of memories",
      ],
    },
    englishNotice: {
      cs: "",
      en: "The wedding diary is currently only available in Czech (printed version). If you're interested in an English version, please contact me and I'll be happy to discuss the possibilities!",
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
      cs: "Svatební deník – prémiové balení",
      en: "Wedding diary – premium",
    },
    descriptions: {
      cs: "Prémiová volba pro ty, kteří chtějí darovat nejen deník, ale i výjimečný okamžik – krásnou památku, která potěší už při rozbalování a provede nevěstu celým obdobím svatebních příprav.",
      en: "Premium choice for those who want to give not only the diary, but also a special moment – a beautiful memory that delights from the moment of unwrapping and guides the bride through the entire period of wedding preparations.",
    },

    priceCZK: 1190,
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
    "kompletní obsah Svatebního deníku včetně všech plánovacích částí",
    "osobní věnování, které dodá dárku jedinečný význam",
    "elegantní a přehledné rozvržení stránek",
    "elegantní dárkové balení s jemnými detaily připravené k okamžitému předání",
    "prostor pro vlastní poznámky, checklisty, rozpočet i fotografie",
    "odpovědi na nejčastější otázky, které během příprav přirozeně přicházejí",
    "jemný a moderní design, který vás bude bavit otevírat znovu a znovu",
    "kvalitní zpracování, které vydrží celé období plánování i uchování vzpomínek"
      ],
      en: [
    "complete content of the Wedding diary including all planning sections",
    "personal dedication that adds unique meaning to the gift",
    "elegant gift packaging with delicate details ready for immediate presentation",
    "elegant and clear page layout",
    "space for personal notes, checklists, budget and photos",
    "answers to the most common questions that naturally arise during preparations",
    "delicate and modern design that you'll enjoy opening again and again",
    "quality processing that will withstand the entire planning period and preservation of memories"
      ],
    },
    englishNotice: {
      cs: "",
      en: "The wedding diary is currently only available in Czech (printed version). If you're interested in an English version, please contact me and I'll be happy to discuss the possibilities!",
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
