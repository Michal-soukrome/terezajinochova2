import { setCookie, getCookie } from "./cookies";

export interface ReferralData {
  source?: string; // 'facebook', 'instagram', etc.
  medium?: string; // 'social', 'link', etc.
  campaign?: string; // influencer name or campaign name
  referrer?: string; // full referrer URL
  ref?: string; // simple referral code
  timestamp?: number;
}

const REFERRAL_COOKIE_NAME = "terezajinochova_referral";
const REFERRAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * Capture referral data from URL parameters and store in cookie
 */
export function captureReferralFromUrl(url: URL): ReferralData | null {
  const params = url.searchParams;

  // Check for various referral parameters
  const ref = params.get("ref");
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  const fbclid = params.get("fbclid"); // Facebook click ID
  const igshid = params.get("igshid"); // Instagram share ID

  // If no referral parameters found, return null
  if (!ref && !utmSource && !utmMedium && !utmCampaign && !fbclid && !igshid) {
    return null;
  }

  const referralData: ReferralData = {
    timestamp: Date.now(),
  };

  // Capture simple referral code
  if (ref) {
    referralData.ref = ref;
  }

  // Capture UTM parameters
  if (utmSource) {
    referralData.source = utmSource;
  }
  if (utmMedium) {
    referralData.medium = utmMedium;
  }
  if (utmCampaign) {
    referralData.campaign = utmCampaign;
  }

  // Detect social media platforms
  if (
    fbclid ||
    url.hostname.includes("facebook.com") ||
    url.hostname.includes("fb.com")
  ) {
    referralData.source = referralData.source || "facebook";
    referralData.medium = referralData.medium || "social";
  }

  if (igshid || url.hostname.includes("instagram.com")) {
    referralData.source = referralData.source || "instagram";
    referralData.medium = referralData.medium || "social";
  }

  // Store referrer URL if available
  if (typeof document !== "undefined" && document.referrer) {
    referralData.referrer = document.referrer;
  }

  // Store in cookie
  setCookie(REFERRAL_COOKIE_NAME, JSON.stringify(referralData), {
    maxAge: REFERRAL_COOKIE_MAX_AGE,
    path: "/",
  });

  console.log("📊 Referral captured:", referralData);
  return referralData;
}

/**
 * Get stored referral data from cookie
 */
export function getStoredReferral(): ReferralData | null {
  const cookieValue = getCookie(REFERRAL_COOKIE_NAME);
  if (!cookieValue) return null;

  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    console.error("Error parsing referral cookie:", error);
    return null;
  }
}

/**
 * Clear stored referral data (call after successful purchase)
 */
export function clearReferral() {
  setCookie(REFERRAL_COOKIE_NAME, "", { maxAge: 0, path: "/" });
}

/**
 * Check if current visit has referral data
 */
export function hasReferral(): boolean {
  return getStoredReferral() !== null;
}

/**
 * Get referral summary for display/admin purposes
 */
export function getReferralSummary(referral: ReferralData | null): string {
  if (!referral) return "Přímý přístup (bez referral)";

  const parts = [];

  if (referral.ref) {
    parts.push(`Ref: ${referral.ref}`);
  }

  if (referral.source) {
    parts.push(`Zdroj: ${referral.source}`);
  }

  if (referral.medium) {
    parts.push(`Medium: ${referral.medium}`);
  }

  if (referral.campaign) {
    parts.push(`Kampaň: ${referral.campaign}`);
  }

  return parts.length > 0 ? parts.join(" | ") : "Referral bez detailů";
}
