import { PricingTier } from "@/types";

export const PRICING_TIERS: PricingTier[] = [
  {
    tierNumber: 1,
    code: "T1",
    name: "T1: 1-10",
    slotRange: [1, 10],
    price: 0,
    description: "Genesis Pioneers. 10 spots for defining builders.",
    status: "COMPLETED",
  },
  {
    tierNumber: 2,
    code: "T2",
    name: "T2: 11-25",
    slotRange: [11, 25],
    price: 2,
    description: "Impulse Gateway. Accessible entry before bonding inflection.",
    status: "ACTIVE",
  },
  {
    tierNumber: 3,
    code: "T3",
    name: "T3: 26-50",
    slotRange: [26, 50],
    price: 5,
    description: "Early Expansion. Momentum tier.",
    status: "UPCOMING",
  },
  {
    tierNumber: 4,
    code: "T4",
    name: "T4: 51-100",
    slotRange: [51, 100],
    price: 10,
    description: "Centurion Cohort. High-impact software startups.",
    status: "UPCOMING",
  },
  {
    tierNumber: 5,
    code: "T5",
    name: "T5: 101-250",
    slotRange: [101, 250],
    price: 20,
    description: "Scale Benchmark. Proven builders carving permanent footprint.",
    status: "UPCOMING",
  },
  {
    tierNumber: 6,
    code: "T6",
    name: "T6: 251-500",
    slotRange: [251, 500],
    price: 40,
    description: "Archival Horizon. Final slots to seal the 500-builder ledger.",
    status: "UPCOMING",
  },
];

export function formatSlotId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

export function getSlotPrice(slotId: number): number {
  if (slotId < 1 || slotId > 500) {
    throw new Error(`Invalid slot position #${slotId}. Must be between 1 and 500.`);
  }
  const tier = PRICING_TIERS.find(
    (t) => slotId >= t.slotRange[0] && slotId <= t.slotRange[1]
  );
  return tier ? tier.price : 40;
}

export function getCurrentTier(slotId: number): PricingTier {
  if (slotId < 1 || slotId > 500) {
    return PRICING_TIERS[PRICING_TIERS.length - 1];
  }
  const tier = PRICING_TIERS.find(
    (t) => slotId >= t.slotRange[0] && slotId <= t.slotRange[1]
  );
  return tier || PRICING_TIERS[PRICING_TIERS.length - 1];
}

export function getTierForSlot(slotId: number): PricingTier {
  return getCurrentTier(slotId);
}

export function getActiveTier(nextSlotId: number | null): PricingTier | null {
  if (!nextSlotId) return null;
  return getCurrentTier(nextSlotId);
}
