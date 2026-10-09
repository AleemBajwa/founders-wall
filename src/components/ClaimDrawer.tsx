"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Sparkles, Check, ArrowRight, Upload, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";
import { Category, ClaimFormData, Slot } from "@/types";
import { getSlotPrice, formatSlotId } from "@/utils/pricing";
import confetti from "canvas-confetti";
import { XTwitterIcon } from "@/components/Icons";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ClaimDrawerProps {
  slotId: number;
  isOpen: boolean;
  onClose: () => void;
  onClaimSuccess: (claimedSlot: Slot) => void;
}

const CATEGORIES: Category[] = ["AI", "DevTools", "SaaS", "Productivity", "Infrastructure", "Other"];

const LOGO_PRESETS = [
  "https://api.dicebear.com/7.x/identicon/svg?seed=spark&backgroundColor=080503",
  "https://api.dicebear.com/7.x/identicon/svg?seed=bolt&backgroundColor=10b981",
  "https://api.dicebear.com/7.x/identicon/svg?seed=wave&backgroundColor=0284c7",
  "https://api.dicebear.com/7.x/identicon/svg?seed=flame&backgroundColor=d97706",
  "https://api.dicebear.com/7.x/identicon/svg?seed=rocket&backgroundColor=4f46e5",
  "https://api.dicebear.com/7.x/identicon/svg?seed=prism&backgroundColor=9333ea",
];

