# Issues Found & Fixes Applied

## Date: January 13, 2026

---

## ❌ Issue 1: No Emails Being Sent from Localhost

### Problem:

When testing checkout on `localhost:3000`, no emails are being sent to customer or admin.

### Root Cause:

**Stripe webhooks cannot reach localhost!**

When you complete a purchase:

1. Stripe processes payment ✅
2. Stripe tries to send webhook to `http://localhost:3000/api/webhook` ❌
3. Your localhost is not publicly accessible ❌
4. Webhook never arrives = No emails sent ❌

### Solution:

You **MUST** use Stripe CLI to forward webhooks to localhost:

```bash
# Install Stripe CLI (if not installed)
# Download from: https://github.com/stripe/stripe-cli/releases

# Login to Stripe
stripe login

# Forward webhooks to your localhost
stripe listen --forward-to localhost:3000/api/webhook
```

This will output a webhook secret like:

```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**Update your `.env` file:**

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # ← Use the NEW secret from CLI
```

**Restart your dev server:**

```bash
npm run dev
```

**Now test again!** Emails should work! 📧

### Status: ✅ FIXED

- Added webhook testing documentation
- Updated environment variable comments

---

## ❌ Issue 2: Packeta Pickup Point NOT in Stripe Data

### Problem:

When selecting a Packeta pickup point during checkout:

- Pickup point is selected ✅
- Checkout completes ✅
- But Stripe shows NO metadata about the pickup point ❌
- Success page doesn't show pickup point ❌

Looking at your Stripe payment data:

```
Shipping details: U Parketárny 1522, 27351 Unhošť CZ
Metadata: (empty) ← SHOULD have packeta_point_id, packeta_point_name, etc.
```

### Root Cause:

The code structure is correct, but the issue is likely one of:

1. **Packeta widget not loading**
   - Missing API key
   - Widget script not included

2. **Widget not integrated properly**
   - Point selection not triggering callback
   - Data not being passed correctly

3. **Environment variable missing**
   ```bash
   NEXT_PUBLIC_PACKETA_API_KEY=your_packeta_key_here
   ```

### What I Fixed:

#### 1. Session API Now Returns Metadata

File: `app/api/session/[sessionId]/route.ts`

```typescript
// Added to response:
metadata: session.metadata,
shipping_cost: session.total_details?.amount_shipping,
```

#### 2. Success Page Shows Packeta Info

File: `components/sections/SuccessContent.tsx`

- Added `metadata` and `shipping_cost` to `SessionData` interface
- Added visual display of Packeta pickup point with icon
- Shows pickup point OR regular shipping address

Now displays:

```
📍 Výdejní místo Zásilkovna
   Zásilkovna Praha 1
   Václavské náměstí 1, Praha, 110 00
   ID: 12345
```

### What You Need to Check:

#### 1. Check Packeta API Key

```bash
# In your .env file
NEXT_PUBLIC_PACKETA_API_KEY=your_packeta_api_key_here
```

#### 2. Check Packeta Widget Script

Look in `app/layout.tsx` or similar - you should have:

```html
<script src="https://widget.packeta.com/v6/www/js/library.js"></script>
```

#### 3. Test Packeta Widget

1. Click "Koupit" on a product
2. Does Packeta map open?
3. Can you select a pickup point?
4. Does it proceed to Stripe checkout?

#### 4. Add Debug Logging

Update `app/api/checkout/route.ts`:

```typescript
export async function POST(request: NextRequest) {
  try {
    const { productId, locale, pickupPoint } = await request.json();

    // ADD THIS DEBUG LOG
    console.log('🔍 Received checkout request:', {
      productId,
      locale,
      pickupPoint
    });

    // ... rest of code
```

Then watch the server console when you test!

### Status: ⚠️ PARTIALLY FIXED

- ✅ Code ready to handle metadata
- ✅ Success page will display it
- ⚠️ Need to verify Packeta widget is working
- ⚠️ Need to test end-to-end with Stripe CLI

