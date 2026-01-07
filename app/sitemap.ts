import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { PRODUCTS } from "@/lib/products";
import { WEDDING_LIST } from "@/lib/weddings";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://svatebnipribehy.com";

  const staticRoutes = [
    "",
    `/${routes.about.cs}`,
    `/${routes.aboutMe.cs}`,
    `/${routes.contact.cs}`,
    `/${routes.products.cs}`,
    `/${routes.gallery.cs}`,
    `/${routes.privacy.cs}`,
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add all locale combinations for static routes
  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
      });
    }

    // Add product pages
    for (const product of Object.values(PRODUCTS)) {
      sitemap.push({
        url: `${baseUrl}/${locale}/${routes.products[locale]}/${
          product.slugs[locale as keyof typeof product.slugs]
        }`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
      });
    }

    // Add gallery pages
    for (const wedding of WEDDING_LIST) {
      sitemap.push({
        url: `${baseUrl}/${locale}/${routes.gallery[locale]}/${
          wedding.slugs[locale as keyof typeof wedding.slugs]
        }`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return sitemap;
}
