import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { productId, locale } = await request.json();

    const product = PRODUCTS[productId as keyof typeof PRODUCTS];
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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
    };

    // Only add shipping for products that require it
    if (product.requiresShipping) {
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

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
