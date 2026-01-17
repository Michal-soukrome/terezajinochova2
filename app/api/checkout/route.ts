import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { productId, locale, pickupPoint } = await request.json();

    console.log("🛒 Checkout request:", {
      productId,
      locale,
      hasPickupPoint: !!pickupPoint,
    });

    const product = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!product) {
      console.error("❌ Product not found:", productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log(
      "✅ Product found:",
      product.names.cs,
      "| Shipping required:",
      product.requiresShipping,
    );

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.nextUrl.origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/${locale}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "required",
      invoice_creation: {
        enabled: true,
      },
    };

    // Only add shipping for products that require it
    if (product.requiresShipping) {
      // If pickup point is provided, store it and use it as shipping address
      if (pickupPoint) {
        sessionConfig.shipping_options = [
          {
            shipping_rate: process.env.STRIPE_PACKETA_PICKUP_RATE!, // Zásilkovna - výdejní místo: 89 CZK
          },
        ];

        // Store pickup point details in metadata (both session and payment intent)
        const metadata = {
          packeta_point_id: pickupPoint.id,
          packeta_point_name: pickupPoint.name,
          packeta_point_address: `${pickupPoint.street}, ${pickupPoint.city}, ${pickupPoint.zip}`,
          delivery_method: "packeta_pickup",
        };

        sessionConfig.metadata = metadata;

        // Also add metadata to payment intent so it shows in Stripe dashboard
        sessionConfig.payment_intent_data = {
          metadata: metadata,
        };

        // Collect phone number for pickup notifications (no shipping address needed for pickup)
        sessionConfig.phone_number_collection = {
          enabled: true,
        };

        // Add custom text to display selected pickup point
        sessionConfig.custom_text = {
          submit: {
            message: `${locale === "cs" ? "Výdejní místo" : "Pickup point"}: ${pickupPoint.name}, ${pickupPoint.street}, ${pickupPoint.city}`,
          },
        };
      } else {
        // No pickup point selected yet - show both options
        sessionConfig.shipping_address_collection = {
          allowed_countries: ["CZ", "SK"],
        };
        sessionConfig.shipping_options = [
          {
            shipping_rate: process.env.STRIPE_PACKETA_PICKUP_RATE!, // Zásilkovna - výdejní místo: 89 CZK
          },
          {
            shipping_rate: process.env.STRIPE_PACKETA_DELIVERY_RATE!, // Zásilkovna - doručení na adresu: 129 CZK
          },
        ];
      }
    }

    console.log("📋 Session config:", JSON.stringify(sessionConfig, null, 2));

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log("✅ Checkout session created:", session.id);
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
