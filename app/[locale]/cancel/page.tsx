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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {locale === "cs" ? "Platba zrušena" : "Payment cancelled"}
        </h1>
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
          <TranslatedLink
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {locale === "cs" ? "Zpět na domovskou stránku" : "Back to homepage"}
          </TranslatedLink>

          <TranslatedLink
            href="/products"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
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
