# Asset Comments for terezajinochova2

Short annotations for the major assets (routing, i18n, Stripe, UI).

Top-level files

- .env.example — lists required Stripe keys and environment variables.
- README.md — put quick dev instructions here (stripe listen, .env.local)

app/

- app/layout.tsx — global layout and fonts; keep minimal.
- app/globals.css — Tailwind styles.
- app/page.tsx — public home, redirects are handled by middleware.

app/[locale]/

- app/[locale]/layout.tsx — validates locale and renders header.
- app/[locale]/page.tsx — localized homepage.
- app/[locale]/products/page.tsx — product listing; uses PRODUCT_LIST.
- app/[locale]/products/[slug]/page.tsx — product detail page; now resolves localized slugs.
- app/[locale]/success/page.tsx — success page uses `/api/session/:id` to fetch receipt.
- app/[locale]/cancel/page.tsx — cancel page now offers localized links to home and products.

app/api/

- app/api/checkout/route.ts — creates Stripe checkout session. Ensure STRIPE_SECRET_KEY set.
- app/api/session/[sessionId]/route.ts — fetches session details; checks `payment_status === 'paid'`.
- app/api/webhook/route.ts — webhook signature validation; uses `stripe.webhooks.constructEvent` and an in-memory Set for idempotency (dev only; use DB or Redis in prod).

components/

- BuyButton.tsx — client component; posts `productId` and `locale` to `/api/checkout`.
- Header.tsx — top navigation.
- LanguageSwitcher.tsx — sets `NEXT_LOCALE` cookie and keeps product detail when switching.
- ProductCard.tsx — shows product info and price (watch price units/currency formatting).
- TranslatedLink.tsx — small `Link` wrapper that shows localized slugs.

lib/

- lib/i18n.ts — helper for preferred locale; reads cookie then Accept-Language; default is `cs`.
- lib/routes.ts — mapping between localized and canonical slugs.
- lib/products.ts — product catalog and helpers like `getProductByLocalizedSlug`.
- lib/cookies.ts — small cookie helper used by LanguageSwitcher.

other

- next.config.ts — programmatic rewrites to map localized URLs to canonical internal routes; good if you need localized visible URLs, otherwise removes complexity.
- proxy.ts — middleware that enforces locale prefix and canonical slugs; consider renaming to `middleware.ts` if desired.
- scripts/generate-tree.js — dev script to output file tree.
