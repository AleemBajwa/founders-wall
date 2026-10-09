import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { getAllSlotsAuthoritative } from "@/lib/serverStorage";
import { Category, Slot } from "@/types";

const CATEGORY_MAP: Record<string, { label: Category; description: string }> = {
  ai: {
    label: "AI",
    description: "Curated collection of artificial intelligence agents, LLM applications, generative tools, and machine learning software from indie founders.",
  },
  devtools: {
    label: "DevTools",
    description: "Developer utilities, APIs, CLI tools, debugging software, and code infrastructure built by developers for developers.",
  },
  saas: {
    label: "SaaS",
    description: "Software-as-a-service platforms, B2B applications, cloud services, and micro-SaaS products across global industries.",
  },
  productivity: {
    label: "Productivity",
    description: "Workflow optimization apps, note-taking systems, time trackers, task management solutions, and focus utilities.",
  },
  infrastructure: {
    label: "Infrastructure",
    description: "Hosting platforms, backend architectures, databases, cloud edge services, and network utilities.",
  },
  other: {
    label: "Other",
    description: "Creative internet experiments, media ventures, consumer tech, and unconventional indie projects.",
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORY_MAP[category.toLowerCase()];
  if (!config) return { title: "Category Not Found" };

  return {
    title: `Best ${config.label} Startups & Tools | Founders Wall Directory`,
    description: `Explore verified ${config.label} startups on The 500 Founders Wall. Permanent dofollow backlinks, founder pitches, and early access. First 10 positions are free.`,
    alternates: {
      canonical: `/category/${category.toLowerCase()}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const config = CATEGORY_MAP[category.toLowerCase()];

  if (!config) {
    notFound();
  }

  const inventory = await getAllSlotsAuthoritative();
  const categorySlots = inventory.slots.filter(
    (s) => s.isClaimed && s.category === config.label
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#080503] font-sans">
      {/* Header */}
      <header className="border-b border-[#dad7d0] bg-white sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/directory"
            className="flex items-center gap-2 text-xs font-mono font-bold hover:text-stone-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Categories</span>
          </Link>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/" className="text-stone-600 hover:text-stone-900">
              Mosaic Wall
            </Link>
            <Link href="/how-it-works" className="text-stone-600 hover:text-stone-900">
              Pricing
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-[#dad7d0] text-[11px] font-mono text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-stone-600" />
            <span>Verified Vertical Hub · {config.label}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-[#080503]">
            {config.label} Startups & Tools
          </h1>
          <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
            {config.description}
          </p>
        </div>

        {/* Startups List or Empty State */}
        {categorySlots.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorySlots.map((slot: Slot) => (
              <div
                key={slot.id}
                className="p-4 bg-white border border-[#dad7d0] space-y-3 hover:border-stone-400 transition-colors"
              >
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
                  <span className="text-stone-500">{slot.category}</span>
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
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-[#dad7d0] text-center space-y-3">
            <h2 className="font-mono text-base font-bold text-stone-800">
              No {config.label} positions claimed yet!
            </h2>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Be the first founder to represent the {config.label} category on the 500 Founders Wall. The first 10 slots are 100% free ($0.00).
            </p>
            <div>
              <Link
                href="/"
                className="inline-block px-5 py-2.5 bg-[#080503] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-stone-800 transition-all"
              >
                Claim Genesis Position
              </Link>
            </div>
          </div>
        )}

        {/* Sibling Category Links (Hub and Spoke) */}
        <section className="pt-8 border-t border-[#dad7d0] space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
            Browse Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_MAP).map(([slug, item]) => {
              if (slug === category.toLowerCase()) return null;
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="px-3 py-1 bg-white border border-[#dad7d0] text-xs font-mono text-stone-700 hover:border-stone-400 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#dad7d0] bg-white py-8 text-xs font-mono text-stone-500 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>The 500 Founders Wall · An archival mosaic of internet builders</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-stone-900">Wall</Link>
            <Link href="/directory" className="hover:text-stone-900">Directory</Link>
            <Link href="/how-it-works" className="hover:text-stone-900">Pricing & Rules</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
