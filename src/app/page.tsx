"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Slot } from "@/types";
import { generateAllSlots } from "@/data/initialSlots";
import { getSlotPrice } from "@/utils/pricing";
import { Header } from "@/components/Header";
import { SingleScreenWall } from "@/components/SingleScreenWall";
import { FooterStrip } from "@/components/FooterStrip";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import { PricingHowItWorksModal } from "@/components/PricingHowItWorksModal";
import { AboutPoliciesModal } from "@/components/AboutPoliciesModal";
import { SearchResultsSheet } from "@/components/SearchResultsSheet";
import { ClaimDrawer } from "@/components/ClaimDrawer";

const STORAGE_KEY = "founders_wall_minted_records_v3";

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>(generateAllSlots);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [zoom, setZoom] = useState<number>(1);

  // Modals & Overlays state
  const [selectedSlotForDetails, setSelectedSlotForDetails] = useState<Slot | null>(null);
  const [claimDrawerOpen, setClaimDrawerOpen] = useState(false);
  const [targetSlotForClaim, setTargetSlotForClaim] = useState<number>(14);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [searchSheetOpen, setSearchSheetOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch authoritative slots from server API on mount
  useEffect(() => {
    let mounted = true;
    async function loadAuthoritativeSlots() {
      try {
        const res = await fetch("/api/slots", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (mounted && Array.isArray(data.slots)) {
            setSlots(data.slots);
          }
        }
      } catch (err) {
        console.warn("Using local slots fallback:", err);
      }
    }
    loadAuthoritativeSlots();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle URL deep-linking (?slot=001 or ?slot=14)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const slotParam = params.get("slot");
    if (slotParam) {
      const parsedId = parseInt(slotParam, 10);
      if (!isNaN(parsedId)) {
        const target = slots.find((s) => s.id === parsedId);
        if (target && target.isClaimed) {
          setSelectedSlotForDetails(target);
        } else if (target && target.id === 14) {
          setTargetSlotForClaim(14);
          setClaimDrawerOpen(true);
        }
      }
    }
  }, [slots]);

  // Sync active slot deep-link to URL
  const handleOpenDetails = (slot: Slot) => {
    setSelectedSlotForDetails(slot);
    if (typeof window !== "undefined") {
      const formatted = slot.id.toString().padStart(3, "0");
      window.history.replaceState(null, "", `?slot=${formatted}`);
    }
  };

  const handleCloseDetails = () => {
    setSelectedSlotForDetails(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // Safe Keyboard shortcut Ctrl+K / ⌘K that never escapes active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // Do NOT steal focus if any overlay/dialog is active
        const isOverlayOpen =
          claimDrawerOpen ||
          pricingModalOpen ||
          aboutModalOpen ||
          Boolean(selectedSlotForDetails) ||
          searchSheetOpen;

        if (isOverlayOpen) return;

        // On mobile, open directory sheet; on desktop, focus search input
        if (typeof window !== "undefined" && window.innerWidth < 640) {
          setSearchSheetOpen(true);
        } else {
          searchInputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [claimDrawerOpen, pricingModalOpen, aboutModalOpen, selectedSlotForDetails, searchSheetOpen]);

  // Compute next available slot and sold-out status
  const nextSlotId = useMemo(() => {
    const firstUnclaimed = slots.find((s) => !s.isClaimed);
    return firstUnclaimed ? firstUnclaimed.id : null;
  }, [slots]);

  const nextSlotPrice = useMemo(() => {
    return nextSlotId ? getSlotPrice(nextSlotId) : null;
  }, [nextSlotId]);

  const isSoldOut = nextSlotId === null;
  const editorialCount = 0;
  const claimedCount = useMemo(() => {
    return slots.filter((s) => s.isClaimed).length;
  }, [slots]);
  const paidCount = claimedCount;

  const handleOpenClaim = (slotId?: number | null) => {
    if (isSoldOut || !nextSlotId) return;
    setTargetSlotForClaim(slotId || nextSlotId);
    setClaimDrawerOpen(true);
  };

  const handleClaimSuccess = (newSlot: Slot) => {
    setSlots((prev) => prev.map((s) => (s.id === newSlot.id ? newSlot : s)));
    // Re-sync authoritative inventory from server
    fetch("/api/slots", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.slots)) {
          setSlots(data.slots);
        }
      })
      .catch(() => {});
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(3.5, Number((z + 0.5).toFixed(1))));
  const handleZoomOut = () => setZoom((z) => Math.max(1, Number((z - 0.5).toFixed(1))));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-screen overflow-hidden flex flex-col bg-[#fafaf9] text-[#080503] select-none">
      {/* 1. Compact Header */}
      <Header
        claimedCount={claimedCount}
        editorialCount={editorialCount}
        paidCount={paidCount}
        totalSlots={500}
        nextSlotId={nextSlotId}
        nextSlotPrice={nextSlotPrice}
        isSoldOut={isSoldOut}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenClaim={() => handleOpenClaim(nextSlotId || undefined)}
        onOpenHowItWorks={() => setPricingModalOpen(true)}
        onOpenSearchList={() => setSearchSheetOpen(true)}
        searchInputRef={searchInputRef}
      />

      {/* 2. Single-Screen 500-Slot Wall (Fits 100% in viewport without scrolling) */}
      <main className="flex-1 min-h-0 min-w-0 w-full flex flex-col overflow-hidden relative">
        <SingleScreenWall
          slots={slots}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          nextSlotId={nextSlotId}
          nextSlotPrice={nextSlotPrice}
          onSelectSlot={handleOpenDetails}
          onOpenClaim={handleOpenClaim}
          zoom={zoom}
          onResetZoom={handleResetZoom}
          onOpenSearchList={() => setSearchSheetOpen(true)}
        />
      </main>

      {/* 3. Compact Status & View Strip */}
      <FooterStrip
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onOpenHowItWorks={() => setPricingModalOpen(true)}
        onOpenAboutPolicies={() => setAboutModalOpen(true)}
        onOpenSearchList={() => setSearchSheetOpen(true)}
      />

      {/* Overlays (Scrollable internally) */}
      <ProjectDetailsModal
        slot={selectedSlotForDetails}
        onClose={handleCloseDetails}
      />

      <PricingHowItWorksModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        nextSlotId={nextSlotId}
        nextSlotPrice={nextSlotPrice}
        onOpenClaim={() => {
          setPricingModalOpen(false);
          handleOpenClaim(nextSlotId);
        }}
      />

      <AboutPoliciesModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

      <SearchResultsSheet
        isOpen={searchSheetOpen}
        onClose={() => setSearchSheetOpen(false)}
        slots={slots}
        onSelectSlot={(slot) => {
          setSearchSheetOpen(false);
          handleOpenDetails(slot);
        }}
      />

      <ClaimDrawer
        slotId={targetSlotForClaim}
        isOpen={claimDrawerOpen}
        onClose={() => setClaimDrawerOpen(false)}
        onClaimSuccess={handleClaimSuccess}
      />
    </div>
  );
}
