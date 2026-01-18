# Email Troubleshooting Guide

## Problem: Emails Not Sending in Production

If test emails work but production emails don't send, follow this checklist:

---

## ✅ Checklist

### 1. **Check Environment Variables in Production**

Your production environment (e.g., Vercel, AWS, etc.) **must** have these environment variables set:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx        # Required
RESEND_FROM_EMAIL=svatebnipribehy@gmail.com # Required
ADMIN_EMAIL=admin@youremail.com         # Required
```

**How to check on Vercel:**

1. Go to your project on Vercel
2. Navigate to Settings → Environment Variables
3. Verify all three variables are present with **Production** scope
4. Make sure they're not empty or using placeholder values

**Common mistake:** Setting variables only for "Preview" or "Development" but not "Production"

---

### 2. **Verify Your Domain in Resend**

For production, you **cannot** use `onboarding@resend.dev`. You must:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain (e.g., `svatebnipribehy.com`)
3. Add the DNS records to your domain registrar
4. Wait for verification (usually 5-10 minutes)
5. Use a verified email address like `orders@svatebnipribehy.com`

**How to check:**

- In Resend dashboard, your domain should show a green checkmark ✅
- Try sending a test email from that domain

---

### 3. **Check Production Logs**

After deploying, check your production logs for email errors:

**On Vercel:**

1. Go to your project → Deployments
2. Click on the latest deployment
3. Go to the Functions tab
4. Look for `/api/webhook` logs

**Look for these log messages:**

✅ **Success indicators:**

```
🔍 Email Configuration Check: { hasResendApiKey: true, ... }
📧 Attempting to send customer email to: customer@email.com
✅ Customer email sent successfully
✅ Admin email sent successfully
```

❌ **Error indicators:**

```
❌ Email Error: RESEND_API_KEY is not set
❌ Error sending emails: ...
❌ Failed to send order emails: ...
```

---

### 4. **Test the Configuration**

You can test email configuration directly:

**Method 1: Using the test endpoint**

```bash
curl "https://your-production-domain.com/api/test-email?email=your@email.com"
```

**Method 2: Trigger a test webhook**
Go to Stripe Dashboard → Webhooks → Your production webhook → Send test webhook → checkout.session.completed

---

### 5. **Common Issues & Solutions**

#### Issue: "RESEND_API_KEY is not set"

**Solution:** Add the environment variable to your production environment and redeploy.

#### Issue: "Invalid API key"

**Solution:**

- Verify the API key is correct in Resend dashboard
- Make sure you copied the full key (starts with `re_`)
- Create a new API key if needed

#### Issue: "Domain not verified"

**Solution:**

- Verify your domain in Resend dashboard
- OR temporarily use `onboarding@resend.dev` for `RESEND_FROM_EMAIL` (development only)

#### Issue: "Email sends but doesn't arrive"

**Solution:**

- Check spam folder
- Verify the recipient email is correct
- Check Resend dashboard → Logs to see delivery status
- Ensure your domain has proper SPF/DKIM records

#### Issue: "Webhook receives event but no email logs"

**Solution:**

- Check if the email function is being called at all
- Look for earlier errors in webhook processing
- Verify the webhook handler is calling `sendOrderEmails()`

#### Issue: "Invoice PDF link missing in emails"

**Solution:**

- Check if `invoice_creation: { enabled: true }` is set in checkout config
- Look for log: `📄 Found invoice PDF URL: ...` in webhook logs
- Verify invoice was created in Stripe Dashboard → Invoices
- Invoice may take a few seconds to generate (usually immediate though)

#### Issue: "Customer got 2 emails about invoice"

**Solution:**

- This is expected behavior:
  - Stripe sends its default invoice email (English) with PDF
  - Your custom email (Czech) also includes the invoice link
- Both emails are intentional for better customer experience

---

## 🔍 Debugging Steps

### Step 1: Add Console Logging

The code now includes detailed logging. Check your production logs for:

```
🔍 Email Configuration Check
📧 Attempting to send customer email
✅ Customer email sent successfully
```

### Step 2: Check Resend Dashboard

1. Go to [Resend Dashboard](https://resend.com/emails)
2. Check the "Emails" tab
3. Look for recent email attempts
4. Check their status (delivered, bounced, failed)

### Step 3: Verify Webhook is Working

1. Make a test purchase in production
2. Check Stripe Dashboard → Events
3. Verify `checkout.session.completed` was sent
4. Check if it shows as "Succeeded" (not "Failed")

### Step 4: Test Email Function Directly

Temporarily add a test route in production:

```typescript
// app/api/debug-email/route.ts
import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/email";

export async function GET() {
  const result = await sendOrderEmails({
    orderId: "test-" + Date.now(),
    customerEmail: "your@email.com", // Your email
    customerName: "Test Customer",
    items: [{ name: "Test Product", quantity: 1, price: 1000 }],
    subtotal: 1000,
    shipping: 0,
    total: 1000,
  });

  return NextResponse.json(result);
}
```

Visit: `https://your-domain.com/api/debug-email`

---

## 📞 Still Not Working?

If emails still don't work after following all steps:

1. **Check Resend Status:** https://resend.com/status
2. **Review Resend Logs:** https://resend.com/emails (check for errors)
3. **Contact Resend Support:** They're usually very responsive
4. **Check this repository's issues:** Maybe others have encountered the same problem

---

## ✅ Quick Fix Checklist

- [ ] `RESEND_API_KEY` is set in production environment
- [ ] `RESEND_FROM_EMAIL` is set in production environment
- [ ] `ADMIN_EMAIL` is set in production environment
- [ ] Domain is verified in Resend (or using `onboarding@resend.dev`)
- [ ] Deployed latest code with environment variables
- [ ] Checked production logs for errors
- [ ] Verified webhook is receiving events
- [ ] Checked Resend dashboard for email delivery status
- [ ] Tested with test endpoint first

---

## 🎯 Expected Behavior

When everything works correctly:

1. Customer completes checkout ✅
2. Stripe sends webhook to `/api/webhook` ✅
3. Webhook logs show: "📧 Attempting to send customer email" ✅
4. Customer receives order confirmation email ✅
5. Admin receives order notification email ✅
6. Both emails appear in Resend dashboard as "Delivered" ✅
