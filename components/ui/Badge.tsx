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
        className={`inline-flex items-center gap-1 px-3 py-1.5 bg-accent-1-contrast border-accent-1 text-accent-1 text-xs font-semibold uppercase tracking-wide ${className}`}
        style={{ borderRadius: "1rem", cornerShape: "bevel" } as any}
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
      className={`inline-flex items-center px-3 py-1.5 bg-accent-1 border border-accent-1-contrast text-accent-1-contrast text-xs font-semibold uppercase tracking-wide ${className}`}
      style={{ borderRadius: "1rem", cornerShape: "bevel" } as any}
    >
      {locale === "cs" ? "Základní" : "Basic"}
    </span>
  );
}
