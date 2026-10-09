"use client";

import React, { useState } from "react";
import { X, Sparkles, ArrowRight, ShieldCheck, Info } from "lucide-react";
import { PRICING_TIERS, getSlotPrice, getCurrentTier } from "@/utils/pricing";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface PricingHowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextSlotId: number | null;
  nextSlotPrice: number | null;
  onOpenClaim: () => void;
}

export function PricingHowItWorksModal({
  isOpen,
  onClose,
  nextSlotId,
  nextSlotPrice,
  onOpenClaim,
}: PricingHowItWorksModalProps) {
  const [sliderSlot, setSliderSlot] = useState(nextSlotId || 14);
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  const activeTier = nextSlotId ? getCurrentTier(nextSlotId) : null;
  const sliderTier = getCurrentTier(sliderSlot);
  const sliderPrice = getSlotPrice(sliderSlot);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-[#080503] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close pricing and rules"
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-1">
            Rules & Pricing Schedule
          </span>
          <h2 id="pricing-modal-title" className="text-3xl font-display font-medium text-[#080503]">
            How The Wall Operates.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Founders Wall is a static time capsule of 500 early software products. Participation is governed by an ascending bonding curve.
          </p>
        </div>

        {/* Seed Inventory Honest Notice */}
        <div className="mb-4 p-3 rounded border border-amber-300 bg-amber-50/70 text-amber-900 text-xs font-sans flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          {nextSlotId === null ? (
            <div>
              <strong>Wall Sealed:</strong> All 500 positions across all 6 tiers have been successfully filled. No additional positions will ever be created.
            </div>
          ) : (
            <div>
              <strong>Seed Inventory Transparency:</strong> Positions #001–#013 showcase 13 complimentary genesis & pilot listings (curated editorial references). Slot <strong>#{nextSlotId}</strong> is the only active open slot available for purchase right now at <strong>${nextSlotPrice}.00</strong> ({activeTier?.name}). Subsequent slots unlock in order as each tier fills.
            </div>
          )}
        </div>

        {/* Principles */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1">
              One-Time Payment
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              There are no monthly recurring subscriptions. You pay once for your slot, and your project remains indexed on the wall indefinitely.
            </p>
          </div>

          <div className="p-3.5 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1">
              Prices Rise by Tier
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              Slots 1–10 were complimentary genesis slots. Open public slots begin at Tier 2 ($2.00). Subsequent tiers climb up to $40.00 for the final batch.
            </p>
          </div>

          <div className="p-3.5 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1">
              Hard Cap of 500 Slots
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              The grid contains exactly 500 positions. When all slots are filled, the wall is sealed. No slot #501 will ever be created.
            </p>
          </div>
        </div>

        {/* 6-Tier Price Table */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
            The Complete Tier Schedule
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
            {PRICING_TIERS.map((tier) => {
              const isCurrent = activeTier ? tier.tierNumber === activeTier.tierNumber : false;
              const isCompleted = activeTier ? tier.tierNumber < activeTier.tierNumber : true;

              return (
                <div
                  key={tier.tierNumber}
                  className={`p-2 border transition-colors ${
                    isCurrent
                      ? "border-[#080503] bg-emerald-50/50 text-[#080503] font-bold ring-1 ring-emerald-500"
                      : isCompleted
                      ? "border-[#dad7d0] bg-stone-100/50 text-stone-400"
                      : "border-[#dad7d0] bg-white text-stone-600"
                  }`}
                >
                  <div className="text-[10px] text-stone-400">
                    {tier.slotRange[0]}-{tier.slotRange[1]}
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                  </div>
                  {isCurrent && (
                    <div className="text-[9px] uppercase tracking-wider text-emerald-700 font-bold mt-0.5">
                      Active
                    </div>
                  )}
                  {isCompleted && (
                    <div className="text-[9px] uppercase tracking-wider text-stone-400 mt-0.5">
                      Filled
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Price Explorer */}
        <div className="p-4 border border-[#dad7d0] bg-white mb-6">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-stone-500">EXPLORE SLOT PRICES</span>
            <span className="font-bold text-[#080503]">
              Slot #{sliderSlot.toString().padStart(3, "0")} / 500
            </span>
          </div>
          <input
            type="range"
            aria-label="Inspect pricing across slot range from 1 to 500"
            min="1"
            max="500"
            value={sliderSlot}
            onChange={(e) => setSliderSlot(Number(e.target.value))}
            className="w-full accent-[#080503] cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs font-mono mt-2 pt-2 border-t border-[#dad7d0]/60">
            <span className="text-stone-500">Tier: {sliderTier.name}</span>
            <span className="font-bold text-[#080503]">Price: ${sliderPrice}.00 USD</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            if (nextSlotId === null) return;
            onClose();
            onOpenClaim();
          }}
          disabled={nextSlotId === null}
          className={`w-full py-3.5 px-4 rounded-full font-mono text-xs uppercase tracking-wider font-bold shadow-xs flex items-center justify-center gap-2 transition-colors ${
            nextSlotId === null
              ? "bg-stone-300 text-stone-600 cursor-not-allowed"
              : "bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] cursor-pointer"
          }`}
        >
          {nextSlotId === null ? (
            <span>Wall Sealed · All 500 Slots Claimed</span>
          ) : (
            <>
              <span>Claim Active Slot (#{nextSlotId} · ${nextSlotPrice}.00)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
