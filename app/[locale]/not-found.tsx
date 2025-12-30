"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "cs";

  useEffect(() => {
    // Redirect to locale homepage immediately
    router.push(`/${locale}`);
  }, [router, locale]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-1 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === "en"
            ? "Redirecting to homepage..."
            : "Přesměrování na úvodní stránku..."}
        </h1>
        <p className="text-gray-600">
          {locale === "en" ? "Page not found." : "Stránka nebyla nalezena."}
        </p>
      </div>
    </div>
  );
}
