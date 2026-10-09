import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Shield, Compass, BookOpen, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Editorial Guidelines",
  description:
    "The philosophy, archival mission, and curation guidelines behind The 500 Founders Wall. Discover why we created a 500-builder time capsule with strict light mode clarity.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#080503] font-sans">
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
              Directory
            </Link>
            <Link href="/how-it-works" className="text-stone-600 hover:text-stone-900">
              Pricing & FAQ
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-[#dad7d0] text-[11px] font-mono text-stone-700">
            <Compass className="w-3.5 h-3.5 text-stone-600" />
            <span>The Founders Wall Manifesto</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#080503]">
            A Digital Monument for 500 Builders
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            In 2005, the Million Dollar Homepage showed the world what internet grassroots culture looked like. Over two decades later, the modern web has become fractured across infinite algorithmic feeds and paywalled directories. The Founders Wall is an intentional response: a return to physical, spatial permanence.
          </p>
        </section>

        {/* Section 1: The Design Thesis */}
        <section className="p-6 bg-white border border-[#dad7d0] space-y-4">
          <h2 className="font-mono text-base font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-stone-700" />
            <span>The Spatial Design Thesis</span>
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Most startup directories treat products like commoditized database rows—infinitely scrollable, quickly forgotten, and buried under sponsored auctions. 
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">
            The 500 Founders Wall is designed as an unbroken 100dvh single-screen responsive canvas. All 500 positions exist simultaneously in one view. Hovering over any slot provides immediate telemetry: founder handle, category badge, and pitch. This creates genuine spatial scarcity: there are only 500 slots, and when they are claimed, the wall is sealed forever.
          </p>
        </section>

        {/* Section 2: Strict Light Mode */}
        <section className="p-6 bg-white border border-[#dad7d0] space-y-3">
          <h2 className="font-mono text-base font-bold text-stone-900">
            Why 100% Light Mode?
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            We chose an uncompromising archival aesthetic inspired by physical architectural stone, Swiss typography, and print design. The warm `#fafaf9` palette ensures logos and product identities pop with high contrast and clarity. There is no dark mode toggle because this canvas is built to resemble a physical gallery wall.
          </p>
        </section>

        {/* Section 3: Editorial Guidelines */}
        <section className="p-6 bg-white border border-[#dad7d0] space-y-4">
          <h2 className="font-mono text-base font-bold text-stone-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Curation & Moderation Standards</span>
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            To preserve the prestige of every founder on the wall, every submission passes automated validation and editorial screening:
          </p>
          <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
            <li><strong>Verified Products:</strong> Must be a live software application, developer tool, SaaS, AI agent, or tangible internet product.</li>
            <li><strong>Clean Links:</strong> Destination URLs must be valid, secure (HTTPS), and free of malicious redirects.</li>
            <li><strong>Zero Tolerance:</strong> Adult content, gambling/casinos, phishing, crypto token pumps, and malware are rejected instantly without refund.</li>
          </ul>
        </section>

        {/* Section 4: Transfer & Refund Policy */}
        <section className="p-6 bg-white border border-[#dad7d0] space-y-3">
          <h2 className="font-mono text-base font-bold text-stone-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Immutability & Transfer Policy</span>
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            Because positions are permanently minted and recorded in Cloud Postgres, claims cannot be canceled or refunded once confirmed. Minor cosmetic updates (e.g. updating an SVG logo or fixing an HTTPS redirect) can be requested via our team.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dad7d0] bg-white py-8 text-xs font-mono text-stone-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>The 500 Founders Wall · Curated by Internet Builders</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-stone-900">Wall</Link>
            <Link href="/directory" className="hover:text-stone-900">Directory</Link>
            <Link href="/how-it-works" className="hover:text-stone-900">Pricing & Rules</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
