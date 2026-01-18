# Tereza Jinochová - Wedding Diary E-commerce

A modern e-commerce website for selling wedding diaries and planning books. Built with Next.js 16, TypeScript, and integrated with Stripe, Packeta, and Resend.

## 🚀 Features

### 💳 Payment & Checkout

- Stripe integration for secure payments
- Automatic invoice generation (professional PDF invoices)
- Multiple shipping options (Packeta pickup points & home delivery)
- Test mode for development, live mode for production

### 📦 Shipping Integration

- Packeta API integration for automatic shipment creation
- Pickup point selection via Packeta widget
- Automatic shipping label generation
- Real-time tracking information

### 📧 Email Notifications

- Custom Czech/English email templates
- Customer order confirmations with invoice PDF links
- Admin notifications for new orders
- Resend integration for reliable email delivery
- Stripe's default invoice emails (English) with PDF attachments

### 🌍 Internationalization

- Multi-language support (Czech & English)
- Localized routes and content
- Language switcher component
- SEO-friendly URL structure

### 🎨 Modern UI/UX

- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Image lightbox galleries
- PDF flipbook viewer
- Wedding gallery showcases

## 📋 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Stripe account (for payments)
- Resend account (for emails)
- Packeta account (for shipping)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/terezajinochova2.git
   cd terezajinochova2
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Copy the example files and configure:

   ```bash
   cp .env.development.example .env.development
   cp .env.production.example .env.production
   ```

   See [docs/ENV_VARS.md](docs/ENV_VARS.md) for detailed configuration.

4. **Run development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🔧 Configuration

### Required Environment Variables

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PACKETA_PICKUP_RATE=shr_...
STRIPE_PACKETA_DELIVERY_RATE=shr_...

# Resend (Email)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=svatebnipribehy@gmail.com
ADMIN_EMAIL=admin@youremail.com

# Packeta
PACKETA_API_PASSWORD=your_32_char_password
```

See [docs/ENV_VARS.md](docs/ENV_VARS.md) for complete setup guide.

## 📚 Documentation

Comprehensive guides for all integrations:

- **[STRIPE_INVOICE_SETUP.md](docs/STRIPE_INVOICE_SETUP.md)** - Stripe invoice integration
- **[RESEND_EMAIL_SETUP.md](docs/RESEND_EMAIL_SETUP.md)** - Email configuration
- **[PACKETA_INTEGRATION.md](docs/PACKETA_INTEGRATION.md)** - Shipping setup
- **[WEBHOOK_LOCAL_TESTING.md](docs/WEBHOOK_LOCAL_TESTING.md)** - Local webhook testing
- **[EMAIL_TROUBLESHOOTING.md](docs/EMAIL_TROUBLESHOOTING.md)** - Email issues
- **[ENV_VARS.md](docs/ENV_VARS.md)** - Environment variables guide

## 🧪 Testing

### Local Development Testing

1. **Start Stripe webhook forwarding:**

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```

2. **Make a test purchase:**
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

3. **Test email delivery:**

   ```bash
   curl "http://localhost:3000/api/test-email?email=your@email.com"
   ```

4. **Test Packeta integration:**
   ```bash
   curl "http://localhost:3000/api/test-packeta"
   ```

See [docs/WEBHOOK_LOCAL_TESTING.md](docs/WEBHOOK_LOCAL_TESTING.md) for detailed testing guide.

## 📦 Project Structure

```
├── app/                      # Next.js app directory
│   ├── [locale]/            # Localized routes
│   ├── api/                 # API routes
│   │   ├── checkout/        # Stripe checkout
│   │   ├── webhook/         # Stripe webhooks
│   │   └── test-*/          # Test endpoints
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── common/              # Reusable components
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   └── ui/                  # UI components
├── lib/                     # Utility libraries
│   ├── email.ts             # Email service
│   ├── email-templates.tsx  # Email templates
│   ├── packeta-api.ts       # Packeta integration
│   └── products.ts          # Product catalog
├── public/                  # Static assets
│   └── assets/              # Images, PDFs, etc.
└── docs/                    # Documentation
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel Dashboard
3. **Deploy** - automatic deployment on push to main

### Environment Variable Scopes

- **Production**: Live site with real Stripe keys
- **Preview**: Test deployments with test Stripe keys
- **Development**: Local development

See [docs/ENV_VARS.md](docs/ENV_VARS.md) for deployment setup.

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Stripe](https://stripe.com/)** - Payment processing & invoicing
- **[Resend](https://resend.com/)** - Transactional emails
- **[Packeta](https://www.zasilkovna.cz/)** - Shipping & logistics
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[React PDF](https://react-pdf.org/)** - PDF viewer
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS

## 🔍 Key Features Deep Dive

### Automatic Invoice Generation

Every purchase automatically generates:

- Professional PDF invoice (via Stripe)
- Invoice sent in English email from Stripe
- Invoice PDF link included in custom Czech emails
- Invoices stored in Stripe dashboard forever

See [STRIPE_INVOICE_SETUP.md](docs/STRIPE_INVOICE_SETUP.md)

### Dual Email System

Customers receive **two emails**:

1. **Stripe email** (English) - Professional invoice with PDF
2. **Custom email** (Czech) - Beautiful order confirmation with details

Admins receive:

- Custom notification with all order details
- Includes invoice PDF link for quick access

See [RESEND_EMAIL_SETUP.md](docs/RESEND_EMAIL_SETUP.md)

### Automatic Shipping

When order is placed:

1. Customer selects Packeta pickup point
2. Shipment automatically created in Packeta system
3. Shipping label generated immediately
4. Customer receives tracking information
5. Admin can print label from Packeta portal

See [PACKETA_INTEGRATION.md](docs/PACKETA_INTEGRATION.md)

## 🐛 Troubleshooting

### Common Issues

**Emails not sending?**

- Check [EMAIL_TROUBLESHOOTING.md](docs/EMAIL_TROUBLESHOOTING.md)

**Webhooks not working locally?**

- Check [WEBHOOK_LOCAL_TESTING.md](docs/WEBHOOK_LOCAL_TESTING.md)

**Invoice not generated?**

- Check [STRIPE_INVOICE_SETUP.md](docs/STRIPE_INVOICE_SETUP.md)

**Packeta shipment failed?**

- Check [PACKETA_INTEGRATION.md](docs/PACKETA_INTEGRATION.md)

## 📄 License

Private commercial project - All rights reserved

## 👤 Contact

**Tereza Jinochová**

- Website: https://svatebnipribehy.com
- Email: info@svatebnipribehy.com

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installing dependencies

If you see an npm peer dependency error like `ERESOLVE` mentioning `framer-motion` and `react` when running `npm i`, it's usually because the project has React 19 and an older `framer-motion` version that only lists React 18 in its peer dependencies.

To fix this locally we upgraded `framer-motion` to a 12.x release that supports React 19. If you still hit issues you can temporarily bypass strict peer checks with:

```bash
npm i --legacy-peer-deps
```

Prefer upgrading `framer-motion` (or the conflicting package) to a version that lists React 19 in its peerDependencies instead of using the legacy flag.
