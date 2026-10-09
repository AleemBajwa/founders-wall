"use client";

import React, { useState } from "react";
import { getSlotPrice, getCurrentTier } from "@/utils/pricing";
import { Check, Copy, ArrowRight } from "lucide-react";

interface BondingCurveSectionProps {
  onOpenClaim: (slotId: number) => void;
}

export function BondingCurveSection({ onOpenClaim }: BondingCurveSectionProps) {
  const [simulatedSlot, setSimulatedSlot] = useState<number>(14);
  const [copiedCode, setCopiedCode] = useState(false);

  const tier = getCurrentTier(simulatedSlot);
  const price = getSlotPrice(simulatedSlot);

  const codeSnippet = `// The Algorithmic Bonding Protocol
import { getSlotPrice } from "@founderswall/core";

const slot = ${simulatedSlot};
const price = getSlotPrice(slot); 
// => $${price}.00 USD

const record = await wall.claimSlot({
  slot: ${simulatedSlot},
  tier: "${tier.name}",
  dofollow: true,
  status: "PERMANENT_IMMUTABLE",
});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="curve" className="relative py-24 lg:py-32 border-b border-[#dad7d0] bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
            <span className="w-8 h-px bg-[#080503]/30" />
            The Economic Engine
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-[#080503] leading-[1.05]">
            Three principles.<br />
            <span className="text-stone-400 italic">One ascending curve.</span>
          </h2>
        </div>

        {/* 2-Column: Left Steps, Right Sticky Simulator Terminal */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Steps */}
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex items-start gap-6 group">
              <span className="font-display text-3xl lg:text-4xl text-stone-400 font-medium group-hover:text-[#080503] transition-colors">
                I
              </span>
              <div className="flex-1 pb-8 border-b border-[#dad7d0]">
                <h3 className="text-2xl font-display text-[#080503] mb-2">
                  The Genesis Wave
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  The first 10 slots were offered at 100% zero cost ($0.00) to reward early pioneering projects (Supabase, Raycast, Linear, etc.). All 10 genesis slots are permanently minted.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-stone-300" />
                  <span>Slots 1-10 · Fully Claimed</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-6 group">
              <span className="font-display text-3xl lg:text-4xl text-[#080503] font-medium">
                II
              </span>
              <div className="flex-1 pb-8 border-b border-[#dad7d0]">
                <h3 className="text-2xl font-display text-[#080503] mb-2">
                  Algorithmic Escalation
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  Unlike flat directories, the Founders Wall features an ascending bonding curve.
                  Each tier doubles the barrier to entry: $2 → $5 → $10 → $20 → $40. Early claimants benefit from permanent asymmetric upside.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Currently at Tier 2: $2.00 (Active Right Now)</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-6 group">
              <span className="font-display text-3xl lg:text-4xl text-stone-400 font-medium group-hover:text-[#080503] transition-colors">
                III
              </span>
              <div className="flex-1">
                <h3 className="text-2xl font-display text-[#080503] mb-2">
                  Permanent Dofollow Authority
                </h3>
                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  There are no monthly subscriptions, renew fees, or algorithmic deprecation.
                  Once your slot is claimed, your company badge, tagline, and direct backlink live on this permanent digital billboard forever.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-stone-400" />
                  <span>500 Max Slots Cap · No Extensions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Simulator Box (Optimus Terminal Style) */}
          <div className="lg:sticky lg:top-28">
            <div className="border border-[#dad7d0] bg-white shadow-2xs overflow-hidden">
              {/* Terminal Window Header */}
              <div className="px-5 py-3 border-b border-[#dad7d0] bg-[#fafaf9] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span className="ml-2 text-xs font-mono text-stone-500">
                    curve-simulator.ts
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-[#080503] transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Interactive Curve Slider */}
              <div className="p-6 border-b border-[#dad7d0] bg-[#fafaf9]/50">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-stone-500">SLOT SELECTOR</span>
                  <span className="font-bold text-[#080503]">
                    #{simulatedSlot.toString().padStart(3, "0")} / 500
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="500"
                  value={simulatedSlot}
                  onChange={(e) => setSimulatedSlot(Number(e.target.value))}
                  className="w-full accent-[#080503] cursor-pointer"
                />

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#dad7d0]/60 text-xs font-mono">
                  <div>
                    <span className="text-stone-400 block text-[10px]">TIER BRACKET</span>
                    <span className="font-bold text-[#080503]">{tier.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">PRICE POINT</span>
                    <span className="font-bold text-emerald-700">${price}.00</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">AVAILABILITY</span>
                    <span className="font-bold text-[#080503]">
                      {simulatedSlot <= 13 ? "Claimed" : "Available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Code Display Area */}
              <div className="p-6 font-mono text-xs text-[#080503]/80 bg-white overflow-x-auto">
                <pre className="leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </div>

              {/* Terminal Footer CTA */}
              <div className="px-6 py-4 bg-[#fafaf9] border-t border-[#dad7d0] flex items-center justify-between">
                <span className="text-xs font-mono text-stone-500">
                  Ready to lock your slot?
                </span>
                <button
                  onClick={() => onOpenClaim(simulatedSlot)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#080503] hover:underline cursor-pointer"
                >
                  <span>Claim #{simulatedSlot.toString().padStart(3, "0")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
