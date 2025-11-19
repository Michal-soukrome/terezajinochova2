"use client";

import React from "react";

interface FullPageLoaderProps {
  message?: string;
  locale?: string;
}

export default function FullPageLoader({
  message,
  locale,
}: FullPageLoaderProps) {
  const displayMessage =
    message || (locale === "cs" ? "Načítání..." : "Loading...");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Subtle elegant loader */}
        <div className="relative h-6 w-6">
          <div className="absolute inset-0 rounded-full bg-amber-800 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-amber-700"></div>
        </div>

        <p className="font-deluxe text-amber-800 text-lg tracking-wide">
          {displayMessage}
        </p>
      </div>
    </div>
  );
}
