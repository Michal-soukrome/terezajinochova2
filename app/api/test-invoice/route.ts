import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing Stripe invoice creation...");

    // Create a test customer
    const customer = await stripe.customers.create({
      email: "test@example.com",
      name: "Test Customer",
    });

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true,
      collection_method: "send_invoice",
      days_until_due: 30,
    });

    // Add a test line item
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      amount: 100000, // 1000 CZK in halířích
      currency: "czk",
      description: "Test Product - Wedding Diary",
    });

    // Finalize and send
    await stripe.invoices.finalizeInvoice(invoice.id);
    await stripe.invoices.sendInvoice(invoice.id);

    return NextResponse.json({
      success: true,
      message: "Test invoice created and sent!",
      invoiceId: invoice.id,
      customerId: customer.id,
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdfUrl: invoice.invoice_pdf, // Add PDF URL
    });
  } catch (error) {
    console.error("❌ Test invoice creation failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
