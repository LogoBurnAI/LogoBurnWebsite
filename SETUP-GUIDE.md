# PrintForge – Complete Launch Guide
## Your B2Sign White Label + AI Design Studio

---

## WHAT YOU'VE BEEN GIVEN

A complete Next.js web application including:
- Full product catalog (8 product types, 50+ size/finish combos)
- AI Design Studio (text prompt → DALL-E image → product mockup)
- Artwork uploader with canvas preview
- Shopping cart with persistent state
- 3-step checkout (shipping → payment → confirm)
- Auto-downloads a ZIP order package after every purchase
- Orders dashboard with profit tracking and B2Sign submission workflow

---

## STEP 1 — ACCOUNTS TO CREATE (Do These First)

### 1A. B2Sign White Label Reseller Account
**URL:** https://www.b2sign.com
**Cost:** Free to sign up
**What to do:**
1. Go to b2sign.com → click "Reseller" or "Trade Account"
2. Apply for a wholesale/white label reseller account
3. Confirm your business information
4. You'll get wholesale pricing (~30-50% below retail)
5. Their white label service ships orders in plain packaging with NO B2Sign branding

**Key info to note after signup:**
- Your reseller login credentials
- Wholesale price sheet (update lib/products.ts if prices differ)

---

### 1B. OpenAI Account (for AI design generation)
**URL:** https://platform.openai.com
**Cost:** Pay-per-use (~$0.04 per HD image with DALL-E 3)
**What to do:**
1. Create account at platform.openai.com
2. Go to API Keys → Create new secret key
3. Add $20-50 credit to start (lasts a long time at $0.04/image)
4. Copy your API key → paste into .env.local as OPENAI_API_KEY

**Estimated cost:** 500 customer designs ≈ $20

---

### 1C. Stripe Account (for payments)
**URL:** https://stripe.com
**Cost:** 2.9% + $0.30 per transaction (no monthly fee)
**What to do:**
1. Create account at stripe.com
2. Complete business verification (takes 1-2 days)
3. Go to Developers → API Keys
4. Copy both Publishable Key and Secret Key
5. Paste into .env.local
6. Set up a webhook endpoint (Stripe → Webhooks → Add endpoint):
   - URL: https://yourdomain.com/api/webhooks/stripe
   - Events: payment_intent.succeeded, payment_intent.payment_failed

**Test mode:** Use card 4242 4242 4242 4242 for testing before going live

---

### 1D. Supabase Account (database + customer auth)
**URL:** https://supabase.com
**Cost:** Free tier (plenty for starting out)
**What to do:**
1. Create account at supabase.com
2. Create a new project (pick a region close to your customers)
3. Go to Settings → API
4. Copy: Project URL and anon/public key and service_role key
5. Paste all three into .env.local
6. Run this SQL in the Supabase SQL editor to create the orders table:

```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  items JSONB,
  subtotal DECIMAL,
  tax DECIMAL,
  shipping DECIMAL,
  total DECIMAL,
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'paid',
  b2sign_order_number TEXT,
  design_prompts JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 1E. Vercel Account (hosting – free to start)
**URL:** https://vercel.com
**Cost:** Free (Hobby plan handles small traffic easily)
**What to do:**
1. Create account at vercel.com using your GitHub account
2. You'll connect this later after pushing code to GitHub

---

### 1F. GitHub Account (code repository)
**URL:** https://github.com
**Cost:** Free
**What to do:**
1. Create account at github.com (if you don't have one)
2. Create a new private repository called "printforge"

---

### 1G. Domain Name (optional but recommended)
**Recommended registrar:** Namecheap or Google Domains
**Cost:** $10-15/year
**Suggestion:** Something like printfast.com, designandprint.com, yourprint.co
**What to do:**
1. Buy your domain
2. Point it to Vercel after deployment (Vercel guides you through this)

---

## STEP 2 — LOCAL SETUP (On Your Computer)

### Prerequisites to install:
1. **Node.js** (v18+): https://nodejs.org → download LTS version
2. **Git**: https://git-scm.com/downloads

### Setup commands (open Terminal / Command Prompt):

```bash
# Navigate to the printforge folder you downloaded
cd path/to/printforge

# Install all dependencies
npm install

# Copy the environment file
cp .env.example .env.local