export function ClaimDrawer({
  slotId,
  isOpen,
  onClose,
  onClaimSuccess,
}: ClaimDrawerProps) {
  const [formData, setFormData] = useState<ClaimFormData>({
    projectName: "",
    projectUrl: "https://",
    founderName: "",
    founderHandle: "",
    oneLiner: "",
    category: "AI",
    logoUrl: LOGO_PRESETS[0],
  });

  const [urlError, setUrlError] = useState("");
  const [apiError, setApiError] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedSlot, setConfirmedSlot] = useState<Slot | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Accessible focus trap
  const drawerRef = useFocusTrap(isOpen, onClose);

  // Clean reset workflow state upon drawer opening
  useEffect(() => {
    if (isOpen) {
      setIsReviewing(false);
      setIsSuccess(false);
      setIsSubmitting(false);
      setApiError("");
      setUrlError("");
      setConfirmedSlot(null);
    }
  }, [isOpen, slotId]);

  if (!isOpen) return null;

  const price = getSlotPrice(slotId);
  const formattedId = formatSlotId(slotId);

  const validateUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        setUrlError("Please enter a valid http:// or https:// URL");
        return false;
      }
      setUrlError("");
      return true;
    } catch {
      setUrlError("Please enter a valid website URL (e.g. https://yourproduct.com)");
      return false;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedMime = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
    if (!allowedMime.includes(file.type)) {
      alert("Please upload a valid image file (PNG, JPG, SVG, or WebP).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({ ...prev, logoUrl: event.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    const name = formData.projectName.trim();
    if (!name || name.length < 2 || name.length > 50) {
      setApiError("Project name must be between 2 and 50 characters.");
      return;
    }

    const founder = formData.founderName.trim();
    if (!founder || founder.length < 1 || founder.length > 50) {
      setApiError("Founder name is required.");
      return;
    }

    const oneLiner = formData.oneLiner.trim();
    if (!oneLiner || oneLiner.length < 5 || oneLiner.length > 140) {
      setApiError("One-liner pitch must be between 5 and 140 characters.");
      return;
    }

    if (!validateUrl(formData.projectUrl)) return;
    setIsReviewing(true);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: {
            ...formData,
            projectName: formData.projectName.trim(),
            founderName: formData.founderName.trim(),
            founderHandle: formData.founderHandle ? formData.founderHandle.trim() : "",
            oneLiner: formData.oneLiner.trim(),
            projectUrl: formData.projectUrl.trim(),
          },
          targetSlotId: slotId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Payment and registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const mintedSlot: Slot = data.slot;
      setConfirmedSlot(mintedSlot);
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}

      onClaimSuccess(mintedSlot);
    } catch (err: any) {
      setApiError("Network error connecting to registration server. Please try again.");
      setIsSubmitting(false);
    }
  };

  const canonicalUrl = typeof window !== "undefined" ? `${window.location.origin}/?slot=${slotId.toString().padStart(3, "0")}` : "";
  const shareText = `I just minted Slot ${formattedId} on The 500 Founders Wall! 🚀\n\nThe first 10 slots are 100% FREE ($0.00) before the price bonding curve climbs.\n\nGrab your permanent position:`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(canonicalUrl)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="claim-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-2xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Slide-over Container with Focus Trap */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="w-full max-w-md bg-[#fafaf9] h-full shadow-2xl border-l border-[#dad7d0] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250 text-[#080503] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="p-5 sm:p-6 border-b border-[#dad7d0] bg-white flex items-start justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400 block mb-0.5">
                Slot Registration
              </span>
              <div className="flex items-center gap-2">
                <h2 id="claim-drawer-title" className="text-xl sm:text-2xl font-display font-medium text-[#080503]">
                  {isReviewing ? "Review Listing" : `Claim Slot #${slotId}`}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 uppercase">
                  Available
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono mt-1">
                {price === 0 ? (
                  <span className="text-emerald-700 font-bold">Genesis Tier · 100% Free ($0.00)</span>
                ) : (
                  <>One-time fee: <strong>${price}.00 USD</strong> (No subscriptions)</>
                )}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close claim drawer"
              className="p-1.5 rounded-full text-stone-400 hover:text-[#080503] hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            !isReviewing ? (
              /* Step 1: Form Inputs & Live Preview */
              <div className="p-5 sm:p-6 space-y-5">
                {/* Single Payment Callout Box */}
                <div className="p-3.5 border border-[#dad7d0] bg-white shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                      One-Time Listing Fee
                    </span>
                    <span className="text-lg font-display font-bold text-[#080503]">
                      ${price}.00 USD
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                    Permanent position · Subject to standard moderation review
                  </div>
                </div>

                {/* Live Mockup Preview Card */}
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                    Live Slot Preview
                  </span>
                  <div className="p-3 bg-white border border-[#dad7d0] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xs bg-stone-50 border border-[#dad7d0] shrink-0 flex items-center justify-center p-1 overflow-hidden">
                      {formData.logoUrl ? (
                        <img src={formData.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-mono font-bold text-xs">?</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-[#080503] truncate">
                          {formData.projectName || "Your Project Name"}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {formattedId}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 truncate font-sans mt-0.5">
                        {formData.oneLiner || "Your one-sentence pitch will appear here."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form id="claim-form" onSubmit={handleProceedToReview} className="space-y-4">
                  {apiError && (
                    <div className="p-3 bg-red-50 border border-red-300 text-red-900 text-xs font-mono flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* 1. Project Name */}
                  <div>
                    <label htmlFor="field-project-name" className="block text-[11px] font-mono text-stone-700 font-bold mb-1">
                      Project Name *
                    </label>
                    <input
                      id="field-project-name"
                      type="text"
                      required
                      placeholder="e.g. Typeflow"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-none border border-[#dad7d0] bg-white font-mono text-[#080503] focus:outline-none focus:border-[#080503]"
                    />
                  </div>

                  {/* 2. Founder Name */}
                  <div>
                    <label htmlFor="field-founder-name" className="block text-[11px] font-mono text-stone-700 font-bold mb-1">
                      Founder Name *
                    </label>
                    <input
                      id="field-founder-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Miller"
                      value={formData.founderName}
                      onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-none border border-[#dad7d0] bg-white font-mono text-[#080503] focus:outline-none focus:border-[#080503]"
                    />
                  </div>

                  {/* 2. Product URL */}
                  <div>
                    <label htmlFor="field-project-url" className="block text-[11px] font-mono text-stone-700 font-bold mb-1">
                      Website URL *
                    </label>
                    <input
                      id="field-project-url"
                      type="url"
                      required
                      placeholder="https://yourproduct.com"
                      value={formData.projectUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, projectUrl: e.target.value });
                        if (urlError) validateUrl(e.target.value);
                      }}
                      className={`w-full px-3 py-2 text-xs rounded-none border bg-white font-mono text-[#080503] focus:outline-none ${
                        urlError ? "border-red-500 focus:border-red-600" : "border-[#dad7d0] focus:border-[#080503]"
                      }`}
                    />
                    {urlError && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {urlError}
                      </p>
                    )}
                  </div>

                  {/* 3. Category */}
                  <div>
                    <label className="block text-[11px] font-mono text-stone-700 font-bold mb-1.5">
                      Category *
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`py-1.5 px-2 text-[11px] font-mono font-bold transition-all cursor-pointer ${
                            formData.category === cat
                              ? "bg-[#080503] text-[#fafaf9]"
                              : "bg-white border border-[#dad7d0] text-stone-600 hover:border-[#080503]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 4. One-Sentence Pitch */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="field-one-liner" className="text-[11px] font-mono text-stone-700 font-bold">
                        One-Sentence Pitch *
                      </label>
                      <span className="text-[10px] font-mono text-stone-400">
                        {formData.oneLiner.length}/120
                      </span>
                    </div>
                    <textarea
                      id="field-one-liner"
                      rows={2}
                      required
                      maxLength={120}
                      placeholder="AI workflow orchestrator built for high-velocity software teams."
                      value={formData.oneLiner}
                      onChange={(e) => setFormData({ ...formData, oneLiner: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-none border border-[#dad7d0] bg-white text-[#080503] focus:outline-none focus:border-[#080503] font-sans leading-relaxed resize-none"
                    />
                  </div>

                  {/* 5. Logo File Upload & Presets */}
                  <div>
                    <label className="block text-[11px] font-mono text-stone-700 font-bold mb-1.5">
                      Logo Upload (SVG / PNG) *
                    </label>

                    {/* File upload button */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/svg+xml,image/jpeg,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-mono border border-[#dad7d0] bg-white hover:bg-stone-50 text-[#080503] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Custom Logo</span>
                      </button>
                      <span className="text-[10px] font-mono text-stone-400">Max 2MB</span>
                    </div>

                    {/* Presets alternative */}
                    <span className="block text-[10px] font-mono text-stone-400 mb-1">
                      Or pick a preset avatar:
                    </span>
                    <div className="flex items-center gap-2 mb-2">
                      {LOGO_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, logoUrl: p })}
                          className={`w-8 h-8 rounded-none border transition-transform cursor-pointer ${
                            formData.logoUrl === p
                              ? "border-[#080503] ring-2 ring-[#080503]/20 scale-105"
                              : "border-[#dad7d0] hover:border-stone-400"
                          }`}
                        >
                          <img src={p} alt="Preset avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Founder Handle (Optional) */}
                  <div>
                    <label htmlFor="field-founder-handle" className="block text-[11px] font-mono text-stone-700 font-bold mb-1">
                      Founder Handle <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="field-founder-handle"
                      type="text"
                      placeholder="e.g. @sarah_dev"
                      value={formData.founderHandle}
                      onChange={(e) => setFormData({ ...formData, founderHandle: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-none border border-[#dad7d0] bg-white font-mono text-[#080503] focus:outline-none focus:border-[#080503]"
                    />
                  </div>
                </form>
              </div>
            ) : (
              /* Step 2: Final Summary Review Before Payment */
              <div className="p-5 sm:p-6 space-y-4 animate-in fade-in duration-150">
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-300 rounded-none text-emerald-900 text-xs font-sans">
                  <strong>Ready for final review.</strong> Please verify all details before checkout. Your listing will undergo automated safety checks prior to publication.
                </div>

                {apiError && (
                  <div className="p-3 bg-red-50 border border-red-300 text-red-900 text-xs font-mono flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Project Identity Card */}
                <div className="flex items-center gap-3 p-3 bg-white border border-[#dad7d0]">
                  <div className="w-12 h-12 bg-stone-50 border border-[#dad7d0] p-1 flex items-center justify-center shrink-0">
                    <img src={formData.logoUrl} alt="Logo preview" className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-[#080503] block truncate">{formData.projectName}</span>
                    <span className="text-xs text-stone-500 font-mono block">By {formData.founderName} {formData.founderHandle ? `(${formData.founderHandle})` : ""}</span>
                  </div>
                </div>

                {/* Summary Table */}
                <div className="p-4 border border-[#dad7d0] bg-white space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#dad7d0]/60">
                    <span className="text-stone-400">POSITION</span>
                    <span className="font-bold text-[#080503]">{formattedId} of 500</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#dad7d0]/60">
                    <span className="text-stone-400">CATEGORY</span>
                    <span className="font-bold text-[#080503]">{formData.category}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#dad7d0]/60">
                    <span className="text-stone-400">ONE-TIME FEE</span>
                    <span className="font-bold text-emerald-700">
                      {price === 0 ? "FREE ($0.00 Genesis Tier)" : `$${price}.00 USD (No recurring fee)`}
                    </span>
                  </div>
                  <div className="pb-2 border-b border-[#dad7d0]/60">
                    <span className="text-stone-400 block mb-0.5">WEBSITE URL</span>
                    <span className="font-bold text-[#080503] break-all text-[11px]">{formData.projectUrl}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-stone-400 block mb-1">ONE-LINER PITCH</span>
                    <p className="text-stone-700 font-sans italic text-xs leading-relaxed">
                      "{formData.oneLiner}"
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReviewing(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-600 hover:text-[#080503] underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to edit details</span>
                </button>
              </div>
            )
          ) : (
            /* Success Screen */
            <div className="p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Registration Confirmed
              </span>
              <h3 className="text-2xl font-display text-[#080503] mt-1 font-medium">
                Slot {formattedId} Minted.
              </h3>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                <strong>{formData.projectName}</strong> is now permanently indexed on Founders Wall.
              </p>

              {/* Official Server Verification Receipt */}
              <div className="mt-5 p-3.5 border border-[#dad7d0] bg-white text-left font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-stone-500">
                  <span>AUDIT STATUS</span>
                  <span className="text-emerald-700 font-bold">Screened & Approved</span>
                </div>
                {confirmedSlot?.transactionId && (
                  <div className="flex justify-between text-stone-500">
                    <span>TX HASH</span>
                    <span className="text-stone-700 font-bold truncate max-w-[170px]">{confirmedSlot.transactionId}</span>
                  </div>
                )}
                {confirmedSlot?.paymentReference && (
                  <div className="flex justify-between text-stone-500">
                    <span>PAYMENT REF</span>
                    <span className="text-stone-700 font-bold truncate max-w-[170px]">{confirmedSlot.paymentReference}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>CANONICAL URL</span>
                  <a href={canonicalUrl} target="_blank" rel="noopener noreferrer" className="text-[#080503] font-bold underline truncate max-w-[170px]">
                    /?slot={formattedId.slice(1)}
                  </a>
                </div>
              </div>

              <div className="mt-4 p-4 border border-[#dad7d0] bg-white text-left">
                <div className="text-xs font-mono font-bold text-[#080503] mb-1">
                  Share Your Slot
                </div>
                <p className="text-[11px] text-stone-500 mb-3 font-mono">
                  Let the developer community know your project is indexed on the wall.
                </p>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#080503] hover:bg-[#080503]/85 text-[#fafaf9] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <XTwitterIcon className="w-4 h-4 text-white" />
                  <span>Share on X</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="mt-5 w-full py-2.5 px-4 rounded-full border border-[#dad7d0] hover:border-[#080503] text-xs font-mono font-bold text-[#080503] transition-colors cursor-pointer"
              >
                Close & View on Wall
              </button>
            </div>
          )}
        </div>

        {/* Drawer Bottom Actions */}
        {!isSuccess && (
          <div className="p-5 sm:p-6 border-t border-[#dad7d0] bg-white">
            {!isReviewing ? (
              <button
                type="submit"
                form="claim-form"
                className="w-full py-3.5 px-4 rounded-full bg-[#080503] hover:bg-[#080503]/85 active:scale-95 text-[#fafaf9] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-full bg-[#080503] hover:bg-[#080503]/85 active:scale-95 text-[#fafaf9] font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Registering Slot {formattedId}...</span>
                ) : (
                  <>
                    <span>
                      {price === 0 ? `Mint Free Genesis Slot (${formattedId})` : `Confirm & Pay ($${price}.00)`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            <div className="mt-2.5 text-center text-[10px] font-mono text-stone-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {price === 0
                  ? "100% Free · No payment required · Permanent dofollow indexing"
                  : "One payment · No subscriptions · Standard moderation review"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
