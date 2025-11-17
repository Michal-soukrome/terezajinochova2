import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Disable body parsing
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// jednoduché in-memory úložiště pro zpracované eventy (pro testování)
const processedEvents = new Set<string>();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err: any) {
    console.error("Invalid webhook signature:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency – pokud už byl event zpracován, ignoruj ho
  if (processedEvents.has(event.id)) {
    console.log(`Duplicate event ignored: ${event.id}`);
    return NextResponse.json({ received: true });
  }
  processedEvents.add(event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout completed:", session.id, session.amount_total);
        // TODO: uložit do DB nebo triggernout fulfillment
        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          "Payment succeeded:",
          paymentIntent.id,
          paymentIntent.amount
        );
        // TODO: označit objednávku jako zaplacenou
        break;

      default:
        console.log("Unhandled event type:", event.type);
    }
  } catch (err) {
    console.error("Error processing event:", err);
    // i při chybě vracíme 200, aby Stripe neprováděl retry navždy
  }

  return NextResponse.json({ received: true });
}
