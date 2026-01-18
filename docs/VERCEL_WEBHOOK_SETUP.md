# Vercel Production Webhook Setup

## 🚨 Problem: No webhook logs in Vercel

If you're not seeing any logs in Vercel for `/api/webhook`, it means Stripe is not sending events to your production endpoint.

## ✅ Solution: Configure Stripe Production Webhook

### Step 1: Get Your Vercel Production URL

Your webhook endpoint should be:

```
https://your-domain.vercel.app/api/webhook
```

Or if you have a custom domain:

```
https://terezajinochova.cz/api/webhook
```

### Step 2: Create Production Webhook in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **Webhooks**
3. Click **+ Add endpoint**
4. Enter your production URL: `https://your-domain.vercel.app/api/webhook`
5. Click **Select events**
6. Choose these events:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded` (optional)
7. Click **Add endpoint**

### Step 3: Copy the Webhook Signing Secret

1. After creating the endpoint, click on it
2. Click **Reveal** under "Signing secret"
3. Copy the secret (starts with `whsec_`)

### Step 4: Add Secret to Vercel Environment Variables

1. Go to your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: `whsec_xxxxxxxxxxxxx` (your production webhook secret)
   - **Environment**: Select **Production** only
4. Click **Save**

### Step 5: Redeploy

1. Go to **Deployments**
2. Click on the latest deployment
3. Click **⋯** (three dots) → **Redeploy**
4. OR make a small change and push to trigger a new deployment

## 🧪 Testing Production Webhook

### Method 1: Test from Stripe Dashboard

1. Go to Stripe Dashboard → **Webhooks**
2. Click on your production webhook endpoint
3. Click **Send test webhook**
4. Select `checkout.session.completed`
5. Click **Send test webhook**
6. Check Vercel logs - you should now see activity!

### Method 2: Make a Real Test Purchase

1. Go to your production website
2. Add a product to cart
3. Go through checkout with a test card: `4242 4242 4242 4242`
4. Complete the purchase
5. Check Vercel logs for webhook activity

## 🔍 Vercel Logs Location

To view logs:

1. Go to Vercel Dashboard
2. Select your project
3. Click **Logs** in the left sidebar
4. Filter by function: `/api/webhook`

## 📋 Expected Log Output

If everything is working, you should see:

```
🎯 Webhook endpoint hit!
📍 Request URL: https://your-domain.vercel.app/api/webhook
🔑 Has webhook secret: true
📦 Body length: 1234
✍️ Has signature: true
✅ Webhook signature verified successfully
📋 Event type: checkout.session.completed
🆔 Event ID: evt_xxxxxxxxxxxxx
```

## ❌ Common Issues

### No logs at all = Stripe not sending webhooks

**Fix:** Configure webhook endpoint in Stripe Dashboard (Steps 1-5 above)

### Logs show "Invalid signature"

**Fix:** Wrong webhook secret in Vercel environment variables

### Logs show "Webhook not configured"

**Fix:** Missing `STRIPE_WEBHOOK_SECRET` environment variable in Vercel

## 🔐 Important: Development vs Production Secrets

- **Development** (local): Use secret from Stripe CLI (`stripe listen`)
- **Production** (Vercel): Use secret from Stripe Dashboard webhook endpoint

They are **different** and cannot be interchanged!

## ✅ Verification Checklist

- [ ] Production webhook endpoint created in Stripe Dashboard
- [ ] Webhook URL points to your Vercel domain
- [ ] `checkout.session.completed` event is selected
- [ ] Webhook signing secret copied from Stripe Dashboard
- [ ] `STRIPE_WEBHOOK_SECRET` added to Vercel environment variables
- [ ] Vercel redeployed after adding environment variable
- [ ] Test webhook sent from Stripe Dashboard
- [ ] Logs visible in Vercel Dashboard

## 🆘 Still Not Working?

Check these:

1. **Vercel Function Logs**: Make sure you're looking at the right function (`/api/webhook`)
2. **Stripe Webhook Dashboard**: Check if webhook attempts are being made
3. **Response Codes**: If Stripe shows 4xx or 5xx errors, the endpoint is being hit but failing
4. **Environment**: Make sure the webhook secret is set for Production environment in Vercel

---

**Need more help?** Check the Stripe webhook logs in your Stripe Dashboard to see what responses your endpoint is returning.
