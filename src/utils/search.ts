import { Slot, Category } from "@/types";

export const ALL_CATEGORIES: Category[] = [
  "AI",
  "DevTools",
  "SaaS",
  "Productivity",
  "Infrastructure",
  "Other",
];

/**
 * Unified search filter matching project name, founder name, handle,
 * category, subcategory, one-liner bio, and slot IDs.
 */
export function matchesSlotSearch(
  slot: Slot,
  rawQuery: string,
  selectedCategory: string = "All"
): boolean {
  // 1. Category Matching
  if (selectedCategory !== "All") {
    if (!slot.isClaimed || slot.category !== selectedCategory) {
      return false;
    }
  }

  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;

  // 2. Exact or Category Query
  if (slot.category && slot.category.toLowerCase() === q) {
    return true;
  }

  // 3. ID Matching (#001, 1, 001)
  const cleanId = q.startsWith("#") ? q.slice(1) : q;
  if (slot.id.toString() === cleanId || slot.formattedId.toLowerCase() === q) {
    return true;
  }

  // 4. Text and Metadata Matching
  if (slot.projectName?.toLowerCase().includes(q)) return true;
  if (slot.founderName?.toLowerCase().includes(q)) return true;
  if (slot.founderHandle?.toLowerCase().includes(q)) return true;
  if (slot.oneLiner?.toLowerCase().includes(q)) return true;
  if (slot.subCategory?.toLowerCase().includes(q)) return true;

  return false;
}
