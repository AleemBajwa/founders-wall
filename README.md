# The 500 Founders Wall (FoundersWall.io)

> A modern, gamified homage to the 2005 Million Dollar Homepage for internet makers, indie hackers, and startups.

---

## 🌟 Key Features

1. **100% Crisp Light Mode:** High-contrast, clean Apple/Stripe-inspired aesthetic with subtle borders and shadows.
2. **The Ramping Price Protocol:**
   - **Slots 1–10:** Free Early Birds (Pre-seeded with 10 inspiring projects).
   - **Slots 11–25:** $2.00 (Tier 1: Impulse).
   - **Slots 26–50:** $5.00 (Tier 2: The Spark).
   - **Slots 51–100:** $10.00 (Tier 3: The Ascent).
   - **Slots 101–250:** $20.00 (Tier 4: Proven Ground).
   - **Slots 251–500:** $40.00 (Tier 5: The Finale).
3. **SEO Dofollow Links:** Every project receives a permanent HTML backlink for domain authority.
4. **Live Interactive Mosaic Grid:** Real-time search by founder/project name, status filtering (Claimed/Available), and category tags (AI, SaaS, DevTool, Design, Newsletter).
5. **Instant Live Preview & Confetti:** Users see their card live before claiming, with celebration confetti on lock-in.
6. **Viral X / Twitter Share Flow:** Pre-filled brag tweets for new founders to drive organic viral traffic on launch day.

---

## 🚀 Quick Start (Local)

The server is already compiled and tested:

```bash
cd D:\NewIdeas\founders-wall
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel (Under 60 Seconds)

### Option A: Using the Vercel CLI (Fastest)

```bash
cd D:\NewIdeas\founders-wall
npx vercel
```
Follow the 3 prompts and your site will be live instantly with a free `.vercel.app` domain and SSL.

### Option B: Using GitHub & Vercel Dashboard

1. Push this folder to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: initial commit of The 500 Founders Wall"
   git branch -M main
   git remote add origin https://github.com/<your-username>/founders-wall.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and click **Import**.
3. Click **Deploy**. Vercel will automatically build and deploy the site globally on its Edge Network!

---

## 💳 Connecting Real Stripe Payments (Optional)

In this version, claiming a slot simulates the instant lock-in with confetti and saves directly to local storage/state so you can test and demonstrate it immediately.

To enable real Stripe credit card / Apple Pay processing for Slots 11+:
1. Create a Stripe account at [stripe.com](https://stripe.com).
2. Create standard Stripe Checkout products for each price tier ($2, $5, $10, $20, $40).
3. Connect the checkout redirect in `src/components/ClaimModal.tsx`.
