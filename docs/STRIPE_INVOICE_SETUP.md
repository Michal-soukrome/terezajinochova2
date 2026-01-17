# Stripe Invoice Integration Guide

## 📋 Overview

Your e-commerce site now automatically generates professional PDF invoices for every purchase using Stripe's invoice creation feature. This integration provides:

- ✅ Automatic invoice generation for all orders
- ✅ Stripe sends English email with invoice PDF link
- ✅ Your custom Czech emails also include the invoice PDF link
- ✅ Professional invoices stored in Stripe dashboard
- ✅ Customers can download invoices anytime

## 🚀 How It Works

### 1. Customer Completes Checkout

When a customer completes a purchase on your site:

```
Customer → Checkout → Payment Success
```

### 2. Stripe Creates Invoice Automatically

Your checkout configuration includes `invoice_creation: { enabled: true }`, which tells Stripe to automatically generate an invoice for the session.

**Location:** `/app/api/checkout/route.ts`

```typescript
const sessionConfig: Stripe.Checkout.SessionCreateParams = {
  // ... other config
  invoice_creation: {
    enabled: true,
  },
};
```

### 3. Stripe Sends Webhook

After successful payment, Stripe triggers the `checkout.session.completed` webhook event.

### 4. Your Webhook Retrieves Invoice

Your webhook handler retrieves the generated invoice:

**Location:** `/app/api/webhook/route.ts`

```typescript
// Get invoice directly from session
if (fullSession.invoice) {
  const invoiceId =
    typeof fullSession.invoice === "string"
      ? fullSession.invoice
      : fullSession.invoice.id;

  const invoice = await stripe.invoices.retrieve(invoiceId);
  invoicePdfUrl = invoice.hosted_invoice_url || undefined;
}
```

### 5. Emails Are Sent

Two types of emails are sent:

#### A) Stripe's Default Email (English)

- Professional invoice notification
- Includes direct link to invoice PDF
- Sent automatically by Stripe
- Language: English only

#### B) Your Custom Emails (Czech + English)

- Customer confirmation email (Czech)
- Admin notification email (Czech)
- Both include the invoice PDF link
- Sent via Resend

## 📧 Email Flow

```
Order Completed
     |
     ├─→ Stripe Email (English) → Customer
     |   └─ "Here's your invoice [PDF Link]"
     |
     └─→ Custom Emails (Czech) → Customer + Admin
         └─ "Stáhnout fakturu (PDF)" button
```

## 🎯 Benefits

### For Customers

- **Professional invoices** for accounting/business expenses
- **Dual language support** (English invoice + Czech notifications)
- **Easy access** to invoice PDF via email
- **Always available** in Stripe customer portal

### For Business

- **Legal compliance** - proper invoicing for B2B customers
- **Automatic archiving** - all invoices stored in Stripe
- **Reduced support** - customers can access invoices themselves
- **Professional appearance** - Stripe's polished invoice design

### For Development

- **No manual work** - fully automated
- **No PDF generation** - Stripe handles everything
- **Reliable delivery** - Stripe's email infrastructure
- **Easy debugging** - view all invoices in Stripe dashboard

## 🔧 Configuration

### Required: Checkout Session

Invoice creation is enabled in the checkout session configuration:

**File:** `/app/api/checkout/route.ts`

```typescript
invoice_creation: {
  enabled: true,
}
```

### Required: Webhook Handler

The webhook retrieves and includes the invoice URL in custom emails:

**File:** `/app/api/webhook/route.ts`

```typescript
// Retrieve invoice from session
if (fullSession.invoice) {
  const invoice = await stripe.invoices.retrieve(invoiceId);
  invoicePdfUrl = invoice.hosted_invoice_url;
}

// Pass to email function
await sendOrderEmails({
  // ... other params
  invoicePdfUrl,
});
```

### Required: Email Templates

The email templates include invoice PDF buttons:

**File:** `/lib/email-templates.tsx`

```tsx
{
  invoicePdfUrl && (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <a href={invoicePdfUrl} className="button">
        📄 Stáhnout fakturu (PDF)
      </a>
    </div>
  );
}
```

## 🧪 Testing

### Local Testing

1. **Start Stripe CLI webhook forwarding:**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

2. **Make a test purchase:**
   - Use test card: `4242 4242 4242 4242`
   - Complete checkout
   - Check terminal for webhook logs

3. **Verify invoice creation:**
   - Look for log: `📄 Found invoice PDF URL: ...`
   - Check your email for both Stripe and custom emails
   - Verify invoice link works in custom email

