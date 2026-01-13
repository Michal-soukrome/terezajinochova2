# Testing Webhooks Locally - Complete Guide

## 🚨 THE MAIN ISSUE

**Stripe webhooks DON'T work from `localhost` by default!**

When you test on localhost:

- ❌ Stripe CANNOT reach `http://localhost:3000/api/webhook`
- ❌ No webhook = No emails sent
- ❌ Metadata might not be saved if not passed correctly

## ✅ Solutions

### Option 1: Use Stripe CLI (Recommended for Local Testing)

This forwards Stripe webhook events to your localhost.

#### Step 1: Install Stripe CLI

**Windows:**

```powershell
# Using Scoop
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Or download from: https://github.com/stripe/stripe-cli/releases
```

#### Step 2: Login to Stripe

```bash
stripe login
```

This opens your browser to authenticate.

#### Step 3: Forward Webhooks to Localhost

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

This will output:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

#### Step 4: Update Your `.env` File

Copy the `whsec_xxxxxxxxxxxxx` secret and update:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### Step 5: Restart Your Dev Server

```bash
npm run dev
```

#### Step 6: Test a Purchase

1. Go to your site
2. Add product to cart
3. Checkout with test card: `4242 4242 4242 4242`
4. Complete purchase

**You'll see in the Stripe CLI terminal:**

```
2026-01-13 12:21:09  --> checkout.session.completed
2026-01-13 12:21:09  <-- [200] POST http://localhost:3000/api/webhook
```

**Check your email!** Both customer and admin should receive emails! 📧

---

### Option 2: Use a Tunnel Service (ngrok, localtunnel)

If you don't want to use Stripe CLI:

#### Using ngrok:

```bash
# Install ngrok
choco install ngrok  # Windows
# or download from https://ngrok.com

# Start tunnel
ngrok http 3000
```

This gives you a public URL like: `https://abc123.ngrok.io`

#### Configure Stripe Webhook:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://abc123.ngrok.io/api/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy the webhook signing secret
6. Update `.env`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_ngrok_secret
```

---

### Option 3: Deploy to Production/Staging

The proper way for production:

1. Deploy your app to Vercel/Netlify/etc.
2. Get your production URL: `https://terezajinochova.cz`
3. In Stripe Dashboard → Webhooks:
   - Add endpoint: `https://terezajinochova.cz/api/webhook`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the **production** webhook secret
4. Add to production environment variables

---

## 🔍 Debugging Packeta Pickup Point Issue

### Issue: Packeta data NOT in Stripe

Looking at your Stripe data, I see:

- ✅ Shipping address is there
- ❌ NO metadata about pickup point
- ❌ NO `packeta_point_id`, `packeta_point_name`, etc.

### Root Cause:

The `pickupPoint` data **is not being sent** from your frontend to the checkout API.

### How to Check:

#### 1. Check Your Buy Button Component

Find where you call the checkout API. Look for code like:

```typescript
const response = await fetch("/api/checkout", {
  method: "POST",
  body: JSON.stringify({
    productId: "basic",
    locale: "cs",
    pickupPoint: {
      // ← This is missing!
      id: "12345",
      name: "Zásilkovna Praha 1",
      street: "Václavské náměstí 1",
      city: "Praha",
      zip: "110 00",
    },
  }),
});
```

#### 2. Search for the Checkout Call

```powershell
# Find where checkout API is called
grep -r "api/checkout" components/ app/
```

#### 3. Verify Packeta Widget Integration

You need to:

1. Show Packeta widget for pickup point selection
2. Store selected pickup point in state
3. Send it to `/api/checkout` when creating session

### Expected Flow:

```
User clicks "Buy with Pickup"
  → Packeta widget opens
  → User selects pickup point
  → pickupPoint data stored
  → Sent to /api/checkout
  → Saved in Stripe metadata
  → Visible in webhook & success page
```

---

## 🧪 Testing Checklist

### Before Testing:

- [ ] Stripe CLI installed and running: `stripe listen --forward-to localhost:3000/api/webhook`
- [ ] Dev server running: `npm run dev`
- [ ] Environment variables set:
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET` (from Stripe CLI)
  - [ ] `RESEND_API_KEY`
  - [ ] `RESEND_FROM_EMAIL`
  - [ ] `ADMIN_EMAIL`

### During Test:

- [ ] Open browser console (F12)
- [ ] Open Stripe CLI terminal
- [ ] Add product to cart
- [ ] If pickup option: select a pickup point
- [ ] Complete checkout with `4242 4242 4242 4242`

### After Test - Check:

- [ ] Stripe CLI shows webhook received (200 response)
- [ ] Server console shows "Order emails sent successfully"
- [ ] Customer email received
- [ ] Admin email received
- [ ] Success page shows order details
- [ ] Success page shows pickup point (if selected)
- [ ] Stripe dashboard shows metadata

---

## 🐛 Common Issues & Solutions

### "No email received"

**Cause:** Webhook not reaching your server
**Solution:** Use Stripe CLI to forward webhooks

### "Packeta info not showing"

**Cause:** pickupPoint not sent to checkout API
**Solution:** Check frontend code that calls `/api/checkout`

### "Invalid webhook signature"

**Cause:** Wrong `STRIPE_WEBHOOK_SECRET`
**Solution:**

- For Stripe CLI: Use the secret from `stripe listen` output
- For production: Use secret from Stripe Dashboard webhook

### "Email sent but not received"

**Check:**

1. Spam folder
2. Resend dashboard (see delivery status)
3. Check `RESEND_FROM_EMAIL` is verified
4. Check `ADMIN_EMAIL` is correct

### "Metadata not in Stripe"

**Check:**

1. Console log in `/api/checkout` - is `pickupPoint` received?
2. Add logging:

```typescript
console.log("Received pickupPoint:", pickupPoint);
console.log("Session metadata:", sessionConfig.metadata);
```

---

## 📝 Quick Test Script

Add this to test the entire flow:

```typescript
// app/api/test-checkout/route.ts
import { NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/email";

export async function GET() {
  const result = await sendOrderEmails({
    orderId: "test_" + Date.now(),
    customerEmail: "jirak5@seznam.cz",
    customerName: "Test Customer",
    items: [
      {
        name: "Svatební deník malý",
        quantity: 1,
        price: 99000, // 990 CZK in cents
      },
    ],
    subtotal: 99000,
    shipping: 8900,
    total: 107900,
    packetaPickupPoint: {
      id: "12345",
      name: "Zásilkovna Praha 1",
      address: "Václavské náměstí 1, Praha, 110 00",
    },
    deliveryMethod: "packeta_pickup",
  });

  return NextResponse.json(result);
}
```

Test: `http://localhost:3000/api/test-checkout`

---

## ✅ What I Fixed

1. **Session API** now returns `metadata` and `shipping_cost`
2. **Success page** now displays Packeta pickup point with icon
3. **Type definitions** updated to include metadata

## 🎯 What You Need To Do

1. **Start Stripe CLI:**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

2. **Update `.env` with the CLI webhook secret**

3. **Find and fix** the frontend code that calls `/api/checkout`
   - It needs to send `pickupPoint` data
   - Search for "api/checkout" in your code

4. **Test** the complete flow

---

Need help finding where to add the pickupPoint data? Let me know and I can search your codebase!
