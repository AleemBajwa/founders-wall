import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Shield, TrendingUp, Sparkles, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works & Pricing Architecture",
  description:
    "Learn how the 500 Founders Wall algorithmic bonding curve operates. First 10 slots are 100% free ($0.00). Transparent pricing tiers, permanent dofollow links, and submission criteria.",
  alternates: {
    canonical: "/how-it-works",
  },
};

const faqs = [
  {
    question: "What is The 500 Founders Wall?",
    answer:
      "The 500 Founders Wall is a permanent digital archive and curated showcase indexing exactly 500 internet startups, indie hacker tools, and software products. It combines the visual energy of classic web artifacts like the Million Dollar Homepage with an algorithmic bonding pricing curve, ensuring verifiable scarcity and collector-grade prestige.",
  },
  {
    question: "How does the Genesis Free Tier work?",
    answer:
      "To celebrate the launch and seed the wall with genuine community builders, Slots #001 through #010 are 100% FREE ($0.00). Any founder can register their project, logo, pitch, and website URL without entering credit card information. Once Slot #010 is claimed, Slot #011 unlocks at $2.00.",
  },
  {
    question: "How does the Algorithmic Bonding Price Curve work?",
    answer:
      "Unlike conventional directories that charge recurring monthly subscriptions or auction ad spaces, the Founders Wall operates on a deterministic, step-function price curve. As each tier fills, the price for subsequent slots permanently escalates from $2.00 to $5.00, $10.00, $20.00, and ultimately $40.00. Early adopters benefit from permanent indexation at the lowest cost basis.",
  },
  {
    question: "Are backlinks permanent and dofollow?",
    answer:
      "Yes. Every claimed position includes a permanent, crawlable link directly to your project's canonical web address. There are no ongoing maintenance fees, renewals, or recurring subscriptions. Once your position is minted, it remains in the immutable archive indefinitely.",
  },
  {
    question: "Can I edit or update my listing after claiming?",
    answer:
      "Minor updates (such as fixing a broken URL or refreshing a logo asset) can be requested via our verification support team. However, to preserve the historical integrity of the archive, slot positions cannot be flipped, traded, or transferred to entirely unrelated commercial entities.",
  },
  {
    question: "What categories and projects are accepted?",
    answer:
      "We welcome projects across AI, Developer Tools, SaaS, Productivity, Infrastructure, and Other creator/builder products. All submissions undergo automated and editorial moderation. Malicious websites, gambling/casinos, phishing, and adult content are strictly prohibited.",
  },
  {
    question: "What is the single-screen mosaic experience?",
    answer:
      "The primary interface is engineered as an uninterrupted 100dvh single-screen responsive canvas. On both desktop and mobile screens, all 500 slots are displayed simultaneously without page scroll, featuring interactive telemetry inspection, category filtering, and sub-second deep linking.",
  },
  {
    question: "How does this benefit my startup's SEO and discoverability?",
    answer:
      "Listing your startup on the Founders Wall provides a high-quality, permanent editorial backlink from an authoritative, indexed Next.js platform. Furthermore, your project is indexed in our crawlable directory, category hubs, and XML sitemaps, driving referral visits from founders, angels, and software enthusiasts.",
  },
];

const tiers = [
  { tier: "Tier 1: Genesis", slots: "#001 – #010", count: 10, price: "$0.00", status: "Active Now (100% Free)" },
  { tier: "Tier 2: Early Adopters", slots: "#011 – #025", count: 15, price: "$2.00", status: "Queued" },
  { tier: "Tier 3: Pioneer Batch", slots: "#026 – #050", count: 25, price: "$5.00", status: "Queued" },
  { tier: "Tier 4: Acceleration", slots: "#051 – #100", count: 50, price: "$10.00", status: "Queued" },
  { tier: "Tier 5: Growth Phase", slots: "#101 – #250", count: 150, price: "$20.00", status: "Queued" },
  { tier: "Tier 6: Hall of Fame", slots: "#251 – #500", count: 250, price: "$40.00", status: "Queued" },
];

