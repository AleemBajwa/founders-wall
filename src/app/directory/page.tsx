import React, { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, Sparkles, Filter } from "lucide-react";
import { getAllSlotsAuthoritative } from "@/lib/serverStorage";
import { Slot } from "@/types";

export const metadata: Metadata = {
  title: "Startup & Founder Directory — 500 Verified Positions",
  description:
    "Explore the complete crawlable directory of 500 internet startups, indie tools, and founders. Filter by AI, DevTools, SaaS, Productivity, and Infrastructure. Permanent dofollow backlinks.",
  alternates: {
    canonical: "/directory",
  },
};

const CATEGORIES = [
  "All",
  "AI",
  "DevTools",
  "SaaS",
  "Productivity",
  "Infrastructure",
  "Other",
];

async function DirectoryContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category || "All";
  const searchQuery = (resolvedParams?.q || "").toLowerCase().trim();

  const inventory = await getAllSlotsAuthoritative();
  const allSlots = inventory.slots;

  const filteredSlots = allSlots.filter((slot) => {
    const matchesCategory =
      currentCategory === "All" || slot.category === currentCategory;
    const matchesQuery =
      !searchQuery ||
      (slot.projectName && slot.projectName.toLowerCase().includes(searchQuery)) ||
      (slot.oneLiner && slot.oneLiner.toLowerCase().includes(searchQuery)) ||
      (slot.founderName && slot.founderName.toLowerCase().includes(searchQuery)) ||
      slot.formattedId.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesQuery;
  });

  const claimedCount = inventory.claimedCount;
  const remainingCount = inventory.remainingCount;

  // Schema.org ItemList for Googlebot
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The 500 Founders Wall Startup Directory",
    description: "Verified catalog of 500 internet products and indie startups.",
    numberOfItems: filteredSlots.length,
    itemListElement: filteredSlots.slice(0, 50).map((slot, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: slot.isClaimed ? (slot.projectName || "Claimed Project") : `Slot ${slot.formattedId} (Available)`,
      description: slot.isClaimed ? (slot.oneLiner || "Founders Wall Project") : "Available for claiming on the Founders Wall",
      url: slot.isClaimed ? (slot.projectUrl || `https://founders-wall.vercel.app/?slot=${slot.id}`) : `https://founders-wall.vercel.app/?slot=${slot.id}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#080503] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Header */}
      <header className="border-b border-[#dad7d0] bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-bold hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Mosaic Wall</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/how-it-works" className="text-stone-600 hover:text-stone-900">
              Pricing & FAQ
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-stone-900">
              About
            </Link>
            <Link
              href="/"
              className="px-3 py-1 bg-[#080503] text-white rounded font-bold hover:bg-stone-800 transition-colors"
            >
              Claim Slot
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Title & Stats */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-[#dad7d0] text-[11px] font-mono text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>Crawlable Archive Index · {claimedCount} Claimed · {remainingCount} Available</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[#080503]">
            The 500 Founders Wall Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Every claimed position is permanently indexed with dofollow links, founder profiles, and project pitches. The first 10 slots are 100% free ($0.00).
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#dad7d0]">
          <span className="text-xs font-mono text-stone-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;
            const href = cat === "All" ? "/directory" : `/directory?category=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-3 py-1 text-xs font-mono rounded-none border transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-[#080503] text-white border-[#080503] font-bold"
                    : "bg-white text-stone-700 border-[#dad7d0] hover:border-stone-400"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Directory Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSlots.map((slot: Slot) => (
            <div
              key={slot.id}
              className={`p-4 border transition-all ${
                slot.isClaimed
                  ? "bg-white border-[#dad7d0] hover:border-stone-400 hover:shadow-xs"
                  : "bg-stone-50/50 border-dashed border-[#dad7d0]"
              }`}
            >
              {slot.isClaimed ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {slot.logoUrl ? (
                        <img
                          src={slot.logoUrl}
                          alt={`${slot.projectName || "Project"} logo`}
                          className="w-8 h-8 rounded border border-stone-200 object-cover bg-stone-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded border border-stone-200 bg-stone-100 flex items-center justify-center font-mono text-[10px] font-bold">
                          {slot.formattedId}
                        </div>
                      )}
                      <div>
                        <h2 className="font-mono text-xs font-bold text-stone-900 leading-tight">
                          {slot.projectName || "Untitled Project"}
                        </h2>
                        <span className="text-[10px] font-mono text-stone-500">
                          by {slot.founderName || "Anonymous"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 bg-stone-100 border border-stone-200 text-stone-600 font-bold">
                      {slot.formattedId}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {slot.oneLiner || "Verified founder project indexed on The Founders Wall."}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] font-mono">
                    <span className="text-stone-500">{slot.category || "Other"}</span>
                    {slot.projectUrl && (
                      <a
                        href={slot.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#080503] font-bold hover:underline"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-400">
                      {slot.formattedId} · Available
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      {slot.pricePaid === 0 ? "FREE ($0)" : `$${slot.pricePaid}.00`}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-400">
                    {slot.tierLabel}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/?slot=${slot.id}`}
                      className="inline-block text-xs font-mono font-bold text-stone-800 hover:text-black underline"
                    >
                      Claim Position on Wall →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dad7d0] bg-white py-8 text-xs font-mono text-stone-500 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>The 500 Founders Wall · An archival mosaic of internet builders</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-stone-900">Wall</Link>
            <Link href="/how-it-works" className="hover:text-stone-900">Pricing & Rules</Link>
            <Link href="/about" className="hover:text-stone-900">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center font-mono text-xs text-stone-500">
          Loading Founders Directory Archive...
        </div>
      }
    >
      <DirectoryContent searchParams={searchParams} />
    </Suspense>
  );
}
