"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenHowItWorks: () => void;
  onOpenClaim: () => void;
}

export function Footer({ onOpenHowItWorks, onOpenClaim }: FooterProps) {
  return (
    <footer className="relative border-t border-[#dad7d0] bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        {/* Multi-column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8 pb-16 border-b border-[#dad7d0]">
          {/* Main Info */}
          <div className="col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl font-display text-[#080503] font-medium">Founders Wall</span>
              <span className="text-[10px] text-stone-400 font-mono">PROTOCOL</span>
            </a>
            <p className="text-xs text-stone-600 leading-relaxed mb-6 max-w-sm">
              The immutable archival mosaic for early internet builders. 500 permanent slots governed by an algorithmic bonding curve.
            </p>
            <div className="flex gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-stone-500 hover:text-[#080503] transition-colors inline-flex items-center gap-0.5 group"
              >
                Twitter
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-stone-500 hover:text-[#080503] transition-colors inline-flex items-center gap-0.5 group"
              >
                GitHub
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#080503] font-bold mb-4">
              Protocol
            </h4>
            <ul className="space-y-3 text-xs font-mono text-stone-500">
              <li>
                <a href="#wall" className="hover:text-[#080503] transition-colors">The 500 Wall</a>
              </li>
              <li>
                <a href="#curve" className="hover:text-[#080503] transition-colors">Bonding Curve</a>
              </li>
              <li>
                <a href="#ledger" className="hover:text-[#080503] transition-colors">Live Ledger</a>
              </li>
              <li>
                <a href="#sdk" className="hover:text-[#080503] transition-colors">Founder SDK</a>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#080503] font-bold mb-4">
              Standards
            </h4>
            <ul className="space-y-3 text-xs font-mono text-stone-500">
              <li>
                <span className="hover:text-[#080503] cursor-pointer" onClick={onOpenHowItWorks}>Dofollow SLA</span>
              </li>
              <li>
                <span className="hover:text-[#080503] cursor-pointer" onClick={onOpenHowItWorks}>Permanent Storage</span>
              </li>
              <li>
                <span className="hover:text-[#080503] cursor-pointer" onClick={onOpenHowItWorks}>Light-Mode Design</span>
              </li>
              <li>
                <span className="hover:text-[#080503] cursor-pointer" onClick={onOpenHowItWorks}>Zero-Tracker Policy</span>
              </li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#080503] font-bold mb-4">
              Heritage
            </h4>
            <ul className="space-y-3 text-xs font-mono text-stone-500">
              <li>
                <span className="text-stone-400">Alex Tew (2005)</span>
              </li>
              <li>
                <span className="text-stone-400">Million Dollar Page</span>
              </li>
              <li>
                <span className="text-stone-400">Bonding Curve V1</span>
              </li>
              <li>
                <span className="text-stone-400">Vercel Deploy</span>
              </li>
            </ul>
          </div>

          {/* Nav Col 4 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#080503] font-bold mb-4">
              Actions
            </h4>
            <ul className="space-y-3 text-xs font-mono text-stone-500">
              <li>
                <button onClick={onOpenClaim} className="font-bold text-[#080503] hover:underline cursor-pointer">
                  Claim Slot #014
                </button>
              </li>
              <li>
                <button onClick={onOpenHowItWorks} className="hover:text-[#080503] cursor-pointer">
                  How Pricing Works
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <p>© 2026 Founders Wall Protocol. 500 permanent slots archived on the open web.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All 500 Slots Synchronized
            </span>
            <span className="text-[#dad7d0]">|</span>
            <span>Edge Latency: 12ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
