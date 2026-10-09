"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AsciiCanvas } from "./AsciiCanvas";
import { PRICING_TIERS, getCurrentTier } from "@/utils/pricing";

interface HeroSectionProps {
  nextSlotId: number;
  nextSlotPrice: number;
  claimedCount: number;
  totalSlots: number;
  totalVolume: number;
  onOpenClaim: () => void;
}

const ROTATING_WORDS = ["Founders.", "Builders.", "Pioneers.", "Legends."];

export function HeroSection({
  nextSlotId,
  nextSlotPrice,
  claimedCount,
  totalSlots,
  totalVolume,
  onOpenClaim,
}: HeroSectionProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const currentTier = getCurrentTier(nextSlotId);
  const slotsLeftInTier = currentTier.slotRange[1] - nextSlotId + 1;

  // Rotate hero word every 2.6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const activeWord = ROTATING_WORDS[wordIndex];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden border-b border-[#dad7d0] bg-[#fafaf9]">
      {/* 3D Generative ASCII Canvas (Optimus Signature) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] lg:w-[720px] lg:h-[720px] opacity-35 pointer-events-none select-none">
        <AsciiCanvas density="medium" />
      </div>

      {/* Architectural Coordinate Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute h-px bg-[#080503]/10" style={{ top: "12.5%", left: 0, right: 0 }} />
        <div className="absolute h-px bg-[#080503]/10" style={{ top: "25%", left: 0, right: 0 }} />
        <div className="absolute h-px bg-[#080503]/10" style={{ top: "50%", left: 0, right: 0 }} />
        <div className="absolute h-px bg-[#080503]/10" style={{ top: "75%", left: 0, right: 0 }} />
        <div className="absolute w-px bg-[#080503]/10" style={{ left: "16.66%", top: 0, bottom: 0 }} />
        <div className="absolute w-px bg-[#080503]/10" style={{ left: "33.33%", top: 0, bottom: 0 }} />
        <div className="absolute w-px bg-[#080503]/10" style={{ left: "50%", top: 0, bottom: 0 }} />
        <div className="absolute w-px bg-[#080503]/10" style={{ left: "66.66%", top: 0, bottom: 0 }} />
        <div className="absolute w-px bg-[#080503]/10" style={{ left: "83.33%", top: 0, bottom: 0 }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 w-full">
        {/* Eyebrow Kicker */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-500">
            <span className="w-8 h-px bg-[#080503]/30" />
            The Archival Protocol · 500 Slots Only
          </span>
        </div>

        {/* Editorial Giant Display Headline */}
        <div className="mb-8">
          <h1 className="text-[clamp(2.75rem,8vw,7.5rem)] font-display leading-[0.92] tracking-tight text-[#080503]">
            <span className="block">The Wall of</span>
            <span className="block">
              the First{" "}
              <span className="relative inline-block font-display italic">
                <span key={activeWord} className="inline-flex">
                  {activeWord.split("").map((char, i) => (
                    <span
                      key={`${activeWord}-${i}`}
                      className="animate-char-in"
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#080503]/10" />
              </span>
            </span>
          </h1>
        </div>

        {/* Description & Action Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">
          <p className="text-lg lg:text-xl text-stone-600 leading-relaxed max-w-xl">
            An immutable archival mosaic for early internet builders. 500 permanent slots governed by an algorithmic bonding curve.
            As early tiers fill, the price permanently escalates.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onOpenClaim}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-sm uppercase tracking-wider bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] px-8 h-14 rounded-full transition-all duration-300 group shadow-sm active:scale-95 cursor-pointer"
            >
              <span>Claim Slot #{nextSlotId.toString().padStart(3, "0")} — ${nextSlotPrice}.00</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#wall"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-sm uppercase tracking-wider border border-[#dad7d0] hover:border-[#080503] hover:bg-[#080503]/5 text-[#080503] h-14 px-7 rounded-full transition-all duration-300"
            >
              <span>Explore The 500</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Live Bond Curve Telemetry Bar (Optimus Architectural Card) */}
        <div className="border border-[#dad7d0] bg-[#fafaf9]/80 backdrop-blur-xs p-6 lg:p-8 rounded-none">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#dad7d0] pb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-stone-400 block mb-1">
                Protocol Status
              </span>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-display text-2xl text-[#080503]">
                  Active Tier: {currentTier.name} (${currentTier.price}.00)
                </span>
                <span className="font-mono text-xs text-stone-500">
                  ({slotsLeftInTier} slots remaining in this bracket)
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-8 font-mono text-xs">
              <div>
                <span className="text-stone-400 block">TOTAL VOLUME</span>
                <span className="text-base font-bold text-[#080503]">${totalVolume.toFixed(2)}</span>
              </div>
              <div className="h-8 w-px bg-[#dad7d0]" />
              <div>
                <span className="text-stone-400 block">CLAIMED SLOTS</span>
                <span className="text-base font-bold text-[#080503]">
                  {claimedCount} <span className="text-stone-400 font-normal">/ {totalSlots}</span>
                </span>
              </div>
              <div className="h-8 w-px bg-[#dad7d0]" />
              <div>
                <span className="text-stone-400 block">DOFOLLOW LINKS</span>
                <span className="text-base font-bold text-emerald-600">100% PERMANENT</span>
              </div>
            </div>
          </div>

          {/* Bonding Curve Multi-Tier Progress Track */}
          <div className="relative w-full h-2 bg-[#ecebe7] rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-[#080503] transition-all duration-700 rounded-full"
              style={{ width: `${Math.max(3, (claimedCount / totalSlots) * 100)}%` }}
            />
          </div>

          {/* Tier Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PRICING_TIERS.map((tier) => {
              const isCurrent = tier.tierNumber === currentTier.tierNumber;
              const isCompleted = tier.tierNumber < currentTier.tierNumber;
              return (
                <div
                  key={tier.code}
                  className={`p-3 border transition-all duration-300 text-left ${
                    isCurrent
                      ? "border-[#080503] bg-white ring-1 ring-[#080503] shadow-xs"
                      : isCompleted
                      ? "border-[#dad7d0]/60 bg-stone-100/50 text-stone-400"
                      : "border-[#dad7d0] bg-[#fafaf9] text-stone-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-stone-400">
                      T{tier.tierNumber} · {tier.slotRange[0]}-{tier.slotRange[1]}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <div
                    className={`font-mono text-base font-bold ${
                      isCurrent
                        ? "text-[#080503]"
                        : isCompleted
                        ? "text-stone-400 line-through"
                        : "text-[#080503]"
                    }`}
                  >
                    {tier.price === 0 ? "FREE" : `$${tier.price}.00`}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-stone-400 mt-1">
                    {isCurrent ? "ACTIVE" : isCompleted ? "FILLED" : "UPCOMING"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Infinite Marquee Bar at Bottom of Hero (Optimus Style) */}
      <div className="w-full border-t border-[#dad7d0] bg-[#fafaf9] py-3.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-xs font-mono uppercase tracking-widest text-stone-500 flex items-center gap-12">
          <span>SLOT #014 ACTIVE ($2.00 ENTRY)</span>
          <span className="text-stone-300">✦</span>
          <span>TIER 1 (FREE) SOLD OUT</span>
          <span className="text-stone-300">✦</span>
          <span>ALGORITHMIC BONDING CURVE</span>
          <span className="text-stone-300">✦</span>
          <span>DOFOLLOW BACKLINK PERMANENCE</span>
          <span className="text-stone-300">✦</span>
          <span>13 FOUNDERS EMBEDDED</span>
          <span className="text-stone-300">✦</span>
          <span>500 IMMUTABLE SLOTS</span>
          <span className="text-stone-300">✦</span>
          <span>LIGHT-MODE ARCHITECTURAL LEDGER</span>
          <span className="text-stone-300">✦</span>
          {/* Repeat for seamless loop */}
          <span>SLOT #014 ACTIVE ($2.00 ENTRY)</span>
          <span className="text-stone-300">✦</span>
          <span>TIER 1 (FREE) SOLD OUT</span>
          <span className="text-stone-300">✦</span>
          <span>ALGORITHMIC BONDING CURVE</span>
          <span className="text-stone-300">✦</span>
          <span>DOFOLLOW BACKLINK PERMANENCE</span>
          <span className="text-stone-300">✦</span>
          <span>13 FOUNDERS EMBEDDED</span>
          <span className="text-stone-300">✦</span>
          <span>500 IMMUTABLE SLOTS</span>
          <span className="text-stone-300">✦</span>
        </div>
      </div>
    </section>
  );
}
