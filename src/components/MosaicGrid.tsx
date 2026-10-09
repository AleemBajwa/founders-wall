"use client";

import React, { useState, useMemo } from "react";
import { Slot } from "@/types";
import { Search, ChevronDown, CheckCircle2, Lock, Plus, ArrowUpRight } from "lucide-react";

interface MosaicGridProps {
  slots: Slot[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  nextSlotId: number;
  onOpenClaimForSlot: (slotId: number) => void;
  onSelectClaimedSlot: (slot: Slot) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const CATEGORY_TABS = [
  { label: "All", count: 500 },
  { label: "AI", count: 142 },
  { label: "DevTools", count: 98 },
  { label: "SaaS", count: 114 },
  { label: "Fintech", count: 48 },
  { label: "Media", count: 98 },
];

export function MosaicGrid({
  slots,
  activeCategory,
  onSelectCategory,
  nextSlotId,
  onOpenClaimForSlot,
  onSelectClaimedSlot,
  searchInputRef,
}: MosaicGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSlots = useMemo(() => {
    return slots.filter((slot) => {
      // Category Filter
      if (activeCategory !== "All") {
        if (!slot.isClaimed || slot.category !== activeCategory) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = slot.projectName?.toLowerCase().includes(q);
        const matchesFounder = slot.founderName?.toLowerCase().includes(q);
        const matchesHandle = slot.founderHandle?.toLowerCase().includes(q);
        const matchesBio = slot.oneLiner?.toLowerCase().includes(q);
        const matchesId = slot.formattedId.toLowerCase().includes(q) || slot.id.toString() === q;
        if (!matchesName && !matchesFounder && !matchesHandle && !matchesBio && !matchesId) {
          return false;
        }
      }

      return true;
    });
  }, [slots, activeCategory, searchQuery]);

  return (
    <section id="wall" className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12 border-b border-[#dad7d0] bg-[#fafaf9]">
      {/* Section Header */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-500 mb-4">
          <span className="w-8 h-px bg-[#080503]/30" />
          The Immutable Roster
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-[#080503] leading-[1.05]">
              The 500 Mosaic.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              Inspect claimed digital territory. Click any founder card to view credentials, tags, and permanent backlink authority.
            </p>
          </div>

          <div className="text-xs font-mono text-stone-500">
            Showing <strong className="text-[#080503]">{filteredSlots.length}</strong> of 500 Records
          </div>
        </div>
      </div>

      {/* Toolbar: Category Pills & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#dad7d0]">
        {/* Category Pills */}
        <div className="flex items-center flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => onSelectCategory(tab.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeCategory === tab.label
                  ? "bg-[#080503] text-[#fafaf9] font-bold shadow-2xs"
                  : "bg-transparent border border-[#dad7d0] text-stone-600 hover:border-[#080503] hover:text-[#080503]"
              }`}
            >
              {tab.label} <span className="opacity-50 text-[10px]">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          <input
            ref={searchInputRef as any}
            type="text"
            placeholder="Search founders, tech, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2 text-xs rounded-full border border-[#dad7d0] bg-white focus:outline-none focus:border-[#080503] font-mono text-[#080503] placeholder:text-stone-400 transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400 bg-stone-100 px-1 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* The 4-Column Architectural Mosaic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSlots.map((slot) => {
          // 1. Claimed Founder Card
          if (slot.isClaimed) {
            return (
              <div
                key={slot.id}
                onClick={() => onSelectClaimedSlot(slot)}
                className="group relative flex flex-col justify-between p-5 bg-white border border-[#dad7d0] hover:border-[#080503] transition-all duration-200 cursor-pointer min-h-[220px] shadow-2xs hover:shadow-xs"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="font-bold text-[#080503]">
                    {slot.formattedId}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    {slot.tierLabel || "Genesis • $0.00"}
                  </span>
                </div>

                {/* Identity & Logo Row */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-stone-50 border border-[#dad7d0] shrink-0 flex items-center justify-center p-1">
                    {slot.logoUrl ? (
                      <img src={slot.logoUrl} alt={slot.projectName} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-mono font-bold text-xs text-[#080503]">
                        {slot.projectName?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-[#080503] tracking-tight truncate group-hover:underline">
                        {slot.projectName}
                      </h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono truncate">
                      {slot.category} {slot.subCategory ? `• ${slot.subCategory}` : ""}
                    </div>
                  </div>
                </div>

                {/* Bio / One Liner */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4 font-sans">
                  {slot.oneLiner}
                </p>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#dad7d0]/60 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="truncate max-w-[120px] text-stone-500">
                    {slot.founderHandle || `@founder${slot.id}`}
                  </span>
                  <span className="text-[#080503] font-medium flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          }

          // 2. ACTIVE NEXT SLOT (Slot #014 Highlighted Card)
          if (slot.isActiveNext || slot.id === nextSlotId) {
            return (
              <div
                key={slot.id}
                onClick={() => onOpenClaimForSlot(slot.id)}
                className="group relative flex flex-col justify-between p-5 bg-white border-2 border-[#080503] ring-2 ring-[#080503]/5 shadow-sm transition-all duration-200 cursor-pointer min-h-[220px]"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#080503] text-[#fafaf9] font-bold text-[11px]">
                      {slot.formattedId}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold text-[10px] uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#080503] text-sm">
                    $2.00
                  </span>
                </div>

                {/* Active Placeholder Center */}
                <div className="my-2 p-4 bg-[#fafaf9] border border-dashed border-[#dad7d0] text-center flex flex-col items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#080503] text-[#fafaf9] flex items-center justify-center mb-2">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-[#080503]">
                    Your Product Here
                  </h4>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    Permanent archival token · Slot #{slot.id}
                  </p>
                </div>

                {/* Call to action button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenClaimForSlot(slot.id);
                  }}
                  className="w-full py-2.5 rounded-none bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Claim Slot #{slot.id} ($2.00)</span>
                </button>
              </div>
            );
          }

          // 3. Upcoming Locked Unclaimed Cards
          return (
            <div
              key={slot.id}
              onClick={() => onOpenClaimForSlot(slot.id)}
              className="group relative flex flex-col justify-between p-5 bg-[#fafaf9] border border-dashed border-[#dad7d0] hover:border-stone-400 transition-all duration-200 cursor-pointer min-h-[220px]"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className="text-stone-400 font-bold">
                  {slot.formattedId}
                </span>
                <span className="text-[11px] text-stone-400">
                  {slot.tierLabel || "Tier 2 • $2.00"}
                </span>
              </div>

              {/* Locked placeholder */}
              <div className="my-3 text-center flex flex-col items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-stone-200/70 text-stone-400 flex items-center justify-center mb-2">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-mono text-xs text-stone-500 uppercase tracking-wider">
                  Queued Slot
                </h4>
                <p className="text-[10px] font-mono text-stone-400 mt-0.5">
                  Unlocks after Slot #{nextSlotId}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#dad7d0]/50 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Bond Locked</span>
                <span>${slot.pricePaid}.00</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination / Total Counter Notice */}
      <div className="mt-12 p-6 border border-[#dad7d0] bg-white text-center">
        <div className="text-xs font-mono text-stone-600">
          Viewing <strong className="text-[#080503]">{filteredSlots.length}</strong> of 500 Archival Records
        </div>
        <div className="text-[11px] font-mono text-stone-400 mt-1">
          Each batch permanently locks upon mint. No algorithmic resets.
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 text-xs font-mono">
          <span className="px-3 py-1 bg-stone-100 border border-[#dad7d0] text-[#080503]">
            Slot #014 is $2.00 (Active)
          </span>
          <span className="text-stone-300">→</span>
          <span className="px-3 py-1 bg-stone-100 border border-[#dad7d0] text-stone-500">
            Tier 3 Transition at #026 ($5.00)
          </span>
        </div>
      </div>
    </section>
  );
}
