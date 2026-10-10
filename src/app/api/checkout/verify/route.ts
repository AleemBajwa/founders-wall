import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { claimSlotAuthoritative, getServerClaims } from "@/lib/serverStorage";
import { ClaimFormData } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "session_id parameter is required." },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment has not been completed." },
        { status: 402 }
      );
    }

    const metadata = session.metadata;
    if (!metadata || !metadata.slotId || !metadata.projectName) {
      return NextResponse.json(
        { error: "Invalid checkout session metadata." },
        { status: 400 }
      );
    }

    const slotId = parseInt(metadata.slotId, 10);
    const formData: ClaimFormData = {
      projectName: metadata.projectName,
      founderName: metadata.founderName || "Anonymous Founder",
      founderHandle: metadata.founderHandle || "",
      projectUrl: metadata.projectUrl || "",
      category: (metadata.category as any) || "Other",
      oneLiner: metadata.oneLiner || "",
      logoUrl: metadata.logoUrl || "https://founders-wall.vercel.app/logo.png",
    };

    // Mint or retrieve slot authoritatively using Stripe session ID as paymentReference
    const result = await claimSlotAuthoritative(formData, slotId, session.id);

    return NextResponse.json({
      success: true,
      slot: result.slot,
      inventory: result.inventory,
    });
  } catch (error: any) {
    console.error("Stripe Verification Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify payment session." },
      { status: 500 }
    );
  }
}
