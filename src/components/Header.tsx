"use client";

import React from "react";
import { Search, ArrowRight } from "lucide-react";

interface HeaderProps {
  claimedCount: number;
  editorialCount?: number;
  paidCount?: number;
  totalSlots: number;
  nextSlotId: number | null;
  nextSlotPrice: number | null;
  isSoldOut?: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenClaim: () => void;
  onOpenHowItWorks: () => void;
  onOpenSearchList: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function Header({
  claimedCount,
  editorialCount = 13,
  paidCount = 0,
  totalSlots,
  nextSlotId,
  nextSlotPrice,
  isSoldOut = false,
  searchQuery,
  onSearchChange,
  onOpenClaim,
  onOpenHowItWorks,
  onOpenSearchList,
  searchInputRef,
}: HeaderProps) {
  const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const shortcutLabel = isMac ? "⌘K" : "Ctrl+K";
  const remainingCount = Math.max(0, totalSlots - claimedCount);

  return (
    <header className="h-14 sm:h-16 shrink-0 border-b border-[#dad7d0] bg-[#fafaf9]/95 backdrop-blur-xs px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 z-30 w-full">
      {/* Brand & Subtitle (Never squished) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
        <a href="#" className="flex items-center gap-1.5 shrink-0">
          <span className="font-display tracking-tight text-lg sm:text-2xl text-[#080503] font-medium whitespace-nowrap">
            Founders Wall
          </span>
        </a>
        <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#dad7d0] text-xs text-stone-500 font-sans truncate">
          <span>A time capsule of 500 builders.</span>
        </div>
      </div>

      {/* Center Search: Desktop inline input ONLY (hidden on mobile to eliminate overlap) */}
      <div className="hidden sm:flex items-center justify-center flex-1 max-w-xs md:max-w-sm px-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          <input
            ref={searchInputRef as any}
            type="text"
            aria-label="Search projects or builders"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-12 py-1.5 text-xs rounded-full border border-[#dad7d0] bg-white font-mono text-[#080503] placeholder:text-stone-400 focus:outline-none focus:border-[#080503] transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-[#dad7d0]/60">
            {shortcutLabel}
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Mobile Search Button (Opens accessible Search Sheet) */}
        <button
          onClick={onOpenSearchList}
          aria-label="Search projects directory"
          title="Search directory"
          className="sm:hidden p-2 rounded-full border border-[#dad7d0] bg-white hover:bg-stone-50 text-stone-600 hover:text-[#080503] transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Inventory Transparency Count (Desktop only) */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-stone-500">
          <span
            className={`w-2 h-2 rounded-full ${
              isSoldOut ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
            }`}
          />
          {isSoldOut ? (
            <span className="font-bold text-[#080503]">500 / 500 Claimed · Wall Sealed</span>
          ) : (
            <>
              <strong className="text-[#080503]">{editorialCount}</strong> editorial
              {paidCount > 0 && (
                <>
                  <span className="text-stone-300">·</span>
                  <strong className="text-[#080503]">{paidCount}</strong> public
                </>
              )}
              <span className="text-stone-300">·</span>
              <span>{remainingCount} remaining</span>
            </>
          )}
        </div>

        {/* Claim Next Slot Button */}
        <button
          onClick={onOpenClaim}
          disabled={isSoldOut}
          className={`inline-flex items-center justify-center gap-1 whitespace-nowrap text-[11px] sm:text-xs font-mono uppercase tracking-wider h-8 sm:h-9 px-3 sm:px-5 rounded-full transition-all duration-200 shadow-2xs ${
            isSoldOut
              ? "bg-stone-300 text-stone-600 cursor-not-allowed opacity-80"
              : "bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] active:scale-95 cursor-pointer"
          }`}
        >
          {isSoldOut ? (
            <span>Sold Out</span>
          ) : (
            <>
              <span>Claim #{nextSlotId} · ${nextSlotPrice}</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </>
          )}
        </button>
      </div>
    </header>
  );
}
