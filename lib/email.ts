import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  CustomerOrderConfirmationEmail,
  AdminOrderNotificationEmail,
} from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

interface PacketaPickupPoint {
  id: string;
  name: string;
  address: string;
}

interface SendOrderEmailsParams {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress?: ShippingAddress;
  packetaPickupPoint?: PacketaPickupPoint;
  deliveryMethod?: string;
  invoicePdfUrl?: string; // Add invoice PDF URL
}

/**
 * Send order confirmation email to customer and notification to admin
 */
export async function sendOrderEmails({
  orderId,
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
}: SendOrderEmailsParams) {
  // Log environment variables (without exposing full API key)
  console.log("🔍 Email Configuration Check:", {
    hasResendApiKey: !!process.env.RESEND_API_KEY,
    resendApiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 7),
    fromEmail: process.env.RESEND_FROM_EMAIL,
    adminEmail: process.env.ADMIN_EMAIL,
    nodeEnv: process.env.NODE_ENV,
  });

  // Check for missing API key
  if (!process.env.RESEND_API_KEY) {
    const error = "RESEND_API_KEY is not set in environment variables";
    console.error("❌ Email Error:", error);
    return {
      success: false,
      error,
    };
  }

  try {
    const orderDetails = {
      orderId,
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
    };

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    console.log(
      `📧 Attempting to send customer email to: ${customerEmail} from: ${fromEmail}`,
    );

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: `Potvrzení objednávky #${orderId} - Tereza Jinochová`,
      react: CustomerOrderConfirmationEmail(orderDetails),
    });

    console.log("✅ Customer email sent successfully:", customerEmailResult);

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || customerEmail; // Fallback to customer email for testing
    console.log(
      `📧 Attempting to send admin email to: ${adminEmail} from: ${fromEmail}`,
    );

    const adminEmailResult = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `Nová objednávka #${orderId}`,
      react: AdminOrderNotificationEmail(orderDetails),
    });

    console.log("✅ Admin email sent successfully:", adminEmailResult);

    return {
      success: true,
      customerEmailId: customerEmailResult.data?.id,
      adminEmailId: adminEmailResult.data?.id,
    };
  } catch (error) {
    console.error("❌ Error sending emails:", error);

    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }

    // Don't throw error - we don't want to fail the webhook if email fails
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send a test email to verify Resend configuration
 */
export async function sendTestEmail(toEmail: string) {
  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: toEmail,
      subject: "Test Email - Tereza Jinochová",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from Tereza Jinochová website.</p>
        <p>If you received this, Resend is configured correctly! ✅</p>
      `,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Error sending test email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
