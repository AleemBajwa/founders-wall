"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Slot, Category } from "@/types";
import { X, Sparkles, Check, Lock, Plus } from "lucide-react";
import { getCurrentTier } from "@/utils/pricing";
import { matchesSlotSearch, ALL_CATEGORIES } from "@/utils/search";

interface SingleScreenWallProps {
  slots: Slot[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  nextSlotId: number | null;
  nextSlotPrice: number | null;
  onSelectSlot: (slot: Slot) => void;
  onOpenClaim: (slotId?: number) => void;
  zoom: number;
  onResetZoom: () => void;
  onOpenSearchList?: () => void;
}

export function SingleScreenWall({
  slots,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  nextSlotId,
  nextSlotPrice,
  onSelectSlot,
  onOpenClaim,
  zoom,
  onResetZoom,
  onOpenSearchList,
}: SingleScreenWallProps) {
  const [hoveredSlot, setHoveredSlot] = useState<Slot | null>(null);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDistanceRef = useRef<number>(0);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Reset pan when zoom returns to 1
  useEffect(() => {
    if (zoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  // Dynamically derive true category counts from real claimed records
  const categoryTabs = useMemo(() => {
    const claimedSlots = slots.filter((s) => s.isClaimed);
    const categories: Category[] = ALL_CATEGORIES;
    
    const tabs = [
      { label: "All", count: claimedSlots.length },
      ...categories.map((cat) => ({
        label: cat,
        count: claimedSlots.filter((s) => s.category === cat).length,
      })),
    ];
    return tabs;
  }, [slots]);

  // Compute matching slot IDs using unified search filter
  const matchResult = useMemo(() => {
    const q = searchQuery.trim();
    const hasCategory = activeCategory !== "All";
    const hasSearch = q !== "";

    if (!hasCategory && !hasSearch) {
      return { isFiltering: false, matchingIds: new Set<number>(), count: 0 };
    }

    const matches = new Set<number>();
    let count = 0;

    slots.forEach((slot) => {
      if (matchesSlotSearch(slot, q, activeCategory)) {
        matches.add(slot.id);
        if (slot.isClaimed) count++;
      }
    });

    return { isFiltering: true, matchingIds: matches, count };
  }, [slots, activeCategory, searchQuery]);

  // Dynamic pan bounds calculation ensuring reachability to outer edge cells
  const getPanBounds = () => {
    const rect = canvasContainerRef.current?.getBoundingClientRect();
    const cWidth = rect?.width || 1200;
    const cHeight = rect?.height || 700;
    const maxPanX = Math.max(0, (cWidth * (zoom - 1)) / 2 + 100);
    const maxPanY = Math.max(0, (cHeight * (zoom - 1)) / 2 + 80);
    return { maxPanX, maxPanY };
  };

  // Mouse & Touch Drag Pan Handlers when Zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragDistanceRef.current = 0;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragDistanceRef.current = Math.hypot(dx, dy);

    const { maxPanX, maxPanY } = getPanBounds();
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, panStartRef.current.x + dx)),
      y: Math.max(-maxPanY, Math.min(maxPanY, panStartRef.current.y + dy)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    setIsDragging(true);
    dragDistanceRef.current = 0;
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panStartRef.current = { ...pan };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || zoom <= 1 || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    dragDistanceRef.current = Math.hypot(dx, dy);

    const { maxPanX, maxPanY } = getPanBounds();
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, panStartRef.current.x + dx)),
      y: Math.max(-maxPanY, Math.min(maxPanY, panStartRef.current.y + dy)),
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex-1 min-h-0 min-w-0 w-full px-1.5 sm:px-3 py-1 flex flex-col items-center justify-between overflow-hidden relative select-none">
      {/* Category Pills Bar */}
      <div className="shrink-0 mb-1 flex items-center justify-center gap-1.5 flex-wrap z-20 max-w-full overflow-x-auto py-0.5">
        {categoryTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => onSelectCategory(tab.label)}
            className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full transition-all duration-150 cursor-pointer ${
              activeCategory === tab.label
                ? "bg-[#080503] text-[#fafaf9] font-bold shadow-2xs"
                : "bg-white border border-[#dad7d0] text-stone-600 hover:border-[#080503] hover:text-[#080503]"
            }`}
          >
            <span>{tab.label}</span>
            <span className="opacity-50 text-[10px] ml-1">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Exploration Guidance & Quick Directory Bar */}
      <div className="shrink-0 w-full max-w-full mb-1 px-2.5 py-1 rounded bg-[#f4f2ec] border border-[#dedad0] flex items-center justify-between gap-2 text-xs font-mono shadow-2xs z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                nextSlotId === null ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                nextSlotId === null ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="text-[#080503] font-bold shrink-0">Guide:</span>
          {nextSlotId === null ? (
            <span className="text-stone-700 font-bold truncate">
              The Founders Wall is sealed · All 500 slots claimed
            </span>
          ) : (
            <>
              <span className="text-stone-600 truncate hidden sm:inline">
                Click any logo to inspect · 13 editorial examples · Slot #{nextSlotId} is active at ${nextSlotPrice}
              </span>
              <span className="text-stone-600 truncate sm:hidden">
                Tap logo to inspect · Slot #{nextSlotId} active (${nextSlotPrice})
              </span>
            </>
          )}
        </div>

        {onOpenSearchList && (
          <button
            onClick={onOpenSearchList}
            className="shrink-0 px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-full bg-white border border-[#dad7d0] hover:border-[#080503] hover:text-[#080503] text-stone-700 shadow-2xs flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Browse List</span>
            <span className="text-stone-400">→</span>
          </button>
        )}
      </div>

      {/* Filter Status Badge */}
      {matchResult.isFiltering && (
        <div className="absolute top-16 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-[#080503] text-[#fafaf9] text-xs font-mono shadow-md animate-in fade-in duration-150">
          {matchResult.count > 0 ? (
            <span>Found {matchResult.count} matching project{matchResult.count === 1 ? "" : "s"}</span>
          ) : (
            <span className="text-amber-300">No matching projects found</span>
          )}
          <button
            onClick={() => {
              onSelectCategory("All");
              onClearSearch();
            }}
            className="p-0.5 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Clear filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Hover Tooltip */}
      {hoveredSlot && (
        <div className="absolute top-16 right-4 z-30 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#080503] text-[#fafaf9] text-xs font-mono shadow-md border border-stone-700">
          <span className="font-bold text-amber-300">{hoveredSlot.formattedId}</span>
          <span className="text-stone-400">·</span>
          {hoveredSlot.isClaimed ? (
            <>
              <span className="font-bold">{hoveredSlot.projectName}</span>
              <span className="text-stone-400 text-[10px]">({hoveredSlot.category})</span>
            </>
          ) : nextSlotId !== null && hoveredSlot.id === nextSlotId ? (
            <span className="text-emerald-400 font-bold">Open for Claim · ${nextSlotPrice}.00</span>
          ) : (
            <span className="text-stone-300">
              Future slot · {getCurrentTier(hoveredSlot.id).code} (${hoveredSlot.pricePaid}.00) · Sequential release
            </span>
          )}
        </div>
      )}

      {/* Interactive 500-Slot Mosaic Canvas (Expanded to Entire Page Width) */}
      <div
        ref={canvasContainerRef}
        className={`flex-1 w-full min-h-0 flex items-center justify-center overflow-hidden relative ${
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="w-full h-full max-h-full border border-[#dad7d0] bg-white p-1 sm:p-1.5 shadow-2xs rounded-xs mosaic-matrix gap-[2px] transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: "center center",
          }}
        >
          {slots.map((slot) => {
            const isMatch = !matchResult.isFiltering || matchResult.matchingIds.has(slot.id);
            const isNext = nextSlotId !== null && slot.id === nextSlotId;

            // 1. Claimed Slot (Shows Logo)
            if (slot.isClaimed) {
              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    if (dragDistanceRef.current > 6) return;
                    onSelectSlot(slot);
                  }}
                  onMouseEnter={() => setHoveredSlot(slot)}
                  onMouseLeave={() => setHoveredSlot(null)}
                  onFocus={() => setHoveredSlot(slot)}
                  onBlur={() => setHoveredSlot(null)}
                  title={`${slot.formattedId}: ${slot.projectName} (${slot.category})`}
                  aria-label={`${slot.formattedId}: ${slot.projectName}, ${slot.category}`}
                  className={`relative w-full h-full rounded-[2px] bg-stone-50 border border-[#dad7d0]/80 p-[2px] flex items-center justify-center overflow-hidden transition-all duration-150 cursor-pointer ${
                    isMatch
                      ? "hover:border-[#080503] hover:scale-110 hover:z-20 hover:shadow-xs"
                      : "opacity-20 grayscale"
                  }`}
                >
                  {slot.logoUrl ? (
                    <img
                      src={slot.logoUrl}
                      alt={slot.projectName}
                      className="w-full h-full object-contain pointer-events-none rounded-[1px]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-mono text-[9px] font-bold text-[#080503]">
                      {slot.projectName?.charAt(0)}
                    </span>
                  )}
                </button>
              );
            }