4. **Check Stripe Dashboard:**
   - Go to Payments → All payments
   - Click on the payment
   - You should see an attached invoice

### Production Testing

1. **Complete a real purchase** (or test purchase in live mode)

2. **Check customer receives:**
   - Stripe invoice email (English)
   - Your custom confirmation email (Czech) with invoice link

3. **Check admin receives:**
   - Admin notification email with invoice link

4. **Verify in Stripe Dashboard:**
   - Go to Invoices section
   - All invoices should be listed
   - Click to view/download PDF

## 🎨 Customization

### Customize Invoice Appearance

In Stripe Dashboard:

1. Go to **Settings → Branding**
2. Upload logo
3. Set brand colors
4. Configure company details

These settings will reflect in all generated invoices.

### Customize Invoice Content

You can add additional metadata to invoices by expanding the webhook integration:

```typescript
// Example: Add custom invoice notes
await stripe.invoices.update(invoiceId, {
  footer: "Děkujeme za vaši objednávku! - Tereza Jinochová",
  metadata: {
    order_source: "webshop",
    custom_field: "value",
  },
});
```

## 📊 Monitoring

### View All Invoices

**Stripe Dashboard:**

1. Go to **Billing → Invoices**
2. See all generated invoices
3. Filter by status, date, customer
4. Download individual or batch invoices

### Email Delivery Status

**Stripe Email:**

- Stripe automatically tracks delivery
- View in Stripe Events log

**Custom Emails (Resend):**

1. Go to [Resend Dashboard](https://resend.com/emails)
2. View all sent emails
3. Check delivery status
4. See opens/clicks if tracking enabled

## 🛡️ Important Notes

### Invoice vs Receipt

- **Invoice**: Generated by `invoice_creation`, includes itemized details
- **Receipt**: Simple payment confirmation
- This integration uses **invoices** for professional documentation

### Language Limitations

- Stripe invoices are in **English only**
- No Czech translation available from Stripe
- This is why we send custom Czech emails alongside

### Data Included in Invoice

Stripe invoices automatically include:

- Customer name and email
- Billing address
- Items purchased (from line items)
- Subtotal, taxes, shipping
- Total amount paid
- Payment method
- Payment date
- Your business details (from Stripe account settings)

### No Additional Costs

- Invoice generation is **free**
- No extra Stripe fees
- Part of standard Stripe functionality

## 🆘 Troubleshooting

### Invoice Not Created

**Problem:** No invoice URL in emails

**Solution:**

1. Check `invoice_creation: { enabled: true }` in checkout config
2. Verify you're using `mode: 'payment'` (not subscription)
3. Check Stripe Dashboard → Invoices for created invoices

### Invoice URL is Undefined

**Problem:** `invoicePdfUrl` is `undefined` in webhook

**Solution:**

1. Check webhook logs for: `ℹ️ No invoice attached to this session`
2. Verify invoice creation is enabled
3. Wait a few seconds - invoice might be generated async
4. Check if `fullSession.invoice` exists

### Customer Didn't Receive Stripe Email

**Problem:** Customer got custom email but not Stripe's invoice email

**Solution:**

1. Check customer's spam/junk folder
2. Verify email settings in Stripe Dashboard → Settings → Emails
3. Ensure customer email in Stripe is correct
4. Customer can always access invoice via Stripe customer portal

### Invoice Shows Wrong Information

**Problem:** Invoice has incorrect business details

**Solution:**

1. Update your business info: Stripe Dashboard → Settings → Business settings
2. Update tax info: Settings → Tax settings
3. Update branding: Settings → Branding
4. Changes apply to new invoices only (existing ones don't update)

## 📚 Related Documentation

- [RESEND_EMAIL_SETUP.md](./RESEND_EMAIL_SETUP.md) - Custom email configuration
- [WEBHOOK_LOCAL_TESTING.md](./WEBHOOK_LOCAL_TESTING.md) - Testing webhooks locally
- [ENV_VARS.md](./ENV_VARS.md) - Environment variables setup
- [EMAIL_TROUBLESHOOTING.md](./EMAIL_TROUBLESHOOTING.md) - Email issues and fixes

## 🔗 External Resources

- [Stripe Invoice Creation Docs](https://stripe.com/docs/invoicing/integration/checkout)
- [Stripe Invoice Object](https://stripe.com/docs/api/invoices)
- [Stripe Branding Guide](https://stripe.com/docs/invoicing/customize)
