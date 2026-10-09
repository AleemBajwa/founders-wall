"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function DeveloperBadgeSection() {
  const [activeTab, setActiveTab] = useState<"html" | "react" | "markdown">("markdown");
  const [copied, setCopied] = useState(false);

  const snippets = {
    markdown: `[![Founders Wall Verified](https://founderswall.io/badge/slot-014.svg)](https://founderswall.io)`,
    html: `<a href="https://founderswall.io" target="_blank" rel="noopener noreferrer">
  <img src="https://founderswall.io/badge/slot-014.svg" alt="Founders Wall Slot #014 Verified" height="32" />
</a>`,
    react: `import Image from "next/image";

export function FounderBadge() {
  return (
    <a href="https://founderswall.io" target="_blank" rel="noopener noreferrer">
      <img src="https://founderswall.io/badge/slot-014.svg" alt="Slot #014 Verified" className="h-8" />
    </a>
  );
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sdk" className="relative py-24 lg:py-32 border-b border-[#dad7d0] bg-[#fafaf9]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Copy & Value Proposition */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-500 mb-6">
              <span className="w-8 h-px bg-[#080503]/30" />
              For Builders & Maintainers
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight text-[#080503] leading-[1.05] mb-6">
              Wear your badge.<br />
              <span className="text-stone-400 italic">Prove your genesis.</span>
            </h2>
            <p className="text-base lg:text-lg text-stone-600 leading-relaxed mb-10 max-w-xl">
              Every verified founder slot receives an embeddable SVG badge for their GitHub repository, product landing page, or documentation footer.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#dad7d0]">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#080503] font-bold mb-1">
                  100% SVG Vector
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Crisp rendering at any resolution with zero raster pixelation.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#080503] font-bold mb-1">
                  Zero Trackers
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Privacy-first badge with 0 third-party cookies or telemetry overhead.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#080503] font-bold mb-1">
                  Edge Cached
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Delivered globally via CDN edge nodes with sub-20ms latency.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#080503] font-bold mb-1">
                  Permanent Link
                </h4>
                <p className="text-xs text-stone-500 leading-normal">
                  Deep-links directly to your verified showcase modal on the Wall.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Switcher & Live Badge Mockup */}
          <div className="border border-[#dad7d0] bg-white shadow-2xs">
            {/* Visual Badge Preview */}
            <div className="p-8 border-b border-[#dad7d0] bg-[#fafaf9] flex flex-col items-center justify-center text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-3">
                Live Badge Preview
              </span>
              {/* Badge Asset Representation */}
              <div className="inline-flex items-center border border-[#080503] bg-[#fafaf9] rounded-md px-3.5 py-1.5 shadow-2xs hover:shadow-xs transition-shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#080503] tracking-wider uppercase">
                  FOUNDERS WALL
                </span>
                <span className="mx-2 text-[#dad7d0]">|</span>
                <span className="font-mono text-xs text-stone-600">
                  SLOT #014 VERIFIED
                </span>
              </div>
            </div>

            {/* Code Tabs Header */}
            <div className="flex items-center justify-between border-b border-[#dad7d0] bg-[#fafaf9] px-4">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("markdown")}
                  className={`px-4 py-3 text-xs font-mono transition-colors relative ${
                    activeTab === "markdown"
                      ? "text-[#080503] font-bold"
                      : "text-stone-500 hover:text-[#080503]"
                  }`}
                >
                  Markdown
                  {activeTab === "markdown" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#080503]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("html")}
                  className={`px-4 py-3 text-xs font-mono transition-colors relative ${
                    activeTab === "html"
                      ? "text-[#080503] font-bold"
                      : "text-stone-500 hover:text-[#080503]"
                  }`}
                >
                  HTML
                  {activeTab === "html" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#080503]" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("react")}
                  className={`px-4 py-3 text-xs font-mono transition-colors relative ${
                    activeTab === "react"
                      ? "text-[#080503] font-bold"
                      : "text-stone-500 hover:text-[#080503]"
                  }`}
                >
                  React / Next.js
                  {activeTab === "react" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#080503]" />
                  )}
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-[#080503] py-2 px-3 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Code Snippet Box */}
            <div className="p-6 font-mono text-xs text-[#080503]/85 bg-white overflow-x-auto min-h-[140px]">
              <pre className="leading-relaxed">
                <code>{snippets[activeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
