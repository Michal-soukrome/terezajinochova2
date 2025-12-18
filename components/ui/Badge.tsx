import { Locale } from "@/lib/i18n";
import { Star } from "lucide-react";

interface BadgeProps {
  variant: "premium" | "basic";
  locale: Locale;
  className?: string;
}

export function Badge({ variant, locale, className = "" }: BadgeProps) {
  if (variant === "premium") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1.5 bg-accent-1-contrast border-accent-1 text-accent-1 text-xs font-semibold uppercase rounded-full tracking-wide ${className}`}
      >
        <Star className="w-3 h-3" />
        {locale === "cs" ? "Premium" : "Premium"}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 bg-accent-1 border border-accent-1-contrast text-accent-1-contrast text-xs font-semibold uppercase rounded-full tracking-wide ${className}`}
    >
      {locale === "cs" ? "Základní" : "Basic"}
    </span>
  );
}
