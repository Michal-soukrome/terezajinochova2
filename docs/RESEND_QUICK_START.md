# Resend Email Integration - Quick Start

## ✅ What's Been Implemented

Your Stripe checkout now automatically sends transactional emails using Resend API:
- **Customer**: Receives order confirmation with details
- **Admin**: Receives notification about new orders

## 🎯 Quick Setup (5 minutes)

### 1. Get Resend API Key
```
1. Go to https://resend.com and sign up
2. Navigate to API Keys → Create API Key
3. Copy the key (starts with "re_")
```

### 2. Add Environment Variables
Create/update `.env.local`:
```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev  # or your verified domain
ADMIN_EMAIL=your@email.com               # where you want notifications
```

### 3. Test It Works
Visit: `http://localhost:3000/api/test-email?email=your@email.com`

You should receive a test email! ✉️

### 4. Make a Test Purchase
```
1. Add product to cart
2. Checkout with test card: 4242 4242 4242 4242
3. Complete purchase
4. Check inbox - you'll get TWO emails:
   - Customer confirmation (to buyer's email)
   - Admin notification (to your ADMIN_EMAIL)
```

## 📁 What Was Created

```
lib/
  ├── email.ts                    # Email sending functions
  └── email-templates.tsx         # HTML email templates

app/api/
  ├── webhook/route.ts           # Updated to send emails
  └── test-email/route.ts        # Test endpoint (optional)

docs/
  └── RESEND_EMAIL_SETUP.md      # Complete documentation

.env.example                      # Environment variables template
```

## 🔧 Files Modified

### `app/api/webhook/route.ts`
- Added import for `sendOrderEmails`
- Extracts order details from Stripe session
- Sends customer and admin emails on successful checkout

### Key Features:
- ✅ Bilingual emails (Czech/English)
- ✅ Order details with itemized list
- ✅ Shipping/pickup point information
- ✅ Beautiful HTML formatting
- ✅ Error handling (won't break webhook)
- ✅ Logged results for debugging

## 🚀 Production Setup

For production, you should:

1. **Verify your domain** in Resend:
   - Add DNS records
   - Use `orders@terezajinochova.cz` instead of `onboarding@resend.dev`

2. **Update `.env.local`**:
```bash
RESEND_FROM_EMAIL=orders@terezajinochova.cz
ADMIN_EMAIL=tereza@terezajinochova.cz
```

## 📧 Email Templates

### Customer Email Includes:
- 💐 Friendly greeting
- 📦 Order number and items
- 💰 Price breakdown (subtotal, shipping, total)
- 📍 Shipping/pickup address
- ⏱️ What happens next timeline
- 📞 Contact information

### Admin Email Includes:
- 🔔 Alert-style notification
- 👤 Customer details
- 📋 Complete order info
- 📍 Delivery details
- ✅ Action items checklist

## 🛠️ Troubleshooting

**Emails not arriving?**
- Check spam folder
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for delivery status
- Use test endpoint to verify configuration

**"Invalid from email" error?**
- Use `onboarding@resend.dev` for development
- Or verify your domain in Resend dashboard

**Webhook not triggering?**
- Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhook`
- Check STRIPE_WEBHOOK_SECRET is correct

## 📊 Monitoring

- **Resend Dashboard**: See all sent emails and their status
- **Console Logs**: Check server logs for send confirmations
- **Email IDs**: Logged for each successful send

## 💰 Resend Pricing

- **Free**: 100 emails/day (3,000/month) - Perfect to start!
- **Pro**: $20/month for 50,000 emails

## 📖 Full Documentation

See [RESEND_EMAIL_SETUP.md](./RESEND_EMAIL_SETUP.md) for complete guide.

## 🎉 You're Done!

Your e-commerce store now has professional transactional emails! Every purchase automatically notifies both customer and admin.

---

**Need help?** Check the full documentation or test with the `/api/test-email` endpoint.
