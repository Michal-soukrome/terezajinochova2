"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { isValidLocale, defaultLocale, Locale } from "@/lib/i18n";

interface SessionData {
  id: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_email: string;
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
      fetch(`/api/session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSessionData(data);
          }
        })
        .catch((err) => {
          console.error("Error fetching session:", err);
          setError("Failed to load receipt details");
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
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">
            {error || "Unable to load receipt"}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden receipt-container">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === "cs"
                  ? "Platba proběhla úspěšně!"
                  : "Payment was successfully completed!"}
              </h3>{" "}
              <p className="text-gray-700">
                {locale === "cs"
                  ? "Vše proběhlo v pořádku, moc děkuji za nákup."
                  : "Platba byla z nějakého důvodu neúspěšná.."}
              </p>{" "}
            </div>
            <div className="text-right">
              <p className="text-sm">Receipt #{sessionData.id.slice(-8)}</p>
              <p className="text-sm">{formatDate(sessionData.created)}</p>
            </div>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Customer Info */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <span className="font-medium">Email:</span>{" "}
                {sessionData.customer_email}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="bg-gray-50 p-4 rounded">
              <div className="space-y-3">
                {sessionData.line_items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatCurrency(
                        item.amount_total ?? 0,
                        sessionData.currency
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>
                  {formatCurrency(
                    sessionData.amount_total,
                    sessionData.currency
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-green-800 font-medium capitalize">
                  {sessionData.payment_status.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
            <Button
              onClick={handleExport}
              variant="secondary"
              className="px-6 py-3"
            >
              📄 Export Receipt
            </Button>
            <Button href="/" variant="primary" className="px-6 py-3">
              🏠 Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
