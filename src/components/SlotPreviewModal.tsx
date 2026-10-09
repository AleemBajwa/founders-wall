"use client";

import React from "react";
import { Slot } from "@/types";
import { X, ExternalLink, Calendar, DollarSign, ShieldCheck } from "lucide-react";
import { XTwitterIcon } from "@/components/Icons";

interface SlotPreviewModalProps {
  slot: Slot | null;
  onClose: () => void;
}

export function SlotPreviewModal({ slot, onClose }: SlotPreviewModalProps) {
  if (!slot) return null;

  const shareText = `Check out ${slot.projectName} in Slot #${slot.id} on The @FoundersWall! 🚀`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-2xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-150 text-[#080503]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#080503] text-[#fafaf9]">
            Slot #{slot.id} of 500
          </span>
          {slot.category && (
            <span className="px-2 py-0.5 text-xs font-mono border border-[#dad7d0] text-stone-600 uppercase">
              {slot.category}
            </span>
          )}
        </div>

        {/* Project & Founder Details */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-md overflow-hidden bg-white border border-[#dad7d0] shrink-0 flex items-center justify-center p-1.5 shadow-2xs">
            {slot.logoUrl ? (
              <img
                src={slot.logoUrl}
                alt={slot.projectName || "Logo"}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="font-mono font-bold text-[#080503] text-lg">
                {slot.projectName?.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-display font-medium text-[#080503]">
              {slot.projectName}
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mt-0.5">
              <span>By <strong className="text-[#080503]">{slot.founderName || "Anonymous"}</strong></span>
              {slot.founderHandle && (
                <span className="text-stone-600">
                  {slot.founderHandle}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pitch */}
        <div className="p-4 border border-[#dad7d0] bg-white mb-5">
          <p className="text-sm text-stone-700 leading-relaxed font-sans italic">
            "{slot.oneLiner || "Building the future of software."}"
          </p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-500 mb-6 bg-stone-100/60 p-3 border border-[#dad7d0]/60">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-stone-400" />
            <span>Price: <strong className="text-[#080503]">{slot.pricePaid === 0 ? "Free ($0)" : `$${slot.pricePaid}.00`}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Minted: <strong className="text-[#080503]">{slot.claimedAt || "Genesis"}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          {slot.projectUrl && (
            <a
              href={slot.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
            >
              <span>Visit Product (Dofollow)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-[#dad7d0] hover:border-[#080503] text-[#080503] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <XTwitterIcon className="w-3.5 h-3.5" />
            <span>Share Slot on X</span>
          </a>
        </div>

        {/* Verified Badge SLA Notice */}
        <div className="mt-4 pt-3 border-t border-[#dad7d0]/60 flex items-center justify-center gap-1.5 text-[10px] font-mono text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Dofollow Authority · Permanent Link Guarantee</span>
        </div>
      </div>
    </div>
  );
}