            // 2. Active Next Available Slot
            if (isNext && nextSlotId !== null) {
              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    if (dragDistanceRef.current > 6) return;
                    onOpenClaim(slot.id);
                  }}
                  onMouseEnter={() => setHoveredSlot(slot)}
                  onMouseLeave={() => setHoveredSlot(null)}
                  onFocus={() => setHoveredSlot(slot)}
                  onBlur={() => setHoveredSlot(null)}
                  title={`Slot #${slot.id} is available right now for $${slot.pricePaid}.00`}
                  aria-label={`Slot #${slot.id} open for claim at $${slot.pricePaid}.00`}
                  className={`relative w-full h-full rounded-[2px] bg-emerald-600 text-white border-2 border-emerald-500 shadow-sm flex flex-col items-center justify-center p-[1px] transition-all duration-150 cursor-pointer z-10 ring-2 ring-emerald-400/80 ring-offset-1 hover:ring-offset-2 hover:scale-115 hover:bg-emerald-700 ${
                    isMatch ? "" : "opacity-30"
                  }`}
                >
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <Plus className="w-2.5 h-2.5 text-white stroke-[3]" />
                  <span className="font-mono text-[7px] font-black text-white leading-none">
                    ${slot.pricePaid}
                  </span>
                </button>
              );
            }

            // 3. Future Upcoming Slot
            return (
              <div
                key={slot.id}
                onMouseEnter={() => setHoveredSlot(slot)}
                onMouseLeave={() => setHoveredSlot(null)}
                title={`${slot.formattedId}: Future slot ($${slot.pricePaid}.00)`}
                className={`w-full h-full rounded-[1px] bg-white/70 border border-[#e5e3dc] hover:border-stone-400 hover:bg-stone-100/90 flex items-center justify-center transition-colors duration-100 cursor-default ${
                  isMatch ? "" : "opacity-15"
                }`}
              >
                <span
                  className={`font-mono text-[7px] text-stone-400 select-none ${
                    zoom > 1.2 ? "block" : "hidden sm:block"
                  }`}
                >
                  {slot.id}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
