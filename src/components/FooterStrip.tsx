"use client";

import React from "react";
import { ZoomIn, ZoomOut, RotateCcw, ListFilter, HelpCircle, Tag } from "lucide-react";

interface FooterStripProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onOpenHowItWorks: () => void;
  onOpenAboutPolicies: () => void;
  onOpenSearchList: () => void;
}

export function FooterStrip({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onOpenHowItWorks,
  onOpenAboutPolicies,
  onOpenSearchList,
}: FooterStripProps) {
  return (
    <footer className="h-10 sm:h-11 shrink-0 border-t border-[#dad7d0] bg-[#fafaf9]/95 backdrop-blur-xs px-3 sm:px-6 flex items-center justify-between gap-3 text-xs font-mono text-stone-500 z-30 select-none">
      {/* Left Links */}
      <div className="flex items-center gap-3 sm:gap-5">
        <button
          onClick={onOpenHowItWorks}
          className="hover:text-[#080503] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Tag className="w-3 h-3 text-stone-400" />
          <span>Pricing & Rules</span>
        </button>

        <span className="text-stone-300">·</span>

        <button
          onClick={onOpenAboutPolicies}
          className="hover:text-[#080503] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3 h-3 text-stone-400" />
          <span>About & Policies</span>
        </button>

        <span className="text-stone-300">·</span>

        <button
          onClick={onOpenSearchList}
          className="hover:text-[#080503] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ListFilter className="w-3 h-3 text-stone-400" />
          <span>Browse List</span>
        </button>
      </div>

      {/* Center Reassurance (Desktop only) */}
      <div className="hidden lg:block text-stone-400">
        Prices rise as each tier fills · One-time fee, no subscription
      </div>

      {/* Right Zoom & View Controls */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-stone-400 uppercase tracking-wider hidden sm:inline-block mr-1">
          Mosaic View
        </span>

        <button
          onClick={onZoomOut}
          disabled={zoom <= 1}
          aria-label="Zoom out"
          title="Zoom out"
          className="w-7 h-7 flex items-center justify-center rounded border border-[#dad7d0] bg-white hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onResetZoom}
          aria-label="Reset zoom to 1x"
          title="Reset zoom"
          className={`h-7 px-2 flex items-center gap-1 text-[11px] rounded border transition-colors cursor-pointer ${
            zoom !== 1
              ? "border-[#080503] text-[#080503] bg-stone-100 font-bold"
              : "border-[#dad7d0] bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          <RotateCcw className="w-3 h-3" />
          <span>{zoom.toFixed(1)}x</span>
        </button>

        <button
          onClick={onZoomIn}
          disabled={zoom >= 3.5}
          aria-label="Zoom in"
          title="Zoom in"
          className="w-7 h-7 flex items-center justify-center rounded border border-[#dad7d0] bg-white hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
