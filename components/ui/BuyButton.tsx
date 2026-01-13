"use client";

import { useState } from "react";
import Button from "./Button";
import { PacketaPickerButton, PacketaPickupPoint } from "./PacketaPickerButton";
import { PRODUCTS } from "@/lib/products";

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
  const [selectedPickup, setSelectedPickup] =
    useState<PacketaPickupPoint | null>(null);

  const product = PRODUCTS[productId as keyof typeof PRODUCTS];
  const requiresShipping = product?.requiresShipping;

  const handlePickupSelected = (pickup: PacketaPickupPoint) => {
    console.log("📦 Pickup point selected:", pickup);
    setSelectedPickup(pickup);
    // Automatically proceed to checkout after pickup selection
    handleCheckout(pickup);
  };

  const handleCheckout = async (pickup?: PacketaPickupPoint) => {
    setLoading(true);
    console.log("🚀 Starting checkout with:", {
      productId,
      locale,
      pickup,
      selectedPickup,
    });
    try {
      const payload = {
        productId,
        locale,
        pickupPoint: pickup || selectedPickup,
      };
      console.log("📤 Sending to /api/checkout:", payload);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const { url } = await response.json();
      console.log("✅ Checkout response:", url);
      if (url) window.location.href = url;
    } catch (error) {
      console.error("❌ Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectBuy = () => {
    if (requiresShipping) {
      // For shipping products, do nothing - Packeta picker handles it
      return;
    }
    // For non-shipping products, go directly to checkout
    handleCheckout();
  };

  const label = locale === "cs" ? "Koupit" : "Buy Now";

  // If product requires shipping, show Packeta picker
  if (requiresShipping) {
    return (
      <PacketaPickerButton
        locale={locale}
        onPickupSelected={handlePickupSelected}
        className={className}
      >
        {loading ? (locale === "cs" ? "Strpení..." : "Loading...") : label}
      </PacketaPickerButton>
    );
  }

  // For digital/non-shipping products, show normal buy button
  return (
    <Button
      onClick={handleDirectBuy}
      disabled={loading}
      variant={variant}
      className={className}
      roundedFull={roundedFull}
      aria-busy={loading}
    >
      {loading ? (locale === "cs" ? "Strpení..." : "Loading...") : label}
    </Button>
  );
}