---

## 🧪 Complete Testing Steps

### Setup (One Time)

1. **Install Stripe CLI**

   ```bash
   # Download from: https://github.com/stripe/stripe-cli/releases
   # Or use: scoop install stripe
   ```

2. **Check Environment Variables**

   ```bash
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_PACKETA_PICKUP_RATE=shr_...
   STRIPE_PACKETA_DELIVERY_RATE=shr_...

   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=tereza@svatebnipribehy.com
   ADMIN_EMAIL=jirak5@seznam.cz

   NEXT_PUBLIC_PACKETA_API_KEY=your_packeta_key  # ← Check this!
   ```

3. **Start Stripe CLI**

   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhook
   ```

4. **Copy the webhook secret from CLI output and update .env**

   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_... # ← From Stripe CLI
   ```

5. **Restart dev server**
   ```bash
   npm run dev
   ```

### Test Flow

#### Terminal Setup:

- Terminal 1: `npm run dev` (your app)
- Terminal 2: `stripe listen --forward-to localhost:3000/api/webhook`

#### Test Regular Purchase (No Shipping):

1. Go to products page
2. Click "Koupit" on a digital product
3. Complete with test card: `4242 4242 4242 4242`
4. **Check Stripe CLI** - should show webhook received
5. **Check emails** - customer and admin should receive
6. **Check success page** - should show order

#### Test with Packeta Pickup:

1. Go to a product that requires shipping
2. Click "Koupit"
3. **Does Packeta widget open?**
   - ✅ YES: Continue
   - ❌ NO: Packeta not configured correctly
4. Select a pickup point
5. Complete with test card: `4242 4242 4242 4242`
6. **Check Stripe CLI** - should show webhook
7. **Check server console** - should show pickup point data
8. **Check emails** - should show pickup point info
9. **Check success page** - should show pickup point with icon
10. **Check Stripe dashboard** - metadata should have packeta fields

### What to Look For

#### Stripe CLI Output:

```bash
2026-01-13 12:21:09  --> checkout.session.completed [evt_xxx]
2026-01-13 12:21:09  <-- [200] POST http://localhost:3000/api/webhook [evt_xxx]
```

#### Server Console:

```
🔍 Received checkout request: {
  productId: 'basic',
  locale: 'cs',
  pickupPoint: {
    id: '12345',
    name: 'Zásilkovna Praha 1',
    street: 'Václavské náměstí 1',
    ...
  }
}
Checkout completed: cs_test_xxx 107900
Order emails sent successfully: {
  customerEmailId: 're_xxx',
  adminEmailId: 're_xxx'
}
```

---

## 📝 Summary

### What Was Fixed:

1. ✅ Session API returns metadata and shipping cost
2. ✅ Success page displays Packeta pickup point info
3. ✅ TypeScript types updated
4. ✅ Documentation created for webhook testing

### What You Need to Do:

1. ⚠️ **CRITICAL**: Run Stripe CLI for webhooks to work on localhost
2. ⚠️ Verify `NEXT_PUBLIC_PACKETA_API_KEY` is set
3. ⚠️ Test Packeta widget functionality
4. ⚠️ Add debug logging to checkout API
5. ⚠️ Test complete flow with Stripe CLI running

### Files Modified:

- `app/api/session/[sessionId]/route.ts` - Returns metadata
- `components/sections/SuccessContent.tsx` - Displays Packeta info
- `docs/WEBHOOK_LOCAL_TESTING.md` - Complete testing guide
- `docs/ISSUES_AND_FIXES.md` - This file

---

## 🆘 Need Help?

If issues persist:

1. Share the output from Stripe CLI terminal
2. Share the server console logs
3. Share browser console errors (F12)
4. Let me know what step fails

---

**Next Step:** Start Stripe CLI and test!

```bash
stripe listen --forward-to localhost:3000/api/webhook
```
