"use client";

import { useState } from "react";
import Button from "./Button";

interface BuyButtonProps {
  productId: string;
  locale: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "icon" | "outline";
  roundedFull?: boolean;
}

export function BuyButton({
  productId,
  locale,
  className,
  variant = "primary",
  roundedFull,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, locale }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const label = locale === "cs" ? "Koupit" : "Buy Now";

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={variant}
      className={className}
      roundedFull={roundedFull}
      aria-busy={loading}
    >
      {loading ? (locale === "cs" ? "Načítání..." : "Loading...") : label}
    </Button>
  );
}
