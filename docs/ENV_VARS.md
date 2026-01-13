@ -0,0 +1,170 @@
Environment Variables Guide (Safe Version)
📁 File Structure
Your project uses multiple environment files for different scenarios:

Kód
.env.development # Used in development (npm run dev)
.env.production # Used in production (npm run build/start)
.env.local # Local overrides (optional, git ignored)
.env.local.example # Template for .env.local
🔄 Automatic Switching
Next.js automatically loads the correct file based on the environment:

Command Environment File Loaded Notes
npm run dev Development .env.development Should contain test values
npm run build + npm start Production .env.production Should contain live values
Vercel Production Production Vercel env vars Uses live values
Vercel Preview Preview Vercel env vars Recommended: test values
🚀 Vercel Deployment
Production Environment (Main Branch)
When deploying to Vercel production, configure environment variables in the Vercel Dashboard:

Go to Project Settings → Environment Variables

Add variables with scope Production

Use the values intended for production (from .env.production)

⚠️ Important:
Production webhook secrets must be taken from the Stripe Dashboard → Webhooks (not from Stripe CLI).

Preview Environment (Optional)
For preview deployments (branches, PRs):

Add variables with scope Preview

Use test values (matching .env.development)

This allows safe testing on preview URLs.

🛡️ Stripe Webhook Secrets
Each environment needs its own webhook secret.

Development (Localhost)
Use Stripe CLI:

bash
stripe listen --forward-to localhost:3000/api/webhook
Copy the webhook secret shown and place it in .env.local (which is git‑ignored).

Production (Vercel)
Steps:

Stripe Dashboard → Developers → Webhooks

Add endpoint: https://your-domain.com/api/webhook

Select required events

Copy the webhook signing secret

Add it to Vercel environment variables (Production scope)

📝 Local Override (.env.local)
Use .env.local for machine‑specific or developer‑specific overrides:

Kód

# .env.local (git ignored)

WEBHOOK_SECRET=your_local_webhook_secret
This file is optional and never committed.

🔐 Security Best Practices
✅ DO:
Keep .env.development and .env.production in git (team needs them)

Use .env.local for personal secrets

Store production secrets in Vercel Dashboard

Use test values in development

Use live values only in production

❌ DON'T:
Commit .env.local

Use live values in development

Share webhook secrets publicly

Mix test and live values

🎯 Quick Reference
Local Development
bash
npm run dev

# Loads: .env.development + .env.local (if exists)

Local Production Build
bash
npm run build
npm start

# Loads: .env.production

Vercel Production
bash
git push origin main

# Uses: Vercel environment variables (Production scope)

Vercel Preview
bash
git push origin feature-branch

# Uses: Vercel environment variables (Preview scope)

📋 Environment Variables Checklist
Before deploying to production:

[ ] All variables from .env.production added to Vercel

[ ] Production webhook secret from Stripe Dashboard

[ ] Vercel variables set to Production scope

[ ] Domain verified for email provider (e.g., Resend)

[ ] Test a real purchase on production

[ ] Confirm emails are being sent

🔄 Migration from Old Setup
If you previously used a single .env file:

Ensure .env.development and .env.production exist

Remove or rename the old .env

Restart dev server

Confirm test values are being used

🆘 Troubleshooting
“No such price” error
Ensure the correct price IDs are used for the environment

Test and live environments use different IDs

“Invalid webhook signature”
Development: use the secret from stripe listen

Production: use the secret from Stripe Dashboard

Emails not sending
Development: Stripe CLI must be running

Production: verify webhook configuration in Stripe Dashboard

Wrong values being used
Log the variable to confirm which file is loaded

Restart server after changing env files

Remember:  
Development = test values
Production = live values
Vercel production always uses live values.
