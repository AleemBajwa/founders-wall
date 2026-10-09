"use client";

import React from "react";
import { X, ShieldCheck, HelpCircle, Mail, AlertCircle, Info } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface AboutPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutPoliciesModal({ isOpen, onClose }: AboutPoliciesModalProps) {
  const containerRef = useFocusTrap(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-policies-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative w-full max-w-xl bg-[#fafaf9] border border-[#dad7d0] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 text-[#080503] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close about and policies"
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-200/50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500 block mb-1">
            Documentation & Governance
          </span>
          <h2 id="about-policies-title" className="text-3xl font-display font-medium text-[#080503]">
            About & Platform Policies
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Everything you need to know about our standards, listing retention, moderation, and support.
          </p>
        </div>

        {/* Official Platform Charter */}
        <div className="mb-4 p-3.5 rounded border border-emerald-300 bg-emerald-50/70 text-emerald-950 text-xs font-sans flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-950">Founders Wall Operational Charter:</strong> The policies below represent finalized, binding platform commitments governing all listings, moderation, refunds, and archival preservation.
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-3.5 mb-6 text-xs text-stone-600 leading-relaxed font-sans">
          <div className="p-4 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Submission Standards</span>
            </h4>
            <p>
              Founders Wall is strictly reserved for genuine software products, developer tools, indie apps, SaaS, and AI technologies. Submissions promoting deceptive content, cryptocurrency scams, malware, phishing, gambling, or abusive material are permanently prohibited and rejected.
            </p>
          </div>

          <div className="p-4 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-stone-500" />
              <span>Moderation & 100% Refund Guarantee</span>
            </h4>
            <p>
              Every submission undergoes automated checks and human editorial screening. If a submitted project does not meet safety or authenticity criteria, the listing will not be published and a 100% full refund is issued automatically to your payment method within 3–5 business days.
            </p>
          </div>

          <div className="p-4 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-stone-500" />
              <span>Permanent Archival Retention</span>
            </h4>
            <p>
              Your slot placement is permanent. Once published, your listing remains on Founders Wall indefinitely with no recurring maintenance fees or subscription renewals. Project rebrands, new domain URLs, or bio edits can be requested at any time by the verified owner free of charge.
            </p>
          </div>

          <div className="p-4 border border-[#dad7d0] bg-white">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#080503] font-mono mb-1.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-stone-500" />
              <span>Verified Human Support</span>
            </h4>
            <p>
              For ownership transfers, URL updates, or platform inquiries, contact the operations desk directly at{" "}
              <a href="mailto:support@founderswall.io" className="text-[#080503] underline font-bold">
                support@founderswall.io
              </a>
              . Every verified request is acknowledged and processed by an operator within 1 business day.
            </p>
          </div>
        </div>

        {/* Close action */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-full border border-[#dad7d0] hover:border-[#080503] text-[#080503] font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
        >
          Close Documentation
        </button>
      </div>
    </div>
  );
}
