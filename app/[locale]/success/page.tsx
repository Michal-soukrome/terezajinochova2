"use client";

import { Suspense } from "react";
import SuccessContent from "@/components/sections";

export const dynamic = "force-dynamic";

// `success` is a client component and cannot export server-only metadata.
// If you want OG tags for this page, add them from a parent server layout or
// convert the page to a server component.

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Loading...
                </h2>
                <p className="text-gray-500">
                  Please wait while we prepare your receipt
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
