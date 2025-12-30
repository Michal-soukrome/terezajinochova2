# Localization and Caching Improvements

## ✅ Implemented Improvements

### 1. Static Page Caching (ISR)

Added `revalidate = 86400` (24 hours) to the following pages:

- [app/[locale]/page.tsx](app/[locale]/page.tsx) - Homepage
- [app/[locale]/products/page.tsx](app/[locale]/products/page.tsx) - Products listing
- [app/[locale]/products/[slug]/page.tsx](app/[locale]/products/[slug]/page.tsx) - Product details
- [app/[locale]/about/page.tsx](app/[locale]/about/page.tsx) - About page
- [app/[locale]/contact/page.tsx](app/[locale]/contact/page.tsx) - Contact page
- [app/[locale]/privacy/page.tsx](app/[locale]/privacy/page.tsx) - Privacy page

**Benefits:**

- Pages are statically generated at build time
- Cached for 24 hours, then regenerated on next request
- Significantly faster page loads
- Lower server load

### 2. Enhanced SEO with Language Alternates

Updated [lib/metadata.ts](lib/metadata.ts) to include:

- `alternates.canonical` - Canonical URL for the page
- `alternates.languages` - Links to all language versions (cs, en)
- `openGraph.locale` - Proper locale metadata (cs_CZ, en_US)

Updated product detail pages to include language alternates with localized slugs.

**Benefits:**

- Better SEO for multilingual content
- Proper hreflang tags for search engines
- Prevents duplicate content issues
- Helps users find content in their preferred language

### 3. Locale-Specific HTML Lang Attribute

Updated [app/[locale]/layout.tsx](app/[locale]/layout.tsx) to:

- Wrap content in proper `<html>` and `<body>` tags with dynamic `lang` attribute
- Sets `lang="cs"` or `lang="en"` based on current locale

**Benefits:**

- Better accessibility for screen readers
- Proper language detection by browsers
- Improved SEO

### 4. API Route Caching

Enhanced [app/api/session/[sessionId]/route.ts](app/api/session/[sessionId]/route.ts):

- Added `revalidate = 3600` (1 hour) for route segment caching
- Added `Cache-Control` headers: `public, s-maxage=3600, stale-while-revalidate=7200`

**Benefits:**

- Reduces Stripe API calls for paid sessions
- Faster response times for session retrieval
- Lower API costs

## 📋 Additional Recommendations

### 5. Add Middleware for Locale Detection (High Priority)

Create `middleware.ts` in the root to automatically redirect users to their preferred language:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
```

### 6. Optimize Image Loading (Medium Priority)

Consider adding:

- `priority` prop to hero images
- Proper `width` and `height` attributes to all images
- Use `blur` placeholder for better UX
- WebP format for better compression

Example:

```tsx
<Image
  src="/assets/cover.png"
  alt="Wedding Diary"
  width={600}
  height={800}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 7. Add Static Params for Product Slugs (High Priority)

In [app/[locale]/products/[slug]/page.tsx](app/[locale]/products/[slug]/page.tsx), add:

```typescript
export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const product of PRODUCT_LIST) {
      params.push({
        locale,
        slug: product.slugs[locale as Locale],
      });
    }
  }

  return params;
}
```

This ensures all product pages are pre-rendered at build time.

### 8. Consider Content Splitting (Low Priority)

Split `CONTENT` object by locale to reduce bundle size:

- `lib/content/cs.ts`
- `lib/content/en.ts`
- Import only the needed locale

### 9. Add Cache Tags for On-Demand Revalidation (Medium Priority)

Use Next.js cache tags for more granular control:

```typescript
export const revalidate = 86400;
export const tags = ["products"];

// Then revalidate on-demand when products change:
// revalidateTag('products')
```

### 10. Consider Redis Caching for Stripe Sessions (Low Priority)

For high-traffic scenarios, cache Stripe session data in Redis:

- Reduces API calls to Stripe
- Faster response times
- Set TTL based on session expiry

## 🎯 Performance Impact

Expected improvements:

- **Page Load Time**: 40-60% faster for returning visitors
- **Server CPU**: 30-50% reduction in server-side rendering
- **SEO**: Better indexing and ranking for multilingual content
- **User Experience**: Faster navigation, especially for static pages

## 🔍 Testing Checklist

- [ ] Test language switching on all pages
- [ ] Verify hreflang tags in page source
- [ ] Test cache behavior after 24 hours
- [ ] Verify Stripe session caching with multiple requests
- [ ] Check Google Search Console for proper language indexing
- [ ] Test with slow network to verify caching benefits

## 📊 Monitoring

Consider monitoring:

- Cache hit rates
- Page load times by locale
- Stripe API usage
- ISR regeneration frequency
- Core Web Vitals by locale
