// lib/weddings.ts

export interface Wedding {
  id: string;

  // Localized slugs for each language
  slugs: {
    cs: string;
    en: string;
  };

  // Couple names
  coupleNames: {
    cs: string;
    en: string;
  };

  // Location
  location: {
    cs: string;
    en: string;
  };

  // Main thumbnail image (first photo)
  thumbnailImage: string;

  // Gallery images
  galleryImages: string[];

  // Photographer name
  photographerName: string;
  photographerGender: "male" | "female"; // for fotografovi/fotografce

  // Whether the wedding was coordinated by Svatební Guru agency
  coordinatedByAgency: boolean;

  // Optional review from the couple
  review?: {
    cs: string;
    en: string;
  };

  // Date of the wedding (optional, for display)
  date?: string;
}

export const WEDDINGS: Wedding[] = [
  {
    id: "eliska-dan",
    slugs: {
      cs: "eliska-dan-mlyn-dobra-voda",
      en: "eliska-dan-mill-good-water",
    },
    coupleNames: {
      cs: "Eliška & Dan",
      en: "Eliška & Dan",
    },
    location: {
      cs: "Mlýn na Dobré vodě",
      en: "Mill on Good Water",
    },
    thumbnailImage: "/assets/weddings/eliska-dan/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/eliska-dan/1.jpg",
      "/assets/weddings/eliska-dan/2.jpg",
      "/assets/weddings/eliska-dan/3.jpg",
      "/assets/weddings/eliska-dan/4.jpg",
      "/assets/weddings/eliska-dan/5.jpg",
      "/assets/weddings/eliska-dan/6.jpg",
      "/assets/weddings/eliska-dan/7.jpg",
      "/assets/weddings/eliska-dan/8.jpg",
      "/assets/weddings/eliska-dan/9.jpg",
    ],
    photographerName: "Andrea Kadlecová Volárová (Byandreav)",
    photographerGender: "female",
    coordinatedByAgency: true,
    review: {
      cs: "Svatba byla naprosto dokonalá! Strašně moc děkujeme, vše vyšlo perfektně a s Verčou jste byly skvělé.",
      en: "The wedding was absolutely perfect! Thank you so much, everything turned out perfectly and you and Verča were amazing.",
    },
  },
  {
    id: "julie-jirka",
    slugs: {
      cs: "julie-jirka-statek-chefparade",
      en: "julie-jirka-chefparade-farm",
    },
    coupleNames: {
      cs: "Julie & Jirka",
      en: "Julie & Jirka",
    },
    location: {
      cs: "Statek Chefparade",
      en: "Chefparade Farm",
    },
    thumbnailImage: "/assets/weddings/julie-jirka/thumbnail.png",
    galleryImages: [
      "/assets/weddings/julie-jirka/1.png",
      "/assets/weddings/julie-jirka/2.jpg",
      "/assets/weddings/julie-jirka/3.png",
      "/assets/weddings/julie-jirka/4.jpg",
      "/assets/weddings/julie-jirka/5.png",
    ],
    photographerName: "Erik Doby",
    photographerGender: "male",
    coordinatedByAgency: true,
  },
  {
    id: "jana-david",
    slugs: {
      cs: "jana-david-louka-prague",
      en: "jana-david-louka-prague",
    },
    coupleNames: {
      cs: "Jana & David",
      en: "Jana & David",
    },
    location: {
      cs: "Kostel sv. Petra a Pavla, Louka Prague",
      en: "St. Peter and Paul Church, Louka Prague",
    },
    thumbnailImage: "/assets/weddings/jana-david/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/jana-david/1.jpg",
      "/assets/weddings/jana-david/2.jpg",
      "/assets/weddings/jana-david/3.jpg",
      "/assets/weddings/jana-david/4.jpg",
      "/assets/weddings/jana-david/5.jpeg",
    ],
    photographerName: "Norbert Smutný",
    photographerGender: "male",
    coordinatedByAgency: true,
    review: {
      cs: "S koordinátorkou Terezou jsme začali s manželem spolupracovat pár měsíců před svatbou. Měla na starosti průběh obřadu a organizaci hostů před ním, rychlý přesun kolonou vozidel na místo hostiny a následnou hostinu a oslavu. Všechno proběhlo naprosto bez problémů, komunikace byla vždy příjemná a koordinace profesionální. V den svatby pomáhala i druhá koordinátorka Veronika. Oběma dodatečně ještě jednou děkujeme za vše a opravdu moc Svatební guru doporučujeme dalším párům! Tetourovi",
      en: "We started working with coordinator Tereza a few months before the wedding. She was in charge of the ceremony, guest organization, quick vehicle convoy transfer to the reception venue, and the subsequent reception and celebration. Everything went absolutely smoothly, communication was always pleasant and coordination professional. On the wedding day, the second coordinator Veronika also helped. We thank both of them once again for everything and really highly recommend Svatební Guru to other couples! The Tetours",
    },
  },
  {
    id: "lenka-libor",
    slugs: {
      cs: "lenka-libor-statek-hermanice",
      en: "lenka-libor-hermanice-farm",
    },
    coupleNames: {
      cs: "Lenka & Libor",
      en: "Lenka & Libor",
    },
    location: {
      cs: "Statek Heřmanice",
      en: "Heřmanice Farm",
    },
    thumbnailImage: "/assets/weddings/lenka-libor/thumbnail.png",
    galleryImages: [
      "/assets/weddings/lenka-libor/1.png",
      "/assets/weddings/lenka-libor/2.jpg",
      "/assets/weddings/lenka-libor/3.png",
      "/assets/weddings/lenka-libor/4.jpg",
      "/assets/weddings/lenka-libor/5.jpg",
      "/assets/weddings/lenka-libor/6.jpg",
      "/assets/weddings/lenka-libor/7.jpg",
      "/assets/weddings/lenka-libor/8.png",
      "/assets/weddings/lenka-libor/9.jpg",
      "/assets/weddings/lenka-libor/10.jpg",
    ],
    photographerName: "Fotky od Lů",
    photographerGender: "female",
    coordinatedByAgency: true,
  },
  {
    id: "sarka-jakub",
    slugs: {
      cs: "sarka-jakub-statek-hermanice",
      en: "sarka-jakub-hermanice-farm",
    },
    coupleNames: {
      cs: "Šárka & Jakub",
      en: "Šárka & Jakub",
    },
    location: {
      cs: "Statek Heřmanice",
      en: "Heřmanice Farm",
    },
    thumbnailImage: "/assets/weddings/sarka-jakub/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/sarka-jakub/1.jpg",
      "/assets/weddings/sarka-jakub/2.jpg",
      "/assets/weddings/sarka-jakub/3.jpg",
      "/assets/weddings/sarka-jakub/4.jpg",
      "/assets/weddings/sarka-jakub/5.jpg",
      "/assets/weddings/sarka-jakub/6.jpg",
    ],
    photographerName: "Martin Menšík",
    photographerGender: "male",
    coordinatedByAgency: true,
  },
  {
    id: "lucie-martin",
    slugs: {
      cs: "lucie-martin-na-kmine",
      en: "lucie-martin-na-kmine",
    },
    coupleNames: {
      cs: "Lucie & Martin",
      en: "Lucie & Martin",
    },
    location: {
      cs: "Na Kmíně",
      en: "Na Kmíně",
    },
    thumbnailImage: "/assets/weddings/lucie-martin/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/lucie-martin/1.jpg",
      "/assets/weddings/lucie-martin/2.jpg",
      "/assets/weddings/lucie-martin/3.jpg",
      "/assets/weddings/lucie-martin/4.jpg",
      "/assets/weddings/lucie-martin/5.jpg",
      "/assets/weddings/lucie-martin/6.jpg",
      "/assets/weddings/lucie-martin/7.jpg",
      "/assets/weddings/lucie-martin/8.jpg",
      "/assets/weddings/lucie-martin/9.jpg",
      "/assets/weddings/lucie-martin/10.jpg",
      "/assets/weddings/lucie-martin/11.jpg",
      "/assets/weddings/lucie-martin/12.jpg",
    ],
    photographerName: "Eva Klobouček",
    photographerGender: "female",
    coordinatedByAgency: true,
    review: {
      cs: "Postupně zpracováváme celý ten krásný den a shodli jsme se na tom, že to byl opravdu jeden z nejkrásnějších dnů našeho života a nepochybně v obrovské míře i díky Vám a za to Vám chceme ze srdce ještě jednou velmi poděkovat. Jste absolutní profesionálka, jde z Vás dokonalý klid a řád. Jsme nadšeni, že jsme mohli tento den strávit právě s Vámi.",
      en: "We are gradually processing that beautiful day and agreed that it was truly one of the most beautiful days of our lives, undoubtedly to a great extent thanks to you, and for that we want to thank you from the bottom of our hearts once again. You are an absolute professional, perfect calm and order emanate from you. We are thrilled that we could spend this day with you.",
    },
  },
  {
    id: "martina-david",
    slugs: {
      cs: "martina-david-na-kmine",
      en: "martina-david-na-kmine",
    },
    coupleNames: {
      cs: "Martina & David",
      en: "Martina & David",
    },
    location: {
      cs: "Na Kmíně",
      en: "Na Kmíně",
    },
    thumbnailImage: "/assets/weddings/martina-david/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/martina-david/1.jpg",
      "/assets/weddings/martina-david/2.jpg",
      "/assets/weddings/martina-david/3.jpg",
      "/assets/weddings/martina-david/4.jpg",
      "/assets/weddings/martina-david/5.jpg",
      "/assets/weddings/martina-david/6.jpg",
      "/assets/weddings/martina-david/7.jpg",
      "/assets/weddings/martina-david/8.jpg",
      "/assets/weddings/martina-david/9.jpg",
      "/assets/weddings/martina-david/10.jpg",
    ],
    photographerName: "Miroslav Belančin",
    photographerGender: "male",
    coordinatedByAgency: true,
  },
  {
    id: "tereza-tomas",
    slugs: {
      cs: "tereza-tomas-winternitzova-vila",
      en: "tereza-tomas-winternitz-villa",
    },
    coupleNames: {
      cs: "Tereza & Tomáš",
      en: "Tereza & Tomáš",
    },
    location: {
      cs: "Winternitzova vila",
      en: "Winternitz Villa",
    },
    thumbnailImage: "/assets/weddings/tereza-tomas/thumbnail.jpg",
    galleryImages: [
      "/assets/weddings/tereza-tomas/1.jpg",
      "/assets/weddings/tereza-tomas/2.jpg",
      "/assets/weddings/tereza-tomas/3.jpg",
      "/assets/weddings/tereza-tomas/4.jpg",
      "/assets/weddings/tereza-tomas/5.jpg",
      "/assets/weddings/tereza-tomas/6.jpg",
      "/assets/weddings/tereza-tomas/7.jpg",
      "/assets/weddings/tereza-tomas/8.jpg",
      "/assets/weddings/tereza-tomas/9.png",
    ],
    photographerName: "Michaela Sonntagová",
    photographerGender: "female",
    coordinatedByAgency: true,
    review: {
      cs: "Tereza se svým týmem působili naprosto profesionálně, ale zároveň s lehkostí a lidským přístupem, díky kterému jsme se cítili klidně a uvolněně. Vše měli perfektně zorganizované, každý detail byl dotažený, a my jsme si díky nim mohli náš den opravdu užít bez stresu. Lepší koordinaci jsme si nemohli přát. Moc děkujeme!",
      en: "Tereza and her team were completely professional, yet with an ease and human approach that made us feel calm and relaxed. Everything was perfectly organized, every detail was perfect, and thanks to them we could truly enjoy our day without stress. We couldn't have asked for better coordination. Thank you so much!",
    },
  },
  {
    id: "veronika-radim",
    slugs: {
      cs: "veronika-radim-maly-oslov-glamping",
      en: "veronika-radim-small-oslov-glamping",
    },
    coupleNames: {
      cs: "Veronika & Radim",
      en: "Veronika & Radim",
    },
    location: {
      cs: "Malý Oslov Glamping",
      en: "Small Oslov Glamping",
    },
    thumbnailImage: "/assets/weddings/veronika-radim/thumbnail.png",
    galleryImages: [
      "/assets/weddings/veronika-radim/1.png",
      "/assets/weddings/veronika-radim/2.png",
      "/assets/weddings/veronika-radim/3.png",
      "/assets/weddings/veronika-radim/4.png",
      "/assets/weddings/veronika-radim/5.png",
      "/assets/weddings/veronika-radim/6.png",
      "/assets/weddings/veronika-radim/7.png",
      "/assets/weddings/veronika-radim/8.png",
      "/assets/weddings/veronika-radim/9.png",
      "/assets/weddings/veronika-radim/10.png",
    ],
    photographerName: "Vladislav Surmaj",
    photographerGender: "male",
    coordinatedByAgency: true,
  },
  {
    id: "martina-kuba",
    slugs: {
      cs: "martina-kuba-zamek-ctenice",
      en: "martina-kuba-ctenice-castle",
    },
    coupleNames: {
      cs: "Martina & Kuba",
      en: "Martina & Kuba",
    },
    location: {
      cs: "Zámek Ctěnice",
      en: "Ctěnice Castle",
    },
    thumbnailImage: "/assets/weddings/martina-kuba/thumbnail.png",
    galleryImages: [
      "/assets/weddings/martina-kuba/1.png",
      "/assets/weddings/martina-kuba/2.png",
      "/assets/weddings/martina-kuba/3.png",
      "/assets/weddings/martina-kuba/4.png",
      "/assets/weddings/martina-kuba/5.png",
      "/assets/weddings/martina-kuba/6.png",
    ],
    photographerName: "Ladislav Pejchar",
    photographerGender: "male",
    coordinatedByAgency: false,
  },
];

/**
 * Get wedding by slug (checks both cs and en slugs)
 */
export function getWeddingBySlug(slug: string): Wedding | undefined {
  return WEDDINGS.find((w) => w.slugs.cs === slug || w.slugs.en === slug);
}

/**
 * Get all wedding slugs for static generation
 */
export function getAllWeddingSlugs(): string[] {
  return WEDDINGS.flatMap((w) => [w.slugs.cs, w.slugs.en]);
}

/**
 * Get wedding list for export
 */
export const WEDDING_LIST = WEDDINGS;
