"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Mail } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  const errorMessage = `
Error Message: ${error.message}
Error Digest: ${error.digest || "N/A"}
Stack Trace:
${error.stack || "No stack trace available"}

Page URL: ${typeof window !== "undefined" ? window.location.href : "N/A"}
User Agent: ${
    typeof window !== "undefined" ? window.navigator.userAgent : "N/A"
  }
Timestamp: ${new Date().toISOString()}
  `.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(errorMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Website Error Report");
    const body = encodeURIComponent(errorMessage);
    const mailtoLink = `mailto:svatebnipribehy@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <html>
      <body className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Něco se pokazilo
            </h1>
            <p className="text-gray-600">
              Omlouváme se za potíže. Vyskytla se neočekávaná chyba.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Detaily chyby:
            </h2>
            <div className="bg-white rounded border border-gray-200 p-3 max-h-48 overflow-y-auto">
              <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words font-mono">
                {error.message}
              </pre>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Zkopírováno!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Kopírovat chybu
                </>
              )}
            </button>

            <button
              onClick={handleSendEmail}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent-1-contrast hover:bg-accent-4 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Mail className="w-5 h-5" />
              Poslat e-mail
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={reset}
              className="flex-1 px-4 py-3 bg-accent-1 hover:bg-accent-2 text-gray-900 rounded-lg transition-colors duration-200 font-medium"
            >
              Zkusit znovu
            </button>
            <a
              href="/"
              className="flex-1 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 font-medium text-center"
            >
              Zpět na úvod
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Pokud problém přetrvává, kontaktujte nás na{" "}
              <a
                href="mailto:svatebnipribehy@gmail.com"
                className="text-accent-1-contrast hover:underline"
              >
                svatebnipribehy@gmail.com
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
