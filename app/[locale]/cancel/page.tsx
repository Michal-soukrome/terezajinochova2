"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { Suspense } from "react";
import TranslatedLink from "@/components/TranslatedLink";
import { isValidLocale, defaultLocale, Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

function CancelContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const pathname = usePathname();
  const localeFromPath = pathname?.split("/").filter(Boolean)[0];
  const locale: Locale = isValidLocale(localeFromPath)
    ? localeFromPath
    : defaultLocale;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === "cs" ? "Platba zrušena" : "Payment cancelled"}
        </h3>
        <p className="text-gray-700">
          {locale === "cs"
            ? "Platba byla zrušena. Pokud jste omylem přerušili platbu, můžete zkusit nákup znovu nebo se vrátit na hlavní stránku."
            : "The payment was cancelled. If you interrupted the checkout by mistake, you can try buying again or return to the homepage."}
        </p>
        {sessionId && (
          <p className="text-sm text-gray-500 mt-4">
            {locale === "cs" ? "ID relace:" : "Session ID:"} {sessionId}
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <TranslatedLink href="/" className="btn btn-primary px-6 py-3">
            {locale === "cs" ? "Zpět na úvodní stránku" : "Back to homepage"}
          </TranslatedLink>

          <TranslatedLink
            href="/products"
            className="btn btn-secondary px-6 py-3"
          >
            {locale === "cs" ? "Zobrazit produkty" : "View products"}
          </TranslatedLink>
        </div>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelContent />
    </Suspense>
  );
}

// `cancel` is a client component and cannot export server-only metadata.
// If you want OG tags for this page, add them from a parent server layout or
// convert the page to a server component.
