import { Metadata } from "next";

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
    },
  };
}
