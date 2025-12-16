import type { Metadata } from "next";
import "./globals.css";
import { BackToTop } from "@/components/layout";

export const metadata: Metadata = {
  title: "Svatební deník | Plánovačka svateb od zásnub až k oltáři",
  description:
    "Elegantní svatební deník pro organizaci svatby od A do Z. Praktický pomocník s prostorem pro poznámky, rozpočet, harmonogram a vzpomínky. Od zásnub až k oltáři.",
  keywords: [
    "svatební deník",
    "plánovačka svateb",
    "svatební organizace",
    "wedding planner",
    "svatební deník A5",
    "rozpočet svatby",
    "harmonogram svatby",
  ],
  authors: [{ name: "Tereza Jinochová" }],
  creator: "Tereza Jinochová",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Svatební deník | Plánovačka svateb od zásnub až k oltáři",
    description:
      "Elegantní svatební deník pro organizaci svatby od A do Z. Praktický pomocník s prostorem pro poznámky, rozpočet, harmonogram a vzpomínky.",
    type: "website",
    siteName: "Svatební deník",
    locale: "cs_CZ",
    images: [
      {
        url: "/assets/wedding-diary-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Svatební deník - plánovačka svateb",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Svatební deník | Plánovačka svateb",
    description: "Elegantní svatební deník pro organizaci svatby od A do Z",
    images: ["/assets/wedding-diary-preview.jpg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
    name: "Svatební deník",
    description:
      "Elegantní svatební deník pro organizaci svatby od zásnub až k oltáři. Praktický pomocník s prostorem pro poznámky, rozpočet, harmonogram a vzpomínky.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/assets/logo.png`,
    founder: {
      "@type": "Person",
      name: "Tereza Jinochová",
      description:
        "Po studiu vysoké školy jsem byla přesvědčená, že mě práce s dětmi bude naplňovat. Osud a má povaha se mnou měly ale jiné plány. Do světa svateb jsem se dostala díky své dlouholeté vášni ke společenskému tanci.",
    },
    offers: {
      "@type": "Product",
      name: "Svatební deník A5",
      description:
        "Svatební deník ve velikosti A5 a s rozsáhlým obsahem (195 stran) vznikl s láskou k detailu a pochopením potřeb každé budoucí nevěsty.",
      category: "Wedding Planning Tools",
    },
    sameAs: [
      // Add social media URLs here when available
    ],
  };

  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="antialiased safe-area-y">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
