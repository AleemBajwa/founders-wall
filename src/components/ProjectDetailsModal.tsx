"use client";

import React, { useState } from "react";
import { Slot } from "@/types";
import { X, ExternalLink, Share2, Check, Info } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ProjectDetailsModalProps {
  slot: Slot | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ slot, onClose }: ProjectDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useFocusTrap(Boolean(slot), onClose);

  if (!slot) return null;

  const handleShare = async () => {
    try {
      const formatted = slot.id.toString().padStart(3, "0");
      const url = typeof window !== "undefined" ? `${window.location.origin}/?slot=${formatted}` : "";
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn("Clipboard access denied or unavailable", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-details-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-md bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-[#080503] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Slot & Category Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#080503] text-[#fafaf9]">
            {slot.formattedId} of 500
          </span>
          {slot.category && (
            <span className="px-2 py-0.5 text-xs font-mono border border-[#dad7d0] text-stone-600 uppercase">
              {slot.category}
            </span>
          )}
        </div>

        {/* Editorial Example Honest Notice */}
        {slot.isEditorialExample && (
          <div className="mb-4 p-2.5 rounded border border-amber-300 bg-amber-50/70 text-amber-900 text-xs font-sans flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Editorial example</strong> — Curated community reference listing, not a paid participant or endorsement.
            </div>
          </div>
        )}

        {/* Project Identity */}
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

          <div className="min-w-0 flex-1">
            <h2 id="project-details-title" className="text-2xl font-display font-medium text-[#080503] truncate">
              {slot.projectName}
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mt-0.5 truncate">
              <span>By <strong className="text-[#080503]">{slot.founderName || "Anonymous"}</strong></span>
              {slot.founderHandle && (
                <span className="text-stone-600">
                  {slot.founderHandle}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* One-Sentence Pitch */}
        <div className="p-4 border border-[#dad7d0] bg-white mb-5">
          <p className="text-sm text-stone-700 leading-relaxed font-sans italic">
            "{slot.oneLiner || "Building the future of software."}"
          </p>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-500 mb-6 bg-stone-100/60 p-3 border border-[#dad7d0]/60">
          <div>
            <span className="block text-[10px] text-stone-400">STATUS</span>
            <span className="font-bold text-[#080503]">
              {slot.isEditorialExample ? "Curated Example" : "Confirmed Participant"}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-stone-400">TIER ASSIGNMENT</span>
            <span className="font-bold text-[#080503]">{slot.tierLabel || "Standard"}</span>
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
              <span>Visit website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full border border-[#dad7d0] hover:border-[#080503] text-[#080503] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Slot Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share project</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