# Open .env.local in a text editor and fill in all your keys

# Start the development server
npm run dev
```

Open your browser to **http://localhost:3000** — you should see PrintForge!

---

## STEP 3 — FILL IN YOUR .env.local

Open the `.env.local` file and replace every placeholder:

```
OPENAI_API_KEY=sk-...          ← from Step 1B
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  ← from Step 1C
STRIPE_SECRET_KEY=sk_live_...  ← from Step 1C
STRIPE_WEBHOOK_SECRET=whsec_...← from Step 1C webhooks
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co  ← from Step 1D
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... ← from Step 1D
SUPABASE_SERVICE_ROLE_KEY=eyJ... ← from Step 1D
NEXT_PUBLIC_APP_URL=http://localhost:3000  ← change to your domain in production
MARKUP_PERCENTAGE=40           ← your profit margin % over B2Sign wholesale
```

---

## STEP 4 — DEPLOY TO THE INTERNET

```bash
# Push code to GitHub
git init
git add .
git commit -m "Initial PrintForge launch"
git remote add origin https://github.com/YOURUSERNAME/printforge.git
git push -u origin main
```

Then in Vercel:
1. Click "Add New Project"
2. Import your GitHub repo
3. Add all your environment variables (same as .env.local)
4. Click Deploy → your site goes live in ~2 minutes!

---

## STEP 5 — YOUR ORDER WORKFLOW (How You Make Money)

Here's exactly what happens when a customer orders:

```
Customer visits your site
    ↓
Browses products → opens Design Studio
    ↓
Types AI prompt OR uploads their artwork
    ↓
Previews design on product mockup
    ↓
Adds to cart → checks out → pays YOU via Stripe
    ↓
ZIP file auto-downloads to YOUR computer containing:
  ├── print-files/
  │   └── Vinyl-Banner_3ft-x-8ft_SBM38.png  ← print-ready file
  ├── b2sign-order-sheet.csv                  ← all order details
  └── ORDER-INSTRUCTIONS.html                 ← step-by-step B2Sign guide
    ↓
YOU log into b2sign.com white label account
    ↓
Upload the print file + enter customer's address
    ↓
B2Sign prints & ships directly to your customer
    ↓
You enter the B2Sign order number in your Orders dashboard
    ↓
Track status: Sent → In Production → Shipped → Delivered
```

---

## STEP 6 — PRICING STRATEGY

Your default markup is 40% over B2Sign wholesale. Example:

| Product | B2Sign Cost | Your Price | Your Profit |
|---------|------------|------------|-------------|
| 3x8 Banner | $45 | $63 | $18 |
| 6ft Table Cover | $129 | $181 | $52 |
| 10x10 Event Tent | $695 | $973 | $278 |
| Step & Repeat 10x8 | $129 | $181 | $52 |

Adjust `MARKUP_PERCENTAGE` in `.env.local` to change your margin across all products.
You can also edit individual prices in `lib/products.ts`.

---

## MONTHLY COST ESTIMATE (at launch)

| Service | Cost |
|---------|------|
| Vercel hosting | Free |
| Supabase database | Free |
| Stripe fees | 2.9% + $0.30 per sale |
| OpenAI image generation | ~$0.04 per design |
| Domain name | ~$1/mo |
| **Total fixed overhead** | **~$1/month** |

---

## FUTURE ENHANCEMENTS (Phase 2)

Once you're making sales, consider adding:
- [ ] Email confirmations (Resend.com – free tier)
- [ ] Customer account login (Supabase Auth – already built in)
- [ ] Tracking number entry + customer notification emails
- [ ] Coupon/promo codes
- [ ] Volume discounts
- [ ] More product types (vehicle wraps, window graphics, yard signs)
- [ ] Stripe Elements for proper card UI (replace the mock payment form)
- [ ] Admin dashboard at /admin (password protected)

---

## SUPPORT & NEXT STEPS

Questions about the code? Every file is documented. The key files are:
- `lib/products.ts` — edit products, sizes, prices
- `.env.local` — all your API keys
- `app/designer/page.tsx` — the AI design studio
- `lib/order-export.ts` — the ZIP package generator
- `app/orders/page.tsx` — your order management dashboard

Good luck! 🚀
