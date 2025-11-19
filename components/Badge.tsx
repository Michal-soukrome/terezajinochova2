import { Locale } from "@/lib/i18n";

interface BadgeProps {
  variant: "premium" | "basic";
  locale: Locale;
  className?: string;
}

export function Badge({ variant, locale, className = "" }: BadgeProps) {
  if (variant === "premium") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 border border-amber-300 text-amber-900 rounded-full text-xs font-semibold uppercase tracking-wide ${className}`}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {locale === "cs" ? "Premium" : "Premium"}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 rounded-full text-xs font-semibold uppercase tracking-wide ${className}`}
    >
      {locale === "cs" ? "Základní" : "Basic"}
    </span>
  );
}
