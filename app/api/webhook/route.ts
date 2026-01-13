import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderEmails } from "@/lib/email";
import { PRODUCTS } from "@/lib/products";

// Don't export deprecated `config` in app router. We keep reading the raw body
// directly using `request.text()` for Stripe signature verification.

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
  } catch (err) {
    // `err` is unknown by default in TS; cast locally for message access
    const error = err as { message?: string };
    console.error("Invalid webhook signature:", error.message);
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

        // Retrieve full session details with line items
        const fullSession = (await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items", "line_items.data.price.product"],
          }
        )) as Stripe.Checkout.Session;

        // Extract order details
        const lineItems = fullSession.line_items?.data || [];
        const items = lineItems.map((item) => {
          const product = item.price?.product as Stripe.Product;
          return {
            name: product.name || "Product",
            quantity: item.quantity || 1,
            price: item.amount_total || 0,
          };
        });

        const customerEmail = fullSession.customer_details?.email || "";
        const customerName = fullSession.customer_details?.name || "Customer";
        const subtotal = fullSession.amount_subtotal || 0;
        const shipping = fullSession.total_details?.amount_shipping || 0;
        const total = fullSession.amount_total || 0;

        // Extract shipping address (using any to handle potential undefined)
        const shippingDetails = (fullSession as any).shipping_details;
        const shippingAddress = shippingDetails?.address
          ? {
              name: shippingDetails.name || undefined,
              line1: shippingDetails.address.line1 || undefined,
              line2: shippingDetails.address.line2 || undefined,
              city: shippingDetails.address.city || undefined,
              postal_code: shippingDetails.address.postal_code || undefined,
              country: shippingDetails.address.country || undefined,
            }
          : undefined;

        // Extract Packeta pickup point details from metadata
        const packetaPickupPoint = fullSession.metadata?.packeta_point_id
          ? {
              id: fullSession.metadata.packeta_point_id,
              name: fullSession.metadata.packeta_point_name || "",
              address: fullSession.metadata.packeta_point_address || "",
            }
          : undefined;

        const deliveryMethod = fullSession.metadata?.delivery_method;

        // Send emails to customer and admin
        const emailResult = await sendOrderEmails({
          orderId: session.id,
          customerEmail,
          customerName,
          items,
          subtotal,
          shipping,
          total,
          shippingAddress,
          packetaPickupPoint,
          deliveryMethod,
        });

        if (emailResult.success) {
          console.log("Order emails sent successfully:", {
            customerEmailId: emailResult.customerEmailId,
            adminEmailId: emailResult.adminEmailId,
          });
        } else {
          console.error("Failed to send order emails:", emailResult.error);
        }

        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          "Payment succeeded:",
          paymentIntent.id,
          paymentIntent.amount
        );
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
