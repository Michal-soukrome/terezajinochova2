import { Metadata } from "next";
import { locales } from "@/lib/i18n";

export function generatePageMetadata(
  locale: string,
  page: string,
  titleCs: string,
  titleEn: string,
  descCs: string,
  descEn: string,
  siteName: string = "svatební deník"
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${siteUrl}/${locale}/${page}`;
  const title = locale === "cs" ? titleCs : titleEn;
  const description = locale === "cs" ? descCs : descEn;

  // Generate alternate language links
  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    alternates[loc] = `${siteUrl}/${loc}/${page}`;
  });

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "cs" ? "cs_CZ" : "en_US",
    },
  };
}
