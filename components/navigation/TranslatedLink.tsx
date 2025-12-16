"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { routes } from "@/lib/routes";
import { PRODUCT_LIST } from "@/lib/products";

interface TranslatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  activeClassName?: string;
  exact?: boolean;
  preserveScroll?: boolean;
  title?: string;
}

export default function TranslatedLink({
  href,
  children,
  className,
  onClick,
  activeClassName,
  exact,
  preserveScroll = false,
  title,
}: TranslatedLinkProps) {
  const pathname = usePathname();

  // Scroll to top when pathname changes (after navigation)
  useEffect(() => {
    if (!preserveScroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, preserveScroll]);

  const handleClick = () => {
    onClick?.();
  };
  const pathLocale = pathname?.split("/").filter(Boolean)[0];

  // If we can't detect locale from path, just return a regular Link
  if (!pathLocale) {
    return (
      <Link
        href={href}
        className={className}
        onClick={handleClick}
        title={title}
      >
        {children}
      </Link>
    );
  }

  const locale = pathLocale;

  // Normalize href
  let cleanHref = href;
  if (cleanHref.startsWith(`/${locale}`)) {
    cleanHref = cleanHref.slice(locale.length + 1);
  }

  // If it's root
  if (cleanHref === "/" || cleanHref === "")
    return (
      <Link
        href={`/${locale}`}
        className={className}
        onClick={handleClick}
        title={title}
      >
        {children}
      </Link>
    );

  const segments = cleanHref.split("/").filter(Boolean);

  // Map top-level route using routes translation mapping
  const top = segments[0];
  const routeKey = Object.keys(routes).find(
    (key) => routes[key as keyof typeof routes].en === top || key === top
  );

  if (routeKey) {
    // Build localized top slug
    const localizedTop =
      routes[routeKey as keyof typeof routes][
        locale as keyof (typeof routes)[keyof typeof routes]
      ];

    // Product path: map product slug if present
    if (top === routes.products.en && segments[1]) {
      const productIdentifier = segments[1];
      const product = PRODUCT_LIST.find(
        (p) =>
          p.id === productIdentifier ||
          p.slugs.en === productIdentifier ||
          p.slugs.cs === productIdentifier
      );
      if (product) {
        const localizedProductSlug =
          product.slugs[locale as keyof typeof product.slugs];
        return (
          <Link
            href={`/${locale}/${localizedTop}/${localizedProductSlug}`}
            className={className}
            onClick={handleClick}
            title={title}
          >
            {children}
          </Link>
        );
      }
    }

    const localizedHref = `/${locale}/${localizedTop}`;
    const normalize = (p?: string) => p?.replace(/\/+$/, "") ?? "";

    const isActive = exact
      ? normalize(pathname) === normalize(localizedHref)
      : normalize(pathname).startsWith(normalize(localizedHref));
    return (
      <Link
        href={localizedHref}
        className={`${className ?? ""} ${
          isActive && activeClassName ? activeClassName : ""
        }`}
        onClick={handleClick}
        title={title}
      >
        {children}
      </Link>
    );
  }

  // Fallback to adding locale prefix
  const localized = `/${locale}${href}`;
  const normalize = (p?: string) => p?.replace(/\/+$/, "") ?? "";
  const isActive = exact
    ? normalize(pathname) === normalize(localized)
    : normalize(pathname) === normalize(localized) ||
      normalize(pathname).startsWith(normalize(localized) + "/");
  return (
    <Link
      href={localized}
      className={`${className ?? ""} ${
        isActive && activeClassName ? activeClassName : ""
      }`}
      onClick={handleClick}
      title={title}
    >
      {children}
    </Link>
  );
}
