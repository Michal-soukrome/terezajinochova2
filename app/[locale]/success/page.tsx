"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import TranslatedLink from "@/components/TranslatedLink";
import { isValidLocale, defaultLocale, Locale } from "@/lib/i18n";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email: string;
  customer_details?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  shipping_details?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
  // Minimal shape to render line items safely
  line_items: Array<{
    description?: string;
    quantity?: number;
    amount_total?: number;
  }>;
  created: number;
}

export const dynamic = "force-dynamic";

// `success` is a client component and cannot export server-only metadata.
// If you want OG tags for this page, add them from a parent server layout or
// convert the page to a server component.

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const localeFromPath = pathname?.split("/").filter(Boolean)[0];
  const locale: Locale = isValidLocale(localeFromPath)
    ? localeFromPath
    : defaultLocale;

  useEffect(() => {
    if (sessionId) {
      fetch(`${window.location.origin}/api/session/${sessionId}`)
        .then((res) => {
          if (!res.ok) {
            // Handle HTTP errors (404, 500, etc.)
            return res.json().then((errorData) => {
              // Provide more user-friendly error messages
              if (res.status === 404) {
                throw new Error(
                  locale === "cs"
                    ? "Platba nebyla nalezena nebo vypršela. Zkuste to znovu nebo kontaktujte podporu."
                    : "Payment session not found or expired. Please try again or contact support."
                );
              } else if (res.status === 400) {
                throw new Error(
                  locale === "cs"
                    ? "Platba nebyla dokončena. Zkontrolujte svůj email pro další instrukce."
                    : "Payment was not completed. Check your email for further instructions."
                );
              } else {
                throw new Error(
                  errorData.error || `HTTP ${res.status}: ${res.statusText}`
                );
              }
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log("Session data:", data); // Debug shipping details
          setSessionData(data);
        })
        .catch((err) => {
          console.error("Error fetching session:", err);
          setError(err.message || "Failed to load receipt details");
        })
        .finally(() => setLoading(false));
    } else {
      // Avoid calling setState synchronously in effect body
      const id = setTimeout(() => {
        setError("No session ID provided");
        setLoading(false);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [sessionId]);

  const handleExport = () => {
    window.print(); // Simple print functionality
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString(
      locale === "cs" ? "cs-CZ" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {locale === "cs" ? "Načítání údajů..." : "Loading details..."}
          </h2>
          <p className="text-gray-500">
            {locale === "cs"
              ? "Prosím počkejte, zatímco připravujeme váš účtenku"
              : "Please wait while we prepare your receipt"}
          </p>
        </div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {locale === "cs" ? "Chyba" : "Error"}
          </h1>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {error ||
              (locale === "cs"
                ? "Nelze načíst údaje o platbě. Platba mohla být dokončena, ale odkaz vypršel. Zkontrolujte prosím svůj email pro potvrzení."
                : "Unable to load payment details. The payment may have been completed, but the link has expired. Please check your email for confirmation.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TranslatedLink
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {locale === "cs" ? "Zpět k produktům" : "Back to Products"}
            </TranslatedLink>
            <TranslatedLink
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {locale === "cs"
                ? "Zpět na domovskou stránku"
                : "Back to Homepage"}
            </TranslatedLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-linear-to-r from-green-500 to-green-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {locale === "cs"
                      ? "Platba proběhla úspěšně!"
                      : "Payment Successful!"}
                  </h1>
                  <p className="text-green-100 mt-1">
                    {locale === "cs"
                      ? "Vaše objednávka byla přijata a bude zpracována"
                      : "Your order has been received and will be processed"}
                  </p>
                </div>
              </div>
              <div className="text-right text-white">
                <p className="text-sm opacity-90">
                  {locale === "cs" ? "Číslo objednávky" : "Order Number"}
                </p>
                <p className="font-mono font-semibold">
                  #{sessionData.id.slice(-8)}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-8 py-6 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {locale === "cs" ? "Datum objednávky" : "Order Date"}
                </p>
                <p className="font-medium">{formatDate(sessionData.created)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {locale === "cs" ? "Celková částka" : "Total Amount"}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    sessionData.amount_total,
                    sessionData.currency
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer & Shipping Information */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {locale === "cs"
                    ? "Informace o zákazníkovi"
                    : "Customer Information"}
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {locale === "cs" ? "Jméno:" : "Name:"}
                  </span>
                  <span className="font-medium">
                    {sessionData.customer_details?.name ||
                      sessionData.shipping_details?.name ||
                      "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">
                    {sessionData.customer_email}
                  </span>
                </div>
                {sessionData.customer_details?.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {locale === "cs" ? "Telefon:" : "Phone:"}
                    </span>
                    <span className="font-medium">
                      {sessionData.customer_details.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Information */}
            {(sessionData.shipping_details?.address ||
              (sessionData as any).shipping?.address) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {locale === "cs" ? "Dodací adresa" : "Shipping Address"}
                  </h2>
                </div>
                <div className="space-y-2">
                  {(sessionData.shipping_details?.name ||
                    (sessionData as any).shipping?.name) && (
                    <p className="font-medium">
                      {sessionData.shipping_details?.name ||
                        (sessionData as any).shipping?.name}
                    </p>
                  )}
                  <div className="text-gray-700">
                    {(sessionData.shipping_details?.address?.line1 ||
                      (sessionData as any).shipping?.address?.line1) && (
                      <p>
                        {sessionData.shipping_details?.address?.line1 ||
                          (sessionData as any).shipping?.address?.line1}
                      </p>
                    )}
                    {(sessionData.shipping_details?.address?.line2 ||
                      (sessionData as any).shipping?.address?.line2) && (
                      <p>
                        {sessionData.shipping_details?.address?.line2 ||
                          (sessionData as any).shipping?.address?.line2}
                      </p>
                    )}
                    {(sessionData.shipping_details?.address?.city ||
                      sessionData.shipping_details?.address?.postal_code ||
                      (sessionData as any).shipping?.address?.city ||
                      (sessionData as any).shipping?.address?.postal_code) && (
                      <p>
                        {sessionData.shipping_details?.address?.city ||
                          (sessionData as any).shipping?.address?.city}
                        {(sessionData.shipping_details?.address?.city ||
                          (sessionData as any).shipping?.address?.city) &&
                          (sessionData.shipping_details?.address?.postal_code ||
                            (sessionData as any).shipping?.address
                              ?.postal_code) &&
                          ", "}
                        {sessionData.shipping_details?.address?.postal_code ||
                          (sessionData as any).shipping?.address?.postal_code}
                      </p>
                    )}
                    {(sessionData.shipping_details?.address?.country ||
                      (sessionData as any).shipping?.address?.country) && (
                      <p>
                        {sessionData.shipping_details?.address?.country ||
                          (sessionData as any).shipping?.address?.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Details & Actions */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {locale === "cs" ? "Detail objednávky" : "Order Details"}
                </h2>
              </div>
              <div className="space-y-4">
                {sessionData.line_items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        {locale === "cs" ? "Množství:" : "Quantity:"}{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(
                        item.amount_total ?? 0,
                        sessionData.currency
                      )}
                    </p>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{locale === "cs" ? "Celkem:" : "Total:"}</span>
                    <span className="text-green-600">
                      {formatCurrency(
                        sessionData.amount_total,
                        sessionData.currency
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {locale === "cs" ? "Stav platby" : "Payment Status"}
                </h2>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-green-800 font-medium capitalize">
                    {sessionData.payment_status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-green-700 text-sm mt-2">
                  {locale === "cs"
                    ? "Vaše platba byla úspěšně zpracována"
                    : "Your payment has been successfully processed"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {locale === "cs" ? "Akce" : "Actions"}
              </h2>
              <div className="space-y-3">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="w-full flex items-center justify-center px-6 py-3 border-2 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {locale === "cs" ? "Exportovat účtenku" : "Export Receipt"}
                </Button>
                <TranslatedLink href="/" className="block">
                  <Button
                    variant="primary"
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {locale === "cs"
                      ? "Zpět na domovskou stránku"
                      : "Back to Homepage"}
                  </Button>
                </TranslatedLink>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === "cs" ? "Potřebujete pomoc?" : "Need Help?"}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            {locale === "cs"
              ? "Máte otázky ohledně vaší objednávky? Kontaktujte nás na email@example.com"
              : "Have questions about your order? Contact us at email@example.com"}
          </p>
          <TranslatedLink
            href="/contact"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {locale === "cs" ? "Kontaktovat podporu" : "Contact Support"}
          </TranslatedLink>
        </div>
      </div>
    </div>
  );
}

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
