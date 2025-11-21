"use client";

import { motion } from "framer-motion";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  payment_method?: string | null;
  // Minimal shape to render line items safely
  line_items: Array<{
    description?: string;
    quantity?: number;
    amount_total?: number;
  }>;
  created: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function SuccessContent() {
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
        setError("Žádné ID relace nebylo poskytnuto.");
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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-linear-to-b from-amber-50/30 via-white to-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100  rounded-full mb-6">
              <svg
                className="w-5 h-5 text-amber-600 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="text-sm font-semibold text-amber-900">
                {locale === "cs" ? "Načítání údajů..." : "Loading details..."}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-deluxe leading-tight">
              {locale === "cs"
                ? "Zpracováváme vaši objednávku"
                : "Processing Your Order"}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {locale === "cs"
                ? "Prosím počkejte, zatímco připravujeme váš účtenku"
                : "Please wait while we prepare your receipt"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (error || !sessionData) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-linear-to-b from-amber-50/30 via-white to-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-200 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-red-600"
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
              <span className="text-sm font-semibold text-red-900">
                {locale === "cs" ? "Chyba" : "Error"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-deluxe leading-tight">
              {locale === "cs"
                ? "Nelze načíst údaje o platbě"
                : "Unable to Load Payment Details"}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
              {error ||
                (locale === "cs"
                  ? "Platba mohla být dokončena, ale odkaz vypršel. Zkontrolujte prosím svůj email pro potvrzení."
                  : "The payment may have been completed, but the link has expired. Please check your email for confirmation.")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <TranslatedLink
                href="/products"
                className="btn btn-primary"
                title={
                  locale === "cs"
                    ? "Přejít na stránku produktů"
                    : "Go to products page"
                }
              >
                {locale === "cs" ? "Zpět k produktům" : "Back to Products"}
              </TranslatedLink>

              <TranslatedLink
                href="/"
                className="btn btn-secondary"
                title={
                  locale === "cs"
                    ? "Přejít na domovskou stránku"
                    : "Go to homepage"
                }
              >
                {locale === "cs" ? "Domovská stránka" : "Homepage"}
              </TranslatedLink>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-linear-to-b from-amber-50/30 via-white to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <motion.div
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full mb-6">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-semibold text-green-900">
              {locale === "cs" ? "Platba úspěšná" : "Payment Successful"}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-deluxe leading-tight">
            {locale === "cs"
              ? "Děkujeme za vaši objednávku!"
              : "Thank You for Your Order!"}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            {locale === "cs"
              ? "Vaše objednávka byla přijata a bude zpracována. Účtenku najdete níže."
              : "Your order has been received and will be processed. Find your receipt below."}
          </p>

          <div className="bg-amber-800/2 rounded p-6 shadow inline-block">
            <div className="flex items-center justify-between gap-8">
              <div className="text-left">
                <p className="text-sm text-gray-600 mb-1">
                  {locale === "cs" ? "Číslo objednávky" : "Order Number"}
                </p>
                <p className="font-mono font-bold text-lg text-gray-900">
                  #{sessionData.id.slice(-8)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">
                  {locale === "cs" ? "Datum objednávky" : "Order Date"}
                </p>
                <p className="font-medium text-gray-900">
                  {formatDate(sessionData.created)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Customer Information */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-800/2 rounded p-8 shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-amber-600"
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
              <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
                {locale === "cs"
                  ? "Informace o zákazníkovi"
                  : "Customer Information"}
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">
                  {locale === "cs" ? "Jméno:" : "Name:"}
                </span>
                <span className="font-semibold text-gray-900">
                  {sessionData.customer_details?.name ||
                    sessionData.shipping_details?.name ||
                    "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="font-semibold text-gray-900">
                  {sessionData.customer_email}
                </span>
              </div>
              {sessionData.customer_details?.phone && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    {locale === "cs" ? "Telefon:" : "Phone:"}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {sessionData.customer_details.phone}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-800/2 rounded p-8 shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-amber-600"
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
              <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
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
                    <p className="font-semibold text-gray-900">
                      {item.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {locale === "cs" ? "Množství:" : "Quantity:"}{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-amber-600">
                    {formatCurrency(
                      item.amount_total ?? 0,
                      sessionData.currency
                    )}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    {locale === "cs" ? "Celkem:" : "Total:"}
                  </span>
                  <span className="text-2xl font-bold text-amber-600">
                    {formatCurrency(
                      sessionData.amount_total,
                      sessionData.currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Delivery & Payment Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Delivery Information */}
          {(sessionData.shipping_details?.address ||
            (sessionData as any).shipping?.address) && (
            <motion.div
              variants={itemVariants}
              className="bg-amber-800/2 border rounded p-8 shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-amber-600"
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
                <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
                  {locale === "cs"
                    ? "Dodací informace"
                    : "Delivery Information"}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-800/10 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-amber-600 mr-2"
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
                    <span className="font-semibold text-amber-900">
                      {locale === "cs"
                        ? "Standardní dodání"
                        : "Standard Delivery"}
                    </span>
                  </div>
                  <p className="text-amber-800 text-sm">
                    {locale === "cs"
                      ? "Vaše objednávka bude doručena během 3-5 pracovních dnů"
                      : "Your order will be delivered within 3-5 business days"}
                  </p>
                </div>

                {(sessionData.shipping_details?.name ||
                  (sessionData as any).shipping?.name) && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === "cs" ? "Dodací adresa" : "Shipping Address"}
                    </h3>
                    <div className="text-gray-700 text-sm space-y-1">
                      {(sessionData.shipping_details?.name ||
                        (sessionData as any).shipping?.name) && (
                        <p className="font-medium">
                          {sessionData.shipping_details?.name ||
                            (sessionData as any).shipping?.name}
                        </p>
                      )}
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
                        (sessionData as any).shipping?.address
                          ?.postal_code) && (
                        <p>
                          {sessionData.shipping_details?.address?.city ||
                            (sessionData as any).shipping?.address?.city}
                          {(sessionData.shipping_details?.address?.city ||
                            (sessionData as any).shipping?.address?.city) &&
                            (sessionData.shipping_details?.address
                              ?.postal_code ||
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
                )}
              </div>
            </motion.div>
          )}

          {/* Payment Method */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-800/2 rounded p-8 shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
                {locale === "cs" ? "Způsob platby" : "Payment Method"}
              </h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-green-800 font-semibold text-lg capitalize">
                    {sessionData.payment_method
                      ? sessionData.payment_method.replace("_", " ")
                      : locale === "cs"
                      ? "Kreditní karta"
                      : "Credit Card"}
                  </span>
                  <p className="text-green-700 text-sm">
                    {locale === "cs"
                      ? "Platba byla úspěšně zpracována"
                      : "Payment was successfully processed"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Payment Status & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Payment Status */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-800/2  rounded p-8 shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
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
              <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
                {locale === "cs" ? "Stav platby" : "Payment Status"}
              </h2>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-800 font-semibold text-lg capitalize">
                  {sessionData.payment_status.replace("_", " ")}
                </span>
              </div>
              <p className="text-green-700 text-base">
                {locale === "cs"
                  ? "Vaše platba byla úspěšně zpracována"
                  : "Your payment has been successfully processed"}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-800/2  rounded p-8 shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-deluxe">
                {locale === "cs" ? "Akce" : "Actions"}
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleExport}
                variant="outline"
                className="btn btn-secondary"
              >
                {locale === "cs" ? "Vytisknout rekapitulaci" : "Print Receipt"}
              </Button>
              <TranslatedLink href="/" className="block">
                <Button variant="primary" className="btn btn-primary">
                  {locale === "cs"
                    ? "Zpět na domovskou stránku"
                    : "Back to Homepage"}
                </Button>
              </TranslatedLink>
            </div>
          </motion.div>
        </div>

        {/* Footer Message */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-amber-800/2  rounded shadow p-8 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-amber-600"
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
            </div>
            <h3 className="text-2xl font-bold text-gray-900 font-deluxe">
              {locale === "cs" ? "Potřebujete pomoc?" : "Need Help?"}
            </h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            {locale === "cs"
              ? "Máte otázky ohledně vaší objednávky? Kontaktujte nás na email@example.com"
              : "Have questions about your order? Contact us at email@example.com"}
          </p>
          <TranslatedLink
            href="/contact"
            className="btn btn-secondary"
            title={
              locale === "cs"
                ? "Přejít na kontaktní stránku"
                : "Go to contact page"
            }
          >
            {locale === "cs" ? "Kontaktovat podporu" : "Contact Support"}
          </TranslatedLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
