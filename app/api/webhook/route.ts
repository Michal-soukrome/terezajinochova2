import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderEmails } from "@/lib/email";
import { PRODUCTS } from "@/lib/products";
import { packetaAPI } from "@/lib/packeta-api";
import { getReferralSummary } from "@/lib/referral-tracking";

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
          },
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

        // Extract referral data from metadata
        const referralData =
          fullSession.metadata?.referral_source ||
          fullSession.metadata?.referral_ref
            ? {
                source: fullSession.metadata.referral_source,
                medium: fullSession.metadata.referral_medium,
                campaign: fullSession.metadata.referral_campaign,
                ref: fullSession.metadata.referral_ref,
                timestamp: fullSession.metadata.referral_timestamp
                  ? parseInt(fullSession.metadata.referral_timestamp)
                  : undefined,
              }
            : null;

        const referralSummary = getReferralSummary(referralData);

        // Create Packeta shipment automatically
        console.log("🚚 Creating Packeta shipment...");
        const nameParts = customerName.split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        // Get product weight from line items
        let packageWeight = 0.5; // Default 500g
        if (lineItems.length > 0) {
          // Find the product in our PRODUCTS catalog by matching Stripe price ID
          for (const item of lineItems) {
            const stripePriceId = item.price?.id;
            if (stripePriceId) {
              // Find product by stripe price ID
              const productKey = Object.keys(PRODUCTS).find(
                (key) => PRODUCTS[key].stripePriceId === stripePriceId,
              );
              if (productKey) {
                const product = PRODUCTS[productKey];
                const itemWeight = product.weight || 0.5;
                packageWeight += itemWeight * (item.quantity || 1);
              }
            }
          }
        }

        const packetaShipmentData = {
          orderNumber: session.id,
          customerName: firstName,
          customerSurname: lastName,
          customerEmail: customerEmail,
          customerPhone: fullSession.customer_details?.phone || "",
          packetaAddressId: parseInt(packetaPickupPoint?.id || "0"),
          packageValue: total,
          weight: packageWeight,
          codAmount: 0, // No COD for now
        };

        const packetaResult =
          await packetaAPI.createShipment(packetaShipmentData);

        if (packetaResult.success) {
          console.log("✅ Packeta shipment created:", packetaResult.packetId);

          // Optionally generate label immediately
          if (packetaResult.packetId) {
            const labelPdf = await packetaAPI.getShipmentLabel(
              packetaResult.packetId,
            );
            if (labelPdf) {
              console.log("📄 Shipment label generated successfully");
              // You could save this PDF or email it to yourself
            }
          }
        } else {
          console.error(
            "❌ Failed to create Packeta shipment:",
            packetaResult.error,
          );
          // Continue with email sending even if Packeta creation fails
        }

        // Send emails to customer and admin
        console.log("📧 Preparing to send order emails...", {
          orderId: session.id,
          customerEmail,
          customerName,
          itemsCount: items.length,
          total: total / 100, // Convert from cents
        });

        // Retrieve invoice PDF URL from Stripe (if invoice was generated)
        let invoicePdfUrl: string | undefined;
        try {
          // Get invoice directly from session (more reliable than listing)
          if (fullSession.invoice) {
            const invoiceId =
              typeof fullSession.invoice === "string"
                ? fullSession.invoice
                : fullSession.invoice.id;

            const invoice = await stripe.invoices.retrieve(invoiceId);
            invoicePdfUrl = invoice.hosted_invoice_url || undefined;
            console.log("📄 Found invoice PDF URL:", invoicePdfUrl);
          } else {
            console.log("ℹ️ No invoice attached to this session");
          }
        } catch (invoiceError) {
          console.error("❌ Failed to retrieve invoice:", invoiceError);
          // Continue without invoice URL
        }

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
          invoicePdfUrl,
          referralSummary,
        });

        if (emailResult.success) {
          console.log("✅ Order emails sent successfully:", {
            customerEmailId: emailResult.customerEmailId,
            adminEmailId: emailResult.adminEmailId,
          });
        } else {
          console.error("❌ Failed to send order emails:", emailResult.error);
          // Continue webhook processing even if email fails
        }

        break;

      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          "Payment succeeded:",
          paymentIntent.id,
          paymentIntent.amount,
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
