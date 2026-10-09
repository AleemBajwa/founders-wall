"use client";

import React, { useMemo, useState } from "react";
import { Slot, Category } from "@/types";
import { X, Search, ExternalLink, ArrowRight } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { matchesSlotSearch, ALL_CATEGORIES } from "@/utils/search";

interface SearchResultsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  slots: Slot[];
  onSelectSlot: (slot: Slot) => void;
}

export function SearchResultsSheet({
  isOpen,
  onClose,
  slots,
  onSelectSlot,
}: SearchResultsSheetProps) {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const containerRef = useFocusTrap(isOpen, onClose);

  const claimedSlots = useMemo(() => {
    return slots.filter((s) => s.isClaimed);
  }, [slots]);

  const filtered = useMemo(() => {
    return claimedSlots.filter((slot) =>
      matchesSlotSearch(slot, query, selectedCat)
    );
  }, [claimedSlots, selectedCat, query]);

  if (!isOpen) return null;

  const categories = ["All", ...ALL_CATEGORIES];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-sheet-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/30 backdrop-blur-2xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-5 sm:p-6 h-[85vh] flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-150 text-[#080503] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 pb-4 border-b border-[#dad7d0]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 id="search-sheet-title" className="text-xl font-display font-medium text-[#080503]">
                Project Directory
              </h2>
              <p className="text-xs text-stone-500 font-mono">
                {filtered.length} of {claimedSlots.length} listed projects
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close directory list"
              className="p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search by name, founder, category, or slot #..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#dad7d0] bg-white font-mono text-[#080503] placeholder:text-stone-400 focus:outline-none focus:border-[#080503]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 text-xs font-mono rounded-full shrink-0 transition-colors cursor-pointer ${
                  selectedCat === cat
                    ? "bg-[#080503] text-[#fafaf9] font-bold"
                    : "bg-white border border-[#dad7d0] text-stone-600 hover:border-[#080503]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Results List with Keyboard-Operable Buttons */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {filtered.length > 0 ? (
            filtered.map((slot) => (
              <button
                type="button"
                key={slot.id}
                onClick={() => {
                  onClose();
                  onSelectSlot(slot);
                }}
                aria-label={`View details for ${slot.projectName}, slot ${slot.formattedId}`}
                className="w-full text-left p-3 bg-white border border-[#dad7d0] hover:border-[#080503] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#080503] focus-visible:border-[#080503] transition-colors rounded-none flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xs bg-stone-50 border border-[#dad7d0] shrink-0 flex items-center justify-center p-1">
                    {slot.logoUrl ? (
                      <img src={slot.logoUrl} alt={slot.projectName} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-mono font-bold text-xs">{slot.projectName?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#080503] group-hover:underline">
                        {slot.projectName}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {slot.formattedId}
                      </span>
                      {slot.isEditorialExample && (
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-amber-100 text-amber-800 rounded">
                          Example
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 truncate max-w-sm font-sans mt-0.5">
                      {slot.oneLiner}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-stone-400 hidden sm:inline-block">
                    {slot.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#080503] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12 text-stone-500 font-mono text-xs flex flex-col items-center gap-2">
              <span>No projects found matching your criteria.</span>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedCat("All");
                }}
                className="mt-1 px-3 py-1 rounded-full border border-[#dad7d0] hover:border-[#080503] text-[#080503] font-bold cursor-pointer transition-colors"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 pt-3 border-t border-[#dad7d0] flex items-center justify-between text-xs font-mono text-stone-500">
          <span>Click any project to view full credentials</span>
          <button onClick={onClose} className="hover:text-[#080503] underline cursor-pointer">
            Back to wall
          </button>
        </div>
      </div>
    </div>
  );
}
