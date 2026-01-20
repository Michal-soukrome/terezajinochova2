# Production Deployment Checklist & Changes

## 🚀 Go-Live Production Changes

This document tracks all changes made when deploying to production mode. It serves as a reference for future deployments and preserves removed code for potential future use.

**Date:** January 20, 2026
**Status:** ✅ Completed

---

## 📋 Changes Made

### 1. Removed Test Products from Product Catalog

**Reason:** Clean production catalog with only real products

**Files Modified:**

- `lib/products.ts` - Removed test products from PRODUCTS object
- `.env.development` - Removed STRIPE_PRICE_TEST\* variables
- `.env.production` - Removed STRIPE_PRICE_TEST\* variables

**Removed Products (Preserved for Reference):**

#### Test Product (No Shipping)

```typescript
test: {
  id: "test",
  slugs: {
    cs: "test",
    en: "test",
  },
  stripePriceId: process.env.STRIPE_PRICE_TEST!,
  names: {
    cs: "Testovací produkt",
    en: "Test product",
  },
  descriptions: {
    cs: "Testovací produkt pro ověření platební brány.",
    en: "Test product for payment gateway verification.",
  },
  priceCZK: 1500, // 100 CZK for testing
  requiresShipping: false, // shipping for test product
  image: "/assets/cover.png",
  gallery: ["/assets/cover.png"],
  additionalImages: [],
  highlights: {
    cs: [
      "Pouze pro testování",
      "Bez dopravy",
      "Nízká cena pro testovací účely",
    ],
    en: [
      "Testing purposes only",
      "No shipping required",
      "Low price for testing",
    ],
  },
},
```

#### Test Product with Shipping

```typescript
"test-shipping": {
  id: "test-shipping",
  slugs: {
    cs: "test-doprava",
    en: "test-shipping",
  },
  stripePriceId: process.env.STRIPE_PRICE_TEST_SHIPPING!,
  names: {
    cs: "Testovací produkt s dopravou",
    en: "Test Product with Shipping",
  },
  descriptions: {
    cs: "Testovací produkt pro ověření kompletního procesu nákupu včetně Zásilkovny.",
    en: "Test product for verifying the complete purchase process including Packeta.",
  },
  priceCZK: 10400, // 15 + 89 CZK shipping for testing
  requiresShipping: true,
  weight: 0.3, // 300g test package
  image: "/assets/cover.png",
  gallery: ["/assets/diary/basic0.jpg"],
  additionalImages: [],
  highlights: {
    cs: [
      "Testování kompletního nákupního procesu",
      "Včetně výběru Packeta výdejny",
      "Ověření dopravy a platby",
      "Nízká cena pro testovací účely",
    ],
    en: [
      "Testing complete purchase process",
      "Including Packeta pickup point selection",
      "Verifying shipping and payment",
      "Low price for testing purposes",
    ],
  },
},
```

**Environment Variables Removed:**

```bash
# From both .env.development and .env.production
STRIPE_PRICE_TEST=price_1Sp6o2EZ9QJo6JyeFOJSIzfM
STRIPE_PRICE_TEST_SHIPPING=price_1Sp6o2EZ9QJo6JyeFOJSIzfM
```

---

## 📦 Current Production Products

Only these products remain active:

### Basic Wedding Diary

- **ID:** `basic`
- **Slugs:** `zakladni` (cs), `basic` (en)
- **Price:** 849 CZK
- **Shipping:** Required (0.8kg)

### Premium Wedding Diary

- **ID:** `premium`
- **Slugs:** `premium` (cs), `premium` (en)
- **Price:** 949 CZK
- **Shipping:** Required (1.2kg)

---

## 🧪 Testing Infrastructure (Still Available)

These testing tools remain available for development and troubleshooting:

- **Test Email API:** `/api/test-email?email=your@email.com`
- **Test Invoice API:** `/api/test-invoice`
- **Test Packeta API:** `/api/test-packeta`
- **Development Environment:** Test Stripe keys in `.env.development`

---

## ✅ Production Verification Checklist

- [x] Test products removed from product catalog
- [x] Environment variables cleaned up
- [x] Build successful with only production products
- [x] Routes only show diary products
- [x] Testing infrastructure preserved
- [x] Email templates working with real products

---

## 🔄 Future Deployment Considerations

**If test products are needed again:**

1. Add back the product objects to `lib/products.ts`
2. Add corresponding Stripe price IDs to environment files
3. Update PRODUCT_LIST export automatically includes them
4. Test routes will be available at `/products/test` and `/products/test-doprava`

**Environment Variables to Restore:**

```bash
# Development
STRIPE_PRICE_TEST=price_1Sp6o2EZ9QJo6JyeFOJSIzfM
STRIPE_PRICE_TEST_SHIPPING=price_1Sp6o2EZ9QJo6JyeFOJSIzfM

# Production (if needed)
STRIPE_PRICE_TEST=price_1SmwI37YygHD1QH4V0gW1wTl
STRIPE_PRICE_TEST_SHIPPING=price_1SmwI37YygHD1QH4V0gW1wTl
```

---

## 📝 Notes

- Test products were removed to prevent confusion and maintain clean production catalog
- All testing functionality remains available through dedicated API endpoints
- This documentation preserves the removed code for future reference
- Build verification confirmed only diary products are active</content>
  <parameter name="filePath">c:\Users\michal.jirak\Documents\GitHub\terezajinochova2\docs\PRODUCTION_DEPLOYMENT.md