export default function HowItWorksPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#080503] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation */}
      <header className="border-b border-[#dad7d0] bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-bold hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mosaic Wall</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/directory" className="text-stone-600 hover:text-stone-900">
              Browse Directory
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900">
              About
            </Link>
            <Link
              href="/"
              className="px-3 py-1 bg-[#080503] text-white rounded font-bold hover:bg-stone-800 transition-colors"
            >
              Claim Slot
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Title Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-[#dad7d0] text-[11px] font-mono text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>Economic Protocol & Archival Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#080503]">
            How The 500 Founders Wall Operates
          </h1>
          <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
            A permanent digital archive of 500 startups, engineered with a transparent bonding price curve. As positions are claimed, the cost escalates predictably. No subscriptions. No advertising banners. Pure archival prestige.
          </p>
        </section>

        {/* 3 Core Pillars */}
        <section className="grid sm:grid-cols-3 gap-6">
          <div className="p-5 border border-[#dad7d0] bg-white rounded-none space-y-3">
            <div className="w-8 h-8 rounded bg-stone-100 border border-stone-200 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-stone-800" />
            </div>
            <h2 className="font-mono text-sm font-bold text-stone-900">1. Genesis Free Launch</h2>
            <p className="text-xs text-stone-600 leading-normal">
              Positions #001 to #010 are 100% free ($0.00). Early supporters claim their historical position at zero financial cost.
            </p>
          </div>

          <div className="p-5 border border-[#dad7d0] bg-white rounded-none space-y-3">
            <div className="w-8 h-8 rounded bg-stone-100 border border-stone-200 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-stone-800" />
            </div>
            <h2 className="font-mono text-sm font-bold text-stone-900">2. Algorithmic Curve</h2>
            <p className="text-xs text-stone-600 leading-normal">
              Prices step up predictably from $2.00 to $40.00 across 6 tiers. The earlier your project joins, the lower your acquisition price.
            </p>
          </div>

          <div className="p-5 border border-[#dad7d0] bg-white rounded-none space-y-3">
            <div className="w-8 h-8 rounded bg-stone-100 border border-stone-200 flex items-center justify-center">
              <Shield className="w-4 h-4 text-stone-800" />
            </div>
            <h2 className="font-mono text-sm font-bold text-stone-900">3. Permanent Dofollow Link</h2>
            <p className="text-xs text-stone-600 leading-normal">
              Once verified, your project receives a permanent, crawlable link, indexed across Googlebot sitemaps and category hubs forever.
            </p>
          </div>
        </section>

        {/* Tier Schedule Table */}
        <section className="space-y-4">
          <h2 className="font-mono text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>Pricing Tier Schedule</span>
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            The table below defines the deterministic step-function curve governing all 500 positions:
          </p>
          <div className="overflow-x-auto border border-[#dad7d0] bg-white">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-stone-50 border-b border-[#dad7d0] text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Tier Name</th>
                  <th className="py-3 px-4">Slots</th>
                  <th className="py-3 px-4">Cap</th>
                  <th className="py-3 px-4">Slot Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dad7d0]">
                {tiers.map((t, idx) => (
                  <tr key={idx} className={idx === 0 ? "bg-emerald-50/40" : "hover:bg-stone-50/50"}>
                    <td className="py-3 px-4 font-bold text-stone-900">{t.tier}</td>
                    <td className="py-3 px-4 text-stone-700">{t.slots}</td>
                    <td className="py-3 px-4 text-stone-600">{t.count} slots</td>
                    <td className="py-3 px-4 font-bold text-stone-900">{t.price}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          idx === 0
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6 pt-6 border-t border-[#dad7d0]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl font-mono font-bold text-stone-900">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 bg-white border border-[#dad7d0] rounded-none space-y-2">
                <h3 className="font-mono text-sm font-bold text-stone-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f.question}</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-6">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="p-8 bg-white border border-[#dad7d0] text-center space-y-4">
          <h2 className="text-xl font-mono font-bold text-stone-900">Ready to Claim Your Position?</h2>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            The first 10 positions are 100% free ($0.00). Secure your startup’s spot on the wall before the bonding curve steps up.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#080503] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-stone-800 transition-all shadow-sm"
            >
              <span>Go to Mosaic Wall & Claim</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dad7d0] bg-white py-8 text-xs font-mono text-stone-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>The 500 Founders Wall · An archival mosaic of internet builders</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-stone-900">Wall</Link>
            <Link href="/directory" className="hover:text-stone-900">Directory</Link>
            <Link href="/about" className="hover:text-stone-900">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
