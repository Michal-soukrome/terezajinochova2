# Affiliate Commission Tracking Setup

## 🎯 Overview

This guide explains how to set up and track affiliate commissions for influencers selling your wedding diary.

## 📊 Current System Status

Your website **already tracks** referral data automatically:

- ✅ Referral codes stored in Stripe metadata
- ✅ UTM parameters captured (source, medium, campaign)
- ✅ Admin emails show referral info for every order
- ✅ 30-day cookie tracking

**What's Missing:** Easy commission calculation and payment system

---

## 💰 Recommended Setup: 3 Options

### **Option 1: Stripe Coupon Codes (RECOMMENDED - Easiest)**

**How it works:**

- Create unique coupon codes for each influencer in Stripe
- Customers get a discount when using influencer's code
- You track sales and pay commissions manually

**Pros:**

- ✅ No code changes needed
- ✅ Built-in Stripe reporting
- ✅ Customers get incentive to buy
- ✅ Easy to see which influencer generated what sales

**Setup Steps:**

1. **Create Coupons in Stripe Dashboard:**
   - Go to: Stripe Dashboard → Products → Coupons
   - Create codes like:
     - `MARIA10` → 10% discount
     - `SARAH15` → 15% discount
     - `WEDDINGBLOG200` → 200 Kč flat discount

2. **Give influencers their links:**

   ```
   https://www.svatebnipribehy.com/cs/products/basic?coupon=MARIA10
   ```

3. **Track commissions:**
   - Stripe Dashboard → Coupons → Click on specific coupon → See all orders
   - Calculate commission: Orders × Product Price × Commission %
   - Example: 5 orders × 1500 Kč × 15% = 1,125 Kč commission

**Payout Process:**

- Monthly: Export coupon usage from Stripe
- Calculate commissions in spreadsheet
- Pay influencers via bank transfer

---

### **Option 2: Stripe Promotion Codes (More Professional)**

**How it works:**

- Similar to coupons but with automatic application at checkout
- Better UI/UX - code applies automatically from URL

**Pros:**

- ✅ Seamless customer experience
- ✅ Better conversion rates
- ✅ Professional affiliate system

**Setup Steps:**

1. **Enable Promotion Codes in your checkout:**
   - Already supported in your code
   - Just need to create codes in Stripe

2. **Create Promotion Codes:**

   ```
   Stripe Dashboard → Products → Promotion codes
   ```

3. **Auto-apply from URL:**

   ```
   https://www.svatebnipribehy.com/cs?promotion_code=MARIA10
   ```

4. **Track same as coupons above**

---

### **Option 3: Referral Metadata Only (No Discounts)**

**How it works:**

- Track using existing `?ref=influencer_name` parameter
- No customer discount - full price sales
- Pay commissions based on metadata in Stripe

**Pros:**

- ✅ No discount = Higher profit margin
- ✅ Already implemented - no code changes
- ✅ Track in admin emails

**Cons:**

- ❌ Manual tracking required
- ❌ No incentive for customers
- ❌ Lower conversion rates

**Setup Steps:**

1. **Give influencers their links:**

   ```
   https://www.svatebnipribehy.com/cs?ref=maria_instagram
   https://www.svatebnipribehy.com/en?ref=sarah_facebook
   ```

2. **Track commissions manually:**
   - Check admin order emails for referral info
   - Export Stripe orders with metadata
   - Search for `referral_ref` or `referral_campaign`

3. **Export from Stripe:**

   ```
   Stripe Dashboard → Payments → Export
   Include: Metadata fields
   Filter by date range
   ```

4. **Calculate in spreadsheet:**
   - Filter orders by `referral_ref:maria_instagram`
   - Sum order totals
   - Multiply by commission rate

---

## 🎯 My Recommendation: **Option 1 (Coupon Codes)**

**Why:**

- ✅ Easiest to set up (5 minutes per influencer)
- ✅ Customers get discount = higher conversion
- ✅ Automatic tracking in Stripe
- ✅ Professional and proven system
- ✅ No code changes needed

**Commission Structure Example:**

| Tier   | Monthly Sales | Commission % | Example Earnings |
| ------ | ------------- | ------------ | ---------------- |
| Basic  | 1-5 orders    | 10%          | 750-3,750 Kč     |
| Silver | 6-15 orders   | 15%          | 13,500-33,750 Kč |
| Gold   | 16+ orders    | 20%          | 48,000+ Kč       |

