"use client";

import { motion } from "framer-motion";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";
import TranslatedLink from "../navigation/TranslatedLink";
import { isValidLocale, defaultLocale, Locale } from "@/lib/i18n";
import { clearReferral } from "@/lib/referral-tracking";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email: string;
  payment_intent?: string;
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
  metadata?: {
    packeta_point_id?: string;
    packeta_point_name?: string;
    packeta_point_address?: string;
    delivery_method?: string;
  };
  shipping_cost?: number;
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
                    : "Payment session not found or expired. Please try again or contact support.",
                );
              } else if (res.status === 400) {
                throw new Error(
                  locale === "cs"
                    ? "Platba nebyla dokončena. Zkontrolujte svůj email pro další instrukce."
                    : "Payment was not completed. Check your email for further instructions.",
                );
              } else {
                throw new Error(
                  errorData.error || `HTTP ${res.status}: ${res.statusText}`,
                );
              }
            });
          }
          return res.json();
        })
        .then((data) => {
          setSessionData(data);
          // Clear referral data after successful purchase
          clearReferral();
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
      },
    );
  };

  if (loading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-linear-to-b from-accent-1 via-white to-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-1 rounded-full mb-6">
              <svg
                className="w-5 h-5 text-accent-1-contrast animate-spin"
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
              <span className="text-sm font-semibold text-accent-1-contrast">
                {locale === "cs" ? "Načítání údajů..." : "Loading details..."}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
              {locale === "cs"
                ? "Zpracováváme vaši objednávku"
                : "Processing Your Order"}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              {locale === "cs"
                ? "Prosím počkejte, zatímco připravujeme vaší účtenku"
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
        className="min-h-screen bg-linear-to-b from-accent-1 via-white to-white"
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

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading leading-tight">
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
      className="min-h-screen bg-gray-50 py-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
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

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
            {locale === "cs"
              ? "Děkuji za vaši objednávku!"
              : "Thank You for Your Order!"}
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            {locale === "cs"
              ? "Potvrzení bylo odesláno na váš email."
              : "A confirmation has been sent to your email."}
          </p>

          <div className="inline-block bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">
              {locale === "cs" ? "Reference objednávky" : "Order reference"}
            </p>
            <p className="font-mono font-bold text-xl text-gray-900">
              #{sessionData.payment_intent || sessionData.id.slice(-8)}
            </p>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {locale === "cs" ? "Souhrn objednávky" : "Order Summary"}
          </h3>

          <div className="space-y-3 mb-4">
            {sessionData.line_items?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {locale === "cs" ? "Množství:" : "Quantity:"}{" "}
                    {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  {formatCurrency(item.amount_total ?? 0, sessionData.currency)}
                </p>
              </div>
            ))}

            {sessionData.shipping_cost && sessionData.shipping_cost > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-900">
                  {locale === "cs" ? "Doprava" : "Shipping"}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(
                    sessionData.shipping_cost,
                    sessionData.currency,
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">
              {locale === "cs" ? "Celkem" : "Total"}
            </span>
            <span className="text-2xl font-bold text-accent-1-contrast">
              {formatCurrency(sessionData.amount_total, sessionData.currency)}
            </span>
          </div>
        </motion.div>

        {/* Customer & Delivery Info */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {locale === "cs" ? "Kontaktní údaje" : "Contact Details"}
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                {locale === "cs" ? "Email" : "Email"}
              </span>
              <span className="font-medium text-gray-900">
                {sessionData.customer_email}
              </span>
            </div>

            {sessionData.customer_details?.name && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">
                  {locale === "cs" ? "Jméno" : "Name"}
                </span>
                <span className="font-medium text-gray-900">
                  {sessionData.customer_details.name}
                </span>
              </div>
            )}

            {sessionData.customer_details?.phone && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">
                  {locale === "cs" ? "Telefon" : "Phone"}
                </span>
                <span className="font-medium text-gray-900">
                  {sessionData.customer_details.phone}
                </span>
              </div>
            )}

            {(sessionData.metadata?.delivery_method === "packeta_pickup" ||
              sessionData.shipping_details?.address ||
              (sessionData as any).shipping?.address) && (
              <div className="py-2">
                <p className="text-gray-600 mb-2">
                  {sessionData.metadata?.delivery_method === "packeta_pickup"
                    ? locale === "cs"
                      ? "Výdejní místo Zásilkovna"
                      : "Packeta Pickup Point"
                    : locale === "cs"
                      ? "Dodací adresa"
                      : "Shipping Address"}
                </p>
                {sessionData.metadata?.packeta_point_name ? (
                  <div className="text-gray-900 text-sm space-y-1 ">
                    <p className="font-medium flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {sessionData.metadata.packeta_point_name}
                    </p>
                    <p className="text-gray-700">
                      {sessionData.metadata.packeta_point_address}
                    </p>
                    <p className="text-xs text-gray-500">
                      ID: {sessionData.metadata.packeta_point_id}
                    </p>
                  </div>
                ) : (
                  <div className="text-gray-900 text-sm space-y-1">
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
                      (sessionData as any).shipping?.address?.city) && (
                      <p>
                        {sessionData.shipping_details?.address?.city ||
                          (sessionData as any).shipping?.address?.city}
                        {(sessionData.shipping_details?.address?.postal_code ||
                          (sessionData as any).shipping?.address
                            ?.postal_code) &&
                          `, ${
                            sessionData.shipping_details?.address
                              ?.postal_code ||
                            (sessionData as any).shipping?.address?.postal_code
                          }`}
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
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button
            onClick={handleExport}
            variant="outline"
            className="btn btn-secondary"
          >
            {locale === "cs" ? "Vytisknout" : "Print Receipt"}
          </Button>
          <TranslatedLink href="/">
            <Button variant="primary" className="btn btn-primary">
              {locale === "cs" ? "Zpět na úvodní stránku" : "Back to Homepage"}
            </Button>
          </TranslatedLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
