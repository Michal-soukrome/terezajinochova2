import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "@/components/layout";

export const metadata: Metadata = {
  title:
    "Svatební deník | Naplánujte si svůj svatební den s lehkostí a radostí",
  description:
    "Plánování svatby je krásná, ale zároveň náročná cesta. Svatební deník vám pomůže udržet přehled, zachytit důležité okamžiky a projít celými přípravami s lehkostí a radostí.",
  keywords: [
    "svatební deník",
    "svatební organizace",
    "wedding planner",

    "rozpočet svatby",
    "harmonogram svatby",
  ],
  authors: [{ name: "Tereza Jinochová" }],
  creator: "Tereza Jinochová",
  metadataBase: new URL("https://svatebnipribehy.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/assets/favicon/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/assets/favicon/favicon/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        url: "/assets/favicon/favicon/favicon-32x32.png",
        sizes: "32x32",
      },
    ],
    apple: "/assets/favicon/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title:
      "Svatební deník | Naplánujte si svůj svatební den s lehkostí a radostí",
    description:
      "Plánování svatby je krásná, ale zároveň náročná cesta. Svatební deník vám pomůže udržet přehled, zachytit důležité okamžiky a projít celými přípravami s lehkostí a radostí.",
    type: "website",
    siteName: "Svatební příběhy",
    locale: "cs_CZ",
    images: [
      {
        url: "/assets/wedding-diary-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Svatební deník - naplánujte si svůj svatební den s lehkostí a radostí",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Svatební deník | Naplánujte si svůj svatební den s lehkostí a radostí",
    description:
      "Plánování svatby je krásná, ale zároveň náročná cesta. Svatební deník vám pomůže udržet přehled, zachytit důležité okamžiky a projít celými přípravami s lehkostí a radostí.",
    images: ["/assets/wedding-diary-preview.jpg"],
  },
  alternates: {
    canonical: "https://svatebnipribehy.com",
    languages: {
      cs: "https://svatebnipribehy.com/cs",
      en: "https://svatebnipribehy.com/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Svatební příběhy",
    description:
      "Elegantní svatební deník pro organizaci svatby od A do Z. Praktický pomocník s prostorem pro poznámky, rozpočet, harmonogram a vzpomínky.",
    url: "https://svatebnipribehy.com",
    logo: "https://svatebnipribehy.com/assets/logo/01-2026/logo1.webp",
    founder: {
      "@type": "Person",
      name: "Tereza Jinochová",
      description:
        "Po studiu vysoké školy jsem byla přesvědčená, že mě práce s dětmi bude naplňovat. Osud a má povaha se mnou měly ale jiné plány. Do světa svateb jsem se dostala díky své dlouholeté vášni ke společenskému tanci.",
    },
    offers: {
      "@type": "Product",
      name: "Svatební deník",
      description:
        "Svatební deník s rozsáhlým obsahem vznikl s láskou k detailu a pochopením potřeb každé budoucí nevěsty.",
      category: "Wedding Planning Tools",
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };

  return (
    <html suppressHydrationWarning className="overflow-x-hidden">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PWGSH24M');
            `,
          }}
        />
        {/* Packeta Widget */}
        <script src="https://widget.packeta.com/v6/www/js/library.js" async />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased safe-area-y overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PWGSH24M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