**Typical Wedding Influencer Rates:**

- Small influencers (1-10K followers): 10%
- Medium influencers (10-50K followers): 15%
- Large influencers (50K+ followers): 20%

---

## 📝 Step-by-Step Implementation

### 1. Create Your First Affiliate

**In Stripe Dashboard:**

1. Go to: Products → Coupons → Create coupon
2. Fill in:
   - **Name:** "Maria Instagram Affiliate"
   - **ID:** `MARIA10`
   - **Type:** Percentage discount
   - **Discount:** 10%
   - **Duration:** Forever
   - **Max redemptions:** Unlimited

3. Share with influencer:

   ```
   Your affiliate link:
   https://www.svatebnipribehy.com/cs?coupon=MARIA10

   Commission: 15% on all sales
   You'll earn: 225 Kč per diary sold (1,500 Kč × 15%)
   ```

### 2. Track Sales

**Monthly process:**

1. Stripe Dashboard → Coupons → Click "MARIA10"
2. See all orders using this coupon
3. Export to spreadsheet
4. Calculate commission:
   ```
   Total orders: 8
   Total revenue: 12,000 Kč (8 × 1,500 Kč)
   Commission: 1,800 Kč (12,000 × 15%)
   ```

### 3. Pay Influencer

Send bank transfer with note:

```
Commission for January 2026
Orders: 8
Revenue: 12,000 Kč
Commission (15%): 1,800 Kč
```

---

## 🔧 Code Integration (Optional Enhancement)

If you want to **auto-apply** coupon codes from URL:

### Update checkout API to accept coupon parameter:

```typescript
// app/api/checkout/route.ts
const couponCode = searchParams.get("coupon");

const sessionConfig = {
  // ... existing config
  discounts: couponCode
    ? [
        {
          coupon: couponCode,
        },
      ]
    : undefined,
};
```

This would allow links like:

```
https://www.svatebnipribehy.com/cs/products/basic?coupon=MARIA10
```

**Note:** This is optional - Stripe Checkout already has a coupon field where customers can enter codes manually.

---

## 📊 Reporting Dashboard (Future Enhancement)

Consider building a simple admin dashboard to:

- Show all affiliates
- Display sales per affiliate
- Calculate commissions automatically
- Generate payment reports

**Tools to use:**

- Next.js admin page
- Stripe API to fetch coupon usage
- Simple table showing: Affiliate | Sales | Commission | Status

---

## 💡 Best Practices

### For Influencers:

1. **Exclusive codes** - Each influencer gets unique code
2. **Performance tiers** - Better commission for higher sales
3. **Monthly payouts** - Pay on 1st of each month
4. **Clear terms** - Written agreement on commission rates

### For Customers:

1. **Clear value** - "10% off with code MARIA10"
2. **Easy to use** - Auto-apply from link or manual entry
3. **Combine with referral tracking** - Track both for double verification

### For You:

1. **Track everything** - Use both coupons AND referral metadata
2. **Verify sales** - Check admin emails match Stripe reports
3. **Automate** - Set up monthly reminder to calculate commissions
4. **Spreadsheet** - Keep master list of all affiliates and payouts

---

## 📄 Affiliate Agreement Template

```
AFFILIATE AGREEMENT

Influencer: [Name]
Instagram/Platform: [@handle]
Coupon Code: [CODE]
Commission Rate: [%]

Terms:
- Commission paid monthly (by 5th of following month)
- Minimum payout: 500 Kč
- 30-day cookie tracking
- Commission on completed orders only (no refunds)
- Payment via bank transfer

Signature: ________________
Date: ________________
```

---

## 🚀 Quick Start Checklist

- [ ] Decide commission structure (10%, 15%, 20%?)
- [ ] Create first coupon code in Stripe
- [ ] Test checkout flow with coupon
- [ ] Create affiliate agreement template
- [ ] Reach out to first influencer
- [ ] Track first sales
- [ ] Make first commission payment
- [ ] Scale to more influencers

---

## 📞 Support

If you need help with:

- Creating Stripe coupons
- Exporting sales data
- Calculating commissions
- Building automated dashboard

Let me know and I can help implement any of these features!
