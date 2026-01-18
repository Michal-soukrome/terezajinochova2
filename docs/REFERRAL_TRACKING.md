# Referral Tracking Guide

## 🚀 **Key Takeaway: URLs Can Be ANY Format!**

**There is NO required URL format!** The system works with:

- Simple: `?ref=instagram_maria`
- Complex: `?ref=maria&utm_source=instagram&utm_campaign=wedding`
- Automatic: Facebook/Instagram links (detected automatically)
- Mixed: Any combination of parameters

**Just tell influencers to add `?ref=their_name` and you're good to go!**

This guide explains how to use the referral tracking system for influencer marketing and commission tracking.

## 🎯 Overview

**🎉 GREAT NEWS: No complicated URL formatting required!**

The referral tracking system automatically captures referral data from URLs and associates it with customer purchases. This allows you to:

- Track which influencers drive sales
- Calculate commissions for influencers
- Identify marketing channels that work best
- Store referral data in Stripe for easy access

**The system works with ANY URL format - from simple `?ref=name` to full UTM parameters to automatic social media detection.**

## 🔗 How It Works

### 🎉 **NO Specific Format Required!**

**The system is extremely flexible** - influencer URLs can use ANY combination of parameters. You don't need perfect UTM formatting for it to work!

### ✅ **All of These Work Perfectly:**

**1. Simple Referral Code (Recommended for Influencers)**

```
https://svatebnipribehy.com/cs/products/basic?ref=maria_instagram
https://svatebnipribehy.com/en?ref=facebook_sarah
```

**2. Full UTM Parameters (Professional)**

```
https://svatebnipribehy.com/cs?ref=maria&utm_source=instagram&utm_medium=social&utm_campaign=wedding_influencer
```

**3. Partial UTM Parameters**

```
https://svatebnipribehy.com/cs/products/premium?ref=maria&utm_source=instagram
```

**4. Just UTM Without `ref`**

```
https://svatebnipribehy.com/en?source=facebook&medium=social&campaign=wedding_blogger
```

**5. Automatic Social Detection**

- Facebook links automatically get `source=facebook` and `medium=social`
- Instagram links automatically get `source=instagram` and `medium=social`

**6. Mixed Parameters**

```
https://svatebnipribehy.com/cs?ref=maria&fbclid=1234567890&utm_campaign=summer_campaign
```

### 📊 **What Gets Captured:**

The system captures **any combination** of these parameters:

- `?ref=` - Your simple referral code (recommended for influencers)
- `?utm_source=` - Traffic source (facebook, instagram, etc.)
- `?utm_medium=` - How they found you (social, link, etc.)
- `?utm_campaign=` - Campaign/influencer name
- `?fbclid=` - Facebook automatically adds this
- `?igshid=` - Instagram automatically adds this

### 🤖 **Smart Defaults:**

- **No parameters = no tracking** (direct visits)
- **Any parameter = tracking works**
- **Missing parameters = system fills in defaults**
- **Multiple parameters = system uses what's available**

## 📧 Admin Notifications

When an order comes from a referral, the admin email will show:

```
Referral: Zdroj: instagram | Medium: social | Kampaň: wedding_influencer
```

## 🧪 Testing

Visit `/referral-test` to see current referral data and test different URL parameters.

### Test URLs (All Work!):

- `?ref=instagram_influencer1` - Simple referral
- `?utm_source=facebook&utm_medium=social&utm_campaign=wedding_blogger` - Full UTM
- `?utm_source=instagram&utm_medium=stories&utm_campaign=bride_influencer` - Partial UTM
- `?ref=direct_sale` - Just ref parameter

## 💰 Commission Tracking

### Manual Process:

1. Check admin emails for referral information
2. Track commissions in a spreadsheet or database
3. Pay influencers based on successful referrals

### Future Automation:

The referral data is stored in Stripe metadata, making it easy to:

- Export data for commission calculations
- Build automated commission systems
- Generate reports on influencer performance

## 🔧 Technical Details

### Files Modified:

- `lib/referral-tracking.ts` - Core tracking logic
- `proxy.ts` - URL parameter capture
- `app/api/checkout/route.ts` - Stripe metadata inclusion
- `app/api/webhook/route.ts` - Order processing
- `lib/email.ts` & `lib/email-templates.tsx` - Admin notifications
- `components/sections/SuccessContent.tsx` - Cookie cleanup

### Data Structure:

```typescript
interface ReferralData {
  source?: string; // 'facebook', 'instagram', etc.
  medium?: string; // 'social', 'link', etc.
  campaign?: string; // influencer name or campaign
  referrer?: string; // full referrer URL
  ref?: string; // simple referral code
  timestamp?: number; // when referral was captured
}
```

## � **For Influencers - Simple Instructions**

**Tell your influencers to just add `?ref=their_name` to any link they share:**

### ✅ **Easiest Method:**

```
https://svatebnipribehy.com/cs/products/basic?ref=maria_instagram
https://svatebnipribehy.com/en?ref=facebook_sarah
```

### 🎯 **What to Tell Influencers:**

_"Just add `?ref=your_name` to the end of any link you share from Tereza's website. That's it! We'll track your referrals automatically."_

## 📈 **Usage Examples**

### Influencer Links (Simple):

```
https://svatebnipribehy.com/cs/products/basic?ref=maria_instagram
https://svatebnipribehy.com/en?ref=facebook_wedding_blog
```

### Campaign Links (Detailed):

```
https://svatebnipribehy.com/cs?ref=maria&utm_source=instagram&utm_campaign=wedding_season
https://svatebnipribehy.com/en/products/premium?ref=bride_magazine&utm_medium=social
```

### Social Media (Auto-detected):

```
https://svatebnipribehy.com/cs?fbclid=1234567890
https://svatebnipribehy.com/en?igshid=abcdef123456
```

## 📊 Reporting

Referral data appears in:

- Admin order notification emails
- Stripe dashboard (session metadata)
- Browser cookies (for debugging)

Use this data to:

- Calculate influencer commissions
- Measure campaign ROI
- Optimize marketing spend
- Build relationships with successful influencers
