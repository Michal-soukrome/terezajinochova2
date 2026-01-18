# Resend Email Setup Guide

This guide explains how to set up Resend for sending transactional emails (order confirmations and admin notifications) when customers make purchases through Stripe.

## 📋 Overview

When a customer completes a purchase:

1. **Customer** receives a beautifully formatted order confirmation email
2. **Admin** receives a notification email with order details

## 🚀 Setup Steps

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Verify Your Domain (Recommended for Production)

**For production use, you should verify your domain:**

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `svatebnipribehy.com`)
4. Add the DNS records provided by Resend to your domain registrar
5. Wait for verification (usually takes a few minutes)

**For development/testing:**

- You can use the default `onboarding@resend.dev` sender
- Emails will only be sent to your verified account email

### 3. Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Tereza Jinochova Production")
4. Copy the API key (it will only be shown once!)

### 4. Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```bash
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here

# Email addresses
RESEND_FROM_EMAIL=svatebnipribehy@gmail.com  # Your Gmail address
ADMIN_EMAIL=svatebnipribehy@gmail.com          # Where admin notifications go
```

**Important:**

- `RESEND_FROM_EMAIL` must be from a verified domain (or use `onboarding@resend.dev` for testing)
- `ADMIN_EMAIL` is where you'll receive order notifications

### 5. Test the Integration

You can create a test endpoint to verify everything works:

```typescript
// app/api/test-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendTestEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter required" },
      { status: 400 },
    );
  }

  const result = await sendTestEmail(email);
  return NextResponse.json(result);
}
```

Test it by visiting: `http://localhost:3000/api/test-email?email=your@email.com`

## 📧 Email Templates

### Customer Email Features:

- Order confirmation with order number
- Itemized list of products
- Shipping/pickup details
- Total amount paid
- **Invoice PDF download button** (if available)
- What happens next (timeline)
- Contact information

### Admin Email Features:

- Alert notification style
- Customer details
- Complete order information
- Shipping/pickup address
- **Invoice PDF link** (if available)
- Action items checklist
- Timestamp

## 🔄 How It Works

1. **Customer completes checkout** on Stripe
2. **Stripe creates invoice automatically** (if enabled)
3. **Stripe sends webhook** to `/api/webhook`
4. **Webhook handler**:
   - Verifies Stripe signature
   - Extracts order details
   - Retrieves invoice PDF URL from Stripe
   - Calls `sendOrderEmails()`
5. **Email service**:
   - Renders HTML templates with invoice link
   - Sends email to customer via Resend
   - Sends notification to admin via Resend
6. **Logs results** in console

## 🛡️ Security & Best Practices

### Stripe Webhook Security

- Always verify webhook signatures
- Use environment variables for secrets
- Never expose webhook secrets in client code

### Resend Best Practices

- Verify your domain for better deliverability
- Use descriptive "from" names: `"Tereza Jinochová" <orders@svatebnipribehy.com>`
- Keep API keys secure
- Monitor your sending limits (free tier: 100 emails/day)

### Error Handling

- Emails are sent asynchronously
- Email failures won't block the webhook response
- All errors are logged to console
- Stripe won't retry on email failures

## 📊 Monitoring

### View Sent Emails

1. Log into Resend dashboard
2. Go to **Emails** section
3. See all sent emails, their status, and any errors

### Check Logs

- Server logs show email send results
- Both success and failure cases are logged
- Customer and admin email IDs are logged

## 🧪 Testing Scenarios

### Test Successful Order

1. Create a test product purchase
2. Complete Stripe checkout with test card: `4242 4242 4242 4242`
3. Check that both emails are sent
4. Verify emails in Resend dashboard

### Test with Packeta Pickup

1. Select a pickup point during checkout
2. Complete purchase
3. Verify pickup point details in both emails

### Test with Home Delivery

1. Don't select pickup point
2. Enter delivery address
3. Verify address appears in emails

## 🚨 Troubleshooting

### Email Not Received

1. **Check spam folder** - test emails often go to spam
2. **Verify domain** - unverified domains have limited delivery
3. **Check Resend dashboard** - see if email was sent
4. **Check console logs** - look for error messages

### "Invalid from email" Error

- Your `RESEND_FROM_EMAIL` must be from a verified domain
- Use `onboarding@resend.dev` for testing
- Verify your domain in Resend dashboard

### Webhook Not Triggering

- Ensure webhook is configured in Stripe dashboard
- Check `STRIPE_WEBHOOK_SECRET` is correct
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhook`

### "API Key Invalid" Error

- Double-check `RESEND_API_KEY` in `.env.local`
- Ensure no extra spaces or quotes
- Generate a new key if needed

## 🎨 Customizing Email Templates

Email templates are in `lib/email-templates.tsx`. You can customize:

- Colors and styling (inline CSS)
- Content and copy
- Logo and branding
- Layout and structure

After changes, restart your dev server.

## 📈 Resend Pricing

- **Free Tier**: 100 emails/day, 3,000/month
- **Pro**: $20/month for 50,000 emails
- **Business**: Custom pricing

For most small businesses, the free tier is sufficient to start.

## 🔗 Useful Links

- [Resend Documentation](https://resend.com/docs)
- [Resend React Email Guide](https://resend.com/docs/send-with-react)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [React Email Components](https://react.email/docs/components/html)

## 📞 Support

If you have issues:

1. Check Resend dashboard for delivery status
2. Review server logs for errors
3. Test with `sendTestEmail()` function
4. Contact Resend support (they're very responsive!)

---

**Setup complete!** 🎉 Your store now sends professional transactional emails to customers and admins.
