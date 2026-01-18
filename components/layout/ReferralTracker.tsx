"use client";

import { useEffect } from "react";
import { captureReferralFromUrl } from "@/lib/referral-tracking";

/**
 * Client-side component that captures referral data from URL parameters
 * This runs on the client to avoid middleware issues with document/window access
 */
export function ReferralTracker() {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      captureReferralFromUrl(url);
    }
  }, []); // Run once on mount

  return null; // This component doesn't render anything
}
