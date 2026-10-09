"use client";

import React from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { PRICING_TIERS } from "@/utils/pricing";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClaim: () => void;
}

export function HowItWorksModal({ isOpen, onClose, onOpenClaim }: HowItWorksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-2xs animate-in fade-in duration-150 overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-6 sm:p-8 my-8 animate-in zoom-in-95 duration-150 text-[#080503]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-[#080503] text-[#fafaf9] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
            Rules & Economics
          </span>
        </div>

        <h2 className="text-3xl font-display font-medium text-[#080503] tracking-tight mb-2">
          How The 500 Wall Operates.
        </h2>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
          Inspired by Alex Tew's 2005 Million Dollar Homepage ($1M gross in 138 days), Founders Wall introduces an <strong>algorithmic bonding curve</strong> tailored for modern software creators.
        </p>

        {/* 3 Pillars */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-4 p-4 border border-[#dad7d0] bg-white">
            <div className="w-7 h-7 rounded-none bg-[#080503] text-[#fafaf9] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              I
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#080503]">
                Ascending Price Curve
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Slots 1–10 were free genesis spots. Slots 11–25 cost $2.00. Subsequent tiers climb up to $40.00 for the final slots. Once purchased, your slot is locked forever.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#dad7d0] bg-white">
            <div className="w-7 h-7 rounded-none bg-[#080503] text-[#fafaf9] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              II
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#080503]">
                Permanent Dofollow Authority
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Unlike social feeds that disappear within minutes, your company link is permanently rendered in static HTML with dofollow attribution.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 border border-[#dad7d0] bg-white">
            <div className="w-7 h-7 rounded-none bg-[#080503] text-[#fafaf9] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
              III
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#080503]">
                Strict Hard Cap: 500 Slots
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                We will never add slot #501. When all 500 slots are occupied, the registry becomes an immutable historical monument of early internet builders.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Matrix */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
            Bonding Tier Matrix
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.tierNumber} className="p-2 border border-[#dad7d0] bg-white font-mono">
                <div className="text-[10px] text-stone-400">
                  {tier.slotRange[0]}-{tier.slotRange[1]}
                </div>
                <div className="font-bold text-[#080503] mt-0.5">
                  {tier.price === 0 ? "FREE" : `$${tier.price}.00`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onOpenClaim();
          }}
          className="w-full py-3.5 px-4 rounded-full bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] font-mono text-xs uppercase tracking-wider font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Claim Next Available Slot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
