import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items"],
    });

    // Only return session details if payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_details: session.customer_details,
      shipping_details:
        (session as any).shipping_details || (session as any).shipping,
      payment_method:
        session.payment_intent && typeof session.payment_intent !== "string"
          ? (session.payment_intent as any).payment_method
          : null,
      line_items: session.line_items?.data,
      created: session.created,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
