"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface RecentLedgerSectionProps {
  nextSlotId: number;
  nextSlotPrice: number;
  onOpenClaim: (slotId: number) => void;
}

const LEDGER_ENTRIES = [
  { slot: 1, name: "Supabase", category: "Database", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 2, name: "Raycast", category: "Productivity", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 3, name: "Linear", category: "Issue Tracker", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 4, name: "Resend", category: "Email API", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 5, name: "Midjourney", category: "AI Image", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 6, name: "Perplexity", category: "AI Search", price: "$0.00 (Genesis)", time: "Minted", status: "Immutable" },
  { slot: 14, name: "Slot #014 (OPEN)", category: "Available", price: "$2.00", time: "Now", status: "Live Opportunity", isLive: true },
];

export function RecentLedgerSection({ nextSlotId, nextSlotPrice, onOpenClaim }: RecentLedgerSectionProps) {
  return (
    <section id="ledger" className="relative py-24 lg:py-32 border-b border-[#dad7d0] bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column: Context & Archival Metrics */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-500 mb-6">
              <span className="w-8 h-px bg-[#080503]/30" />
              Ledger Telemetry
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-[#080503] leading-[1.05] mb-6">
              Permanent by<br />
              <span className="text-stone-400 italic">architecture.</span>
            </h2>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed mb-10 max-w-xl">
              Every slot minted on Founders Wall is archived across redundant static CDNs. No tracking scripts to slow down page load, no third-party cookie consent walls, just pure, permanent web presence.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#dad7d0]">
              <div>
                <div className="text-3xl lg:text-4xl font-display text-[#080503] mb-1">500</div>
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">Hard Cap</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-display text-[#080503] mb-1">100%</div>
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">Dofollow SLA</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-display text-emerald-700 mb-1">&lt;15ms</div>
                <div className="text-xs font-mono text-stone-500 uppercase tracking-wider">Edge Latency</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Ledger Block Terminal (Optimus Edge Ping Style) */}
          <div className="border border-[#dad7d0] bg-white shadow-2xs">
            <div className="px-6 py-4 border-b border-[#dad7d0] bg-[#fafaf9] flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#080503] font-bold">
                Minting Stream
              </span>
              <span className="flex items-center gap-2 text-xs font-mono text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ledger Synchronized
              </span>
            </div>

            <div>
              {LEDGER_ENTRIES.map((entry) => (
                <div
                  key={entry.slot}
                  onClick={() => entry.isLive && onOpenClaim(entry.slot)}
                  className={`px-6 py-4 border-b border-[#dad7d0]/60 last:border-b-0 flex items-center justify-between transition-colors ${
                    entry.isLive
                      ? "bg-amber-50/40 hover:bg-amber-50 cursor-pointer"
                      : "hover:bg-stone-50/60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        entry.isLive ? "bg-amber-500 animate-ping" : "bg-[#080503]"
                      }`}
                    />
                    <div>
                      <div className="font-mono text-xs font-bold text-[#080503] flex items-center gap-2">
                        <span>#{entry.slot.toString().padStart(3, "0")} {entry.name}</span>
                        {entry.isLive && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold uppercase">
                            Open Now
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        {entry.category} · {entry.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-stone-400">
                      {entry.status}
                    </span>
                    {entry.isLive && (
                      <ArrowUpRight className="w-4 h-4 text-[#080503]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
