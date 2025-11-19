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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["CZ", "SK", "US", "DE"],
      },
      success_url: `${request.nextUrl.origin}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/${locale}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
