# The 500 Founders Wall

> **Live Production App:** [https://founders-wall.vercel.app](https://founders-wall.vercel.app)  
> *An interactive 500-slot archival mosaic and permanent internet directory for builders, indie hackers, and founders.*

[![Live Site](https://img.shields.io/badge/Live-Founders%20Wall-2563eb?style=for-the-badge&logo=vercel)](https://founders-wall.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/PostgreSQL-Neon%20Serverless-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)

---

## 🌟 Overview

**The 500 Founders Wall** is a modern, high-performance archival monument honoring early internet history (inspired by the 2005 Million Dollar Homepage) redesigned for today's indie makers, bootstrappers, and startup founders.

Instead of bloated subscription directories or infinite algorithmic feeds, it provides **500 permanent positions** on an interactive, zero-scroll Swiss-minimalist mosaic.

### Key Pillars
- **Zero-Scroll Single Canvas:** Fixed `100dvh` responsive viewport with crisp typography and subtle micro-interactions.
- **Algorithmic Bonding Price Curve:** 
  - **Slots 1–10:** **Genesis Free ($0.00)** for early grassroots indie hackers.
  - **Slots 11–25:** $2.00 (Tier 1: Impulse).
  - **Slots 26–50:** $5.00 (Tier 2: The Spark).
  - **Slots 51–100:** $10.00 (Tier 3: The Ascent).
  - **Slots 101–250:** $20.00 (Tier 4: Proven Ground).
  - **Slots 251–500:** $40.00 (Tier 5: The Finale).
- **SEO & Permanent Backlinks:** Every claimed slot receives a high-authority dofollow link, permanent brand logo placement, and indexing across dedicated category vertical hubs.
- **Structured Data:** Full Schema.org JSON-LD integration (`WebSite`, `Organization`, `FAQPage`, `ItemList`).

---

## 🧭 Pages & Site Structure

- **Main Mosaic:** [founders-wall.vercel.app](https://founders-wall.vercel.app) — Real-time interactive 500-slot grid.
- **Directory Index:** [founders-wall.vercel.app/directory](https://founders-wall.vercel.app/directory) — Full searchable table of all claimed slots.
- **Protocol & Pricing:** [founders-wall.vercel.app/how-it-works](https://founders-wall.vercel.app/how-it-works) — Transparent tier breakdown and bonding curve formula.
- **The Manifesto:** [founders-wall.vercel.app/about](https://founders-wall.vercel.app/about) — Archival thesis and community moderation standards.
- **Category Hubs:**
  - [AI Startups & Tools](https://founders-wall.vercel.app/category/ai)
  - [Developer Tools](https://founders-wall.vercel.app/category/devtools)
  - [SaaS Products](https://founders-wall.vercel.app/category/saas)
  - [Productivity Tools](https://founders-wall.vercel.app/category/productivity)
  - [Cloud Infrastructure](https://founders-wall.vercel.app/category/infrastructure)
  - [Other Ventures](https://founders-wall.vercel.app/category/other)

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS v4 with custom warm-paper Swiss minimalist aesthetic (`#fafaf9`)
- **Database:** Serverless PostgreSQL (`@neondatabase/serverless`)
- **Analytics & Tracking:** Google Analytics 4 (`gtag.js`)
- **Search Verification:** Google Search Console (`sitemap.xml`, `robots.txt`)
- **Hosting:** Vercel Global Edge Network

---

## 🚀 Local Development

```bash
# 1. Clone the repository
git clone https://github.com/AleemBajwa/founders-wall.git
cd founders-wall

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License & Attribution

Created by **Aleem Bajwa** & internet builders worldwide. Released under the MIT License.
